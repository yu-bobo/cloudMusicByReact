import React from 'react'
import './index.css'
import footerImg from '@/assets/images/Musicfooter.png'
import {getRmdplaylist, getRmdnewsong} from '../../api/index'
import {withRouter} from "react-router-dom"
import play from '@/assets/images/play.png'

@withRouter
class PlayList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Rmdplaylist: [],
            newsonglist: []
        }
    }

    componentDidMount() {
        //获取推荐歌单
        getRmdplaylist().then(res => {
            //console.log(res.data.result)
            this.setState({
                Rmdplaylist: res.data.result
            })

        })
        //获取推荐新歌
        getRmdnewsong().then(res => {
            this.setState({
                newsonglist: res.data.result
            })
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
        //推荐电台元素变量
        let playlistArr = this.state.Rmdplaylist
        let playlist = playlistArr.map(item => {
            return (
                <div className='content' key={item.id} onClick={this.goDetail.bind(this, item.id)}>
                    <div>
                        <img src={item.picUrl} alt=""/>
                        <span>♫{item.playCount > 10000 ? `${(item.playCount / 10000).toFixed(1)}万` : item.playCount}</span>
                    </div>
                    <p>{item.name}</p>
                </div>
            )
        })
        //推荐新歌元素变量
        let newsongArr = this.state.newsonglist
        let newsonglist = newsongArr.map(item => {
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
            <div className='playlist'>
                <div className='recommand'>
                    <h2>推荐歌单</h2>
                    <div className='content-box'>

                        {playlist}
                    </div>

                    <h2>最新音乐</h2>
                    <div className='populMusic-box'>
                        {newsonglist}
                    </div>
                </div>
                <div className='footer'>
                    <img src={footerImg} title={'图是截的，不为别的，就因为我懒 ^_^！'}></img>
                </div>
            </div>
        )
    }
}

export default PlayList