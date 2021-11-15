import React from 'react'
import './index.css'
import {getRmdnewsong, getHotSongList} from '../../api/index'
import {withRouter} from "react-router-dom"
import play from '@/assets/images/play.png'

@withRouter
class SongList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            songList: []
        }
    }

//todo 传入状态区分推荐列表和热歌列表
    componentDidMount() {
        //获取推荐新歌
        getRmdnewsong().then(res => {
            this.setState({
                songList: res.data.result
            })
        })
        let data = {
            params: 'Q7NiE14HzSJ6ylu3v8RwfPDHBCmdH2B+8IpoEkiwJvSFPaOCupnCVbiK45vzHUki',
            encSecKey: 'acc3a2e3f099e7245706050906c82cefe8fc4f9d454d66925744d4dce8218315c77dceb2ebe22739b61b05585168fb690e26203295bbf1952e79982eff682a9cfe70172a889a6a5a6aa688e1214113cbe7c222d5f3226551d0f42dc76751a62375d18a84909951c4ac3741f5e2016032b5f2897c0e535ac30d88a95d474fd6b8',
        }
        //获取热歌排行
        getHotSongList(data).then(res => {
            console.log(res)
        })
    }

    //歌单详情
    goDetail(id) {
        this.props.history.push(`/playlist?id=${id}`)
    }

    //播放音乐
    goSong(id, url) {
        this.props.history.push(`/song?id=${id}`)
        //将音乐的图片保存到localstorage
        localStorage.setItem('picUrl', JSON.stringify(url))
    }

    render() {
        //推荐新歌元素变量
        let newsongArr = this.state.songList
        let songList = newsongArr.map(item => {
            return (
                <div className='populMusic' key={item.id}>
                    <div className='music-info'>
                        <div className='music-detail'>
                            {item.name}
                            <span>{item.song.alias.length > 0 ? `(${item.song.alias})` : ''}</span>
                        </div>
                        <div className='music-author'>
                            <i>{item.song.album.subType.length > 1 ? 'SQ' : ''}</i>
                            {item.song.artists[0].name}-{item.song.name}
                        </div>
                    </div>
                    <div className='music-play' onClick={this.goSong.bind(this, item.id, item.picUrl)}>
                        <img src={play} alt=""/>
                    </div>
                </div>
            )
        })
        return (
            <div className='populMusic-box'>
                {songList}
            </div>
        )
    }
}

export default SongList