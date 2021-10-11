<template>
  <el-card>
    <!-- 头部提示信息条 -->
    <el-alert title="添加商品信息" type="info" center show-icon :closable="false"> </el-alert>
    <!-- 步骤条 -->
    <el-steps :active="stepNumber" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <!-- 添加商品的表单区域 -->
    <el-form label-position="top" ref="addForm" :model="addForm" :rules="addFormRules">
      <!-- 侧边标签 -->
      <el-tabs tab-position="left" :value="stepNumber+''" :before-leave="beforeLeave" @tab-click="tabClick">
        <el-tab-pane label="基本信息">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="addForm.goods_name" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model="addForm.goods_price" type="number" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight" >
            <el-input v-model="addForm.goods_weight" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input v-model="addForm.goods_number" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="goods_cat">
            <!-- 级联选择框 -->
            <el-cascader v-model="addForm.goods_cat" :options="cateList" :props="{ expandTrigger: 'hover',...cateProps }"
            @change="handleChange"></el-cascader>
          </el-form-item>
          <el-button type="primary" size="small" @click="addNext">下一步</el-button>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <el-alert class="alert-bottom" v-if="manyTableData.length <= 0" title="没有找到次此分类下的商品参数" type="warning" center show-icon :closable="false"></el-alert>
          <el-form-item :label="index + 1 + '. '+ item.attr_name" v-for="(item, index) in manyTableData" :key="item.attr_id">
            <!-- 复选框区域 -->
            <el-checkbox-group v-model="localAttrCals[index].attr_vals">
              <el-checkbox :label="cb" v-show="cb !== ''" v-for="(cb, i) in item.attr_vals" :key="i" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-button type="primary" size="small" @click="addNext">下一步</el-button>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-alert class="alert-bottom" v-if="onlyTableData.length <= 0" title="没有找到次此分类下的商品属性" type="warning" center show-icon :closable="false"></el-alert>
           <el-form-item :label="index + 1 + '. '+ item.attr_name" v-for="(item, index) in onlyTableData" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
          <el-button type="primary" size="small" @click="addNext">下一步</el-button>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload
            list-type="picture-card"
            :action="uploadURL"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            :headers="headersObj">
            <i class="el-icon-upload"></i>
            <span>上传图片</span>
          </el-upload>
          <el-button class="button-top" type="primary" size="small" @click="addNext">下一步</el-button>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <!-- 富文本插件 -->
          <quill-editor v-model="addForm.goods_introduce"></quill-editor>
          <el-button class="button-top" type="primary" size="small" @click="submitClick">提交</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
// 引入 lodash 简化js
import _ from 'lodash'
// 引入商品信息校验规则
import { goodsAddFormRulesMixin } from '@/mixin/FormRules'
// 网络数据
import { getCategoriesData, getGoodParamsData, addGoods } from '@/api/goods/addGoods'
export default {
  name: 'AddGoods',
  mixins: [goodsAddFormRulesMixin],
  data() {
    return {
      // 添加的商品信息
      addForm: {
        // 商品名称
        goods_name: '',
        // 商品价格
        goods_price: 0.0,
        // 商品重量
        goods_weight: 0.0,
        // 商品数量
        goods_number: 0,
        // 商品分类
        goods_cat: '',
        // 图片数组
        pics: []
      },
      // 商品分类数据
      cateList: [],
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 步骤条 进度
      stepNumber: 0,
      // 商品参数 数据
      manyTableData: [],
      //  本地的attr_vals 解决商品参数 复选框点击消失问题
      localAttrCals: [],
      // 商品属性 数据
      onlyTableData: [],
      // 商品的详情描述
      goods_introduce: '',
      attrs: [],
      // 图片临时存储
      fileList: [],
      // 图片上传的URL地址
      uploadURL: 'https://lianghj.top:8888/api/private/v1/upload',
      // 预览图片的地址
      dialogImageUrl: '',
      // 预览图片弹框的 状态
      dialogVisible: false
    }
  },
  created() {
    this.getCategoriesData()
  },
  computed: {
    // 图片上传头部
    headersObj() {
      return {
        Authorization: window.sessionStorage.getItem('VUE_SHOP_TOKEN')
      }
    }
  },
  methods: {
    // 商品分类数据
    async getCategoriesData() {
      const { data, meta } = await getCategoriesData()
      if (meta.status !== 200) return this.$message.error('商品分类数据获取失败')
      this.cateList = data
    },
    // 根据选择的商品分类获取商品参数数据 或 商品属性数据
    async getGoodParamsData(id, sel) {
      const { data, meta } = await getGoodParamsData(id, sel)
      if (meta.status !== 200) return this.$message.error('获取商品参数失败')
      if (sel === 'only') {
        this.onlyTableData = data
      } else if (sel === 'many') {
        this.localAttrCals = []
        data.forEach(item => {
          // lodash uniq() 方法对数组去重
          item.attr_vals = _.uniq(item.attr_vals.split(' '))
          this.localAttrCals.push({ id: item.attr_id, attr_vals: item.attr_vals })
        })
        this.manyTableData = data
      }
    },
    // 级联选择框 改变触发的事件
    handleChange(value) {
      // 根据选择的商品分类获取商品参数数据
      this.getGoodParamsData(this.addForm.goods_cat[this.addForm.goods_cat.length - 1], 'many')
      // 根据选择的商品分类获取商品属性数据
      this.getGoodParamsData(this.addForm.goods_cat[this.addForm.goods_cat.length - 1], 'only')
    },
    // 商品添加的下一步
    addNext() {
      const isNext = this.addGoodsFormRules()
      if (!isNext) return this.$message.error('请按格式将信息填写完整')
      const number = this.stepNumber + 1
      this.beforeLeave(number, this.stepNumber, isNext)
    },
    // 判断商品信息是否填写及格式是否正确
    addGoodsFormRules() {
      let isNext = false
      this.$refs.addForm.validate(vali => {
        isNext = vali
      })
      return isNext
    },
    /**
     * msg:侧边标签 切换之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。
     * activeName: 点击的标签
     * oldActiveName： 原来的标签
     * isNext： 是否允许切换
    **/
    beforeLeave(activeName, oldActiveName, isNext) {
      if (oldActiveName !== undefined) {
        // 当点击下一步时 判断商品信息及格式是否填写正确
        if (isNext !== undefined && !isNext) return false
        // 当点击 侧边标签栏时 判断商品信息及格式是否填写正确
        if (isNext === undefined && !this.addGoodsFormRules()) return false
        // 设置 步骤条及侧边栏要在的位置 使其保持同步
        this.stepNumber = parseInt(activeName)
      }
    },
    // 点击标签触发的事件
    tabClick() {
      if (!this.addGoodsFormRules()) return this.$message.error('请按格式将信息填写完整')
    },
    // 移除图片
    handleRemove(file) {
      const { response: data } = file
      // 1. 获取将要删除的图片的临时路径
      const filePath = data.data.tmp_path
      // 2. 从 pics 数组中找到这个图片的对应的索引值
      const index = this.addForm.pics.findIndex(item => item.pic === filePath)
      // 3. 调用数组的splice方法,把图片信息对象,从pics数组中移除
      this.addForm.pics.splice(index, 1)
    },
    // 点击文件列表中已上传的文件时的钩子 实现预览图片
    handlePreview(file) {
      this.dialogVisible = true
      this.dialogImageUrl = file.url
    },
    // 图片上传成功回调
    handleSuccess(file) {
      const { data, meta } = file
      if (meta.status === 200) {
        this.$message.success('上传成功')
        // 1. 拼接得到一个图片信息对象
        const picInfo = { pic: data.tmp_path }
        // 2. 将图片信息对象,push到pics数组中
        this.addForm.pics.push(picInfo)
      } else {
        this.$message.error('上传失败')
      }
    },
    // 提交
    async submitClick() {
      if (!this.addGoodsFormRules()) return this.$message.error('请按格式将信息填写完整')
      // 对添加商品的信息 进行格式化处理
      // 使用 Lodash 的cloneDeep 实现数据的深拷贝
      const formData = _.cloneDeep(this.addForm)
      // 将商品分类数组 使用 ',' 分割 转成字符串
      formData.goods_cat = formData.goods_cat.join(',')
      // 处理商品参数
      this.addForm.attrs = []
      this.localAttrCals.forEach(item => {
        const newInfo = { attr_id: item.id, attr_vals: item.attr_vals }
        this.addForm.attrs.push(newInfo)
      })
      // 处理商品属性
      this.onlyTableData.forEach(item => {
        const newInfo = { attr_id: item.attr_id, attr_vals: item.attr_vals }
        this.addForm.attrs.push(newInfo)
      })
      formData.attrs = this.addForm.attrs
      // 提交商品
      const { meta } = await addGoods(formData)
      if (meta.status !== 201) return this.$message.error('添加商品失败')
      this.$message.success('添加商品成功')
      // 添加成功后返回商品列表页
      this.$router.push('/goods')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-steps{
  margin-top: 20px;
}
.el-tabs{
  margin-top: 20px;
}
.button-top{
  margin-top: 20px;
}
.alert-bottom{
  margin-bottom: 20px;
}
</style>
