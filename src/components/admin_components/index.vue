<template>
  <div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">
          便携工具
        </h3>
      </div>
      <div class="panel-body">
          <Row :gutter="30">
            <Col :xs="12" :sm="6" :md="4" :lg="3" class="admin-index-col">
              <router-link to="/admin/workbench/cashier">
                <Card>
                  <div class="text-center">
                    <div class="admin-index-card-tit">
                      <Icon type="android-train" size="36" color="#ff9900"></Icon>
                    </div>
                    <div class="admin-index-card-text">
                      收银
                    </div>
                  </div>
                </Card>
              </router-link>            
            </Col>
            <Col :xs="12" :sm="6" :md="4" :lg="3" class="admin-index-col">
              <router-link :to="{path: '/admin/workbench/cashier',query: {status: 'addmember'}}">
                <Card>
                  <div class="text-center">
                    <div class="admin-index-card-tit">
                      <Icon type="android-open" size="36" color="#ff9900"></Icon>
                    </div>
                    <div class="admin-index-card-text">
                      新增会员
                    </div>
                  </div>
                </Card>
              </router-link>               
            </Col>
            <Col :xs="12" :sm="6" :md="4" :lg="3" class="admin-index-col">
              <router-link to="/admin/workbench/makeappointment">
                <Card>
                  <div class="text-center">
                    <div class="admin-index-card-tit">
                      <Icon type="android-time" size="36" color="#ff9900"></Icon>
                    </div>
                    <div class="admin-index-card-text">
                      预约
                    </div>
                  </div>
                </Card>
              </router-link>               
            </Col>
            <Col :xs="12" :sm="6" :md="4" :lg="3" class="admin-index-col">
              <router-link to="/admin/shop/list">
                  <Card>
                    <div class="text-center">
                      <div class="admin-index-card-tit">
                        <Icon type="android-people" size="36" color="#ff9900"></Icon>
                      </div>
                      <div class="admin-index-card-text">
                        会员管理
                      </div>
                    </div>
                  </Card>
              </router-link>               
            </Col>
            <Col :xs="12" :sm="6" :md="4" :lg="3" class="admin-index-col">
              <router-link to="/admin/storemanager/mdgl">
                  <Card>
                    <div class="text-center">
                      <div class="admin-index-card-tit">
                        <Icon type="android-desktop" size="36" color="#ff9900"></Icon>
                      </div>
                      <div class="admin-index-card-text">
                        店铺管理
                      </div>
                    </div>
                  </Card>
              </router-link>               
            </Col>
            <Col :xs="12" :sm="6" :md="4" :lg="3" class="admin-index-col">
              <router-link to="/admin/market">
                <Card>
                  <div class="text-center">
                    <div class="admin-index-card-tit">
                      <Icon type="android-locate" size="36" color="#ff9900"></Icon>
                    </div>
                    <div class="admin-index-card-text">
                      营销中心
                    </div>
                  </div>
                </Card>
              </router-link>               
            </Col>
          </Row>
      </div>
    </div>
		<Row :gutter="30">
			<i-col :sm="24" :md="12">
		    <div class="panel panel-danger text-danger">
		      <div class="panel-heading">
		        <h3 class="panel-title">
		          今日营收
		        </h3>
		      </div>
		      <div class="panel-body">
		        <div class="col-xs-6 panel-body-item">
		          <Icon type="android-happy" size="36"></Icon>
		        </div>
		        <div class="col-xs-6 panel-body-item text-right">
		          <p class="text-muted">今日营收总额(元)</p>
		          <h2>{{data.total_order_amount}}</h2>
		        </div>
		      </div>
		    </div>				
			</i-col>
			<i-col :sm="24" :md="12">
			    <div class="panel panel-info text-info">
			      <div class="panel-heading">
			        <h3 class="panel-title">
			          今日会员
			        </h3>
			      </div>
			      <div class="panel-body">
			        <div class="col-xs-6 panel-body-item">
			          <Icon type="android-happy" size="36"></Icon>
			        </div>
			        <div class="col-xs-6 panel-body-item text-right">
			          <p class="text-muted">今日新增会员(人)</p>
			          <h2>{{data.new_customer_count}}</h2>
			        </div>
			      </div>
			    </div>				
			</i-col>
			<i-col :sm="24" :md="12">
			    <div class="panel panel-success text-success">
			      <div class="panel-heading">
			        <h3 class="panel-title">
			          今日预约单数
			        </h3>
			      </div>
			      <div class="panel-body">
			        <div class="col-xs-6 panel-body-item">
			          <Icon type="android-happy" size="36"></Icon>
			        </div>
			        <div class="col-xs-6 panel-body-item text-right">
			          <p class="text-muted">今日预约单数(单)</p>
			          <h2>{{data.pre_order_number}}</h2>
			        </div>
			      </div>
			    </div>				
			</i-col>
			<i-col :sm="24" :md="12">
			    <div class="panel panel-warning text-warning">
			      <div class="panel-heading">
			        <h3 class="panel-title">
			          到店人数
			        </h3>
			      </div>
			      <div class="panel-body">
			        <div class="col-xs-6 panel-body-item">
			          <Icon type="android-happy" size="36"></Icon>
			        </div>
			        <div class="col-xs-6 panel-body-item text-right">
			          <p class="text-muted">到店人数(人)</p>
			          <h2>{{data.arrived_customer_count}}</h2>
			        </div>
			      </div>
			    </div>				
			</i-col>
		</Row>

  </div>
</template>
<script>
  export default {
    name: "AdminIndex",
    data () {
      return {
         data: {
            arrived_customer_count: 0,
            new_customer_count: 0,
            pre_order_amount: 0,
            total_order_amount: 0,
            pre_order_number: 0
         }        
      }
    },
    computed: {
      store_id () {
        return this.$store.state.story.store_id;
      }
    },
    watch: {
      store_id () {
        this.dataInit();
      }
    },
    methods: {
      dataInit () {
          if(this.store_id) {
              let date = (new Date()).Format('yyyy-MM-dd');
              this.$http.get("/boss/dashboard/dailySummary",{
                  params:{
                    store_id: this.store_id,
                    from_date: date,
                    to_date: date,
                    }
                }).then(res=>{
                Object.assign(this.data,res.data);
              })             
          }        
      }
    },
    mounted () {
      this.dataInit();
    }
  }
</script>
<style type="less" scoped>
</style>
