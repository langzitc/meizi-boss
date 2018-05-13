<template>
    <Tabs :value="tabName">
        <TabPane label="预约记录查询" name="yyjlcx">
            <Card>
                <div slot="title">      
                    <Row :gutter="20">
                        <i-col :sm="4">
                            <staff-select :store_id="params.store_id" @staff-change="staffChange"></staff-select>
                        </i-col>
                        <i-col :sm="4">
                            <Select placeholder="订单状态" v-model="params.pre_order_status" clearable>
                                <Option value="0">待实施</Option>
                                <Option value="1">已实施</Option>
                                <Option value="2">已取消</Option>
                                <Option value="3">爽约</Option>
                            </Select>                           
                        </i-col>
                        <i-col :sm="10">
                            <DatePicker :transfer="true" type="date" @on-change="startChange" :value="params.start_date"></DatePicker>
                            <span style="padding: 0 5px">至</span>            
                            <DatePicker :transfer="true" type="date" @on-change="endChange" :value="params.end_date"></DatePicker>                        
                        </i-col>
                        <i-col :sm="6">
                            <Input type="text" placeholder="输入顾客姓名搜索" v-model="customer_name">
                                <Button type="primary" slot="append" @click="search">搜索</Button>
                            </Input>                         
                        </i-col>                           
                    </Row>
                    <Row style="margin-top: 20px">
                        <i-col :sm="24">
                            <Alert type="warning">
                                <MakeAppointmentModal :store_id="params.store_id" @yuyue-success="yuyueChange"></MakeAppointmentModal>
                                <span style="margin-left: 30px">查询统计：共<span class="text-amount">{{total_count}}</span>条预约记录，待实施<span class="text-amount">{{dss}}</span>条   已实施<span class="text-amount">{{yss}}</span>条  已爽约<span class="text-amount">{{ysy}}</span>条</span>
                            </Alert>
                        </i-col>
                    </Row>
                </div>
                <div>
                    <Table  border ref="srsTable" :data="data" :columns="columns" :loading="loading"></Table>         
                    <div style="margin-top: 15px" class="text-right">
                        <Page :current="params.page" @on-change="pageChange" :total="total_count" size="small"></Page> 
                    </div>                     
                </div>      
            </Card>
        </TabPane>
        <TabPane label="员工预约列表" name="ygyylb">
            <MakeAppointmentInfo ref="makeappointmentinfo"></MakeAppointmentInfo>
        </TabPane>
    </Tabs>
</template>
<script>
    import MakeAppointmentModal from './makeAppointmentModal'
    import MakeAppointmentTimeModal from './makeAppointmentTimeModal'
    import StaffSelect from '../staff_select'
    import MakeAppointmentInfo from './makeAppointmentInfo'
    import moment from 'moment'
    let date = moment((new Date()).Format('yyyy-MM'));
    let start_date = date.startOf('month').format("YYYY-MM-DD");
    let end_date = date.endOf('month').format("YYYY-MM-DD");
    let _this;

    export default {
        name: 'MakeAppointment',
        data() {
            return {
                tabName: 'yyjlcx',
                total_count: 0,
                data: [],
                loading: false,
                customer_name: '',
                params: {
                    pre_order_status: '',
                    start_date: start_date,
                    end_date: end_date,
                    mobile: '',
                    page_size: 10,
                    page: 1,
                    store_id: '',
                    store_member_id: '',
                    employee_id: '',
                    customer_name: ''
                },
                columns: [{
                    title: '顾客姓名',
                    key: 'customer_name',
                    width: 100
                },{
                    title: '顾客电话',
                    key: 'mobile',
                    width: 120
                },{
                    title: '开会卡类型',
                    width: 120,
                    render(h,p){
                        if(p.row.member_type == 1){
                            return '散客';
                        }else{
                            return '会员';
                        }
                    }
                },{
                    title: '预约时间',
                    width: 150,
                    key: 'appointment_start_at'
                },{
                    title: '服务内容',
                    width: 200,
                    render (h,p) {
                        let arr = [];
                        p.row.items.forEach(e=>{
                            arr.push(h('Tag',{
                                props: {
                                    color: 'blue'
                                }
                            },e.product_name));
                        })
                        return h('span',arr);
                    }
                },{
                    title: '服务员工',
                    width: 100,
                    render (h,p) {
                        let set = new Set();
                        p.row.items.forEach(e=>{
                            e.employees.forEach(e2=>{
                                set.add(e2.employee_name);
                            })
                        });
                        return Array.from(set).join(',');
                    }
                },{
                    title: '实施状态',
                    width: 100,
                    render (h,p) {
                        let str;
                        switch (parseInt(p.row.appointment_status)) {
                            case 0: 
                                str = "待实施";
                            break;
                            case 1: 
                                str = "已实施";
                            break;
                            case 2: 
                                str = "已取消";
                            break;
                            case 3: 
                                str = "爽约";
                            break;
                        }
                        return str;
                    }
                },{
                    title: '是否支付',
                    width: 100,
                    render (h,p) {
                        let str = "";
                        if(p.row.payments.length){
                            switch (parseInt(p.row.payments[0].status)) {
                                case 0: 
                                    str = "未支付";
                                break;
                                case 1: 
                                    str = "已支付";
                                break;
                            }                            
                        }
                        return str;
                    }
                },{
                    title: '预约渠道',
                    width: 100,
                    render (h,p) {
                        let str;
                        switch (parseInt(p.row.appointment_from)){
                            case 0: 
                                str = "线下预约";
                            break;
                            case 1: 
                                str = "线上预约";
                            break;
                        }
                        return str;
                    }
                },{
                    title: '操作',
                    width: 220,
                    align: 'right',
                    fixed: 'right',
                    render (h,p) {
                        if(p.row.appointment_status == 0){
                            return h('span',[
                                h('Button',{
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click (){
                                           if(p.row.payments_status == 0 && p.row.appointment_from ==0){
                                                _this.setStatus2(p.row.id);
                                           }else{
                                               _this.setStatus(1,p.row.id);
                                           }
                                        }
                                    },
                                    style: {
                                        marginRight: '10px'
                                    }
                                },"到店"),
                                h(MakeAppointmentTimeModal,{
                                    props: {
                                        data: p.row
                                    },
                                    on: {
                                        'on-change' () {
                                            _this.getOrderList();
                                        }
                                    },
                                    style: {
                                        marginRight: '10px'
                                    }                                                                         
                                }),
                                h('Button',{
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    on: {
                                        click (){
                                            _this.setStatus(2,p.row.id);
                                        }
                                    }                                                                  
                                },"取消"),                                                                                        
                            ])                            
                        }else{
                            return '-';
                        }
                    }
                }]
            }
        },
        methods: {
            pageChange (v) {
                this.params.page = v;
            },
            getOrderList () {
                if(this.params.store_id){            
                    let params = JSON.parse(JSON.stringify(this.params));
                    for(let k in params){
                        if(params[k]===""){
                            delete params[k];
                        }
                    }
                    this.loading = true;
                    this.$http.get("/boss/order/preOrderList",{params}).then(res=>{
                        this.total_count = parseInt(res.data.total_count);
                        this.data = res.data.items;
                        this.loading = false;
                    });                                         
                }
            },
            yuyueChange () {
                this.getOrderList();
                // this.$refs['makeappointmentinfo'].getInfo();
            },
            staffChange (e) {
                this.params.employee_id = e.id;
            },
            setStatus2 (id) {
                this.$Modal.confirm({
                    title: '系统提示',
                    content: '确认操作？',
                    onOk: ()=>{
                        this.$http.post("/boss/orderUpdate/status",{status: 'pending',id}).then(res=>{
                            this.$Message.success(res.message);
                            this.getOrderList();
                        })
                    }
                });
            },
            setStatus (status,order_id) {
                this.$Modal.confirm({
                    title: '系统提示',
                    content: '确认操作？',
                    onOk: ()=>{
                        this.$http.post("/boss/order/setPreOrderStatus",{status,order_id}).then(res=>{
                            this.$Message.success(res.message);
                            this.getOrderList();
                        })
                    }
                });
            },            
            startChange (v) {
                this.params.start_date = v;
            },
            endChange (v) {
                this.params.end_date = v;
            },
            search () {
                this.params.customer_name = this.customer_name;
                this.getOrderList();
            }
        },
        watch: {
            params: {
                deep: true,
                handler (n,o){
                    this.getOrderList();
                }
            },
            store_id () {
                this.params.store_id = this.store_id;
            }
        },
        mounted () {
            let startTime = (new Date("2010/01/01 08:00:00")).getTime();
            _this = this;
            if(this.store_id){
                this.params.store_id = this.store_id;
            }
        },
        components: {
            MakeAppointmentModal,
            StaffSelect,
            MakeAppointmentInfo,
            MakeAppointmentTimeModal
        },
        computed:  {
            dss () {
                return this.data.filter(e=>{
                    return e.appointment_status == 0;
                }).length;
            },
            yss () {
                return this.data.filter(e=>{
                    return e.appointment_status == 1;
                }).length;
            },
            ysy () {
                return this.data.filter(e=>{
                    return e.appointment_status == 3;
                }).length;
            },
            store_id () {
                return this.$store.state.story.store_id;
            }
        }
    }
</script>
<style type='less' scoped>
</style>
