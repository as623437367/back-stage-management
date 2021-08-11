import http from '../utils/http'

export function getarticle(params) {
  return http.get('/mp/v1_0/articles', 
    params
  )
}
export const getarticlechannel = () => {
  return http.get('/mp/v1_0/channels')
}

export const deletarticle = (params) => {
  return http.delete(`/mp/v1_0/articles/${params}`) 
}