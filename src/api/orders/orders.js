import { request } from '@/network/request'

// 获取订单列表数据
export function getListOrders(queryInfo) {
  return request({
    url: 'orders',
    params: queryInfo
  })
}

// 获取物流信息
export function getLogistics() {
  return request({
    url: '/kuaidi/1106975712662'
  })
}
