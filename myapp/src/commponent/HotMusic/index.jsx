import React from 'react'
import './index.css'
import {withRouter} from "react-router-dom"

@withRouter
class HotMusic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Rmdplaylist: [],
            newsonglist: []
        }
    }

    componentDidMount() {
        // //获取推荐歌单
        // getRmdplaylist().then(res => {
        //     //console.log(res.data.result)
        //     this.setState({
        //         Rmdplaylist: res.data.result
        //     })
        //
        // })
        // //获取推荐新歌
        // getRmdnewsong().then(res => {
        //     this.setState({
        //         newsonglist: res.data.result
        //     })
        // })
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
        return (
            <div className='hotMusic'>
                <div className='hotTop'>
                    <div className='hotPic'>
                        <div className='hotSp'>
                        </div>
                        <div className='hotTime'>
                            更新日期：{new Date().getMonth()+1}月{new Date().getDate()}日
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HotMusic