<template>
  <div id="root">
    <div class="chart" id="chart"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstance: null,
      currentMatchCerts: []
    };
  },
  computed: {
    option() {
      return {
        title: {
          text: "比赛高校获奖队伍数比例",
          subtext: "纯属虚构",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: this.pieOption,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
    },
    pieOption() {
      let schoolArr = []
      this.currentMatchCerts.forEach(item => {
        // console.log('item',item)
        let exit = schoolArr.find(school => {
          // console.log('school',school)
          return school.schoolName === item.schoolName
        })
        console.log('exit',exit)
        if(exit) {
          exit.count++
        } else {
          schoolArr.push({
            value:1,
            name: item.schoolName
          })
        }
      })
      // console.log('schoolArr',schoolArr);
      return schoolArr
    }
  },
  mounted() {
    // 拿数据
    this.currentMatchCerts = this.$store.state.currentMatchCerts
    // 初始化图表
    this.initChart();
    // 根据this.currentMatchCerts 计算出各个学校获奖队伍数，学校名称，组织成图表可用的数据结构
    // console.log('this.currentMatchCerts',this.currentMatchCerts);
    // console.log('this.pieOption',this.pieOption);
  },
  methods: {
    initChart() {
      let chart = document.querySelector("#chart");
      this.chartInstance = this.$echarts.init(chart);
      this.chartInstance.setOption(this.option);
    },
  },
};
</script>

<style scoped>
#root {
  display: flex;
  justify-content: space-around;
}
.chart {
  width: 940px;
  height: 400px;
  display: inline-block;
  margin-top: 10px;
}
</style>
