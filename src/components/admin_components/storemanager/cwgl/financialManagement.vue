
<template>
  <Card>
    <Alert type="info">
        <Row :gutter="20" style="line-height: 30px">
            <i-col :xs="12" >
                <p class="text-danger">待结算金额</p>
                <h5><span class="text-amount" style="font-size: 30px">{{txData.pending_amount}}</span>元</h5>              
            </i-col>
            <i-col :xs="12">
              <i-col :xs="12">
                <p class="text-danger">可提现金额</p>
                <h5><span class="text-amount" style="font-size: 30px">{{txData.available_withdraw_amount}}</span>元</h5>                
              </i-col>
              <i-col :xs="12" style="line-height: 60px" class="text-right">
                <Button type="primary" size="small" @click="modalState = true">提现</Button>
                <Modal
                  title="提现"
                  v-model="modalState"
                  :loading="modalState"
                >
                  <div slot="footer">
                    <Button type="ghost" @click="modalState = false">取消</Button>
                    <Button type="primary" @click="tixian">提现</Button>
                  </div>
                    <Form :label-width="150">
                      <FormItem label="账户可用提现金额">
                        <span class="text-amount">{{txData.available_withdraw_amount}}</span>元
                      </FormItem>
                      <FormItem label="提现金额">
                        <InputNumber style="width: 200px" :max="txData.available_withdraw_amount" :min="100" :step="100" v-model="amount"></InputNumber>&nbsp;&nbsp;元
                      </FormItem>
                    </Form>                  
                </Modal>
              </i-col>
            </i-col>            
        </Row>
    </Alert>
    <Card>
      <Row slot="title">
          <i-col :xs="6">提现列表</i-col>
          <i-col :xs="18" class="text-right">
              <DatePicker :transfer="true" type="daterange" @on-change="dateChange" placement="bottom-end" placeholder="选择日期范围" style="width: 200px"></DatePicker> 
              <Select  style="width:200px" placeholder="选择提现状态" class="text-left" v-model="params.status">
                  <Option value="0">提现中</Option>
                  <Option value="1">提现完成</Option>
                  <Option value="2">提现失败</Option>
                  <Option value="3">取消</Option>
              </Select>              
          </i-col>
      </Row>
      <Table :loading="loading" border :data="data" :columns="columns"></Table>
      <div class="text-right" style="margin-top: 15px">
          <Page :current="params.page" @on-change="pageChange" :total="total_count" size="small"></Page>
      </div>         
    </Card>
  </Card>
</template>

<script>
  import util from '../../../../util'
  let _this;
  export default {
    name: 'FinancialManagement',
    data () {
      return {
        total_count: 0,
        data: [],
        amount: 1000,
        modalState: false,
        columns: [{
          title: '申请时间',
          key: 'created_at',
          width: 150
        },{
          title: '提现银行|交易号',
          key: 'transaction_number',
          width: 150
        },{
          title: '金额（元）',
          key: 'amount',
          width: 120
        },{
          title: '处理完成时间',
          key: 'completed_at',
          width: 150
        },{
          title: '状态',
          key: 'status_label',
          width: 150
        },{
          title: '备注',
          key: 'comment'
        },{
          title: '申请人',
          width: 120,
          render (h,p){
            return h('span',[
              h('span',p.row.applicant_name),
              h('br'),
              h('span',p.row.applicant_phone)
            ])
          }
        },{
          title: '操作',
          width: 120,
          render(h,p){
            if(p.row.status == 0){
              return h('Button',{
                props: {
                  type: 'ghost',
                  size: 'small'
                },
                on: {
                  click () {
                    _this.$Modal.confirm({
                      title: '系统提示',
                      content: '确认取消？',
                      onOk: ()=>{
                        _this.$http.get("/boss/financial/cancelWithdraw",{
                          params: {
                            id: p.row.id
                          }
                        }).then(res=>{
                          _this.$Message.success(res.message);
                          _this.getData();
                          _this.getTxInfo();
                        })
                      }
                    });                    
                  }
                }
              },"取消提现")
            }
            return "-";
          }
        }],
        loading: false,
        params: {
          page: 1,
          page_size: 10,
          status: '',
          start_at: '',
          end_at: ''
        },
        txData: {
          available_withdraw_amount: 0,
          online_amount: 0,
          pending_amount: 0,
          withdraw_amount: 0,
          withdraw_locked_amount: 0
        }
      }
    },
    computed: {
    },
    watch: {
      params: {
          deep: true,
          handler: ()=>{
            _this.getData();
          }
      }
    },
    methods: {
      getData () {
        this.loading = true;
        let params = JSON.parse(JSON.stringify(this.params));
        for(let k in params){
          if(params[k] === ''){
            delete params[k];
          }
        }
        this.$http.get('/boss/financial/listWithdraw',{params}).then(res=>{
          this.data = res.data;
          this.total_count = parseInt(res.data.length);
          this.loading = false;
        });
      },
      pageChange (v) {
        this.params.page = v;
      },
      dateChange (v) {
        this.params.start_at = v[0]||'';
        this.params.end_at = v[1]||'';
      },
      getTxInfo () {
        this.$http.get("/boss/financial/brandStoreEmployeeCommissionInfo").then(res=>{
          util.merge(this.txData,res.data);
          if(!this.txData.pending_amount){
            this.txData.pending_amount = 0;
          }
        })
      },
      tixian () {
        this.$Modal.confirm({
          title: '系统提示',
          content: '确认提现？',
          onOk: ()=>{
            this.$http.post("/boss/financial/createWithdraw",{amount: this.amount}).then(res=>{
              this.getData();
              this.getTxInfo();
              this.$Notice.success({
                title: '系统提示',
                desc: res.message
              })
              this.modalState = false;
            })
          }
        });
      }
    },
    mounted () {
      _this = this; 
      this.getData();
      this.getTxInfo();
    }
  }
</script>

<style scoped>

</style>
