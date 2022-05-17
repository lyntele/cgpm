<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <el-table :data="userList" stripe style="width: 100%" border>
        <el-table-column prop="userName" label="用户名" width="180px">
        </el-table-column>
        <el-table-column prop="exclusiveId" label="专属ID" width="180px">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      userList: []
    };
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('/findAll')
      if(res.code === 200) {
        return this.userList = res.data
      }
      return this.$message.error('获取用户列表失败')
    }
  },
  mounted() {},
  created() {
    this.getUserList()
  }
};
</script>

<style scoped>
</style>
