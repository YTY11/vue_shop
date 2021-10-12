<template>
  <el-card>
    <!-- 搜索区域 -->
    <el-row :gutter="10">
      <el-col :xs="14" :sm="10" :lg="8">
      <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            class="input-with-select"
            clearable
            @change="getListOrders(queryInfo)"
            @clear="getListOrders(queryInfo)"
          >
        <el-button slot="append" icon="el-icon-search" @click="getListOrders(queryInfo)"></el-button>
      </el-input>
      </el-col>
    </el-row>
    <!-- 表格数据区域 -->
    <el-table :data="orderList" stripe style="width: 100%" border>
      <el-table-column type="index" :index="conunt" label="#">
      </el-table-column>
      <el-table-column prop="order_number" label="订单编号" min-width="200">
      </el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="80"> </el-table-column>
      <el-table-column prop="mobile" label="是否支付" width="80">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.pay_status === '0'">未付款</el-tag>
          <el-tag type="success" v-else>已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="80">
      </el-table-column>
      <el-table-column prop="mg_state" label="下单时间" min-width="180">
        <template slot-scope="scope">
          <span>{{scope.row.create_time | filterDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template>
          <el-tooltip
            class="item"
            effect="dark"
            :enterable="false"
            content="修改地址"
            placement="top-start"
          >
            <el-button
              circle
              size="small "
              type="primary"
              icon="el-icon-edit"
              @click="showModifyDialog = true"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            :enterable="false"
            content="物流状态"
            placement="top-start"
          >
            <el-button
              circle
              size="small "
              type="success"
              icon="el-icon-map-location"
              @click="getLogistics"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
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
    <!-- 操作 修改地址对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="showModifyDialog"
      width="450px"
      @close="closeDialog('modifyDialog')"
    >
      <el-form
        :model="modifyInfo"
        ref="modifyDialog"
        label-width="100px"
        :rules="modifyFormRules"
      >
        <el-form-item prop="address1" label="省市区/县">
           <el-cascader
              width="100%"
              v-model="modifyInfo.address1"
              :options="citydata"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item prop="address2" label="详细地址">
          <el-input class="handel-input" placeholder="请输入内容" v-model="modifyInfo.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="showModifyDialog = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="showModifyDialog = false">确 定</el-button>
      </span>
    </el-dialog>
     <!-- 操作 物流状态对话框 -->
      <el-dialog
      title="物流状态"
      :visible.sync="showLogisticsDialog"
      width="450px"
      @close="closeDialog"
    >
      <el-timeline :reverse="false">
        <el-timeline-item
          v-for="(activity, index) in logisticsDate"
          :key="index"
          :timestamp="activity.time">
          {{activity.context}}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </el-card>
</template>

<script>
// 网络数据
import { getListOrders, getLogistics } from '@/api/orders/orders'
// 工具类 省会数据
import citydata from '@/utiles/citydata'
// 工具类 格式化时间
import { dateFormat } from '@/utiles/utiles'
import { modifyOrdersRules } from '@/mixin/FormRules'
export default {
  name: 'Orders',
  computed: {
    // 计算序列号
    conunt() {
      return (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize + 1
    },
    // 判断模式 移动 OR PC
    device() {
      return this.$store.state.app.device
    },
    // 城市级联数据
    citydata() {
      return citydata
    }
  },
  filters: {
    // 过滤 时间格式化
    filterDate(time) {
      return dateFormat('YYYY-mm-dd HH:MM:SS', new Date(time * 1000))
    }
  },
  mixins: [modifyOrdersRules],
  data() {
    return {
      // 操作 修改对话框 状态
      showModifyDialog: false,
      // 操作 物流对话框 状态
      showLogisticsDialog: false,
      // 获取订单列表的参数对象
      queryInfo: {
        // 搜索值
        query: '',
        // 当前页
        pagenum: 1,
        // 每页的条数
        pagesize: 5
      },
      // 订单列表的数据
      orderList: [],
      // 订单的总数量
      total: 0,
      // 修改的数据
      modifyInfo: {},
      // 物流数据
      logisticsDate: {}

    }
  },
  created() {
    this.getListOrders(this.queryInfo)
  },
  methods: {
    // 获取订单列表数据
    async getListOrders(queryInfo) {
      const { data, meta } = await getListOrders(queryInfo)
      if (meta.status !== 200) return this.$message.error('获取订单列表失败')
      this.orderList = data.goods
      this.total = data.total
    },
    // 获取物流数据
    async getLogistics() {
      const { data, meta } = await getLogistics()
      if (meta.status !== 200) return this.$message.error('获取物流数据失败')
      this.logisticsDate = data
      this.showLogisticsDialog = true
    },
    // pageSize 每页条数 改变时会触发回调
    // 重新选择 每页显示的条数
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getListOrders(this.queryInfo)
    },
    // currentPage 当前页数改变时会触发回调
    // 跳转页面
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getListOrders(this.queryInfo)
    },
    // 关闭对话框 回调
    closeDialog(modifyDialog) {
      // 数据重置
      if (modifyDialog) {
        this.$refs[modifyDialog].resetFields()
      }
    },
    // 级联选择框 数据改变触发
    handleChange(data) {
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
.el-cascader{
  width: 100%;
}
</style>
