<template>
  <div>
    <el-button type="primary" size="small" :disabled="isDisabled" @click="dialogVisible = true, msg = '添加'">{{name}}</el-button>
     <!-- 表格数据区域 -->
    <el-table :data="childTableData" style="width: 100%" stripe border>
      <!-- 权限级别展开区域 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-tag
          :key="tag.attr_id"
          v-for="(tag, i) in scope.row.attr_vals"
          closable
          @close="handleClose(scope.row, i)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="scope.row.isShowAddIput"
          v-model="newTagName"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm(scope.row)"
          @blur="handleInputConfirm(scope.row)"
        >
        </el-input>
        <el-button v-else size="small" @click="activeAddTag(scope.row)">+ New Tag</el-button>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" :index="1"> </el-table-column>
      <el-table-column label="参数名称" prop="attr_name" min-width="200">
      </el-table-column>
      <el-table-column label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="modifyDialog(scope.row), msg = '修改'"
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
    <!-- 添加 修改 对话框 -->
    <el-dialog
      :title="name"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="beforeClose">
       <el-form
        :model="newData"
        ref="formRules"
        label-width="110px"
        :rules="formRules"
      >
        <el-form-item prop="attr_name" :label="name === '添加参数' ? '商品参数名称' : '商品属性名称'">
          <el-input placeholder="请输入内容" v-model="newData.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false, newData = {}">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 网络数据
import { setTag, addGoodsParamsAndProp, deleteGoodsParamsAndProp, modifyGoodsParamsAndProp, getInfoData } from '@/api/goods/params'
import { paramsFormRulesMixin } from '@/mixin/FormRules'
export default {
  name: 'ParamsTable',
  props: {
    // 按钮名字
    name: {
      type: String,
      default: '添加参数'
    },
    // 是否禁止点击
    isDisabled: {
      type: Boolean,
      default: true
    },
    // 表格数据
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    // 商品分类最后一个id值
    catId: {
      type: String,
      default: ''
    }
  },
  mixins: [paramsFormRulesMixin],
  data() {
    return {
      // 表格数据变量更换 解决子组件不能直接修改 props数据问题
      childTableData: [],
      // 是否显示新增tag 的input框
      isShowAddIput: false,
      // 新增tag的 名字
      newTagName: '',
      // 修改 添加对话框 状态
      dialogVisible: false,
      // 新增或修改的数据
      newData: {},
      // 信息
      msg: ''
    }
  },
  watch: {
    // 监听tableData变化
    tableData() {
      this.childTableData = this.tableData
    }
  },
  methods: {
    // 新增 删除 tag子数据
    async setTag(catId, row, msg) {
      const { meta } = await setTag(catId, row)
      if (meta.status !== 200) this.$message.error(msg + '失败')
      this.$message.success(msg + '成功')
    },
    // 移除tag方法
    handleClose(row, index) {
      row.attr_vals.splice(index, 1)
      this.setTag(this.catId, row, '移除')
    },
    // 点击新增 tag
    activeAddTag(row) {
      row.isShowAddIput = true
      //  $nextTick页面渲染完成后 再执行 防止页面 元素 还没加载 就执行造成的 错误
      this.$nextTick(() => {
        // 光标自动聚焦到 显示的input框
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 新增的input失去焦点时 或 按下回车时 触发
    handleInputConfirm(row) {
      // 去除空格
      const newTagName = this.newTagName.trim()
      // 如果新增的 tag有名字 就进行添加
      if (newTagName) {
        row.attr_vals.push(newTagName)
        this.setTag(this.catId, row, '添加')
      }
      // 数据重置
      row.isShowAddIput = false
      this.newTagName = ''
    },
    // 对话框关闭时调用的回调
    beforeClose() {
      this.dialogVisible = false
      this.$refs.formRules.resetFields()
      this.newData = {}
    },
    // 提交数据  添加  商品参数 和 属性
    saveData() {
      this.$refs.formRules.validate(async vali => {
        if (!vali) return this.$message.error('请按格式填写信息')
        if (this.msg === '添加') {
          const { meta } = await addGoodsParamsAndProp(this.catId, this.newData, this.childTableData[0].attr_sel)
          if (meta.status !== 201) return this.$message.error(this.msg + '失败')
        } else if (this.msg === '修改') {
          const { meta } = await modifyGoodsParamsAndProp(this.catId, this.newData.attr_id, this.newData.attr_name, this.childTableData[0].attr_sel)
          if (meta.status !== 200) return this.$message.error(this.msg + '失败')
        }
        this.$message.success(this.msg + '成功')
        this.dialogVisible = false
        this.$emit('addData')
      })
    },
    // 删除 商品参数 和 属性
    removeRole(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '永久删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 点击确定
          deleteGoodsParamsAndProp(this.catId, id).then(({ meta }) => {
            if (meta.status === 200) {
              this.$message.success('删除成功!')
              // 重新获取数据
              this.$emit('addData')
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
    // 修改 商品参数 和 属性
    async modifyDialog(row) {
      const { meta } = await getInfoData(this.catId, row.attr_id, row.attr_sel)
      if (meta.status !== 200) {
        this.$emit('addData')
        return this.$message.error('获取数据失败')
      }
      this.dialogVisible = true
      // 使用 $set() 方法时添加的数据为响应式的
      // this.newData: 对象, attr_id: 新增的键, row.attr_id: 新增键对应的值
      this.$set(this.newData, 'attr_id', row.attr_id)
      this.$set(this.newData, 'attr_name', row.attr_name)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button{
  margin-bottom: 20px;
}
.el-tag{
  margin-right: 10px;
  margin-bottom: 10px;
}
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
.input-new-tag {
    width: 90px;
  }
</style>
