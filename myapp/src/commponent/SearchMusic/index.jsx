import React from 'react'
import './index.css'
import {withRouter} from "react-router-dom"

@withRouter
class SearchMusic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hotSearchList: [{
                musicID: 0,
                name: '夏天的秘密',
            }, {
                musicID: 1,
                name: '漠河舞厅',
            }, {
                musicID: 2,
                name: '浪漫主义',
            }, {
                musicID: 3,
                name: '魔力红--five',
            }, {
                musicID: 4,
                name: '生活在别处的你',
            }, {
                musicID: 5,
                name: '毛不易',
            }, {
                musicID: 6,
                name: '哪里都是你',
            }, {
                musicID: 7,
                name: '梦特别娇',
            }],
            historySearchList: [{
                historyName: '东北民谣',
                id: 1,
            },{
                historyName: '孤独的北京',
                id: 2,
            },{
                historyName: '我最亲爱的你',
                id: 3,
            }],
        }
    }

    componentDidMount() {

    }

    render() {
        let hotSearchList = this.state.hotSearchList.map((item) => {
            return (
                <li key={item.musicID}> {item.name}</li>
            )
        })
        let historySearchList = this.state.historySearchList.map((item) => {
            return (
                <li key={item.id}>
                    <i></i>
                    <div className='history-content'>
                        <span>{item.historyName}</span>
                        <figure>
                            <i></i>
                        </figure>
                    </div>
                </li>
            )
        })
        return (
            <div className='search-content'>
                <div className='search-input'>
                    <div className='input-cover'>
                        <i className='search-icon'/>
                        <input/>
                        <label className="holder">搜索歌曲、歌手、专辑</label>
                    </div>
                </div>
                <section className='hot-list'>
                    <h3>热门搜索</h3>
                    <ul>
                        {hotSearchList}
                    </ul>
                </section>
                <section className='hot-history'>
                    <ul>
                        {historySearchList}
                    </ul>
                </section>

            </div>
        )
    }
}

export default SearchMusic