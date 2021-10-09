import { request } from '@/network/request'

// 商品分类数据
export function getCategoriesData() {
  return request({
    url: 'categories'
  })
}
// 商品参数
export function getGoodParamsData(id, sel) {
  return request({
    url: `categories/${id}/attributes`,
    params: {
      sel: sel
    }
  })
}
// 添加商品
export function addGoods(formData) {
  return request({
    url: 'goods',
    method: 'post',
    data: formData
  })
}
