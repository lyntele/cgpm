<template>
  <div>
    <!-- 搜索区域 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          placeholder="请输入队伍序列号"
          v-model="teamNumber"
          clearable
          @clear="searchCertsList"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchCertsList"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="getAllCerts"
          >一键生成所有证书</el-button
        >
      </el-col>
      <el-col :span="4">
        <el-button type="success" @click="downloadAllCerts"
          >一键下载所有证书</el-button
        >
      </el-col>
    </el-row>
    <!-- 证书展示区域 -->
    <el-table :data="tableData" stripe border :fit="true" style="width: 100%">
      <el-table-column prop="teamName" label="获奖团队" width="180">
      </el-table-column>
      <el-table-column prop="teamMember" label="参赛队员" width="180">
      </el-table-column>
      <el-table-column prop="id" label="参赛队员ID" width="180">
      </el-table-column>
      <el-table-column prop="teamTeacher" label="指导老师" width="180">
      </el-table-column>
      <el-table-column prop="awardLevel" label="奖项级别" width="180">
      </el-table-column>
      <el-table-column prop="awardInfo" label="奖项信息" width="180">
      </el-table-column>
      <el-table-column prop="teamId" label="队伍序列号" width="180">
      </el-table-column>
      <el-table-column prop="schoolId" label="所在学校序号" width="180">
      </el-table-column>
      <el-table-column prop="schoolName" label="参赛校名" min-width="140px">
      </el-table-column>
      <el-table-column label="操作" min-width="120px" fixed="">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="download(scope.row)"
            >下载证书</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="total"
      v-show="!teamNumber"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      // 搜索框内容
      teamNumber: "",
      // 当前页码的证书信息列表
      tableData: [],
      // 全部证书信息列表
      certUrlList: [],
      // 记录当前页码
      page: 1,
      // 总条目数
      total: 15
    };
  },
  methods: {
    // 获取所有证书信息
    async getCertList() {
      const { data: res } = await this.$http.get(`/AwardInfo/queryPage?page=${this.page}&matchId=${this.matchId}`)
      // console.log(res)
      if(res.code === 200) {
        this.tableData = res.data
        console.log(res.data)
        // 将获取到的证书信息存入vuex
        this.$store.dispatch('setCurrentMatchCert', res.data)
        console.log(this.$store.state.currentMatchCerts)
      }
    },
    // 监视页码改变
    handleCurrentChange(newSize) {
      this.page = newSize
      // 页码更新后重新获取证书信息
      if(!this.teamNumber) {
        this.getCertList()
      }
    },
    // 获取数据总数
    async getCertsTotal() {
      const { data: res } = await this.$http(`/AwardInfo/getRowCount?matchId=${this.matchId}`)
      // console.log(res)
      if(res.code === 200) {
        return this.total = res.data
      }
      else return this.$message.error('获取数据总数失败')
    },
    // 搜索特定队伍证书
    async searchCertsList() {
      const { data: res } = await this.$http(`/AwardInfo/queryByTeamId?teamId=${this.teamNumber}`)
      if(res.code === 200) {
        return this.tableData = res.data
      }
      else return this.$message.error('搜索失败')
    },
    // 生成所有证书
    async getAllCerts() {
      const { data: res } = await this.$http.get(`/AwardInfo/findAllCertificateUrl?matchId=${this.$store.state.currentMatchData.matchId}`)
      if(res.code === 200) {
        this.certUrlList = res.data
        this.$message.success('生成成功')
        console.log(res)
      }
      else return this.$message.error('生成失败')
    },
    // 下载图片地址和图片名
    downloadImage(imgsrc, name) {
      const image = new Image()
      // 解决跨域Canvas污染问题
      image.setAttribute("crossOrigin", "Anonymous")
      image.onload = function() {
        const canvas = document.createElement("canvas")
        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext("2d")
        context.drawImage(image, 0, 0, image.width, image.height)
        canvas.toBlob((blob) => {
          let url = URL.createObjectURL(blob)
          console.log("blob",blob)
          console.log("url", url)
          let a = document.createElement("a")
          let event = new MouseEvent("click")
          a.download = name || "default.jpg"
          a.href = url
          a.dispatchEvent(event)
          URL.revokeObjectURL(url)  // 内存管理,将这句代码注释掉,则将以 blob:http 开头的url复制到浏览器地址栏有效,否则无效.
        })
      }
      image.src = imgsrc + "?v=" + Date.now() // 加时间戳防止cdn缓存
    },
    // 下载所有证书
    downloadAllCerts() {
      this.certUrlList.forEach((cert) => {
        const certName =
          cert.schoolName +
          "-" +
          cert.teamName +
          "-" +
          cert.teamMember +
          "-" +
          cert.identifier;
        const certUrl = cert.certificateUrl;
        this.downloadImage(certUrl, certName);
      });
      console.log('this.certUrlList',this.certUrlList);
    },
    // 下载对应证书
    download(certData) {
      const certUrl = certData.certificateUrl;
      const certName =
        certData.schoolName +
        "-" +
        certData.teamName +
        "-" +
        certData.teamMember +
        "-" +
        certData.identifier;
        this.downloadImage(certUrl, certName)
        console.log('下载调用')
    },
  },
  mounted() {
    this.getCertList()
    this.getCertsTotal()
  },
  computed: {
    matchId() {
      return this.$store.state.currentMatchData.matchId;
    },
  },
  watch: {
    // 监视搜索框
    teamNumber: function(newval,oldval) {
      // 搜索框为空时展示全部比赛
      if(newval === '') {
        this.getCertList()
      }
    },
  }
};
</script>

<style scoped>
</style>
