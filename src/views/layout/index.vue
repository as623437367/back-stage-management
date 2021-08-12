<template>
  <div class="container">
    <el-container class="layout-postion">
      <el-aside class="aside" width="auto">
        <App-aside
          :showdetail="showdetail"
          :activeindex="activeindex"
          class="asidemenu"
        >
        </App-aside>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="left">
            <i
              @click="changeAsideShow"
              v-show="!showdetail"
              class="el-icon-s-fold"
            ></i>
            <i
              @click="changeAsideShow"
              v-show="showdetail"
              class="el-icon-s-unfold"
            ></i>
            <span>今日头条管理系统</span>
          </div>
          <el-dropdown>
            <!-- <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span> -->

            <div class="userinfo">
              <el-avatar
                class="usericon"
                size="medium"
                :src="user.photo"
              ></el-avatar>
              <span> {{ user.name }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <!-- 组件默认不识别原生事件 可以在点击事件中加.native 或在文档中在dropdown @command="handleCommand" -->
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
var icon = require('./components/avator.jpg')
import AppAside from './components/appaside.vue'
import { getuserinfo } from '@/api/login.js'
export default {
  data() {
    return {
      user: '',
      icon: icon,
      showdetail: false,
      activeindex: '/article',
    }
  },
  components: { AppAside },
  created() {
    // console.log(localStorage.getItem('token'))
    let token = localStorage.getItem('token')
    console.log(`Bearer ${token}`)
    this.userinfo()
  },
  methods: {
    logout() {
      this.$confirm('是否退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          window.localStorage.removeItem('token')
          this.$router.push({
            name: 'login',
          })
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
    },

    changeAsideShow() {
      this.showdetail = !this.showdetail
    },
    userinfo() {
      // let token = localStorage.getItem('token')
      // let headers = { Authorization: `Bearer ${token}` }
      getuserinfo()
        .then((res) => {
          console.log(res)
          this.user = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang="less" scoped>
// .container {
//   width: 100%;
//   height: 20px;
// }
.layout-postion {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .asidemenu {
    height: 100%;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #d3dce6;
    .left {
      display: flex;
      align-items: center;
    }
    .userinfo {
      display: flex;
      align-items: center;
      .usericon {
        margin-right: 10px;
      }
    }
  }
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
