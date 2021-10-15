<template>
  <div ref="earth" class="earth"></div>
</template>

<script>
// 移入测试 3D 地球数据
import earthData3D from '@/demoData/earthData3D'
// 图片资源
import bg from '@/assets/img/huanjing.jpg'
import map from '@/assets/img/map.jpg'
export default {
  name: 'Earth',
  beforeMount() {
    // 监听窗口变化
    window.addEventListener('resize', this.resizeEcharts)
  },
  beforeDestroy() {
    // 退出 销毁监听事件
    window.removeEventListener('resize', this.resizeEcharts)
  },
  data() {
    return {
      // 存储charts
      myCharts: '',
      // 3D 旋转地球图 数据
      earth3D: {
        backgroundColor: '#000',
        globe: {
          environment: bg,
          baseTexture: map,
          // heightTexture: huiMap,

          light: {
            ambient: {
              intensity: 1
            },
            main: {
              intensity: 1
            }
          },
          shading: 'realistic', // 着色效果，真实感渲染
          realisticMaterial: {
            // 真实感渲染配置
            roughness: 0.5 // 材质的粗糙度
          },
          // postEffect: { //后处理特效配置
          //   enable: true
          // },

          displacementScale: 0.04,
          viewControl: {
            autoRotate: true
          }
        },
        series: {
          type: 'lines3D',
          effect: {
            show: true,
            trailWidth: 2,
            trailLength: 0.15,
            trailOpacity: 1,
            trailColor: 'rgb(30, 30, 60)'
          },
          coordinateSystem: 'globe',

          blendMode: 'lighter',

          lineStyle: {
            width: 1,
            color: 'rgb(50, 50, 150)',
            opacity: 0.1
          },
          viewControl: {
            // 控制地球是否自转
            autoRotateSpeed: 5,
            autoRotate: true,
            distance: 400, // 与视角的距离，值越大，图离视角越远，图越小
            alpha: 20, // 绕x轴旋转的角度（上下旋转），增大，视角顺时针增大（向上）
            beta: 20 // 绕y轴旋转的角度（左右旋转），增大，视角逆时针增大（向右）
          },
          data: earthData3D
        }
      }
    }
  },
  mounted() {
    this.setEarth3DChars()
  },
  methods: {
    // 设置3D 旋转地球
    setEarth3DChars() {
      this.myCharts = this.$echarts.init(this.$refs.earth)
      // 新增的在最后所以可用(length - 1) 来获取
      this.myCharts.setOption(this.earth3D)
    },
    resizeEcharts() {
      // this.$router.go()// 刷新页面
      this.myCharts.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
.earth{
      width: 100%;
      height: 100%;
    }
</style>
