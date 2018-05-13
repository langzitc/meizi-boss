<template>
  <Card>
      <Row class="clearfix" :gutter="20">
          <i-col :xs="24" class="text-right">
              <AddMember @on-success="getMemberList"></AddMember>
          </i-col>
          <i-col :lg="4" :md="6" :sm="12"  class="option-item">
            <Input type="text" placeholder="会员手机" v-model="params.mobile"></Input>              
          </i-col>
          <i-col :lg="4" :md="6" :sm="12" class="option-item">
            <Select placeholder="会员卡类型" v-model="params.member_card_type" clearable>
                <Option :value="el.id" v-for="el in cardList" :key="el.id">{{el.name}}</Option>
            </Select>
          </i-col>
          <i-col :lg="4" :md="6" :sm="12" class="option-item">
            <Select placeholder="性别" v-model="params.gender" clearable>
                <Option :value="el.value" :key="el.value" v-for="el in genderList">{{el.label}}</Option>
            </Select>                
          </i-col>
          <i-col :lg="4" :md="6" :sm="12" class="option-item">
            <Select v-model="params.is_deleted" clearable placeholder="会员状态">
                <Option :value="0">正常会员</Option>
                <Option :value="1">已删除会员</Option>
            </Select>                
          </i-col>  
          <i-col :lg="4" :md="6" :sm="12" class="option-item">
            <Select placeholder="全部套餐" v-model="params.grouped_service_id" clearable>
                <Option :value="el.id" v-for="el in serviceList" :key="el.id">{{el.name}}</Option>
            </Select>                
          </i-col> 
          <i-col :lg="4" :md="6" :sm="12" class="option-item">
            <Select placeholder="全部客户类型" v-model="params.has_grouped_service" clearable>
                <Option :value="1">套餐用户</Option>
                <Option :value="0">普通会员</Option>
            </Select>                
          </i-col>                                        
      </Row>  
      <Row class="clearifx option-item">         
        <i-col :sm="12" class="option-item">
            <label class="mlist-label">最近消费时间:</label>
            <DatePicker placeholder="选择时间范围" :transfer="true" style="width: 250px" type="daterange" @on-change="xfsjDateChange"></DatePicker>      
        </i-col>
        <i-col :sm="12" class="option-item">
            <label class="mlist-label">开卡时间:</label>
            <DatePicker placeholder="选择时间范围" :transfer="true" type="daterange" @on-change="kksjDateChange" style="width: 250px"></DatePicker>            
        </i-col>        
        <i-col :sm="12" class="option-item">
            <label class="mlist-label">卡金余额:</label>
            <Input placeholder="输入金额" style="width: 119px" v-model="params.member_card_amount_min"></Input> - <Input placeholder="输入金额" style="width: 119px" v-model="params.member_card_amount_max"></Input>
        </i-col> 
        <i-col :sm="12" class="option-item">
            <label class="mlist-label">赠送金余额:</label>
            <Input placeholder="输入金额" style="width: 119px" v-model="params.member_card_given_amount_min"></Input> - <Input placeholder="输入金额" style="width: 119px" v-model="params.member_card_given_amount_max"></Input>
        </i-col>  
        <i-col :sm="12" class="option-item">
            <label class="mlist-label">消费总额:</label>
            <InputNumber style="width:119px" :min="0" v-model="params.total_spent_amount_min"></InputNumber> - <InputNumber style="width:119px" :min="0" v-model="params.total_spent_amount_max"></InputNumber>
        </i-col> 
        <!-- <i-col :sm="12" class="option-item">
            <label class="mlist-label">未消费天数:</label>
            <InputNumber :min="0"></InputNumber> - <InputNumber :min="0"></InputNumber>
        </i-col>    -->
        <i-col :sm="4" class="option-item">
            <Button type="primary" @click="getMemberList" long>查询</Button>
        </i-col>                     
      </Row>
        <Alert type="info" style="margin: 15px 0;line-height: 30px;padding: 8px 15px;font-size: 14px">
            <Row>
                <i-col :sm="24" :md="16">
                    查询统计：总共<span class="text-amount">{{total_count}}</span>位会员，
                    卡金余额<span class="text-amount">{{summary.card_amount}}</span>元,
                    赠送金总额<span class="text-amount">{{summary.card_given_amount}}</span>元,
                    套餐用户<span class="text-amount">{{tcyh_count}}</span>位,
                    套餐余额<span class="text-amount">{{summary.grouped_service_amount}}</span>元                
                </i-col>
                <i-col :sm="24" :md="8" class="text-right">
                    <Button type="info" size="small">批量导入</Button>
                    <Button type="success" size="small">导出备份</Button>
                </i-col>            
            </Row>
        </Alert>
      <Row class="clearfix" style="margin-top: 20px">
          <i-col :sm="24">
              <Table border :data="data" :columns="columns" :loading="loading"></Table>
                <div class="text-right" style="margin-top: 15px">
                    <Page :current="params.page" @on-change="pageChange" :total="total_count" size="small"></Page>
                </div>                 
          </i-col>
      </Row>
  </Card>
</template>

<script>
import AddMember from './addMember'
import EditMember from './editMember'
let _this;
export default {
    name: 'Member-List',
    data (){
        return {
            loading: false,
            data: [],
            summary:{},
            columns: [{
                title: '姓名',
                key: 'name',
                fixed: 'left',
                width: 100
            },{
                title: '会员编号',
                key: 'number',
                width: 150
            },{
                title: '手机号码',
                key: 'mobile',
                width: 150
            },{
                title: '卡类',
                key: 'card_name',
                width: 100
            },{
                title: '卡金余额',
                key: 'amount',
                width: 100,
                render(h,p){
                    let n = 0;
                    if(p.row.card.id){
                        n+=parseInt(p.row.card.amount)
                    }
                    return n;
                }
            },{
                title: '消费总额',
                key: 'total_spent_amount',
                width: 100
            },{
                title: '赠送金',
                width: 100,
                render(h,p){
                    let n = 0;
                    if(p.row.card.id){
                        n+=parseFloat(p.row.card.given_amount)
                    }
                    return n;
                }                
            },{
                title: '套餐数量',
                width: 100,
                render(h,p){
                    return p.row.grouped_service_summary.grouped_service_number;
                }
            },{
                title: '套餐余额',
                width: 100,
                render(h,p){
                    return p.row.grouped_service_summary.amount;
                }                
            },{
                title: '生日',
                key: 'birthday',
                width: 150
            },{
                title: '开卡时间',
                key: 'created_at',
                width: 200
            },{
                title: '最近消费时间',
                key: 'last_order_at',
                width: 200
            },{
                title: '操作',
                width: 150,
                align: 'right',
                fixed: 'right',
                render(h,p){
                    return h('div',[
                        h(EditMember,{
                            props: {
                                id: parseInt(p.row.id)
                            },
                            on: {
                                'on-change' () {
                                    _this.getMemberList();
                                }
                            }
                        },[
                            h("Button",{
                                props: {
                                    type: 'info',
                                    size: 'small'
                                }
                            },'编辑')
                        ]),
                        h("Button",{
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginLeft: '5px'
                            },                            
                            on: {
                                click(e){
                                    _this.$Modal.confirm({
                                        title: '系统提示',
                                        content: '<h4 class="text-warning text-center">确认删除？</h4>',
                                        onOk: ()=>{
                                            _this.$http.post("/boss/storeMember/delete",{id: p.row.id}).then(res=>{
                                                _this.$Message.success(res.message);
                                                _this.getMemberList();
                                            })
                                        }
                                    });                                     
                                }
                            }
                        },"删除")
                    ])
                }
            }],
            total_count: 0,
            params: {
                page: 1,
                page_size: 10,
                is_deleted: 0,
                mobile: '',
                membercard_id: '',
                gender:'',
                last_order_at_from: '',
                last_order_at_to: '',
                member_card_type: '',
                member_card_created_at_from: '',
                member_card_created_at_to: '',
                member_card_amount_min: '',
                member_card_amount_max: '',
                member_card_given_amount_min: '',
                member_card_given_amount_max: '',
                total_spent_amount_min: 0,
                total_spent_amount_max: 100000,
                has_grouped_service: '',
                has_member_card: '',
                with_cash_coupon: 1,
                with_grouped_service_summary: 1,
                with_summary: 1
            },
            serviceList: []
        }
    },
    components: {
        AddMember
    },
    computed: {
        genderList (){
            return this.$store.state.user.genderList;
        },
        store_id () {
            return this.$store.state.story.store_id;
        },
        cardList () {
            return this.$store.state.story.cardList;
        },
        total_amount () {
            return 0;
        },
        tcyh_count () {
            let n = 0;
            if(this.summary.member_count){
                n = this.summary.member_count-this.summary.no_grouped_service_member_count
            }
            return n||0;
        }
    },
    watch: {
        store_id () {
            this.getMemberList();
            this.getServiceList();
        }
    },
    methods: {
        getMemberList (){
            this.loading = true;
            let params = JSON.parse(JSON.stringify(this.params));
            params.store_id = this.store_id;
            for(let key in params){
                if(params[key] === ''){
                    delete params[key];
                }
            }

            params.response_data_model = "STORE_MEMBER_LIST";
            console.log(params);
            this.$http.get("/boss/storeMember/list",{params}).then(res=>{
                this.data = res.data.items;
                this.total_count = parseInt(res.data.total_count);
                this.summary = res.data.summary;
                this.loading = false;
            });
        },
        getServiceList () {
            this.$http.get("/boss/product/list",{params: {
                type_code: 'grouped_service',
                response_data_model:"BASIC_DATA_ONLY",
                store_id: this.store_id
            }}).then(res=>{
                this.serviceList = res.data.items;
            })
        },
        getCardList (){
            this.$store.dispatch("GET_CARD_LIST");
        },
        pageChange (v){
            this.params.page = v;
            this.getMemberList();
        },
        xfsjDateChange (v) {
            this.params.last_order_at_from = v[0];
            this.params.last_order_at_to = v[1];
        },
        kksjDateChange (v) {
            this.params.member_card_created_at_from = v[0];
            this.params.member_card_created_at_to = v[1];
        }
    },
    mounted (){
        this.getCardList();
        _this = this;
        if(this.store_id){
            this.getServiceList();
            this.getMemberList();
        }
    }
}
</script>

<style scoped>
    .option-item{
        margin-top: 15px;
    }
    .mlist-label{
        width: 120px;
        text-align: left;
        font-weight: normal;
    }
</style>
