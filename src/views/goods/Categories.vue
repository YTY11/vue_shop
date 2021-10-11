<template>
  <el-card>
    <!-- 添加区域 -->
    <el-button type="primary"  @click="dialogVisible = true">添加分类</el-button>
    <!-- 表格数据区域 -->
    <el-table  :data="tableData" row-key="cat_id" style="width: 100%" stripe border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">>
      <!-- 权限级别展开区域 -->
      <el-table-column type="index" label="#">
        <template slot-scope="scope">
          {{scope.row.cat_level === 0 ? conunt : ''}}
        </template>
      </el-table-column>
      <el-table-column prop="cat_name" label="分类名称" min-width="180px">
      </el-table-column>
      <el-table-column prop="index" label="是否有效" min-width="180px">
      </el-table-column>
      <el-table-column prop="index" label="排序" min-width="180px">
      </el-table-column>
      <el-table-column prop="index" label="操作" min-width="180px">
       <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="modifyDialog(scope.row)"
            >编辑</el-button
          >
          <el-button
            class="button-new-tag"
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="removeRole(scope.row.attr_id)"
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
  </el-card>
</template>

<script>
// 网络数据
import { getCatListData } from '@/api/goods/Categories'
export default {
  name: 'Categories',
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
      total: 0
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
      this.tableData = data.result
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
