<template>
  <dv-border-box-7 class="border-box-7" :color="['#35467E']">
    <div class="borderBox">
      <slot />
      <div class="p-style">
        <p>{{p1}}</p>
        <p>{{p2}}</p>
      </div>
    </div>
  </dv-border-box-7>
</template>

<script>
export default {
  name: 'CenterItemImg',
  props: {
    img: {
      type: String,
      default: ''
    },
    p1: {
      type: String,
      default: '图像转换流量'
    },
    p2: {
      type: String,
      default: '300 点击/张'
    }
  }
}
</script>

<style lang="scss" scoped>
.box-top {
  margin-top: calc(14% - 10px);
}
.borderBox {
  height: 100%;
  display: flex;
  justify-content: space-around;
  color: #47dae8;
  .p-style {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      margin: 0;
    }
  }
}
</style>
