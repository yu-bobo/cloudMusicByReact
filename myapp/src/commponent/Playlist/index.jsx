import React from 'react'
import './index.css'
import footerImg from '@/assets/images/Musicfooter.png'
import {getRmdplaylist} from '../../api/index'
import {withRouter} from "react-router-dom"
import NewSongList from '../SongList'

@withRouter
class PlayList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Rmdplaylist: [],
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
    }

    //歌单详情
    goDetail(id) {
        this.props.history.push(`/playlist?id=${id}`)
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
        return (
            <div className='playlist'>
                <div className='recommand'>
                    <h2>推荐歌单</h2>
                    <div className='content-box'>
                        {playlist}
                    </div>
                    <h2>最新音乐</h2>
                    <div>
                        {<NewSongList/>}
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