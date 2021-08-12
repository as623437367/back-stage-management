import http from '../utils/http'

export const publish = (datas,parames) => {
  return http.post('/mp/v1_0/articles',datas,parames)
}