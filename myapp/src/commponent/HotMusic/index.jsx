import React from 'react'
import './index.css'
import {withRouter} from "react-router-dom"
import HotSongList from '../SongList'

@withRouter
class HotMusic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Rmdplaylist: [],
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='hotMusic'>
                <div className='hotTop'>
                    <div className='hotPic'>
                        <div className='hotSp'>
                        </div>
                        <div className='hotTime'>
                            更新日期：{new Date().getMonth() + 1}月{new Date().getDate()}日
                        </div>
                    </div>
                </div>
                <div>
                    {<HotSongList type='hotMusic'/>}
                </div>
            </div>
        )
    }
}

export default HotMusic