import { request } from '@/network/request'

// 分类数据
export function getCatListData(queryInfo) {
  return request({
    url: 'categories',
    params: queryInfo
  })
}
