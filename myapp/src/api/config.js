//配置基础的axios
import axios from "axios"

//配置基础地址(代理模式)
//axios.defaults.baseURL="/api"
let env = process.env.NODE_ENV;
switch (env) {
    //开发模式
    case "development": axios.defaults.baseURL = "/api";
        break
    //产品模式
    case "production": axios.defaults.baseURL = "/api";//当为产品模式重新配置服务器代理
        break
    //测试模式
    case "test": axios.defaults.baseURL = "xxx.xxx.xx";
        break
}
//设置请求时间最长七秒
axios.create({
    withCredentials:true,
    timeout:7000,
})
export default  axios