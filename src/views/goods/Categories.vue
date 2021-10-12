<template>
  <el-card>
    <!-- 添加区域 -->
    <el-button type="primary"  @click="getListCatData">添加分类</el-button>
    <!-- 表格数据区域 -->
    <el-table  :data="tableData" row-key="cat_id" style="width: 100%" stripe border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">>
      <!-- 权限级别展开区域 -->
      <el-table-column type="" label="#" prop="index">
      </el-table-column>
      <el-table-column prop="cat_name" label="分类名称" min-width="180px">
      </el-table-column>
      <el-table-column label="是否有效" min-width="180px">
        <template slot-scope="scope">
           <span class="el-icon-circle-check" style="color: #0CC931" v-if="!scope.row.cat_deleted"></span>
           <span class="el-icon-circle-close" style="color: red" v-else></span>
        </template>
      </el-table-column>
      <el-table-column prop="index" label="排序" min-width="180px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level === 1" type="success">二级</el-tag>
          <el-tag v-else type="warning">三级</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="index" label="操作" min-width="180px">
       <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="showModifyCatData(scope.row)"
            >编辑</el-button
          >
          <el-button
            class="button-new-tag"
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteCatData(scope.row.cat_id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <!-- pc端显示 -->
    <el-pagination
      v-if="device === 'desktop'"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
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
    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="showAddDialog"
      width="450px"
      @close="closeDialog('addCatDialog')"
    >
      <el-form
        :model="addCatInfo"
        ref="addCatDialog"
        label-width="100px"
        :rules="formRules"
      >
        <el-form-item prop="cat_name" label="分类名称">
          <el-input class="handel-input" placeholder="请输入内容" v-model="addCatInfo.cat_name"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="父级分类">
          <el-cascader clearable  v-model="keyList" :options="cateList" :props="{ expandTrigger: 'hover',...cateProps }"
            @change="handleChange"></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="showAddDialog = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addData">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 操作 编辑对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="showModifyDialog"
      width="450px"
      @close="closeDialog('modifyCatDialog')"
    >
      <el-form
        :model="modifyCatInfo"
        ref="modifyCatDialog"
        label-width="100px"
        :rules="formRules"
      >
        <el-form-item prop="cat_name" label="分类名称">
          <el-input class="handel-input" placeholder="请输入内容" v-model="modifyCatInfo.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="showModifyDialog = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveCatData">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
// 网络数据
import { getCatListData, getListCatData, addCatData, deleteCatData, modifyCatData } from '@/api/goods/Categories'
import { catRules } from '@/mixin/FormRules'
export default {
  name: 'Categories',
  mixins: [catRules],
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
  data() {
    return {
      // 表格索引
      indexN: 1,
      // 分类列表数据
      tableData: [],
      // 获取用户列表的参数对象
      queryInfo: {
        type: 3,
        // 当前的页数
        pagenum: 1,
        // 当前每次显示多少条数据
        pagesize: 5
      },
      // 总条数
      total: 0,
      // 分类数据添加对话框 状态
      showAddDialog: false,
      // 分类数据修改对话框 状态
      showModifyDialog: false,
      // 添加的分类数据
      addCatInfo: {
        // 将要添加分类的名称
        cat_name: '',
        // 父级分类的ID
        cat_pid: 0,
        // 分类层级,默认要添加的是1级分类
        cat_level: 0
      },
      // keyList 选择的父级分类数组
      keyList: [],
      // 商品父级分类数据
      cateList: [],
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 修改的分类数据
      modifyCatInfo: {}
    }
  },
  created() {
    this.getCatListData(this.queryInfo)
  },
  methods: {
    // 分类数据
    async getCatListData(queryInfo) {
      const { data, meta } = await getCatListData(queryInfo)
      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      console.log(data)
      this.total = data.total
      this.indexN = 1
      data.result.forEach(item => {
        item.index = data.pagenum * 5 + this.indexN++
      })
      this.tableData = data.result
    },
    // 父级分类数据列表
    async getListCatData() {
      const { data, meta } = await getListCatData()
      if (meta.status !== 200) return this.$message.error('获取父级分类列表失败')
      this.showAddDialog = true
      this.cateList = data
      console.log(data)
    },
    // 添加分类
    async addCatData(data) {
      const { meta } = await addCatData(data)
      if (meta.status !== 201) this.$message.error('添加分类失败')
      this.$message.success('添加分类成功')
      this.getCatListData(this.queryInfo)
    },
    // 修改
    modifyDialog() {},
    // 删除
    removeRole() {},
    // pageSize 每页条数 改变时会触发回调
    // 重新选择 每页显示的条数
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getCatListData(this.queryInfo)
    },
    // currentPage 当前页数改变时会触发回调
    // 跳转页面
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getCatListData(this.queryInfo)
    },
    // 关闭对话框 触发的回调
    closeDialog(ref) {
      // 数据重置
      this.$refs[ref].resetFields()
      this.addCatInfo = {}
    },
    // 级联选择框 改变触发的事件
    handleChange(data) {
      // 判断data 如果 data.length 大于 0 则选择了 父级分类
      if (data.length > 0) {
        // 父级分类的ID
        this.addCatInfo.cat_pid = data[data.length - 1]
        // 分类层级
        this.addCatInfo.cat_level = data.length
      } else {
        // 父级分类的ID
        this.addCatInfo.cat_pid = 0
        // 分类层级
        this.addCatInfo.cat_level = 0
      }
    },
    // 添加分类
    addData() {
      this.$refs.addCatDialog.validate(vali => {
        if (!vali) return this.$message.error('请按格式填写信息')
        this.showAddDialog = false
        this.addCatData(this.addCatInfo)
      })
    },
    // 移除分类
    deleteCatData(id) {
      this.$confirm('此操作将永久删除此分类, 是否继续?', '永久删除此分类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 点击确定
          deleteCatData(id).then(({ meta }) => {
            if (meta.status === 200) {
              this.$message.success('删除成功!')
              // 重新获取数据
              this.getCatListData(this.queryInfo)
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
    // 修改分类
    showModifyCatData(row) {
      this.showModifyDialog = true
      this.$set(this.modifyCatInfo, 'cat_name', row.cat_name)
      this.$set(this.modifyCatInfo, 'cat_id', row.cat_id)
    },
    async saveCatData() {
      this.showModifyDialog = false
      const { meta } = await modifyCatData(this.modifyCatInfo.cat_id, this.modifyCatInfo.cat_name)
      if (meta.status !== 200) return this.$message.error('修改失败')
      this.$message.success('修改成功')
      // 重新获取数据
      this.getCatListData(this.queryInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 20px;
}
.el-pagination {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>
