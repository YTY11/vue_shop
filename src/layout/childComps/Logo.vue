<template>
  <div class="logo">
    <img src="~@/assets/img/logo.png" alt="" />
    <!-- 菜单栏收起时不显示 -->
    <transition name="sidebarLogoFade">
      <span v-if="!isCollapse">电商后台管理系统</span>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Logo',
  computed: {
    ...mapGetters(['isCollapse'])
  }
}
</script>

<style lang="scss" scoped>
.logo {
  .sidebarLogoFade-enter-active {
    transition: all 1.5s;
  }

  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }
  width: 100%;
  height: 50px;
  color: #fafafa;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fafafa;
    overflow: hidden;
  }
}
</style>
