// import request from '../utils/request'

// export function login(obj) {
//   return request({
//     method: 'POST',
//     url: '/app/v1_0/authorizations',
//     data:obj
//   })
// }

import http from '../utils/http'
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */


export function login(obj) {
  return http.post('/mp/v1_0/authorizations',obj)
}
export function getuserinfo(params) {
  return http.get('/mp/v1_0/user/profile',params)
}
// // get请求
// export function getListAPI(params){
//     return http.get(`${resquest}/getList.json`,params)
// }
// // post请求
// export function postFormAPI(params){
//     return http.post(`${resquest}/postForm.json`,params)
// }
// // put 请求
// export function putSomeAPI(params){
//     return http.put(`${resquest}/putSome.json`,params)
// }
// // delete 请求
// export function deleteListAPI(params){
//     return http.delete(`${resquest}/deleteList.json`,params)
// }

