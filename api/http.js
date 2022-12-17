let Fly  = require("flyio/dist/npm/wx")
let fly = new Fly
import Vue from 'vue'


// 设置超时
fly.config.timeout = 15000

let baseURL



let baseURLRestartNum = 10



if(process.env.NODE_ENV === 'development'){
    baseURL = 'https://api.ynbs.xyz/api/'
}else{
    baseURL = 'https://api.ynbs.xyz/api/'
}

// 设置请求地址基址
fly.config.baseURL = baseURL
Vue.prototype.$BASEURL = baseURL



// Vue.prototype.$PAYBASEURL = 'https://zf.91goodluck.com/'


//添加请求拦截器
fly.interceptors.request.use(
    // 请求之前对请求做处理
    request =>{
		if(request.method==='POST'){
			request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		}
		
		// fly.config.baseURL = 'https://api2.91goodluck.com/api/'
		// console.log(request)
        return request;
    },
    // 请求失败的处理
    error => {
		// console.log(error)
        return Promise.reject(error)
    }
)

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    response => {
		if(response.request.baseURL==='https://api2.91goodluck.com/api/'){
			fly.config.baseURL = 'https://api.91goodluck.com/api/'
			Vue.prototype.$BASEURL = fly.config.baseURL
		}
        //只将请求结果的data字段返回
        return response.data
    },
    error => {
        //发生网络错误后会走到这里
		console.log(error)
		
		baseURLRestartNum = baseURLRestartNum-1
		
		// if(baseURLRestartNum<6){
			
			
			
		// }
		
		let errBaseURL_ =  error.request.baseURL
		if(errBaseURL_==='https://api.91goodluck.com/api/'){
			fly.config.baseURL = 'https://api2.91goodluck.com/api/'
		}
		
		if(errBaseURL_==='https://api2.91goodluck.com/api/'){
			fly.config.baseURL = 'https://api.91goodluck.com/api/'
		}
		
		
		
		Vue.prototype.$BASEURL = fly.config.baseURL
		
		
		if(baseURLRestartNum===0){
			baseURLRestartNum = 10
		}
		
		// if(errBaseURL_==='https://zf.91goodluck.com/'){
		// 	Vue.prototype.$PAYBASEURL  = 'https://zf.91goodluck.com/'
		// }
		
		
		
		
		uni.hideLoading()
		// console.log(error)
        return Promise.reject(error)
    }
)



export default fly
