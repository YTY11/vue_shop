<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
}
.el-scrollbar__wrap {
  overflow: auto !important;
}
#nprogress .bar {
     background: #63E81A !important; //自定义颜色
  }
.el-tabs__item{
padding: 0 20px 0 0 !important;
}
.el-cascader-panel{
  height: 300px;
}
.ql-container {
    min-height: 350px !important;
  }
</style>
