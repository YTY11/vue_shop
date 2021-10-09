import { request } from '@/network/request'

// 获取商品列表数据
export function getGoodsList(queryInfo) {
  return request({
    url: 'goods',
    params: queryInfo
  })
}
// 根据ID删除商品
export function removeGoodsById(id) {
  return request({
    url: `goods/${id}`,
    method: 'delete'
  })
}
