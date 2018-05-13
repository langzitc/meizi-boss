<template>
    <Card>
        <div slot="title">
            <Row :gutter="20">
                <!--
                <i-col :xs="8">
                    <Select v-model="status" @on-change="getList">
                        <Option value="pending">挂单</Option>
                        <Option value="processing">普通订单</Option>
                        <Option value="complete">已完成</Option>
                        <Option value="canceled">已取消</Option>
                        <Option value="refund">退款</Option>
                    </Select>                     
                </i-col>
                -->
                <i-col :xs="8">
                    <Input v-model="keywords" placeholder="输入关键字..." style="width: 200px">
                        <Button slot="append" icon="ios-search" @click="getList"></Button>
                    </Input>
                </i-col>
            </Row>
        </div>
        <Table border :columns="columns" :loading="loading" :data="data"></Table>
        <div class="text-right" style="margin-top: 15px">
            <Page :current="page" @on-change="pageChange" :total="total_count" size="small"></Page>
        </div>        
    </Card>
</template>
<script>
    import SelectStore from '../store_select'
    let _this;
    export default {
        name: 'Guadan',
        data() {
            return {
                page: 1,
                page_size: 10,
                total_count: 0,
                loading: false,
                data: [],
                columns: [{
                    title: '订单编号',
                    key: 'trans_number'
                },{
                    title: '顾客姓名',
                    render (h,p) {
                        let name = "";
                        if(p.row.customer_name){
                            name = p.row.customer_name;
                        }else{
                            name = "散客";
                        }
                        return name;
                    }
                },{
                    title: '消费总额',
                    key: 'grand_total',
                    render (h,p) {
                        return parseFloat(p.row.grand_total).toFixed(2);
                    }
                },{
                    title: '抵扣',
                    render (h,p) {
                        let n = 0;
                        p.row.payments.forEach(e=>{
                            if(e.is_deduction){
                                n+=parseFloat(e.amount)
                            }
                        });
                        return n.toFixed(2);
                    }                    
                },{
                    title: '应付金额',
                    render (h,p) {
                        let n = 0;
                        p.row.payments.forEach(e=>{
                            if(!e.is_deduction){
                                n+=parseFloat(e.amount)
                            }
                        });
                        return n.toFixed(2);
                    }                    
                },{
                    title: '操作',
                    align: 'right',
                    render (h,p) {
                        return h('span',[
                            h('Button',{
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                on: {
                                    click: ()=>{
                                        _this.$router.push({
                                            name: 'cashier',
                                            query: {
                                                order_id: p.row.id
                                            }
                                        });
                                    }
                                }
                            },"结算"),
                            h('Button',{
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    marginLeft: '15px'
                                },
                                on: {
                                    click: ()=>{
                                        let id = p.row.id;
                                        _this.$Modal.confirm({
                                            title: '系统提示',
                                            content: '确认删除订单?',
                                            onOk: ()=>{
                                                _this.$http.post("/boss/order/cancel",{id}).then(res=>{
                                                    _this.$Message.success(res.message);
                                                    _this.getList();
                                                });
                                            }
                                        });
                                    }
                                }
                            },"删除")                                                        
                        ])
                    }
                }],
                status: 'pending',
                keywords: ''
            }
        },
        computed: {
            store_id () {
                return this.$store.state.story.store_id;
            }
        },
        watch: {
            store_id () {
                this.getList();
            }
        },
        methods: {
            pageChange () {
                this.getList();
            },
            getList () {
                let params = {
                    store_id: this.store_id,
                    page: this.page,
                    page_size: this.page_size,
                    status: this.status
                };
                if(this.keywords){
                    params.trans_number = this.keywords;
                }
                this.loading = true;
                this.$http.get("/boss/order/list",{params}).then(res=>{
                    this.data = res.data.items;
                    this.total_count = parseInt(res.data.total_count);
                    this.loading = false;
                });
            }
        },
        mounted () {
            _this = this;
            if(this.store_id){
                this.getList();
            }
        },
        components: {
            SelectStore
        }
    }
</script>
<style type='less' scoped>
</style>
