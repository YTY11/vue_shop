import { request } from '@/network/request'

// 用户列表数据
export function getListUsers(queryInfo) {
  return request({
    url: 'users',
    params: queryInfo
  })
}
// 控制用户状态
export function setUserStatus(userInfo) {
  return request({
    url: `users/${userInfo.id}/state/${userInfo.mg_state}`,
    method: 'put'
  })
}
// 修改用户数据
export function modifyUserData(userInfo) {
  return request({
    url: `users/${userInfo.id}`,
    method: 'put',
    data: {
      email: userInfo.email,
      mobile: userInfo.mobile
    }
  })
}
// 根据id删除对应的用户信息
export function removeUserById(id) {
  return request({
    url: `users/${id}`,
    method: 'delete'
  })
}
// 获取角色列表
export function getRoles() {
  return request({
    url: 'roles'
  })
}
// 设置用户角色
export function setUserRole(userInfo, roleId) {
  return request({
    url: `users/${userInfo.id}/role`,
    method: 'put',
    data: {
      rid: roleId
    }
  })
}
// 添加用户
export function addUser(addUserInfo) {
  console.log(addUserInfo)
  return request({
    url: '/users',
    method: 'post',
    data: addUserInfo
  })
}
