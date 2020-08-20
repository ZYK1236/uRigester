/**
 * 之前的问题是json-server只支持json格式化,但是我这里提交的是表单格式(qs处理了)
 */
import qs from 'qs'
import store from '../store/store'

const service = axios.create({
    baseURL: process.env.NODE_ENV == 'development'?'/api':'/',  // api的base_url
    timeout: 50000  // 请求超时时间
});


// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("加载中...");
    // 在请求头上面添加token
    const token = store.state.login.token;

    if (token) {
        config.headers.token = token;
    }
    //对post的内容序列化
    config.method === 'post'
        ? config.data = qs.stringify({ ...config.data })
        : config.params = { ...config.params };
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
    response => {
        //成功请求到数据
        return response.data
    },
    error => {  //响应错误处理
        return Promise.reject(error)
    }
);

export default service