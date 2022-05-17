<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>比赛管理</el-breadcrumb-item>
      <el-breadcrumb-item>比赛列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <!-- 导航区 -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/certcreate">证书生成</el-menu-item>
        <el-menu-item index="/certmanage">证书管理</el-menu-item>
        <el-menu-item index="/certvisible">获奖信息数据可视化</el-menu-item>
        <el-menu-item index="/matchmanage">管理比赛信息</el-menu-item>
      </el-menu>
      <!-- 路由组件展示区 -->
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      activeIndex: '/certcreate'
    };
  },
  methods: {},
  mounted() {
    this.$router.push("/certcreate");
  },
};
</script>

<style scoped>
.el-menu {
  margin-bottom: 10px;
}
</style>
