import { request } from '@/network/request'

// 菜单栏数据
export function getMenuData() {
  return request({
    url: '/menus'
  })
}
