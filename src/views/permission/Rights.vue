<template>
  <el-card>
    <!-- 表格数据展示区域 -->
    <el-table :data="tableData" stripe style="width: 100%" border>
      <el-table-column type="index" :index="1" label="#"></el-table-column>
      <el-table-column prop="authName" label="权限名称" ></el-table-column>
      <el-table-column prop="path" label="路径" > </el-table-column>
      <el-table-column label="权限等级" min-width='100px'>
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level === '0' ">一级权限</el-tag>
          <el-tag type="success" v-else-if="scope.row.level === '1' ">二级权限</el-tag>
          <el-tag type="warning" v-else>三级权限</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
// 网络数据
import { getListRights } from '@/api/permission/rights'
export default {
  name: 'Rights',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getListRights()
  },
  methods: {
    // 获取权限列表数据
    async getListRights() {
      const { data, meta } = await getListRights()
      if (meta.status !== 200) return this.$message.error('权限列表获取失败')
      this.tableData = data
      console.log(data)
      this.$message.success('权限列表获取成功')
    }
  }
}
</script>
