import axios from "axios"

//获取推荐歌单
export const getRmdplaylist = () => axios.get('http://chst.vip:666/personalized?limit=6')

//获取推荐新音乐
export const getRmdnewsong = () => axios.get('http://chst.vip:666/personalized/newsong')

//获取歌单详情
export const getPlaylistDetail = (id) => axios.get(`http://chst.vip:666/playlist/detail?id=${id}`)

//获取歌单评论
export const getPlaylistCmt = (id) => axios.get(`http://chst.vip:666/comment/playlist?id=${id}`)

//获取音乐播放地址

export const getMusicurl = (id) => axios.get(`http://chst.vip:666/song/url?id=${id}`)

//获取热门搜索
export const getHotSearch = () => axios.get(`http://chst.vip:666/search/hot`)