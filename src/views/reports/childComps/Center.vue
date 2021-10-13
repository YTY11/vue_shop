<template>
  <div class="center">
    <el-row>
      <!-- <dv-decoration-6 :color="decoration6Color" class="decoration6" /> -->
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Center',
  data() {
    return {
      // 字体下方旋转图标颜色
      decoration6Color: ['#A07FEF', '#B9A4EB']
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  height: 100%;
  width: 100%;
  .decoration6{
    margin: auto;
    margin-top: 10px;
    width:50%;
    height:10px;
  }
}
</style>
