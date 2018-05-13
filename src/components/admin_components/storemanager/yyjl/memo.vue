<template>
    <Card>
        <div slot="title">
            <Row class="clearfix" :gutter="20">
                <i-col :sm="6" :md="4" class="row-param-item">
                    <select-store style="width:100%" @store-change="storeChange"></select-store>
                </i-col>                 
                <i-col :sm="6" :md="4" class="row-param-item">
                    <Select placeholder="选择消费类型" v-model="params.order_type">
                        <Option value="">全部消费类型</Option>
                        <Option :value="0">服务项目消费</Option>
                        <Option :value="1">疗程套餐订购</Option>
                        <Option :value="2">会员充值</Option>
                        <Option :value="3">会员开卡</Option>
                    </Select>
                </i-col>
                <i-col :sm="6" :md="4" class="row-param-item">
                    <staff-select-search @on-change="employeeChange"></staff-select-search>
                </i-col>                
                <i-col :sm="6" :md="4" class="row-param-item">
                    <DatePicker :transfer="true" placeholder="开始日期" :value="params.start_date" type="date" @on-change="startChange"></DatePicker>
                </i-col>  
                <i-col :sm="6" :md="4" class="row-param-item">
                    <DatePicker :transfer="true" placeholder="结束日期" :value="params.end_date" type="date" @on-change="endChange"></DatePicker>
                </i-col> 
                <i-col :sm="6" :md="4" class="row-param-item">
                    <Select placeholder="会员卡类型" v-model="params.member_card_type" clearable>
                        <Option v-for="el in memberCardTypeList" :value="el.id" :key="el.id">{{el.name}}</Option>
                    </Select>
                </i-col>                   
                <i-col :sm="6" :md="4" class="row-param-item">
                    <Select placeholder="顾客类型" v-model="params.member_type" clearable>
                        <Option value="0">散客</Option>
                        <Option value="1">会员</Option>
                    </Select>
                </i-col>  
                <i-col :sm="6" :md="4" class="row-param-item">
                    <Select placeholder="支付方式" v-model="params.payment_method_code" clearable>
                        <Option value="0">线下支付</Option>
                        <Option value="1">线上支付</Option>
                    </Select>
                </i-col>   
                <i-col :sm="6" :md="4" class="row-param-item">
                    <Select placeholder="部门" v-model="params.department_id" clearable>
                        <Option v-for="el in departmentList" :value="el.id" :key="el.id">{{el.name}}</Option>
                    </Select>
                </i-col>    
                <i-col :sm="6" :md="4">
                    <Button type="success" @click="exportsTable">导出表格</Button>
                </i-col>                                                                                                                               
            </Row>
            <Row :gutter="20" style="margin-bottom: 20px">
                <i-col :sm="6" :md="4">
                    <Input v-model="trans_number" placeholder="输入水单单号搜索" type="text"></Input>
                </i-col>
                <i-col :sm="18" :md="20">
                    <Button type="primary" @click="search">搜索</Button>
                </i-col>                  
            </Row>
            <Alert type="error" style="padding: 8px 16px">
                <Row :gutter="20">                 
                    <i-col :sm="24">
                        <Collapse>
                            <Panel name="1">
                                查询统计：共计{{data.total_count}}条记录
                                <Button style="margin-left: 20px" type="info" size="small">展开详细</Button>
                                <div slot="content">
                                    <Card>
                                        <Row slot="title" :gutter="10" style="font-weight: bold;line-height:30px">
                                            <i-col :xs="4">
                                                <span class="s-item">
                                                    <span class="s-label">汇总:</span>
                                                    <span class="text-amount">{{total_amount}}</span>元
                                                </span>                                                
                                            </i-col>
                                            <i-col :xs="4">
                                                <span class="s-item">
                                                    <span class="s-label">提成:</span>
                                                    <span class="text-amount">{{commission_amount}}</span>元
                                                </span>                                                
                                            </i-col>
                                            <i-col :xs="16" v-show="summaryArray.length" class="text-right">
                                                (
                                                <span class="s-item" v-for="el in summaryArray" :key="el[0]">
                                                    <span class="s-label">{{el[0]}}:</span>
                                                    <span class="text-amount">{{el[1]}}</span>元
                                                </span>
                                                )                                                     
                                            </i-col>                                                                                                                                                                                                  
                                        </Row>
                                        <div style="font-size: 12px">
                                            <Alert type="success" v-for="(el,index) in data.summary" :key="index">
                                                <Row :gutter="10">
                                                    <i-col :xs="4">
                                                        <span class="s-item">
                                                            <span class="s-label">{{el.order_type_label}}:</span>
                                                            <span class="text-amount">{{el.amount}}</span>元
                                                        </span>                                                      
                                                    </i-col>
                                                    <i-col :xs="4">
                                                        <span class="s-item">
                                                            <span class="s-label">{{el.order_type_label}}提成:</span>
                                                            <span class="text-amount">{{el.commission_amount}}</span>元
                                                        </span>                                                         
                                                    </i-col>
                                                    <i-col :xs="16" class="text-right">
                                                        (
                                                            <span class="s-item" v-for="(item,key) in el.methods" :key="key">
                                                                <span class="s-label">{{item.name}}:</span>
                                                                <span class="text-amount">{{item.amount}}</span>元
                                                            </span>
                                                        )
                                                    </i-col>
                                                </Row>                                                 
                                            </Alert>                                            
                                        </div>                                       
                                    </Card>
                                </div>
                            </Panel>
                        </Collapse>
                    </i-col>
                </Row>
            </Alert>
        </div>
        <MemoTable ref="memoTable" :param="params" @on-change="dataChange"></MemoTable> 
    </Card>     
</template>
<script>
    import StaffSelectSearch from '../../staff_select_search'
    import MemoTable from '../../memo_table'
    import moment from 'moment'
    import SelectStore from '../../store_select'
    let date = moment((new Date()).Format('yyyy-MM'));
    let start_date = date.startOf('month').format("YYYY-MM-DD");
    let end_date = date.endOf('month').format("YYYY-MM-DD");
    let _this;
    export default {
        name: 'Memo',
        data() {
            return {
                data: {
                    total_count: 0
                },
                trans_number: '',
                params: {
                    start_date: start_date,
                    end_date: end_date,
                    order_type: '',
                    mobile: '',
                    customer_name: '',
                    with_store_manager_info: 1,
                    store_id: '',
                    member_card_type: '',
                    with_summary_data: 1,
                    member_type: '',
                    payment_method_code: '',
                    department_id: '',
                    trans_number: ''

                },
                memberCardTypeList: []
            }
        },
        computed: {
            /**
             * 总消费金额
             */
            total_amount () {
                let n = 0;
                if(this.data.summary){
                    this.data.summary.forEach(e=>{
                        n+=e.amount;
                    });
                }
                return n.toFixed(2);
            },
            /**
             * 总提成
             */
            commission_amount () {
                let n = 0;
                if(this.data.summary){
                    this.data.summary.forEach(e=>{
                        n+=e.commission_amount;
                    });
                }
                return n;
            },
            summaryArray () {
                let map = new Map();
                if(this.data.summary){
                    this.data.summary.forEach(e=>{
                        for(let key of Object.keys(e.methods)){
                            let num = map.get(e.methods[key].name)||0;
                            map.set(e.methods[key].name,e.methods[key].amount);
                        }
                    })
                }
                let a = Array.from(map);
                return a;
            },
            departmentList () {
                return this.$store.state.story.departList;
            }
        },
        methods: {
            startChange (v) {
                this.params.start_date = v;
            },
            storeChange (v) {
                this.params.store_id = v;
            },
            endChange (v) {
                this.params.end_date = v;
            },            
            employeeChange (id,d){
                this.params.mobile = d.mobile;
            },
            dataChange (v) {
                this.data = v;
            },
            exportsTable () {
                this.$Modal.confirm({
                    title: '系统提示',
                    content: '确认导出表格',
                    onOk: ()=>{
                        this.$refs['memoTable'].exportsTable();
                    }
                });
            },
            search () {
                this.params.trans_number = this.trans_number;
            }
        },
        mounted () {
            this.$http.get("/boss/memberCard/list").then(res=>{
                this.memberCardTypeList = res.data.items;
            });
            if(this.$store.state.story.store_id){
                this.params.store_id = this.$store.state.story.store_id;
            }
        },
        components: {
            MemoTable,
            SelectStore,
            StaffSelectSearch
        }
    }
</script>
<style type='less' scoped>
    .row-param-item{
        margin-bottom: 15px;
    }
    .s-item{
        padding: 0 5px;
    }
</style>
