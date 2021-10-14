<template>
  <div class="center">
    <div class="map" ref="chinaMap">
    </div>
    <div class="center-bottom">
      <el-row :gutter="20">
        <el-col :span="8">
          <dv-border-box-7 class="border-box-7" :color="['#35467E']"></dv-border-box-7>
        </el-col>
        <el-col :span="8">
          <dv-border-box-7 class="border-box-7" :color="['#35467E']"></dv-border-box-7>
        </el-col>
        <el-col :span="8">
          <dv-border-box-7 class="border-box-7" :color="['#35467E']"></dv-border-box-7>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <dv-border-box-7 class="border-box-7 box-top" :color="['#35467E']"></dv-border-box-7>
        </el-col>
        <el-col :span="8">
          <dv-border-box-7 class="border-box-7 box-top" :color="['#35467E']"></dv-border-box-7>
        </el-col>
        <el-col :span="8">
          <dv-border-box-7 class="border-box-7 box-top" :color="['#35467E']"></dv-border-box-7>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// 数据
import { citys, dataList } from '@/demoData/mapData'
import '@/utiles/china'
export default {
  name: 'Center',
  data() {
    return {
      // 中国地图数据
      chinaMapData: {
        // 鼠标指向时显示的信息
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)', // 设置背景颜色
          borderColor: 'rgba(0,0,0,0.8)', // 设置边框颜色
          trigger: 'axis',
          textStyle: {
            color: '#fff' // 设置文字颜色
          }
        },
        geo: {
          nameMap: {
            China: '中国'
          },
          map: 'china',
          label: {
            emphasis: {
              show: true // 鼠标指向时是否显示文本
            }
          },
          zoom: 1.2,
          itemStyle: {
            normal: {
              borderColor: 'rgba(255,209,163, .5)', // 区域的描边颜色
              areaColor: 'rgba(73,86,166,.1)', // 地图区域的颜色
              borderWidth: 0.5, // 区域边框宽度
              shadowBlur: 5, // 图形阴影的模糊大小
              shadowColor: 'rgba(107,91,237,.7)' // 阴影颜色
            },
            // 高亮状态下的多边形和标签样式
            emphasis: {
              color: '#F20F3F', // 背景色
              borderColor: '#E15CF8', // 描边颜色
              borderWidth: 1, // 描边颜色
              shadowBlur: 50 // 图形阴影的模糊大小
            }
          }
        },
        series: [
          {
            name: '地点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            // 坐标点的动态样式
            rippleEffect: {
              period: 1.5, // 涟漪特效的动画周期
              scale: 2.5, // 涟漪特效动画中波纹的最大缩放比例
              brushType: 'stroke' // 波纹的绘制方式，可选 'stroke' 和 'fill'
            },
            symbol: 'circle', // 标记 图形'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            // 鼠标指向圆点位置时的文字样式
            label: {
              emphasis: {
                show: true,
                position: 'right',
                formatter: '{b}'
              },
              textStyle: {
                color: 'red',
                fontSize: 20
              }
            },
            data: citys
          },
          { // 飞线样式及来往地点
            name: '线路',
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 2,
            zoom: 1,
            large: true,
            // 飞线的 样式
            effect: {
              show: true, // 是否运动
              constantSpeed: 30, // 运动速度
              symbol: 'triangle', // 特效图形的标记。'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
              symbolSize: 3, // 飞线的大小
              trailLength: 0 // 特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长
            },
            lineStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#44D2E0'
                    },
                    {
                      offset: 1,
                      color: '#DB67F5'
                    }
                  ],
                  false
                ),
                width: 1,
                opacity: 0.2,
                curveness: 0.1
              }
            },
            data: dataList
          }
        ]
      },
      // echarts
      myChart: ''
    }
  },
  beforeMount() {
    // 监听窗口变化
    window.addEventListener('resize', this.resizeEcharts)
  },
  beforeDestroy() {
    // 退出 销毁监听事件
    window.removeEventListener('resize', this.resizeEcharts)
  },
  mounted() {
    this.setChinaMap()
  },
  methods: {
    // 绘制中国地图
    setChinaMap() {
      this.myChart = this.$echarts.init(this.$refs.chinaMap)
      this.myChart.setOption(this.chinaMapData)
    },
    // 监听页面发生变化 地图重绘
    resizeEcharts() {
      this.myChart.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  height: calc(100% - 10px);
  width: 100%;
  .map{
    width: 100%;
    height: 70%;
  }
  .center-bottom{
    text-align: center;
    width: 98%;
    height: 30%;
    margin: auto;
    .el-row{
      margin: 0 !important;
      width: 100%;
      height: 43%;
      .el-col{
        height: 100%;
        .box-top{
          margin-top: calc(14% - 10px);
        }
      }
    }
  }
}
</style>
