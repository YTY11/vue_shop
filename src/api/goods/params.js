import { request } from '@/network/request'

// 新增 删除 tag子数据
export function setTag(cartId, row) {
  return request({
    url: `categories/${cartId}/attributes/${row.attr_id}`,
    method: 'put',
    data: {
      attr_sel: row.attr_sel,
      attr_name: row.attr_name,
      attr_vals: row.attr_vals.join(' ')
    }
  })
}
// 添加  商品参数 和 属性
export function addGoodsParamsAndProp(catId, data, sel) {
  return request({
    url: `categories/${catId}/attributes`,
    method: 'post',
    data: {
      attr_name: data.attr_name,
      attr_sel: sel
    }
  })
}
// 删除 商品参数 和 属性
export function deleteGoodsParamsAndProp(catId, id) {
  return request({
    url: `categories/${catId}/attributes/${id}`,
    method: 'delete'
  })
}
// 修改 商品参数 和 属性
export function modifyGoodsParamsAndProp(catId, id, name, sel) {
  return request({
    url: `categories/${catId}/attributes/${id}`,
    method: 'put',
    data: {
      attr_name: name,
      attr_sel: sel
    }
  })
}
// 点击编辑时获取的信息
export function getInfoData(catId, id, sel) {
  return request({
    url: `categories/${catId}/attributes/${id}`,
    params: {
      attr_sel: sel
    }
  })
}
