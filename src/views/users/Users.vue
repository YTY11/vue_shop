<template>
  <el-card :body-style="{padding:'20px 10px'}">
    <div>
      <el-input
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select"
        clearable
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      input3: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.input-with-select{
  width: 300px;
}
</style>
