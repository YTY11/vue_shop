<template>
  <el-card>
    <!-- 添加角色 -->
    <el-button type="primary" @click="showAddDialog = true">添加角色</el-button>
    <!-- 表格数据区域 -->
    <el-table :data="tableData" style="width: 100%" stripe border>
      <!-- 权限级别展开区域 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row
            v-for="(childOne, index) in props.row.children"
            :key="childOne.id"
            :class="{
              'role-hr': index % 2 !== 0,
              'role-hr2':
                props.row.children.length % 2 == 0 &&
                index == props.row.children.length - 1
            }"
          >
            <!-- 一级权限 -->
            <el-col :span="4">
              <el-tag
                closable
                @close="removePermission(props.row, childOne.id)"
                >{{ childOne.authName }}</el-tag
              >
            </el-col>
            <!-- 二级权限 -->
            <el-col :span="20">
              <el-row
                v-show="childOne.children"
                :class="{
                  'role-hr': indexTwo % 2 !== 0,
                  'role-hr2':
                    childOne.children.length % 2 == 0 &&
                    indexTwo == childOne.children.length - 1
                }"
                v-for="(childTwo, indexTwo) in childOne.children"
                :key="childTwo.id"
              >
                <el-col :span="4">
                  <el-tag
                    closable
                    type="success"
                    @close="removePermission(props.row, childTwo.id)"
                    >{{ childTwo.authName }}</el-tag
                  >
                </el-col>
                <!-- 三级级权限 -->
                <el-col :span="20">
                  <el-col
                    :span="6"
                    v-show="childTwo.children"
                    v-for="childThree in childTwo.children"
                    :key="childThree.id"
                  >
                    <el-tag
                      closable
                      type="warning"
                      @close="removePermission(props.row, childThree.id)"
                      >{{ childThree.authName }}</el-tag
                    >
                  </el-col>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" :index="1"> </el-table-column>
      <el-table-column label="角色名称" prop="roleName" min-width="200">
      </el-table-column>
      <el-table-column label="角色描述" prop="roleDesc" min-width="200">
      </el-table-column>
      <el-table-column label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="modifyDialog(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="removeRole(scope.row.id)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-setting"
            @click="showPermission(scope.row)"
            >分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加角色 弹窗 -->
    <el-dialog
      title="添加角色"
      :visible.sync="showAddDialog"
      width="450px"
      @close="closeDialog('addRoleDialog')"
    >
      <el-form
        :model="addRoleInfo"
        ref="addRoleDialog"
        label-width="90px"
        :rules="addFormRules"
      >
        <el-form-item prop="roleName" label="角色名称">
          <el-input
            class="handel-input"
            v-model="addRoleInfo.roleName"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item prop="roleDesc" label="角色描述">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="addRoleInfo.roleDesc"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="showAddDialog = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 操作 修改 弹窗 -->
    <el-dialog
      title="修改角色"
      :visible.sync="showModifyDialog"
      width="450px"
      @close="closeDialog('modifyDialog')"
    >
      <el-form
        :model="modifyRoleInfo"
        ref="modifyDialog"
        label-width="90px"
        :rules="addFormRules"
      >
        <el-form-item prop="roleName" label="角色名称">
          <el-input
            class="handel-input"
            v-model="modifyRoleInfo.roleName"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item prop="roleDesc" label="角色描述">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="modifyRoleInfo.roleDesc"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="showModifyDialog = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="modifyRole"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 操作 分配权限 弹窗 -->
    <el-dialog
      title="分配权限"
      :visible.sync="showPermissionDialog"
      width="450px"
      @close="closeDialog"
    >
      <el-tree
        ref="permissionDialog"
        :data="listPermission"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        :props="defaultProps"
      >
      </el-tree>
      <span slot="footer">
        <el-button size="mini" @click="showPermissionDialog = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="setPermission">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { rolesFormRulesMixin } from '@/mixin/FormRules'
// 网络数据
import {
  addRole,
  getListRoles,
  removePermissionById,
  removeRoleById,
  findRoleInfo,
  modifyRoleInfo,
  getListPermission,
  setPermission
} from '@/api/permission/roles'
export default {
  name: 'Roles',
  mixins: [rolesFormRulesMixin],
  data() {
    return {
      // 表格数据
      tableData: [],
      // 添加角色 弹窗状态
      showAddDialog: false,
      // 修改角色 弹窗状态
      showModifyDialog: false,
      // 权限分配 弹窗状态
      showPermissionDialog: false,
      // 添加角色信息
      addRoleInfo: {},
      // 修改角色信息
      modifyRoleInfo: {},
      // 权限数据
      listPermission: [],
      // 角色ID
      roleId: '',
      // 树形控件的绑定对象
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 默认选择的权限
      defKeys: []
    }
  },
  created() {
    this.getListRoles()
  },
  methods: {
    // 获取角色列表
    async getListRoles() {
      const { data, meta } = await getListRoles()
      if (meta.status !== 200) return this.$message.error('获取角色列表失败')
      this.tableData = data
    },
    // 添加角色
    addRole() {
      this.$refs.addRoleDialog.validate(async (vali) => {
        if (vali) {
          const { meta } = await addRole(this.addRoleInfo)
          if (meta.status === 201) {
            this.$message.success('添加成功')
          } else if (meta.status === 400) {
            return this.$message.info(meta.msg)
          } else {
            this.$message.error('添加失败')
          }
          this.showAddDialog = false
        } else {
          this.$message.info('请按格式填写信息')
        }
      })
    },
    // 修改角色
    modifyRole() {
      this.$refs.modifyDialog.validate(async (vali) => {
        if (!vali) return this.$message.info('请按格式填写信息')
        const { meta } = await modifyRoleInfo(this.modifyRoleInfo)
        if (meta.status === 200) {
          this.$message.success('修改角色成功')
          // 重新获取数据
          this.getListRoles()
        } else {
          return this.$message.error('修改角色失败')
        }
        this.showModifyDialog = false
      })
    },
    // 删除权限
    removePermission(roles, id) {
      this.$confirm('此操作将永久删除此权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 点击确定
          removePermissionById(roles, id).then(({ data, meta }) => {
            if (meta.status !== 200) return this.$message.error('删除失败!')
            this.$message.success('删除成功!')

            // 删除后将接口返回的新数据直接赋值给对应角色的权限
            // 解决重新获取所有数据 窗口自动收起 的问题
            roles.children = data
          })
        })
        .catch(() => {
          // 点击取消
          this.$message.info('已取消删除')
        })
    },
    // 删除角色
    removeRole(id) {
      this.$confirm('此操作将永久删除此角色, 是否继续?', '永久删除此角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 点击确定
          removeRoleById(id).then(({ meta }) => {
            if (meta.status !== 200) return this.$message.error('删除失败!')
            this.$message.success('删除成功!')
            // 重新获取数据
            this.getListRoles()
          })
        })
        .catch(() => {
          // 点击取消
          this.$message.info('已取消删除')
        })
    },
    // 修改弹窗打开时 判断此角色是否存在 并对数据进行赋值
    async modifyDialog(data) {
      const { meta } = await findRoleInfo(data.id)
      if (meta.status !== 200) return this.$message.error('此角色不存在')
      this.showModifyDialog = true
      this.modifyRoleInfo = data
    },
    // 显示 权限分配弹窗  并获取数据
    async showPermission(roles) {
      this.roleId = roles.id
      const { data, meta } = await getListPermission()
      if (meta.status !== 200) return this.$message.error('获取权限列表失败')
      this.$message.success('获取权限列表成功')
      this.listPermission = data
      // 获取默认选择的权限
      this.getDefKeys(roles, this.defKeys)
      this.showPermissionDialog = true
    },
    // 设置权限
    async setPermission() {
      // 获取新选中的权限 key 即 id
      const newKeys = [...this.$refs.permissionDialog.getCheckedKeys(), ...this.$refs.permissionDialog.getHalfCheckedKeys()]
      // 将数组转换成用 ‘ , ’ 分割的字符串
      const idStr = newKeys.join(',')
      const { meta } = await setPermission(this.roleId, idStr)
      if (meta.status === 200) {
        this.$message.success('权限更新成功')
        // 重新获取数据
        this.getListRoles()
      } else {
        this.$message.success('权限更新失败')
      }
      this.showPermissionDialog = false
    },
    // 关闭弹窗回调 数据重置
    closeDialog(formName) {
      if (formName) {
        this.$refs[formName].resetFields()
      }
      this.listPermission = []
      this.defKeys = []
    },
    // 用递归方式 获取默认选择的权限数据
    getDefKeys(data, arr) {
      if (!data.children) {
        return arr.push(data.id)
      }
      data.children.forEach(item => {
        this.getDefKeys(item, arr)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 20px;
  .role-hr {
    border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
  }
  .role-hr2 {
    border: 0;
    border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
  }
  .el-tag {
    margin: 10px 0;
  }
  .el-row {
    display: flex;
    align-items: center;
  }
}
</style>
