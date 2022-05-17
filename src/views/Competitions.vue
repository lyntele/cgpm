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
      <!-- 搜索于添加区 -->
      <el-row :gutter="0">
        <el-col :span="7">
          <el-input
            placeholder="请输入搜索内容"
            v-model="searchContent"
            class="input-with-select"
            clearable
          >
            <el-button slot="append" icon="el-icon-search" @click="searchMatch"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2" :offset="0">
          <el-button type="primary" @click="dialogFormVisible = true"
            >添加比赛</el-button
          >
        </el-col>
      </el-row>

      <!-- 比赛列表 -->
      <el-table :data="tableData" stripe style="width: 100%" border fix>
        <el-table-column prop="matchName" label="比赛项目"></el-table-column>
        <el-table-column
          prop="organizeSchool"
          label="承办学校"
        ></el-table-column>
        <el-table-column prop="organizer" label="主办单位"></el-table-column>
        <el-table-column prop="matchId" label="比赛ID"></el-table-column>
        <el-table-column prop="matchTime" label="举办时间"></el-table-column>
        <el-table-column
          prop="certificateTime"
          label="证书时间"
        ></el-table-column>
        <el-table-column
          prop="matchIntroduction"
          label="比赛介绍"
        ></el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="manage(scope.row)"
              >管理比赛</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加比赛对话框 -->
      <el-dialog title="添加比赛" :visible.sync="dialogFormVisible">
        <el-form :model="addForm" ref="addFormRef">
          <el-form-item label="管理员ID" prop="exclusiveId">
            <el-input
              v-model="addForm.exclusiveId"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="比赛名称" prop="matchName">
            <el-input v-model="addForm.matchName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="承办学校" prop="organizeSchool">
            <el-input
              v-model="addForm.organizeSchool"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="主办单位" prop="organizer">
            <el-input v-model="addForm.organizer" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="比赛介绍" prop="matchIntroduction">
            <el-input
              v-model="addForm.matchIntroduction"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="比赛时间" prop="matchTime">
            <el-input v-model="addForm.matchTime" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="证书时间" prop="certificateTime">
            <el-input
              v-model="addForm.certificateTime"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogClosed">取 消</el-button>
          <el-button type="primary" @click="addMatch">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      tableData: [],
      // 搜索内容
      searchContent: "",
      // 添加比赛表单项
      addForm: {
        matchName: "",
        matchIntroduction: "",
        organizeSchool: "",
        organizer: "",
        matchTime: "",
        certificateTime: "",
        exclusiveId: "",
      },
      // 对话框是否可见
      dialogFormVisible: false,
    };
  },
  methods: {
    // 获取比赛列表
    async getMatchList() {
      const { data: res } = await this.$http.get("/MatchInfo/findAll");
      if (res.code === 200) {
        this.tableData = res.data;
      }
    },
    // 删除比赛
    handleDelete(matchData) {
      this.$alert("确定删除该比赛？", "删除比赛", {
        confirmButtonText: "确定",
        callback: async (action) => {
          if (action === "confirm") {
            const { data: res } = await this.$http.delete(
              `/MatchInfo/deleteMatchInfo/?matchId=${matchData.matchId}`,
              {
                matchId: matchData.matchId,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            // console.log(res)
            if (res.code === 200) {
              this.getMatchList();
              return this.$message.success("删除成功");
            }
            return this.$message.error("删除失败");
          }
          else {
            return this.$message.info('取消删除')
          }
        },
      });
    },
    // 搜索比赛
    async searchMatch() {
      const { data: res } = await this.$http.get(
        `/MatchInfo/queryMatchInfo/?matchName=${this.searchContent}`,
        {
          matchName: this.searchContent,
        }
      )
      if(res.code === 200) {
        return this.tableData = res.data
      }
    },
    // 添加比赛
    async addMatch() {
      const { data: res } = await this.$http.post(
        "/MatchInfo/addMatchInfo",
        this.addForm
      );
      if (res.code === 200) {
        this.getMatchList();
        this.$message.success("添加成功");
      } else {
        this.$message.error("添加失败");
      }
      this.$refs.addFormRef.resetFields();
      this.dialogFormVisible = false;
      console.log(res);
    },
    // 关闭添加比赛对话框
    dialogClosed() {
      this.$refs.addFormRef.resetFields();
      this.dialogFormVisible = false;
    },
    // 管理比赛
    async manage(matchData) {
      // 获取vuex中的managerID和当前比赛id进行鉴权
      let managerId = this.$store.state.managerId
      // 请求比赛Id
      const { data:res } = await this.$http.get(
        `/MatchInfo/getExclusiveId?matchName=${matchData.matchName}`
      )
      if(res.code === 200 && managerId === res.data) {
        this.$store.dispatch("setCurrentMatchData", matchData)
        this.$router.push('/eventitem')
      }
      // console.log(matchData)
      else return this.$message.error('您没有管理该比赛的权限')
    }
  },
  mounted() {},
  created() {
    this.getMatchList();
  },
  watch: {
    // 监视搜索框
    searchContent: function(newval,oldval) {
      // 搜索框为空时展示全部比赛
      if(newval === '') {
        this.getMatchList()
      }
    }
  }
};
</script>

<style scoped>
</style>