import React from 'react'
import qr from "query-string"
import { getPlaylistDetail, getPlaylistCmt } from '@/api/index.js'
import playimg from '@/assets/images/play.png'
import likeimg from '@/assets/images/like.png'
import './index.css'
class PlaylistDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            detail: [],
            creator: '',
            tracks: [],
            comment: []
        }
    }
    componentDidMount() {
        //获取传过来的id
        let playlistId = qr.parse(this.props.location.search)
        //发歌单详情请求
        getPlaylistDetail(playlistId.id).then(
            res => {
                //console.log(res.playlist.creator.avatarUrl)
                this.setState({
                    detail: res.playlist,
                    creator: res.playlist.creator,
                    tracks: res.playlist.tracks
                }
                )
            })
        
        //发歌单评论请求
        getPlaylistCmt(playlistId.id).then(res => {
            this.setState({
                comment: res.comments
            })
        })
    }
    goSong(id,url){
        this.props.history.push(`/song?id=${id}`)
        //将音乐的图片保存到localstorage
        localStorage.setItem('picUrl',JSON.stringify(url))
    }
    render() {
        //console.log(this.state.creator)
        //console.log(this.state.detail)
        //console.log(this.state.tracks)
        //歌单元素变量
        let playlist = this.state.tracks.map((item, index) => {
            return (
                <div className='m-content' key={item.id}>
                    <div className='rank'>{index + 1}</div>
                    <div className='m-info'>
                        <div className='m-name'>{item.name}</div>
                        <div className='m-author'> {item.ar[0].name}</div>
                        <img className='m-play' src={playimg} onClick={this.goSong.bind(this,item.id,item.al.picUrl)}></img>
                    </div>
                </div>
            )
        })
        //定义一个转换时间戳的函数
        function turnTime(unixtimestamp) {
            var unixtimestamp = new Date(unixtimestamp);
            var year = 1900 + unixtimestamp.getYear();
            var month = "0" + (unixtimestamp.getMonth() + 1);
            var date = "0" + unixtimestamp.getDate();
            var hour = "0" + unixtimestamp.getHours();
            var minute = "0" + unixtimestamp.getMinutes();
            var second = "0" + unixtimestamp.getSeconds();
            let time = year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2, date.length)
                + " " + hour.substring(hour.length - 2, hour.length) + ":"
                + minute.substring(minute.length - 2, minute.length) + ":"
                + second.substring(second.length - 2, second.length);
            return time
            //  输出结果： 2019-03-27 17:00:59
        }
        //歌单评论元素变量
        let playlistCmt = this.state.comment.map((item, index) => {
            return (
                <div className='cmt-item' key={index}>
                    <div className='cmt-img'><img src={item.user.avatarUrl}></img></div>
                    <div className='cmt-warp'>
                        <div className='cmt-header'>
                            <div className='cmt-meta'>
                                <div className='cmt-user'><span>{item.user.nickname}</span></div>
                                <div className='cmt-time'><span>{turnTime(item.time)}</span></div>
                            </div>
                            <div className='cmt-like'><span>{item.likedCount}</span><img src={likeimg}></img></div>
                        </div>
                        <div className='cmt-content'><span>{item.content}</span></div>
                    </div>
                </div>
            )
        })
        return (
            <div className='content'>
                <div className='top'>
                    <div className='top-1'></div>
                    <div className='top-2' style={{ backgroundImage: `url(${this.state.detail.coverImgUrl})` }}></div>
                    <div className='top-content'>
                        <div className='img-box'>
                            <img src={this.state.detail.coverImgUrl} />
                            <span className='gedan'>歌单</span>
                            <span className='playCount'>♫{this.state.detail.playCount > 10000 ? `${(this.state.detail.playCount / 10000).toFixed(1)}万` : this.state.detail.playCount}</span>
                        </div>

                        <div className='info'>
                            <span>{this.state.detail.name}</span>
                            <div className='author-info'>
                                <img src={this.state.creator.avatarUrl} alt="" />
                                <span>{this.state.creator.nickname}</span>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='playlist'>
                    <h3>歌曲列表</h3>
                    <div className='m-list'>
                        {playlist}
                        <div className='getmore'>
                            <span>查看更多歌曲，请下载客户端</span>
                        </div>
                    </div>
                </div>
                <div className='hotcomment'>
                    <h3>最新评论</h3>
                    <div className='cmt-list'>
                        {playlistCmt}
                    </div>
                </div>
                {/* 收藏歌单 */}
                <div className='collect'>
                    <div className='collect-warp'>
                        <span>收藏歌单</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default PlaylistDetail
