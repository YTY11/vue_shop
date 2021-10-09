<template>
  <el-card>
    <!-- 搜索添加用戶区域 -->
    <el-row :gutter="10">
      <el-col :xs="14" :sm="10" :lg="8">
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.query"
          class="input-with-select"
          clearable
          @change="getListUsers(queryInfo)"
          @clear="getListUsers(queryInfo)"
        >
          <el-button slot="append" icon="el-icon-search" @click="getListUsers(queryInfo)"></el-button>
        </el-input>
      </el-col>
      <el-col :xs="10" :sm="4" :lg="4">
        <el-button class="add-user" type="primary" @click="showAddDialog = true">用户添加</el-button>
      </el-col>
    </el-row>
    <!-- 表格数据展示区域 -->
    <el-table :data="tableData" stripe style="width: 100%" border>
      <el-table-column type="index" :index="conunt" label="#">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="mobile" label="电话" width="180">
      </el-table-column>
      <el-table-column prop="role_name" label="角色" width="180">
      </el-table-column>
      <el-table-column prop="mg_state" label="状态">
        <template slot-scope="scope">
          <el-switch
            @change="setUserStatus(scope.row)"
            v-model="scope.row.mg_state"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :enterable="false"
            content="修改"
            placement="top-start"
          >
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="modifyDialog(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            :enterable="false"
            content="刪除"
            placement="top-start"
          >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeUser(scope.row.id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            :enterable="false"
            content="分配角色"
            placement="top-start"
          >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="getRoles(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <!-- pc端显示 -->
    <el-pagination
      v-if="device === 'desktop'"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[3, 4, 5, 6]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 移动端显示 -->
    <el-pagination
      v-else
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="total"
      small
      :pager-count="5"
      :page-size="queryInfo.pagesize"
    >
    </el-pagination>
    <!-- 添加用户 弹窗 -->
    <el-dialog
      title="添加用户"
      :visible.sync="showAddDialog"
      width="450px"
      @close="closeDialog('addUserDialog')"
    >
      <el-form
        :model="addUserInfo"
        ref="addUserDialog"
        label-width="70px"
        :rules="addFormRules"
      >
        <el-form-item prop="username" label="用户名">
          <el-input class="handel-input" placeholder="请输入内容" v-model="addUserInfo.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input class="handel-input" placeholder="请输入内容" v-model="addUserInfo.password"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input class="handel-input" placeholder="请输入内容" v-model="addUserInfo.email"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机">
          <el-input class="handel-input" placeholder="请输入内容" v-model="addUserInfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="showAddDialog = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 操作 修改 弹窗 -->
    <el-dialog
      title="修改用户"
      :visible.sync="showModifyDialog"
      width="450px"
      @close="closeDialog('modifyDialog')"
    >
      <el-form
        :model="userInfo"
        ref="modifyDialog"
        label-width="70px"
        :rules="editFormRules"
      >
        <el-form-item label="用户名">
          <el-input
            class="handel-input"
            v-model="userInfo.username"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input class="handel-input" v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机">
          <el-input class="handel-input" v-model="userInfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="showModifyDialog = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="modifyUserData"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 操作 设置用户角色 弹窗 -->
    <el-dialog
      title="修改用户"
      :visible.sync="showSetUserDialog"
      width="450px"
      @close="closeDialog"
    >
      <p>当前的用户: {{ userInfo.username }}</p>
      <p>当前的角色: {{ userInfo.role_name }}</p>
          <span>分配新角色</span>
          <el-select v-model="roleId" placeholder="请选择">
            <el-option v-for="item in roles" :key="item.id" :label="item.roleName" :value="item.id"> </el-option>
          </el-select>
      <span slot="footer">
        <el-button size="mini" @click="showSetUserDialog = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="setUserRole">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
// 网络数据
import {
  getListUsers,
  setUserStatus,
  modifyUserData,
  removeUserById,
  getRoles,
  setUserRole,
  addUser
} from '@/api/users'
// 校验规则
import { userAddFormRulesMixin } from '@/mixin/FormRules'
export default {
  name: 'Users',
  mixins: [userAddFormRulesMixin],
  data() {
    return {
      // 用戶列表数据
      tableData: [],
      // 获取用户列表的参数对象
      queryInfo: {
        // 搜索值
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每次显示多少条数据
        pagesize: 5
      },
      // 当前的页数
      pagenum: 0,
      // 总条数
      total: 0,
      // 修改弹窗 状态
      showModifyDialog: false,
      // 设置用户角色 状态
      showSetUserDialog: false,
      // 添加用户 状态
      showAddDialog: false,
      // 用户信息
      userInfo: {},
      // 添加的用户信息
      addUserInfo: {},
      // 角色列表
      roles: [],
      // 新的角色
      roleId: ''
    }
  },
  created() {
    this.getListUsers(this.queryInfo)
  },
  computed: {
    // 计算序列号
    conunt() {
      return (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize + 1
    },
    // 判断模式 移动 OR PC
    device() {
      return this.$store.state.app.device
    }
  },
  methods: {
    // 获取用户列表数据
    async getListUsers(queryInfo) {
      const { data, meta } = await getListUsers(queryInfo)
      if (meta.status === 200) {
        // 数据请求成功弹窗
        this.$message.success(meta.msg)
        // 赋值
        this.tableData = data.users
        this.pagenum = data.pagenum
        this.total = data.total
      } else {
        // 数据请求失败弹窗
        this.$message.error('获取用户列表失败')
      }
    },
    // 控制用户状态
    async setUserStatus(userInfo) {
      const { meta } = await setUserStatus(userInfo)
      if (meta.status === 200) {
        this.$message.success('状态更新成功')
      } else {
        this.$message.error('状态更新失败')
      }
    },
    // 修改用户信息
    modifyUserData() {
      this.$refs.modifyDialog.validate(async (valid) => {
        // 填写数据格式正确 提交修改
        if (valid) {
          // 用户修改提交
          this.showModifyDialog = false
          const { meta } = await modifyUserData(this.userInfo)
          if (meta.status === 200) {
            this.$message.success('用户信息修改成功')
            // 更新后重新获取数据
            this.getListUsers(this.queryInfo)
          } else {
            this.$message.error('用户信息修改失败')
          }
        } else {
          this.$message.info('请按格式填写信息')
        }
      })
    },
    // 点击修改操作按钮 对显示的数据赋值
    modifyDialog(userInfo) {
      this.showModifyDialog = true
      this.userInfo = userInfo
    },

    // 获取角色列表
    async getRoles(userInfo) {
      const { data, meta } = await getRoles()
      if (meta.status === 200) {
        this.showSetUserDialog = true
        this.$message.success('获取角色列表成功')
        this.userInfo = userInfo
        this.roles = data
      } else {
        this.$message.error('获取角色列表失败')
      }
    },
    // 设置用户角色
    async setUserRole() {
      const { meta } = await setUserRole(this.userInfo, this.roleId)
      if (meta.status === 200) {
        this.$message.success('用户角色更新成功')
        this.getListUsers(this.queryInfo) // 重新获取数据
      } else {
        this.$message.success('用户角色更新失败')
      }
      this.showSetUserDialog = false
    },
    // 移除用户
    removeUser(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '永久删除该用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 点击确定
          removeUserById(id).then(({ meta }) => {
            if (meta.status === 200) {
              this.$message.success('删除成功!')
              // 重新获取数据
              this.getListUsers(this.queryInfo)
            } else {
              this.$message.error('删除失败!')
            }
          })
        })
        .catch(() => {
          // 点击取消
          this.$message.info('已取消删除')
        })
    },
    // 添加用户
    addUser() {
      this.$refs.addUserDialog.validate(async valid => {
        if (valid) {
          const { meta } = await addUser(this.addUserInfo)
          if (meta.status === 201) {
            this.$message.success('添加成功')
            this.getListUsers(this.queryInfo)
          } else if (meta.status === 400) {
            return this.$message.error(meta.msg)
          } else {
            this.$message.error('添加失败')
          }
          this.showAddDialog = false
        } else {
          this.$message.info('请按格式填写信息')
        }
      })
    },
    // pageSize 每页条数 改变时会触发回调
    // 重新选择 每页显示的条数
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getListUsers(this.queryInfo)
    },
    // currentPage 当前页数改变时会触发回调
    // 跳转页面
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getListUsers(this.queryInfo)
    },
    // 关闭弹框时 数据重置
    closeDialog(formName) {
      if (formName) {
        this.$refs[formName].resetFields()
      }
      this.roleId = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.add-user {
  margin-left: 20px;
}
.el-table {
  margin-top: 20px;
}
.el-pagination {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
.handel-input {
  width: 300px;
}
</style>
