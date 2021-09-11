import axios from "axios"
export function request(option){
const instance=axios.create({
    baseURL:"http://106.54.54.237:8000/api/mn",
    timeout:5000
})


instance.interceptors.request.use(config=>{
  // console.log(config)

return config
},
err=>{console.log(err);})

  // 2.2.响应拦截
  // instance.interceptors.response.use(res => {
  //   return res
  // }, err => {
  //   console.log(err);
  // })

// console.log(instance)

return instance(option)
}


export function request152(option) {
  const requestExample = axios.create({
    baseURL: 'http://152.120.185.210:8000'
  })
  requestExample.interceptors.request.use((config) => {
    // console.log(config)
    return config
  }, (error) => {
    console.log(error);
  })
  requestExample.interceptors.response.use((res) => {
    return res.data
  }, 
  (error) => {
    console.log(error);
  })
  return requestExample(option)
}