import axios from "./config"

//获取推荐歌单
export const getRmdplaylist = () => axios.get('/personalized?limit=6')

//获取推荐新音乐
export const getRmdnewsong = () => axios.get('/personalized/newsong')

//获取歌单详情
export const getPlaylistDetail = (id) => axios.get(`/playlist/detail?id=${id}`)

//获取歌单评论
export const getPlaylistCmt = (id) => axios.get(`/comment/playlist?id=${id}`)

//获取音乐播放地址

export const getMusicurl = (id) => axios.get(`/song/url?id=${id}`)

//获取热门搜索
export const getHotSearch = () => axios.get(`/search/hot`)

//获取热门歌曲
export const getHotSongList = (data) => axios.post(`/playlist/detail`, data, {formData: true,}
)
