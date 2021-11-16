import React from 'react'
import playimg from '@/assets/images/play3.png'
import stopimg from '@/assets/images/stop.png'
import './index.css'
import qr from "query-string"
import {getMusicurl} from '@/api/index.js'
import {
    FastBackwardOutlined,
    FastForwardOutlined,
    PlayCircleOutlined,
    PauseCircleOutlined
} from '@ant-design/icons';
import {withRouter} from "react-router-dom"

class Scene {
    constructor(canvas) {
        this.cvs = canvas;
        this.ctx = canvas.getContext('2d');
        this.triangleSet = [];
        this.triangleNum = 25; // 三角形个数
        const realm = this.cvs.width / 2; // 画布中心
        for (let i = 0; i < this.triangleNum; ++i)
            this.triangleSet[i] = new Triangle(this.ctx, 1.5, [realm, realm], realm);
    }

    render() {
        this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);  // 及时清除画布
        this.triangleSet.forEach(triangle => triangle.render());
    }

    run() {
        if (!this.timer) {
            this.timer = setInterval(this.render.bind(this), 25);
        }
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = 0;
        }
    }
}

const PI2 = 2 * Math.PI;

class Triangle {
    constructor(context, speed, pole, range) {
        this.ctx = context;
        this.pole = pole;
        this.range = range;
        this.speed = speed;
        this.points = [[0, 0], [0, 0], [0, 0]];
        this.__restart();
    }

    __restart() {
        this.angle = Math.random() * PI2; // 随机生成一个移动方向
        this.speedX = Math.cos(this.angle) * this.speed;
        this.speedY = Math.sin(this.angle) * this.speed;
        this.opacity = 1;

        const dist = Math.random() * 150; // 为了让三角形生成错落有致，所以让三角形从距离pole点的一个随机距离dist出发
        const distX = Math.cos(this.angle) * dist;
        const distY = Math.sin(this.angle) * dist;
        const θ = Math.random() * PI2; // 将三角形随机旋转一个θ°
        const x2 = Math.random() * 10;
        const y2 = 20 + Math.random() * 20;
        const x3 = 10 + Math.random() * 15;
        const y3 = 12 + Math.random() * 6;
        this.points[0][0] = Math.floor(this.pole[0] + distX);
        this.points[0][1] = Math.floor(this.pole[1] + distY);
        this.points[1][0] = Math.floor(this.pole[0] + distX + (x2 * Math.cos(θ) - y2 * Math.sin(θ)));
        this.points[1][1] = Math.floor(this.pole[1] + distY + (y2 * Math.cos(θ) + x2 * Math.sin(θ)));
        this.points[2][0] = Math.floor(this.pole[0] + distX + (x3 * Math.cos(θ) - y3 * Math.sin(θ)));
        this.points[2][1] = Math.floor(this.pole[1] + distY + (y3 * Math.cos(θ) + x3 * Math.sin(θ)));
    }

    __distance() {
        const dx = this.points[0][0] - this.pole[0];
        const dy = this.points[0][1] - this.pole[1];
        return Math.floor(Math.sqrt(dx * dx + dy * dy));
    }

    __lerp(src, dst, coeff) {
        return src + (dst - src) * coeff;
    }

    __update() {
        const dist = this.__distance();
        if (dist - this.range > 0.0001)
            this.__restart();
        else {
            this.points.forEach((point, index) => {
                this.points[index][0] = point[0] + this.speedX;
                this.points[index][1] = point[1] + this.speedY;
            });
            this.opacity = this.__lerp(1, 0, dist / this.range);
        }
    }

    render() {
        this.__update();
        this.ctx.lineWidth = 2;
        this.ctx.lineJoin = "miter";
        this.ctx.strokeStyle = `rgba(179, 179, 179, ${this.opacity})`;
        this.ctx.beginPath();
        this.ctx.moveTo(this.points[0][0], this.points[0][1]);
        this.ctx.lineTo(this.points[1][0], this.points[1][1]);
        this.ctx.lineTo(this.points[2][0], this.points[2][1]);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fillStyle = 'rgba(67, 67, 67, .2)';
        this.ctx.fill();
    }
}

@withRouter
class Song extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            MusicUrl: '',
            play: playimg,
            stop: true,
            musicID: 0,//歌曲id
            jumpChart: [
                {
                    color: '#03a9f4',
                    height: 120
                },
                {
                    color: '#8a4af3',
                    height: 80
                },
                {
                    color: '#f34a5e',
                    height: 60
                },
                {
                    color: '#f38b4a',
                    height: 100
                }, {
                    color: '#ffeb3b',
                    height: 100
                }, {
                    color: '#4af38b',
                    height: 150
                },

            ],//跳动图
            jumpInterVal: 0,
        }
        //设置ref
        this.musicRef = React.createRef();
    }

    componentDidMount() {
        this.state.musicID = parseInt(qr.parse(this.props.location.search).id)
        //console.log(MusicId)
        getMusicurl(this.state.musicID).then(
            res => {
                this.setState(
                    {
                        MusicUrl: res.data[0].url//=音乐播放地址
                    }
                )
            }
        )
        //水晶音波
        const canvas = document.getElementById('background');
        canvas.width = canvas.height = 400
        const scene = new Scene(canvas);
        scene.run();
    }

    //控制音乐播放和暂停
    musicPlay() {
        if (this.musicRef.current !== null) {
            //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
            if (this.musicRef.current.paused) {
                if (!this.state.jumpInterVal) {
                    //播放打开jumpChart
                    this.setRandomHeight()
                }
                this.musicRef.current.play();//audio.play();// 这个就是播放 
                this.setState({
                    play: stopimg,
                    stop: false,
                })
            } else {
                if (this.state.jumpInterVal) {
                    //暂停关闭jumpChart
                    clearInterval(this.state.jumpInterVal)
                    this.setState({
                        jumpInterVal: 0,
                    })
                }
                this.musicRef.current.pause();// 这个就是暂停
                this.setState({
                    play: playimg,
                    stop: true,
                })
            }
        }
    }

    //切换音乐
    changMusic(type) {
        if (type === 'up') {
            this.setState({
                musicID: this.state.musicID - 1,
            })
        }
        if (type === 'next') {
            this.setState({
                musicID: this.state.musicID + 1
            })
        }
        //重新获取音乐地址
        getMusicurl(this.state.musicID).then(
            res => {
                this.setState(
                    {
                        MusicUrl: res.data[0].url//=音乐播放地址
                    }
                )
            }
        )
        //判断按钮
        this.musicRef.current.play();//播放
    }

    //定时器随机生成高度
    setRandomHeight() {
        this.setState({
            jumpInterVal: setInterval(() => {
                this.state.jumpChart.map((item, index) => {
                    let {jumpChart} = {...this.state}
                    jumpChart[index].height = Math.floor(Math.random() * 200)
                    this.setState({
                        jumpChart: jumpChart,
                    })
                })
            }, 500)
        })
    }

    render() {
        let jumpChartList = this.state.jumpChart
        let jumpChart = jumpChartList.map((item, index) => {
            return (
                <span key={index} style={{height: `${item.height}` + 'px', backgroundColor: `${item.color}`}}/>
            )
        })
        return (
            <div className='play'>
                <div className='logo'>
                    <span>
                        <img src="http://p3.music.126.net/JpFxnadS71uHPvNhjunCfQ==/109951163421187972.png" alt=""/>
                    </span>
                    <span>网抑云音乐</span>
                </div>
                <div className='circle-warp'>
                    <canvas id="background">水晶音波</canvas>
                    <div className='circle-side'>
                        <img className='circle-img'
                             src={JSON.parse(localStorage.getItem('picUrl'))}
                             alt="play"/>
                    </div>
                </div>
                <div className='changeMusic'>
                    <span onClick={this.changMusic.bind(this, 'up')}><FastBackwardOutlined/></span>
                    <span onClick={this.musicPlay.bind(this)}>
                        {this.state.stop ? (<PlayCircleOutlined/>) : (<PauseCircleOutlined/>)}</span>
                    <span onClick={this.changMusic.bind(this, 'next')}><FastForwardOutlined/></span>
                </div>
                <div className="jumpChart">
                    {
                        jumpChart
                    }
                </div>
                <audio ref={this.musicRef} src={this.state.MusicUrl}/>
            </div>
        )
    }
}

export default Song