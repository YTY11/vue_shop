import { request } from '@/network/request'

// 分类数据
export function getCatListData(queryInfo) {
  return request({
    url: 'categories',
    params: queryInfo
  })
}

// 添加分类
export function addCatData(data) {
  return request({
    url: 'categories',
    method: 'post',
    data: data
  })
}

// 修改分类
export function modifyCatData(catId, catName) {
  return request({
    url: `categories/${catId}`,
    method: 'put',
    data: {
      cat_name: catName
    }
  })
}

// 删除分类
export function deleteCatData(id) {
  return request({
    url: `categories/${id}`,
    method: 'delete'
  })
}

// 获取父级分类数据列表
export function getListCatData() {
  return request({
    url: 'categories',
    params: {
      type: 2
    }
  })
}
