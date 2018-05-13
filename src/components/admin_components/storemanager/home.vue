<template>
  <div style="position:relative">

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">
          快速通道
        </h3>
      </div>
      <div class="panel-body">
        <Row :gutter="30">
          <Col :xs="12" :sm="6" :md="4" :lg="3" class="admin-index-col">
          <router-link to="/admin/storemanager/ygzl">
            <Card>
              <div class="text-center">
                <div class="admin-index-card-tit">
                  <Icon type="android-person-add" size="36" color="#ff9900"></Icon>
                </div>
                <div class="admin-index-card-text">
                  添加员工
                </div>
              </div>
            </Card>
          </router-link>
          </Col>
          <Col :xs="12" :sm="6" :md="4" :lg="3" class="admin-index-col">
          <router-link to="/admin/storemanager/fwxm">
              <Card>
                <div class="text-center">
                  <div class="admin-index-card-tit">
                    <Icon type="android-favorite" size="36" color="#ff9900"></Icon>
                  </div>
                  <div class="admin-index-card-text">
                    添加服务
                  </div>
                </div>
              </Card>          
          </router-link>          
          </Col>
          <Col :xs="12" :sm="6" :md="4" :lg="3" class="admin-index-col">
          <router-link to="/admin/storemanager/hykgl">
              <Card>
                <div class="text-center">
                  <div class="admin-index-card-tit">
                    <Icon type="android-boat" size="36" color="#ff9900"></Icon>
                  </div>
                  <div class="admin-index-card-text">
                    添加卡类型
                  </div>
                </div>
              </Card>          
          </router-link>            
          </Col>
          <Col :xs="12" :sm="6" :md="4" :lg="3" class="admin-index-col">
          <router-link to="/admin/revenuestatement/memo">
              <Card>
                <div class="text-center">
                  <div class="admin-index-card-tit">
                    <Icon type="android-checkbox-outline" size="36" color="#ff9900"></Icon>
                  </div>
                  <div class="admin-index-card-text">
                    收支报表
                  </div>
                </div>
              </Card>          
          </router-link>
          </Col>
        </Row>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">
          最近7天营收
        </h3>
      </div>
      <div class="panel-body">
        <div class="col-xs-12" ref="sevenReceive" style="height: 400px">
        </div>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">
          最近7天到店人数
        </h3>
      </div>
      <div class="panel-body">
        <div class="col-xs-12" ref="sevenPeople" style="height: 400px">
        </div>
      </div>
    </div>

    <div class="part-loading" v-show="loading">
        <Spin fix>
            <Icon type="load-c" size=28 class="part-loading-spin-icon-load"></Icon>
            <div>加载中</div>
        </Spin>			
    </div>   
  </div>
</template>
<script>
  import util from '../../../util'
  let chart1,chart2;
  export default {
    name: "StoreIndex",
    data () {
      return {
      }
    },
    computed: {
      store_id () {
        return this.$store.state.story.store_id;
      },
      loading () {
        return this.$store.state.user.request !== 0;
      }      
    },
    watch: {
      store_id () {
        this.init();
      }
    },
    methods: {
      qtys (data) {
          let option = {
            legend: {
              data:['营收利润']
            },
            xAxis : [
              {
                data : data.map(e=>{return e.date})
              }
            ],
            color: ['#9f1d49'],
            series : [
              {
                name:'营收利润',
                stack: '总量',
                data: data.map(e=>{return e.value}),
                areaStyle: {
                  normal: {
                    color: '#b24a6d',
                    opacity: 0.2
                  }
                },
                markPoint: {
                    data: [
                        {
                          type: 'max', 
                          name: '最高利润',
                          label: {
                              normal: {
                                  position: 'top',
                                  formatter: '{b}\n{c}元'
                              }
                          }                        
                        },
                        {
                          type: 'min', 
                          name: '最低利润',
                          label: {
                              normal: {
                                  position: 'top',
                                  formatter: '{b}\n{c}元'
                              }
                          },                        
                        }
                    ]
                },
                markLine: {
                    data: [
                        {
                          type: 'average',
                          name: '平均利润',
                          label: {
                              normal: {
                                  position: 'middle',
                                  formatter: '{b}:{c}元'
                              }
                          },                                          
                        }
                    ]
                }                 
              }
            ]
          };  
          chart1.setOption(option);      
      },
      qtddrs (data) {
          let option = {
            legend: {
              data:['到店人数']
            },
            color: ['#00cc66'],
            xAxis : [
              {
                data : data.map(e=>{return e.date})
              }
            ],
            yAxis : [
              {
                type : 'value',
                minInterval: 1
              }
            ],            
            series : [
              {
                name:'到店人数',
                stack: '总量',
                data: data.map(e=>{return e.value}),
                areaStyle: {
                  normal: {
                    color: '#00cc66',
                    opacity: 0.2
                  }
                },
                markPoint: {
                    data: [
                        {
                          type: 'max', 
                          name: '最高人数',
                          label: {
                              normal: {
                                  position: 'top',
                                  formatter: '{b}\n{c}人'
                              }
                          }                        
                        },
                        {
                          type: 'min', 
                          name: '最低人数',
                          label: {
                              normal: {
                                  position: 'top',
                                  formatter: '{b}\n{c}人'
                              }
                          },                        
                        }
                    ]
                },
                markLine: {
                    data: [
                        {
                          type: 'average',
                          name: '平均人数',
                          label: {
                              normal: {
                                  position: 'middle',
                                  formatter: '{b}:{c}人'
                              }
                          },                                          
                        }
                    ]
                }                                 
              }
            ]
          };  
          chart2.setOption(option);    
      },
      init () {
          let date = new Date();
          date.setDate(date.getDate() - 1);
          let date2 = new Date();
          date2.setDate(date2.getDate() - 7);          
          let to_date = date.Format('yyyy-MM-dd');
          let from_date = date2.Format('yyyy-MM-dd');
          let params = {
            to_date,
            from_date,
            store_id: this.store_id,
            is_grouped_by_daily: 1
          };
          this.$http.get('/boss/dashboard/groupedDailySummary',{params}).then(res=>{
            this.qtys(res.data.total_order_amount);
            this.qtddrs(res.data.arrived_customer_count);
          })      
      }
    },
    async mounted () {
      await util.useEchart();
      chart1 = echarts.init(this.$refs.sevenReceive);
      chart2 = echarts.init(this.$refs.sevenPeople);
      let option = {
        tooltip : {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#9f1d49'
            }
          }
        },
        grid: {
          left: '20',
          right: '40',
          bottom: '20',
          containLabel: true        
        },
        xAxis : [
          {
            type : 'category',
            boundaryGap : false
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            type:'line',
            smooth: true,
            smoothMonotone: 'y',
            areaStyle: {normal: {}}           
          }
        ]
      };
      chart1.setOption(option);
      chart2.setOption(option);
      window.addEventListener("resize",()=>{
        chart1.resize();
        chart2.resize();
      }) 
      if(this.store_id){
        this.init();
      }                   
    },
    destoryed (){
      chart1 = null;
      chart2 = null;
    }
  }
</script>
<style type="less">
</style>
