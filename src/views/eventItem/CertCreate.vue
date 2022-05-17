<template>
  <div>
    <!-- 上传背景图 -->
    <el-upload
      ref="imgUpload"
      class="imgUpload"
      :action="`https://ccpc-cert.acmclub.cn:8081/MatchInfo/uploadimg?matchId=${matchId}`"
      :multiple="false"
      list-type="picture"
      :limit="1"
      :on-exceed="handleExceed"
      :on-success="uploadSuccess"
      :on-error="uploadFail"
      :file-list="imgList"
      :auto-upload="true"
      show-file-list
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">上传证书背景图</div>
    </el-upload>

    <!-- 上传excel获奖数据 -->
    <el-upload
      ref="excelUpload"
      accept=".xlsx"
      class="excelUpload"
      :action="`https://ccpc-cert.acmclub.cn:8081/AwardInfo/parseExcel?matchId=${matchId}`"
      :multiple="false"
      :limit="1"
      :on-exceed="handleExceed"
      :on-success="excelUploadSuccess"
      :on-error="excelUploadFail"
      :file-list="excelList"
      show-file-list
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">上传获奖名单，excel文件</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      imgList: [], //证书背景图
      excelList: [], //获奖名单excel表格
    };
  },
  methods: {
    // 上传证书背景
    uploadSuccess() {
      this.$message.success("证书背景图上传成功！");
    },
    uploadFail() {
      this.$message.error("证书背景图上传失败！");
    },
    // 上传excel表格
    excelUploadSuccess() {
      this.$message.success("excel文件上传成功！");
    },
    excelUploadFail() {
      this.$message.error("excel文件上传失败！");
    },
    // 上传文件超过限制
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
  },
  mounted() {},
  computed: {
    matchId() {
      return this.$store.state.currentMatchData.matchId;
    },
  },
};
</script>

<style scoped>
</style>
