<template>
 <div class="head-view">
  <el-row class="header-top">
    <el-col :span="5">
      <dv-decoration-10 class="animation-line" :color="lineColor" />
      <a class="home" @click="goHome">
        <i class="el-icon-s-home"></i>
      </a>
    </el-col>
    <el-col :span="3" class="col">
      <dv-decoration-8 :color="lineColor" class="decoration8" />
    </el-col>
    <el-col :span="8" class="col-title">
      <!-- <el-row> -->
        <dv-decoration-11 :color="headerTitleColor" class="header-title">大数据可视化</dv-decoration-11>
      <!-- </el-row> -->
    </el-col>
    <el-col :span="3" class="col">
      <dv-decoration-8 :color="lineColor" :reverse="true" class="decoration8" />
    </el-col>
    <el-col :span="5">
      <dv-decoration-10 class="animation-line reverse" :color="lineColor" />
       <!-- 时间 引入了 animate 动画 -->
      <p class="time animate__animated animate__rubberBand ">{{time}}</p>
    </el-col>
    <el-row>
        <dv-decoration-6 :color="decoration6Color" class="decoration6" />
    </el-row>
  </el-row>
 </div>
</template>

<script>
// 工具类 日期格式化
import { dateFormat, getWeekDate } from '@/utiles/utiles'
export default {
  name: 'HeadView',
  mounted() {
    this.time = dateFormat('YYYY/mm/dd HH:MM:SS', new Date()) + ' ' + getWeekDate(new Date())
    this.timeClear = setInterval(() => {
      this.time = dateFormat('YYYY/mm/dd HH:MM:SS', new Date()) + ' ' + getWeekDate(new Date())
    }, 1000)
  },
  data() {
    return {
      // 时间
      time: '',
      // 判断是否关闭时间
      timeClear: '',
      // 头部文本边框颜色
      headerTitleColor: ['#6886BB', '#A07FEF'],
      // 头部线图与动态线的颜色
      lineColor: ['#A07FEF', 'transparent'],
      // 字体下方旋转图标颜色
      decoration6Color: ['#A07FEF', '#B9A4EB']
    }
  },
  beforeDestroy() {
    if (this.timeClear !== '') {
      // 关闭时间
      clearInterval(this.timeClear)
    }
  },
  methods: {
    // 回到首页
    goHome() {
      console.log('222222222')
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
.head-view{
  .header-top {
      height: 100%;
  width: 100%;
    margin-top: 10px;
  .col{
    height: 80%;
  }
  .col-title{
    height: 70%;
  }
  .header-title {
    width: 40%;
    height: 100%;
    color: #fff;
    text-align: center;
    margin: auto;
  }
  .animation-line {
    width: 100%;
    height: 5px;
  }
  .reverse{
    transform: rotate(180deg);
  }
  .decoration8 {
    width: 100%;
    height: 100%;
  }
  .time{
    text-align: center;
    color: #47DAE8;
  }
  .home{
    text-align: left;
    margin-left: 20px;
    color: #47DAE8;
    font-size: 30px;
    position: absolute;
    z-index: 9999;
    &:hover{
      cursor: pointer;
    }
  }
}
.decoration6{
    margin: auto;
    margin-top: 10px;
    width:20%;
    height:10px;
  }
}

</style>
