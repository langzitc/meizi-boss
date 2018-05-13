<template>
    <div>
        <Table ref="table" :width="tableWidth" border :columns="columns" :loading="loading" :data="data"></Table>
        <div class="text-right" style="margin-top: 15px">
            <Page :current="params.page" @on-change="pageChange" :total="total_count" size="small"></Page>
        </div>          
    </div>
</template>
<script>
    import EditOrder from './workbench/editOrder'
    let nowDay = (new Date()).Format('yyyy-MM-dd');
    let _this;
    export default {
        name: 'MemoTable',
        data() {
            return {
                params: {
                    start_date: nowDay,
                    end_date: nowDay,
                    page: 1,
                    page_size: 10,
                    order_type: '',
                    mobile: '',
                    customer_name: '',
                    with_store_manager_info: 1
                },
                tableWidth: 1200,
                loading: false,
                total_count: 0,
                columns: [{
                    title: '流水单号',
                    key:  'trans_number',
                    width: 150,
                    fixed: 'left'
                },{
                    title: '水单时间',
                    key: 'created_at',
                    width: 150
                },{
                    title: '顾客',
                    width: 150,
                    render (h,p){
                        return h('div',{
                            style: {
                                paddingTop: '10px'
                            }
                        },[
                            h('p',p.row.customer_name),
                            h('p',p.row.mobile)
                        ])
                    }
                },{
                    title: '消费金额',
                    width: 100,
                    key: 'grand_total'
                },{
                    title: '实际支付',
                    width: 100,
                    render (h,p) {
                        let n = 0;
                        p.row.payments.forEach(e=>{
                            if(!e.is_deduction){
                                n+=parseFloat(e.amount)
                            }
                        });
                        return n.toFixed(3);
                    }
                },{
                    title: '订单类型',
                    width: 150,
                    render (h,p) {
                        switch (parseInt(p.row.order_type)){
                            case 0: 
                                return '服务项目消费';
                            break;
                            case 1: 
                                return '套餐订购';
                            break;
                            case 2: 
                                return '会员充值';
                            break;
                            case 3: 
                                return '会员开卡';
                            break;
                        }
                    }
                },{
                    title: '服务与提成',
                    width: 200,
                    render (h,p) {
                        let arr = [];
                        p.row.items.forEach(e=>{
                            arr.push(h('Tag',{
                                props: {
                                    color: 'green'
                                }
                            },e.product_name));
                        })
                        return h('Row',[
                            h('Col',{
                                props: {
                                    xs: 16
                                }
                            },arr),
                            h("Col",{
                                props: {
                                    xs: 8
                                },
                                attrs: {
                                    class: 'text-right'
                                }                                
                            },[
                                h("Button",{
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click (){
                                            _this.showInfo(p.row);
                                        }
                                    }
                                },"详情")
                            ])
                        ])
                    }
                },{
                    title: '操作时间',
                    key: 'updated_at',
                    width: 150
                },{
                    title: '备注',
                    key: 'description'
                },{
                    title: '操作',
                    width: 160,
                    align: 'right',
                    fixed: 'right',
                    render (h,p) {
                        return h('span',[
                            h(EditOrder,{
                                props: {
                                    config: p.row,
                                    disabled: p.row.status === 'canceled'
                                },
                                on: {
                                    'on-change' () {
                                        _this.getOrderList();
                                    }
                                }
                            }),
                            h('Button',{
                                props: {
                                    type: 'warning',
                                    size: 'small',
                                    disabled: p.row.status === 'canceled'
                                },
                                style: {
                                    marginLeft: '5px'
                                },                                
                                on: {
                                    click () {
                                        _this.cancel(p.row.id,p.row.payment_status);
                                    }
                                }
                            },"撤销")                                                    
                        ])
                    }
                }],
                data: []
            }
        },
        props: {
            param: {
                type: Object
            }
        },
        watch: {
            param: {
                deep: true,
                handler: (n,o)=>{
                    Object.assign(_this.params,n);
                    _this.getOrderList();                       
                }                             
            }
        },
        methods: {
            getOrderList () {
                this.loading = true;
                let params = JSON.parse(JSON.stringify(this.params));
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
                    this.loading = false;
                    this.$emit('on-change',res.data);
                })
            },
            pageChange (v){
                this.params.page = v;
                this.getOrderList();
            },
            exportsTable () {
                let data = JSON.parse(JSON.stringify(this.data));
                data.map(e=>{
                    e.guke = `姓名：${e.customer_name}，电话：${e.mobile}`;
                    let sjzf = 0;
                    e.payments.forEach(e2=>{
                        if(e2.is_deduction){
                            sjzf+=parseFloat(e2.amount)
                        }
                    });
                    e.sjzf = sjzf;
                    switch (parseInt(e.order_type)){
                        case 0: 
                            e.ddlx =  '服务项目消费';
                        break;
                        case 1: 
                            e.ddlx = '套餐订购';
                        break;
                        case 2: 
                            e.ddlx = '会员充值';
                        break;
                        case 3: 
                            e.ddlx = '会员开卡';
                        break;
                    }
                    e.fwytc = e.items.map(e2=>{
                        return e2.product_name;
                    }).join(",");                    
                })
                let columns = [{
                    title: '流水单号',
                    key:  'trans_number'
                },{
                    title: '水单时间',
                    key: 'created_at'
                },{
                    title: '顾客',
                    key: 'guke'
                },{
                    title: '消费金额',
                    key: 'grand_total'
                },{
                    title: '实际支付',
                    key: 'sjzf'
                },{
                    title: '订单类型',
                    key: 'ddlx'
                },{
                    title: '服务内容',
                    key: 'fwytc'
                },{
                    title: '操作时间',
                    key: 'updated_at',
                },{
                    title: '备注',
                    key: 'description',
                }];
                this.$refs['table'].exportCsv({
                        filename: `${this.params.start_date}~${this.params.end_date}`,
                        original: true,
                        data: data,
                        columns: columns                    
                })
            },
            cancel (id,status) {
                this.$Modal.confirm({
                    title: '系统提示',
                    content: status == 1 ? '确认“撤销”订单 ?，撤销后，支付资金将原路径返回' : '确认“撤销”订单 ?',
                    onOk: ()=>{
                        this.$http.post("/boss/order/cancel",{id}).then(res=>{
                            this.$Notice.success({
                                title: '系统通知',
                                duration: 5,
                                desc: res.message
                            });   
                            this.getOrderList();                          
                        })
                    }
                });
            },
            showInfo (row) {
                this.$Modal.confirm({
                    title: '服务提成详情',
                    cancelText: '关闭',
                    render: (h)=>{
                        return h('Table',{
                            props: {
                                border: true,
                                data: row.items,
                                columns: [{
                                    title: '服务内容',
                                    key: 'product_name'
                                },{
                                    title: '服务员工',
                                    render (h,p) {
                                        let arr = [];
                                        p.row.employees.forEach(e=>{
                                            arr.push(h('p',e.employee_name));
                                        })
                                        return h('div',{
                                            style: {
                                                paddingTop: '10px'
                                            }
                                        },arr);
                                    }
                                },{
                                    title: '提成',
                                    render (h,p) {
                                        let arr = [];
                                        p.row.employees.forEach(e=>{
                                            arr.push(h('p','￥'+ (parseFloat(e.amount)).toFixed(2)));
                                        })
                                        return h("div",{
                                            style: {
                                                paddingTop: '10px'
                                            }                                            
                                        },arr);
                                    }                                    
                                }]
                            },
                            style:{
                                marginTop: '30px'
                            }
                        });
                    }
                });
            }
        },
        mounted () {
            _this = this;
            this.getOrderList();
            let init = ()=>{
                this.tableWidth = parseInt(document.getElementsByClassName('ivu-card-body')[0].style.width)            
            }
            window.addEventListener('resize',()=>{
                init();
            })
            init();              
        }
    }
</script>
<style type='less' scoped>
</style>
