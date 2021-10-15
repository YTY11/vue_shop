<template>
  <div class="left">
    <!-- echarts 折线图 -->
    <dv-border-box-12 class="one-border animate__animated  animate__lightSpeedInLeft animate__delay-1s">
      <p class="title">
        <i class="el-icon-s-marketing"></i>
        <span>今日流量态势</span>
      </p>
      <div ref="chartLine" class="chart-line"></div>
    </dv-border-box-12>
    <!-- dataV 滚动表格 -->
    <dv-border-box-13 class="two-border animate__animated  animate__lightSpeedInLeft animate__delay-1s">
      <p class="title">
        <i class="el-icon-user"></i>
        <span>用户数据状态</span>
      </p>
      <dv-scroll-board :config="tableData" class="scrollBoard"/>
    </dv-border-box-13>
  </div>
</template>

<script>
export default {
  name: 'Left',
  data() {
    return {
      // 左侧第一个echarts
      oneOptions: {
        title: {
          show: false
        },
        legend: {
          show: true,
          top: '15%',
          textStyle: {
            color: '#c0c9d2'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderColor: 'rgba(0,0,0,0.8)', // 设置边框颜色
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0, 255, 233,0)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(255, 255, 255,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 255, 233,0)'
                  }
                ],
                global: false
              }
            }
          },
          textStyle: {
            color: '#fff' // 设置文字颜色
          }
        },
        grid: {
          top: '25%',
          left: '13%',
          right: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          axisLine: {
            show: true
          },
          splitArea: {
            color: '#f00',
            lineStyle: {
              color: '#f00'
            }
          },
          axisLabel: {
            color: '#BCDCF0'
          },
          splitLine: {
            show: false
          },
          boundaryGap: false,
          data: ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00']
        },

        yAxis: {
          type: 'value',
          min: 0,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          axisLine: {
            show: true
          },
          axisLabel: {
            show: true,
            margin: 10,
            textStyle: {
              color: '#d1e6eb'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '出口流量',
            type: 'line',
            smooth: true, // 是否平滑
            lineStyle: {
              normal: {
                color: '#00b3f4',
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5
              }
            },
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#00b3f4'
              }
            },
            // 去除点标记
            symbolSize: 0,
            // 鼠标放上去还是要有颜色的
            itemStyle: {
              color: '#00b3f4'
            },
            // 设置渐变色
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(0,179,244,0.3)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(0,179,244,0)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0,179,244, 0.9)',
                shadowBlur: 20
              }
            },
            data: [200.5, 350.5, 150.12, 180.51, 258.61, 460.23]
          },
          {
            name: '入口流量',
            type: 'line',
            smooth: true, // 是否平滑
            // 阴影
            lineStyle: {
              normal: {
                color: '#00ca95',
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5
              }
            },
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#00ca95'
              }
            },
            // 去除点标记
            symbolSize: 0,
            itemStyle: {
              color: '#00ca95'
            },
            // 设置渐变色
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(0,202,149,0.3)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(0,202,149,0)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0,202,149, 0.9)',
                shadowBlur: 20
              }
            },
            data: [500.25, 305.15, 425.56, 200.8, 305.11, 200.54]
          }
        ]
      },
      // echarts
      myChart: '',
      // 滚动表格数据
      tableData: {
        // 表头
        header: ['用户', '时间', '状态'],
        // 数据
        data: [
          ['用户1', '08-11 10:00', '在线'],
          ['用户2', '08-05 15:33', '在线'],
          ['用户3', '08-07 10:00', '离线'],
          ['用户4', '07-11 08:00', '离线'],
          ['用户5', '05-28 05:25', '在线'],
          ['用户6', '08-05 10:00', '离线'],
          ['用户7', '08-10 10:00', '在线'],
          ['用户8', '08-11 11:30', '离线'],
          ['用户9', '08-11 12:00', '在线'],
          ['用户10', '08-11 10:00', '离线'],
          ['用户11', '08-11 10:00', '离线'],
          ['用户12', '08-11 10:00', '离线'],
          ['用户13', '08-11 10:00', '离线'],
          ['用户14', '08-11 10:00', '离线'],
          ['用户15', '08-11 10:00', '离线'],
          ['用户16', '08-11 10:00', '离线'],
          ['用户17', '08-11 10:00', '离线']
        ],
        // 是否有索引
        index: true,
        // 每列的宽度
        columnWidth: [50, 80, 150, 80],
        // 文字方向
        align: ['center'],
        // 样式
        headerBGC: '#443DC5',
        oddRowBGC: '#09184F',
        evenRowBGC: '#102984',
        // 显示行数
        rowNum: 10
      }
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
    this.setOneChart()
  },
  methods: {
    setOneChart() {
      this.myChart = this.$echarts.init(this.$refs.chartLine)
      this.myChart.setOption(this.oneOptions)
    },
    // 监听页面变化 ecahrts 重绘
    resizeEcharts() {
      this.myChart.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
.left {
  height: 100%;
  width: 100%;
  .title {
    font-size: 12px;
    color: #47dae8;
    margin: 13px 0 20px 20px;
    position: absolute;
    span {
      margin-left: 5px;
    }
  }
  .one-border {
    height: 35%;
  }
  .chart-line {
    height: 100%;
    width: 100%;
  }
  .two-border {
    height: calc(65% - 10px);
  }
  .scrollBoard{
    width: calc(100% - 40px);
    height: calc(100% - 60px);
    position: absolute;
    top: 51%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
