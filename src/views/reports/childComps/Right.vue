<template>
    <el-row class="Right">
      <!-- 雷达 3D地球 -->
      <el-row class="one animate__animated  animate__lightSpeedInRight animate__delay-1s ">
        <el-col :span="12">
          <p class="title">
            <i class="el-icon-connection"></i>
            <span>用户数据状态</span>
          </p>
          <div ref="leiDaChars" class="lei-da"></div>
        </el-col>
        <el-col :span="12">
          <Earth/>
        </el-col>
      </el-row>
      <!-- 平均地区访问排布 胶囊图 -->
      <el-row class="two animate__animated  animate__lightSpeedInRight animate__delay-1s">
        <p class="title two-title">
          <i class="el-icon-s-operation"></i>
          <span>平均地区访问排布</span>
        </p>
        <dv-capsule-chart :config="areaData" class="capsuleChart" />
      </el-row>
      <!-- 环形图与水纹图 -->
      <el-row class="three animate__animated  animate__lightSpeedInRight animate__delay-1s">
        <dv-border-box-13 class="border-box-13">
          <el-row class="round">
            <el-col :span="8">
              <div ref="round1" class="round-size"></div>
              <div class="text">服务质量</div>
            </el-col>
            <el-col :span="8">
              <div ref="round2" class="round-size"></div>
              <div class="text">交互体验</div>
            </el-col>
            <el-col :span="8">
              <div ref="round3" class="round-size"></div>
              <div class="text">安全防护</div>
            </el-col>
          </el-row>
          <el-row class="water">
            <dv-water-level-pond
              class="water-level-pond"
              :config="waterData"
              :color="['#C194D9']"
              :key="key"
            />
          </el-row>
        </dv-border-box-13>
      </el-row>
    </el-row>
</template>

<script>
// 3D 转转地球
import Earth from './Earth.vue'
export default {
  name: 'Right',
  components: {
    Earth
  },
  data() {
    return {
      // 雷达echarts 图数据
      leiDaCharsData: {
        // 鼠标指示时的提示信息
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderColor: 'rgba(0,0,0,0.8)', // 设置边框颜色
          trigger: 'axis',
          zIndex: 10000,
          textStyle: {
            color: '#fff' // 设置文字颜色
          },
          confine: true
        },
        radar: [
          {
            // 显示的数据
            indicator: [
              { text: '音乐', max: 100 },
              { text: '书籍', max: 100 },
              { text: '游戏', max: 100 },
              { text: '新闻', max: 100 },
              { text: '运动', max: 100 },
              { text: '家居', max: 100 }
            ],
            // 图形大小
            radius: '45%',
            splitLine: {
              // 网格边框颜色
              lineStyle: {
                color: 'rgba(68, 61, 167, 0.5)'
              }
            },
            // 背景色是否显示
            splitArea: {
              show: false
            },
            axisLine: {
              // 去除中心线
              show: false,
              lineStyle: {
                color: '#A07FEF' // 坐标轴刻度文字的样式
              }
            }
          }
        ],
        series: [
          {
            // 类型
            type: 'radar',
            // 与鼠标指示提示样式对应
            tooltip: {
              trigger: 'item'
            },
            // 数据
            data: [
              {
                value: [95, 73, 85, 80, 30, 50],
                name: '访问内容'
              }
            ],
            symbol: 'none', // 去掉图表中各个图区域的边框线拐点
            // 雷达区域样式
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#A07FEF', // 图表中各个图区域的边框线颜色
                  opacity: 0.5, // 透明度
                  width: 1 // 边框宽度
                }
              }
            },
            areaStyle: {
              color: '#A07FEF',
              opacity: 0.5
            }
          }
        ]
      },
      // 存储charts
      myCharts: [],
      // 平均地区排布数据
      areaData: {
        data: [
          {
            name: '郑州',
            value: 167
          },
          {
            name: '周口',
            value: 123
          },
          {
            name: '洛阳',
            value: 98
          },
          {
            name: '商丘',
            value: 75
          },
          {
            name: '安阳',
            value: 66
          }
        ],
        colors: ['#429DDD', '#96bfff', '#75D5DE', '#DB67F5', '#F5E667'],
        unit: '单位(人)',
        showValue: true
      },
      // 水纹图数据
      waterData: {
        data: [66, 45],
        colors: ['#C194D9'],
        shape: 'roundRect'
      },
      // 圆环图数据
      roundChartsData1: {
        // 圆环中心显示的文字
        title: {
          text: '90%',
          left: '45%',
          top: '45%',
          textAlign: 'center',
          textStyle: {
            fontSize: '16',
            fontWeight: '500',
            color: '#909dff',
            textAlign: 'center'
          }
        },
        series: [
          {
            type: 'pie', // 类型
            startAngle: 1, // 圆环开始绘制的位置
            radius: ['70%', '60%'], // 大小设置
            center: ['50%', '55%'], // 在画布的位置
            data: [
              {
                value: 90,
                itemStyle: {
                  // 配置圆环渐变色
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: '#5a8bfa'
                      },
                      {
                        offset: 1,
                        color: '#831bdb'
                      }
                    ]),
                    shadowColor: 'rgba(175,143,230,.5)'
                  }
                },
                // 是否显示圆环的文本
                label: {
                  show: false
                }
              },
              {
                value: 10,
                // 是否显示圆环的文本
                label: {
                  show: false
                },
                itemStyle: {
                  color: 'rgba(79,76,192, 0.3)'
                }
              }
            ]
          }
        ]
      },
      // 圆环图数据
      roundChartsData2: {
        // 圆环中心显示的文字
        title: {
          text: '85%',
          left: '45%',
          top: '45%',
          textAlign: 'center',
          textStyle: {
            fontSize: '16',
            fontWeight: '500',
            color: '#909dff',
            textAlign: 'center'
          }
        },
        series: [
          {
            type: 'pie', // 类型
            startAngle: 1, // 圆环开始绘制的位置
            radius: ['70%', '60%'], // 大小设置
            center: ['50%', '55%'], // 在画布的位置
            data: [
              {
                value: 85,
                itemStyle: {
                  // 配置圆环渐变色
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: '#5a8bfa'
                      },
                      {
                        offset: 1,
                        color: '#831bdb'
                      }
                    ]),
                    shadowColor: 'rgba(175,143,230,.5)'
                  }
                },
                // 是否显示圆环的文本
                label: {
                  show: false
                }
              },
              {
                value: 15,
                // 是否显示圆环的文本
                label: {
                  show: false
                },
                itemStyle: {
                  color: 'rgba(79,76,192, 0.3)'
                }
              }
            ]
          }
        ]
      },
      // 圆环图数据
      roundChartsData3: {
        // 圆环中心显示的文字
        title: {
          text: '95%',
          left: '45%',
          top: '45%',
          textAlign: 'center',
          textStyle: {
            fontSize: '16',
            fontWeight: '500',
            color: '#909dff',
            textAlign: 'center'
          }
        },
        series: [
          {
            type: 'pie', // 类型
            startAngle: 1, // 圆环开始绘制的位置
            radius: ['70%', '60%'], // 大小设置
            center: ['50%', '55%'], // 在画布的位置
            data: [
              {
                value: 95,
                itemStyle: {
                  // 配置圆环渐变色
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: '#5a8bfa'
                      },
                      {
                        offset: 1,
                        color: '#831bdb'
                      }
                    ]),
                    shadowColor: 'rgba(175,143,230,.5)'
                  }
                },
                // 是否显示圆环的文本
                label: {
                  show: false
                }
              },
              {
                value: 5,
                // 是否显示圆环的文本
                label: {
                  show: false
                },
                itemStyle: {
                  color: 'rgba(79,76,192, 0.3)'
                }
              }
            ]
          }
        ]
      },
      // 水纹图key
      key: 1
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
    this.setLeiDaChars()
    this.setRoundChars('round1', this.roundChartsData1)
    this.setRoundChars('round2', this.roundChartsData2)
    this.setRoundChars('round3', this.roundChartsData3)
  },
  methods: {
    // 设置雷达图
    setLeiDaChars() {
      this.myCharts.push(this.$echarts.init(this.$refs.leiDaChars))
      // 新增的在最后所以可用(length - 1) 来获取
      this.myCharts[this.myCharts.length - 1].setOption(this.leiDaCharsData)
    },
    setRoundChars(ref, data) {
      this.myCharts.push(this.$echarts.init(this.$refs[ref]))
      // 新增的在最后所以可用(length - 1) 来获取
      this.myCharts[this.myCharts.length - 1].setOption(data)
    },
    // 监听页面变化 页面 重绘
    resizeEcharts() {
      // this.$router.go()// 刷新页面
      this.myCharts.forEach(item => {
        item.resize()
      })
      this.key++
    }
  }
}
</script>

<style lang="scss" scoped>
.Right {
  width: 100%;
  height: 100%;
  .title {
    top: -20px;
    font-size: 12px;
    color: #47dae8;
    margin: 0;
    position: absolute;
    span {
      margin-left: 5px;
    }
  }
  .one {
    width: 100%;
    height: 20%;
    .el-col{
      width: 50%;
      height: 100%;
    }
    .lei-da, .earth{
      width: 100%;
      height: 100%;
    }
  }
  .two{
    width: 100%;
    height: 25%;
    .two-title{
      top: 5px;
    }
    .capsuleChart{
      padding: 23px 23px 10px 23px;
      box-sizing: border-box;
      color: #99B3C4;
      width: 100%;
      height: 100%;
    }
  }
  .three{
    width: 100%;
    height: calc(55% - 10px);
    .three-title{
      top: 15px;
      left: 10px;
    }
    .round{
      height: 40%;
      .el-col{
        height: 100%;
      }
    }
    .round-size{
      width: 100%;
      height: 90%;
    }
    .text{
      text-align: center;
      color: #c194d9;
    }
    .water{
      width: 100%;
      height: 60%;
      .water-level-pond{
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
