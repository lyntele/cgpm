<template>
  <div>
    <el-descriptions
      labelClassName="descriptions"
      title="带边框列表"
      :column="1"
      border
    >
      <template slot="extra">
        <el-button type="primary" size="normal" @click="openEditEventDialog"
          >编辑</el-button
        >
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          大赛名称
        </template>
        {{currentEventForm.matchName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          大赛介绍
        </template>
        {{currentEventForm.matchIntroduction}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          主办单位
        </template>
        {{currentEventForm.organizer}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          赛事承办方
        </template>
        {{currentEventForm.organizeSchool}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          比赛时间
        </template>
        {{currentEventForm.matchTime}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          证书时间
        </template>
        {{currentEventForm.certificateTime}}
      </el-descriptions-item>
    </el-descriptions>

    <!-- 编辑比赛信息对话框 -->
    <el-dialog title="编辑比赛信息" :visible.sync="dialogFormVisible">
      <el-form ref="eventForm" :model="currentEventForm">
        <el-form-item label="比赛名称" :label-width="formLabelWidth">
          <el-input
            v-model="currentEventForm.matchName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="主办单位" :label-width="formLabelWidth">
          <el-input
            v-model="currentEventForm.organizer"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="比赛介绍" :label-width="formLabelWidth">
          <el-input
            v-model="currentEventForm.matchIntroduction"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="比赛时间" :label-width="formLabelWidth">
          <el-input
            v-model="currentEventForm.matchTime"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="证书时间" :label-width="formLabelWidth">
          <el-input
            v-model="currentEventForm.certificateTime"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="editEvent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentEventForm: {},
      formLabelWidth: '120px',
      dialogFormVisible: false
    };
  },
  mounted() {
    // 从vuex拿到该比赛的信息
    this.currentEventForm = this.$store.state.currentMatchData;
    // dom中的描述信息和vuex里的数据双向绑定
  },
  methods: {
    openEditEventDialog() {
      this.dialogFormVisible = true
    },
    //
    async editEvent() {
      // post 提交数据修改数据库的比赛信息
      const res = await this.$http.post('/MatchInfo/updateMatchInfo',this.currentEventForm)
      console.log('res',res);
      if(res.data.code !== 200) {
        return this.$message.error("修改比赛信息失败！")
      }
      // 请求成功后，修改vuex里存储的数据
      this.$store.dispatch("setCurrentMatchData", this.currentEventForm)
      this.dialogFormVisible = false
      return this.$message.success("修改成功！")
    },
    cancelEdit() {
      this.currentEventForm = this.$store.state.currentMatchData;
      this.dialogFormVisible = false
    }
  },
};
</script>

<style>
.el-descriptions {
  margin-top: 10px;
}
.descriptions {
  min-width: 150px;
}
</style>
