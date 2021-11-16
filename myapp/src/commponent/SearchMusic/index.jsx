import React from 'react'
import './index.css'
import {withRouter} from "react-router-dom"
import {getHotSearch} from "@/api/index.js"

@withRouter
class SearchMusic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hotSearchList: [],
            historySearchList: JSON.parse(localStorage.getItem('cm_search_history')) ? JSON.parse(localStorage.getItem('cm_search_history')) : [],//获取历史搜索记录
        }
    }

    componentDidMount() {
        //获取热搜列表
        getHotSearch().then(res => {
            this.setState({
                hotSearchList: res.result.hots || []
            })
        })
    }

    //搜索
    doSearch(item) {
        this.setState({
            historySearchList: [...this.state.historySearchList, item]
        }, () => {
            this.setLocalStorageByHistory()
        })

    }

    //删除历史记录
    removeHistorySearch(index) {
        let historySearchList = [...this.state.historySearchList]
        historySearchList.splice(index, 1)
        this.setState({
            historySearchList: historySearchList
        }, () => {
            this.setLocalStorageByHistory()
        })
    }

    //存储历史搜索条件到localStorage
    setLocalStorageByHistory() {
        localStorage.setItem('cm_search_history', JSON.stringify(this.state.historySearchList))
    }

    render() {
        let hotSearchList = this.state.hotSearchList.map((item) => {
            return (
                <li key={item.second + Math.random()} onClick={this.doSearch.bind(this, item)}> {item.first}</li>
            )
        })
        let historySearchList = this.state.historySearchList.map((item, index) => {
            return (
                <li key={item.second + Math.random()}>
                    <i/>
                    <div className='history-content'>
                        <span>{item.first}</span>
                        <figure>
                            <i onClick={this.removeHistorySearch.bind(this, index)}/>
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