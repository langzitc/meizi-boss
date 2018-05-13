<template>
    <Card>
        <div slot="title">
            <DatePicker :transfer="true" type="year" placeholder="年"></DatePicker>
            <DatePicker :transfer="true" type="month" placeholder="月"></DatePicker>
            <Button type="success">查询</Button>
        </div>
        <div ref="analysis-activity" class="analysis-box">

        </div>
    </Card>  
</template>

<script>
import util from '../../../util'
let chart = null;
export default {
    name: 'Member-analysis-activity',
    data (){
        return {
            
        }
    },
    async mounted (){
      await util.useEchart(); 
      chart = echarts.init(this.$refs['analysis-activity']);
      let option = {
        tooltip : {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        },
        grid: {
          left: '0',
          right: '0',
          bottom: '0',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
            name:'视频广告',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
            name:'直接访问',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {normal: {}},
            data:[820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      chart.setOption(option);
    }    
}
</script>

<style scoped>
    .analysis-box{
        height: 500px;
    }
</style>
