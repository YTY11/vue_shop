import { request } from '@/network/request'

// 添加角色
export function addRole(addRoleInfo) {
  return request({
    url: 'roles',
    method: 'post',
    data: addRoleInfo
  })
}
// 获取角色列表
export function getListRoles() {
  return request({
    url: 'roles'
  })
}
// 删除权限
export function removePermissionById(roles, id) {
  return request({
    url: `roles/${roles.id}/rights/${id}`,
    method: 'delete'
  })
}
// 删除角色
export function removeRoleById(id) {
  return request({
    url: `roles/${id}`,
    method: 'delete'
  })
}
// 查找角色是否存在
export function findRoleInfo(id) {
  return request({
    url: `roles/${id}`
  })
}
// 修改角色信息
export function modifyRoleInfo(data) {
  return request({
    url: `roles/${data.id}`,
    method: 'put',
    data: {
      roleName: data.roleName,
      roleDesc: data.roleDesc
    }
  })
}

// 获取权限列表
export function getListPermission() {
  return request({
    url: 'rights/tree'
  })
}

// 设置权限
export function setPermission(id, idStr) {
  return request({
    url: `roles/${id}/rights`,
    method: 'post',
    data: {
      rids: idStr
    }
  })
}
