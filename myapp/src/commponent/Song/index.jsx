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

@withRouter
class Song extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            MusicUrl: '',
            play: playimg,
            stop: true,
            musicID: 0
        }
        //设置ref
        this.musicRef = React.createRef();
        this.animationRef = React.createRef();
    }

    componentDidMount() {
        this.state.musicID = parseInt(qr.parse(this.props.location.search).id)
        //console.log(MusicId)
        getMusicurl(this.state.musicID).then(
            res => {
                this.setState(
                    {
                        MusicUrl: res.data.data[0].url//=音乐播放地址
                    }
                )
            }
        )
    }

    //控制音乐播放和暂停
    musicPlay() {
        if (this.musicRef.current !== null) {
            //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
            if (this.musicRef.current.paused) {
                this.musicRef.current.play();//audio.play();// 这个就是播放 
                this.setState({
                    play: stopimg,
                    stop: false,
                })
            } else {
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
                        MusicUrl: res.data.data[0].url//=音乐播放地址
                    }
                )
            }
        )
        //判断按钮
        this.musicRef.current.play();//播放
    }

    render() {
        //console.log(this.animationRef)
        //consoleconsole.log(JSON.parse(localStorage.getItem('picUrl')))
        return (
            <div className='play'>
                <div className='logo'>
                    <span>
                        <img src="http://p3.music.126.net/JpFxnadS71uHPvNhjunCfQ==/109951163421187972.png" alt=""/>
                    </span>
                    <span>网抑云音乐</span>
                </div>
                <div className='circle-warp'>
                    <div className='circle-side'>
                        <div className='circle-middle'>
                            <div className='circle-enter'>
                                <div className='song-img'>
                                    <img ref={this.animationRef} src={JSON.parse(localStorage.getItem('picUrl'))}
                                         alt="play"/>
                                </div>
                                <div className='playbutton' onClick={this.musicPlay.bind(this)}>
                                    <img src={this.state.play} alt="" title={this.state.play ? '播放' : '暂停'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='changMusic'>
                    <span onClick={this.changMusic.bind(this, 'up')}><FastBackwardOutlined/></span>
                    <span onClick={this.musicPlay.bind(this)}>
                        {this.state.stop ? (<PlayCircleOutlined/>) : (<PauseCircleOutlined/>)}</span>
                    <span onClick={this.changMusic.bind(this, 'next')}><FastForwardOutlined/></span>
                </div>
                <audio ref={this.musicRef} src={this.state.MusicUrl}></audio>
            </div>
        )
    }
}

export default Song