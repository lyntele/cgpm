<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header height="100px">
      <div>
        <img src="../assets/header3.png" alt="" />
      </div>
      <el-button type="info" class="logoutBtn" @click="logOut">退出</el-button>
    </el-header>
    <!-- 版心 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <div class="toggle-button">|||</div>
        <el-menu
          :default-active="activePath"
          class="el-menu-vertical-demo"
          router
        >
          <!-- 一级菜单 -->
          <el-submenu
            v-for="item in menulist"
            :key="item.id"
            :index="item.id + ''"
          >
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="'/' + subItem.path"
            @click="saveActivePath('/' + subItem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      menulist: [
        {
          authName: "比赛管理",
          id: 101,
          path: "competitions",
          children: [
            {
              authName: "比赛列表",
              id: 7,
              path: "competitions",
              children: [],
            },
          ],
        },
        {
          authName: "用户管理",
          id: 125,
          path: "users",
          children: [
            {
              authName: "用户列表",
              id: 4,
              path: "users",
              children: [],
            },
          ],
        },
      ],
      iconsObj: {
        125: "el-icon-user-solid",
        101: "el-icon-s-order",
      },
      // 被激活的动态链接地址
      activePath: ''
    };
  },
  methods: {
    // 保存被激活的链接状态
    saveActivePath(activePath) {
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    },
    // 用户登出
    logOut() {
      window.sessionStorage.clear()
      this.$router.push('/')
    }
  },
  mounted() {
    this.$router.push('./competitions')
    this.activePath = '/competitions'
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: antiquewhite;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  position: relative;
  > div {
    display: flex;
    align-items: center;
  }
}
img {
  width: 100%;
  height: 100px;
  position: absolute;
  object-fit: cover;
  top: 0px;
}
.el-aside {
  background-image: url("../assets/aside.png");
  background-size: 100% 100%;
  .el-menu {
    text-align: left;
  }
}
.el-main {
  background-color: #eaedf1;
}
.logoutBtn {
  position: absolute;
  right: 50px;
  top: 30px;
}
.toggle-button {
  background-color: #146d74;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
</style>
