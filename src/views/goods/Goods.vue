<template>
  <el-card>
    <!-- 搜索添加用戶区域 -->
    <el-row :gutter="20">
      <el-col :xs="14" :sm="10" :lg="8">
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.query"
          class="input-with-select"
          clearable
          @change="getGoodsList(queryInfo)"
          @clear="getGoodsList(queryInfo)"
        >
          <el-button slot="append" icon="el-icon-search" @click="getGoodsList(queryInfo)"></el-button>
        </el-input>
      </el-col>
      <el-col :xs="10" :sm="4" :lg="4">
        <el-button class="add-user" type="primary" @click="addGoods">商品添加</el-button>
      </el-col>
    </el-row>
    <!-- 表格数据展示区域 -->
    <el-table :data="tableData" stripe style="width: 100%" border>
      <el-table-column type="index" :index="conunt" label="#">
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" min-width="300">
      </el-table-column>
      <el-table-column prop="goods_price" label="价格(元)" width="150"> </el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="150">
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.upd_time | dateFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
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
              @click="removeGoodsById(scope.row.goods_id)"
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
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 15, 20]"
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
import { getGoodsList, removeGoodsById } from '@/api/goods/goods'
// 工具方法 时间格式化
import { dateFormat } from '@/utiles/utiles'
export default {
  name: 'Goods',
  data() {
    return {
      // 商品列表数据
      tableData: [],
      // 获取商品列表的参数对象
      queryInfo: {
        // 搜索值
        query: '',
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
    this.getGoodsList(this.queryInfo)
  },
  filters: {
    // 过滤 时间格式化
    dateFormat(date) {
      return dateFormat('YYYY-mm-dd HH:MM:SS', new Date(date * 1000))
    }
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
    // 获取商品列表数据
    async getGoodsList(queryInfo) {
      const { data, meta } = await getGoodsList(queryInfo)
      if (meta.status !== 200) return this.$message.error('商品列表获取失败')
      this.tableData = data.goods // 商品列表
      this.total = data.total // 总条数
      this.$message.success('商品列表获取成功')
    },
    // 修改商品信息
    modifyDialog() {
      this.$message.info('功能开发中...')
    },
    // 根据ID 删除商品
    async removeGoodsById(id) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '永久删除该商品', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 点击确定
          removeGoodsById(id).then(({ meta }) => {
            if (meta.status === 200) {
              this.$message.success('删除成功!')
              // 重新获取数据
              this.getGoodsList(this.queryInfo)
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
    // pageSize 每页条数 改变时会触发回调
    // 重新选择 每页显示的条数
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getGoodsList(this.queryInfo)
    },
    // currentPage 当前页数改变时会触发回调
    // 跳转页面
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getGoodsList(this.queryInfo)
    },
    // 跳转添加商品页面
    addGoods() {
      this.$router.push('/goods/addGoods')
    }
  }
}
</script>
<style lang="scss" scoped>
.el-table{
  margin-top: 20px;
}
.el-pagination{
  margin-top: 20px;
  text-align: center;
}
</style>
