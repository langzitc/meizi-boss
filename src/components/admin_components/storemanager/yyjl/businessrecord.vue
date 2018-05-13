<template>
    <Card>
        <div slot="title">
            <Row class="clearfix" :gutter="20">
                <i-col :sm="6" :md="4" class="row-param-item">
                    <select-store style="width:100%" @store-change="storeChange"></select-store>
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
                    <Select placeholder="顾客类型" v-model="params.member_type" clearable>
                        <Option value="0">散客</Option>
                        <Option value="1">会员</Option>
                    </Select>
                </i-col>  
                <i-col :sm="6" :md="4" class="row-param-item">
                    <Select placeholder="支付方式" v-model="params.payment_method_code">
                        <Option value="">全部</Option>
                        <Option value="0">线下支付</Option>
                        <Option value="1">线上支付</Option>
                    </Select>
                </i-col>                                                                                                                               
            </Row>
            <Row :gutter="20" style="margin-bottom: 20px">
                <i-col :sm="6" :md="4">
                    <Input v-model="params.trans_number" placeholder="输入水单单号搜索" type="text"></Input>
                </i-col>
                <i-col :sm="18" :md="20">
                    <Button type="primary" @click="search">搜索</Button>
                </i-col>                  
            </Row>
            <Alert type="error">
                <Row :gutter="20">                 
                    <i-col :sm="24">
                        <Collapse>
                            <Panel name="1">
                                查询统计：共计{{total_count}}条记录
                                <Button style="margin-left: 20px" type="info" size="small">展开详细</Button>
                                <div slot="content">
                                    <Card>
                                        <Row slot="title" :gutter="10" style="font-weight: bold">
                                            <i-col :xs="6">
                                                <span class="s-item">
                                                    <span class="s-label">汇总:</span>
                                                    <span class="text-amount">{{total_amount}}</span>元
                                                </span>                                                
                                            </i-col>
                                            <i-col :xs="6">
                                                <span class="s-item">
                                                    <span class="s-label">提成:</span>
                                                    <span class="text-amount">{{commission_amount}}</span>元
                                                </span>                                                
                                            </i-col>
                                            <i-col :xs="12" v-show="summaryArray.length" class="text-right">
                                                (
                                                <span class="s-item" v-for="el in summaryArray" :key="el[0]">
                                                    <span class="s-label">{{el[0]}}:</span>
                                                    <span class="text-amount">{{el[1]}}</span>元
                                                </span>
                                                )                                                     
                                            </i-col>                                                                                                                                                                                                  
                                        </Row>
                                        <div style="font-size: 12px">
                                            <Alert type="success" v-for="el in summary" :key="el.amount">
                                                <Row :gutter="10">
                                                    <i-col :xs="6">
                                                        <span class="s-item">
                                                            <span class="s-label">{{el.order_type_label}}:</span>
                                                            <span class="text-amount">{{el.amount}}</span>元
                                                        </span>                                                      
                                                    </i-col>
                                                    <i-col :xs="6">
                                                        <span class="s-item">
                                                            <span class="s-label">{{el.order_type_label}}提成:</span>
                                                            <span class="text-amount">{{el.commission_amount}}</span>元
                                                        </span>                                                         
                                                    </i-col>
                                                    <i-col :xs="12" class="text-right">
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
        <Table ref="table" border :columns="columns" :loading="loading" :data="data"></Table>
        <div class="text-right" style="margin-top: 15px">
            <Page :current="params.page" @on-change="pageChange" :total="total_count" size="small"></Page>
        </div>  
    </Card>     
</template>
<script>
    import StaffSelectSearch from '../../staff_select_search'
    import moment from 'moment'
    import SelectStore from '../../store_select'
    let date = moment((new Date()).Format('yyyy-MM'));
    let start_date = date.startOf('month').format("YYYY-MM-DD");
    let end_date = date.endOf('month').format("YYYY-MM-DD");
    let _this;
    export default {
        name: 'Businessrecord',
        data() {
            return {
                data: [],
                columns: [{
                    title: '流水单号',
                    key: 'trans_number',
                    width: 160
                },{
                    title: '水单时间',
                    key: 'created_at',
                    width: 160
                },{
                    title: '消费金额',
                    key: 'grand_total'
                },{
                    title: '顾客',
                    key: 'customer_name'
                },{
                    title: '实际支付',
                    render (h,p) {
                        let n = 0;
                        p.row.payments.forEach(e=>{
                            if(!e.is_deduction){
                                n+=parseFloat(e.amount);
                            }
                        })
                        return n.toFixed(2);
                    }
                },{
                    title: '服务项目',
                    render (h,p) {
                        let arr = [];
                        p.row.items.forEach(e=>{
                            arr.push(e.product_name);
                        })
                        if(arr.length){
                            return arr.join(",");
                        }else{
                            return "-";
                        }
                    }
                },{
                    title: '操作人',
                    render (h,p) {
                        let set = new Set();
                        p.row.items.forEach(e=>{
                            e.employees.forEach(e2=>{
                                set.add(e2.employee_name);
                            })
                        });
                        if(set.size){
                            return Array.from(set).join(",");
                        }else{
                            return '-';
                        }
                    }
                }],
                total_count: 0,
                loading: false,
                summary: [],
                params: {
                    start_date: start_date,
                    end_date: end_date,
                    page: 1,
                    page_size: 10,
                    mobile: '',
                    customer_name: '',
                    with_store_manager_info: 1,
                    store_id: '',
                    member_type: '',
                    store_member_id:0,
                    payment_method_code: '',
                    trans_number: '',
                    order_type: 0,
                    with_summary_data: 1
                },
                trans_number: ''
            }
        },
        computed: {
            /**
             * 总消费金额
             */
            total_amount () {
                let n = 0;
                this.summary.forEach(e=>{
                    n+=e.amount;
                });
                return n;
            },
            /**
             * 总提成
             */
            commission_amount () {
                let n = 0;
                this.summary.forEach(e=>{
                    n+=e.commission_amount;
                });
                return n;
            },
            summaryArray () {
                let map = new Map();
                this.summary.forEach(e=>{
                    for(let key of Object.keys(e.methods)){
                        let num = map.get(e.methods[key].name)||0;
                        map.set(e.methods[key].name,e.methods[key].amount);
                    }
                })
                let a = Array.from(map);
                return a;
            }
        },
        watch: {
            params: {
                deep: true,
                handler: (n,o)=>{
                    //_this.getOrderList();
                }                             
            }            
        },
        methods: {
            startChange (v) {
                this.params.start_date = v;
            },
            endChange (v) {
                this.params.end_date = v;
            },            
            employeeChange (id,d){
                this.params.store_member_id = d.id;
                this.params.mobile = d.mobile;
            },
            search () {
                _this.getOrderList();
                //this.params.trans_number = this.trans_number;
            },
            pageChange (v) {
                this.params.page = v;
                this.getOrderList();
            },
            storeChange (v) {
                this.getOrderList();
            },
            getOrderList () {
                this.loading = true;
                let params = JSON.parse(JSON.stringify(this.params));
                params.store_id = this.$store.state.story.store_id;
                if(params.member_type){
                    params.only_member_order = params.member_type;
                }                
                for(let i in params){
                    if(params[i] === ''){
                        delete params[i];
                    }
                }
                this.$http.get("/boss/order/list",{params}).then(res=>{
                    this.total_count = parseInt(res.data.total_count);
                    this.data = res.data.items;
                    this.summary = res.data.summary;
                    this.loading = false;
                })                
            }
        },
        components: {
            SelectStore,
            StaffSelectSearch
        },
        mounted () {     
            _this = this;
            if(this.$store.state.story.store_id){
                this.getOrderList();
            }     
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
