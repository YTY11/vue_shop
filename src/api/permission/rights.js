import { request } from '@/network/request'

// 获取权限列表
export function getListRights() {
  return request({
    url: 'rights/list'
  })
}
