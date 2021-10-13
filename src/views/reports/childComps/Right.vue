<template>
  <div class="Right">
    <el-row>
      <el-row class="one">
        <el-col :span="12">
          <p class="title">
            <i class="el-icon-connection"></i>
            <span>用户数据状态</span>
          </p>
          <div></div>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Right'
}
</script>

<style lang="scss" scoped>
.Right{
  width: 100%;
  height: 100%;
  .title {
    font-size: 12px;
    color: #47dae8;
    margin: 13px 0 20px 20px;
    position: absolute;
    span {
      margin-left: 5px;
    }
  }
  .one{
    width: 100%;
    height: 20%;
  }

}
</style>
