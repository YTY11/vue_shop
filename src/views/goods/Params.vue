<template>
  <el-card>
    <el-alert title="注意: 只允许为第三级分类设置相关参数!" :closable="false" type="warning" show-icon>
  </el-alert>
  <!-- 级联选择框 -->
  <el-row>
    <el-col>
      <span>选择商品分类: </span>
      <el-cascader clearable v-model="goodsCatData" :options="cateList" :props="{ expandTrigger: device === 'desktop' ? 'hover' : 'click',...cateProps }"
  @change="handleChange"></el-cascader>
    </el-col>
  </el-row>
  <!-- 表格数据 -->
   <el-tabs v-model="activeName" @tab-click="activeTag">
    <el-tab-pane label="商品参数">
      <ParamsTable @addData="addData" name="添加参数" :catId="propsCatId" :tableData="manyTableData" :isDisabled="isDisabled"/>
    </el-tab-pane>
    <el-tab-pane label="商品属性">
      <ParamsTable @addData="addData" name="添加属性" :catId="propsCatId" :tableData="onlyTableData" :isDisabled="isDisabled"/>
    </el-tab-pane>
  </el-tabs>
  </el-card>
</template>

<script>
// 引入 lodash 简化js
import _ from 'lodash'
// 引入 table子组件
import ParamsTable from './childComps/ParamsTable'
// 网络数据
import { getCategoriesData, getGoodParamsData } from '@/api/goods/addGoods'
import { mapGetters } from 'vuex'
export default {
  name: 'Params',
  components: {
    ParamsTable
  },
  data() {
    return {
      // 选中的商品分类
      goodsCatData: [],
      // 选中的商品分类 最后一个id值 作用: 传给子组件 便于其操作
      propsCatId: '',
      // 商品分类数据
      cateList: [],
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 选中的tab
      activeName: '',
      // 商品参数 数据
      manyTableData: [],
      //  本地的attr_vals 解决商品参数 复选框点击消失问题
      localAttrCals: [],
      // 商品属性 数据
      onlyTableData: []
    }
  },
  created() {
    this.getCategoriesData()
  },
  computed: {
    ...mapGetters(['device']),
    // 判断级联选择框是否选择了数据
    isDisabled() {
      return this.goodsCatData.length <= 0
    }
  },
  methods: {
    // 获取商品分类级联选择框中的数据
    async getCategoriesData() {
      const { data, meta } = await getCategoriesData()
      if (meta.status !== 200) this.$message.error('商品分类数据获取失败')
      this.cateList = data
    },
    // 根据选择的商品分类获取商品参数数据 或 商品属性数据
    async getGoodParamsData(id, sel) {
      const name = sel === 'many' ? '参数' : '属性'
      const { data, meta } = await getGoodParamsData(id, sel)
      if (meta.status !== 200) return this.$message.error(`获取商品${name}失败`)
      if (sel === 'only') {
        data.forEach(item => {
          item.isShowAddIput = false
          // lodash uniq() 方法对数组去重
          item.attr_vals = _.uniq(item.attr_vals.split(' '))
        })
        this.onlyTableData = data
      } else if (sel === 'many') {
        this.localAttrCals = []
        data.forEach(item => {
          // lodash uniq() 方法对数组去重
          item.isShowAddIput = false
          item.attr_vals = _.uniq(item.attr_vals.split(' '))
          this.localAttrCals.push({ id: item.attr_id, attr_vals: item.attr_vals })
        })
        this.manyTableData = data
      }
    },
    // 商品分类选项改变时触发的回调
    handleChange(data) {
      const length = this.goodsCatData.length
      if (length <= 0) {
        this.manyTableData = []
        this.onlyTableData = []
        this.localAttrCals = []
        return
      }
      this.propsCatId = this.goodsCatData[length - 1].toString()
      this.getGoodParamsData(this.propsCatId, 'many')
      this.getGoodParamsData(this.propsCatId, 'only')
    },
    // 添加成功回调
    addData() {
      this.getGoodParamsData(this.propsCatId, 'many')
      this.getGoodParamsData(this.propsCatId, 'only')
    },
    // 点击tab触发函数
    activeTag() {}
  }
}
</script>

<style lang="scss" scoped>
.el-cascader{
  margin-top: 20px;
}
</style>
