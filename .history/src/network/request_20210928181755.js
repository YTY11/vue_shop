// 引入axios
import axios from 'axiox'

export function request(config) {
  const instance = new axios.create({
    baseUrl: 'https://lianghj.top:8888/api/private/v1/',
    timeOut: 5000
  })

}