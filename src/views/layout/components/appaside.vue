<template>
  <div>
    <el-menu
      default-active="/"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="green"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="showdetail"
      router
    >
      <!-- <span class="title">今日头条</span> -->
      <div class="icon">
        <img class="tou-icon" v-show="!showdetail" src="./tou.jpg" alt="" />
      </div>
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-menu"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="el-icon-document"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="el-icon-postcard"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="el-icon-chat-dot-square"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="el-icon-ice-cream-round"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'appaside',
  props: {
    showdetail: Boolean,
  },
  data() {
    return {
      isCollapse: false,
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

<style lang="less" scoped>
.el-menu--collapse {
  height: 100%;
  .icon {
    width: 100%;
    height: 60px;
    .tou-icon {
      width: 100%;
      height: 100%;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  background-color: #d3dce6;
  height: 100%;
  width: 200px;
  // min-height: 400px;
  // width: 200px;
  .icon {
    width: 100%;
    height: 60px;
    .tou-icon {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    display: inline-block;
    width: 100%;
    text-align: center;
    color: red;
    font-size: 20px;
    font-weight: 800;
    margin-top: 20px;
  }
}
</style>
