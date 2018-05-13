<template>
    <Card class="payroll">       
        <Alert type="info">
            <Row>
                <i-col :xs="24">
                    <select-store style="width:150px;text-align:left"></select-store>
                    <select-stafftype style="width:150px;text-align:left" placeholder="选择职位" @stafftype-change="stafftypeChange"></select-stafftype>
                    <DatePicker :transfer="true" type="date" :value="params.start_at" placeholder="开始日期" style="width: 150px" @on-change="startDateChange"></DatePicker>
                    <DatePicker :transfer="true" type="date" :value="params.end_at" placeholder="结束日期" style="width: 150px" @on-change="endDateChange"></DatePicker>
                    <Select placeholder="员工状态" clearable v-model="params.employee_status" style="width: 150px">
                        <Option value="1">在职</Option>
                        <Option value="0">离职</Option>
                    </Select>                  
                    <Button type="info" size="small" @click="getData">查询</Button>
                    <Button type="success" size="small" @click="exportsCsv">导出表格</Button>
                </i-col>
            </Row>
        </Alert>
        <Card>
        <Row slot="title">
            <i-col :xs="6">员工提成核对</i-col>
            <i-col :xs="18" class="text-right">
                <Input style="width: 200px" v-model="params.employee_name" placeholder="输入员工姓名"></Input>                    
                <Button type="info" size="small" @click="getData">筛选</Button>            
            </i-col>
        </Row>      
        <table class="table table-bordered table-hover table-condensed">
            <thead>
                <tr class="info">
                    <th rowspan="2">编号</th>
                    <th rowspan="2">员工级别+姓名</th>
                    <th colspan="4">服务项目提成(元)</th>
                    <th rowspan="2">商品销售提成</th>
                    <th colspan="3">开卡充值提成(元)</th>
                    <th rowspan="2">订购套餐提成(元)</th>
                    <th rowspan="2">退款扣除提成(元)</th>
                    <th rowspan="2">总计(元)</th>
                </tr>
                <tr class="info">
                    <th style="font-weight:600">指定</th>
                    <th style="font-weight:600">非指定</th>
                    <th style="font-weight:600">内创</th>
                    <th>总提成</th>
                    <th>开卡</th>
                    <th>充值</th>
                    <th>总提成</th>                    
                </tr>                
            </thead>
            <tbody>
                <tr v-for="(el,index) in data" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{el.job_title_name}}+{{el.employee_name}}</td>
                    <td>{{getEmployeeCommission(el.employee_id).getAssignedAmount()}}</td>
                    <td>{{getEmployeeCommission(el.employee_id).getNoneAssignedAmount()}}</td>
                    <td>{{getEmployeeCommission(el.employee_id).geRecommendAmount()}}</td>
                    <td>{{getEmployeeCommission(el.employee_id).getServiceTotalAmount()}}</td>
                    <td>{{getEmployeeCommission(el.employee_id).getProductSellAmount()}}</td>
                    <td>{{getEmployeeCommission(el.employee_id).getNewMemberCardAmount()}}</td>
                    <td>{{getEmployeeCommission(el.employee_id).getRechargeMemberCardAmount()}}</td>
                    <td>{{getEmployeeCommission(el.employee_id).getMemberCardTotalAmount()}}</td>
                    <td>{{getEmployeeCommission(el.employee_id).getGroupedServiceAmount()}}</td>
                    <td>{{getEmployeeCommission(el.employee_id).getRefundAmount()}}</td>
                    <td>{{getEmployeeCommission(el.employee_id).getGrandTotalAmount()}}</td>
                </tr>
            </tbody>
        </table>  
        <Table ref="tables" style="display:none"></Table>
        </Card>   
		<div class="part-loading" v-show="loading">
            <Spin fix>
                <Icon type="load-c" size=28 class="part-loading-spin-icon-load"></Icon>
                <div>加载中</div>
            </Spin>			
		</div>               
    </Card>  
</template>

<script>
import SelectStafftype from '../../stafftype_select'
import SelectStore from '../../store_select'
import moment from 'moment'
import List from "../../../../model/List";
import CommissionCheck from "../../../../model/CommissionCheck";
export default {
    name: 'Commission',
    data () {
        return {
            data: [],
            total_count: 0,
            commissionData: new List(),
            params: {
                start_at: '',
                end_at: '',
                employee_name: '',
                employee_status: '',
                job_title_id: ''
            }
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
            this.getData();
        }
    },
    methods: {
        getEmployeeCommission(employeeId) {
            return this.commissionData.get("employee_id", employeeId);
        },
        startDateChange (v) {
            this.params.start_at = v;             
        },
        endDateChange (v){
            this.params.end_at = v;  
        },
        stafftypeChange (v){
            console.log(v);
            this.params.job_title_id = v;
        },
        getData () {
            let formatParams = (params)=>{
                for(let k in params){
                    if(params[k] === ''){
                        delete params[k];
                    }
                }                
            }
            let params = JSON.parse(JSON.stringify(this.params));
            params.store_id = this.store_id;
            formatParams(params);
            if(this.params.employee_status != "") {
                params.employee_status = this.params.employee_status;
            }
            if(this.params.employee_name != "") {
                params.keywords = this.params.employee_name;
            }
            this.data = [];
            this.commissionData.clear();
            this.$http.get("/boss/employee/commissionCheck",{params}).then(res=>{
                this.data = Object.values(res.data);

                res.data.map((item)=>{
                    let commission = new CommissionCheck();
                    commission.parseJSONObject(item)
                    this.commissionData.push(commission);
                });
                console.log(this.commissionData);
            })         
        },
        getCommission (el,type) {
            let num = 0;
            switch (type) {
                /*
                *   服务项目指定
                */
                case "fwxmzd": 
                    let data = el.assigned_type;
                    if(data&&data.length){
                        data.forEach(e=>{
                            if(e.assigned_type == 1){
                                Object.values(e.methods).forEach(e2=>{
                                    num+=parseFloat(e2.amount);
                                })
                            }
                        })
                    }
                break;
                /*
                *   服务项目现金指定
                */
                case "fwxmxjzd": 
                    let data1 = el.assigned_type;
                    if(data1&&data1.length){
                        data1.forEach(e=>{
                            if(e.assigned_type == 1){
                                if(e.methods&&e.methods.Check){
                                    num+=parseFloat(e.methods.Check.amount);
                                }
                            }
                        })
                    }                
                break;                
                /*
                *   服务刷卡指定
                */
                case "fwxmskzd": 
                    let data2 = el.assigned_type;
                    if(data2&&data2.length){
                        data2.forEach(e=>{
                            if(e.assigned_type == 1){
                                if(e.methods&&e.methods.CreditCard){
                                    num+=parseFloat(e.methods.CreditCard.amount);
                                }
                            }
                        })
                    }                 
                break;
                /*
                *   服务项目非指定
                */
                case "fwxmfzd": 
                    let data3 = el.assigned_type;
                    if(data3&&data3.length){
                        data3.forEach(e=>{
                            if(e.assigned_type == 2){
                                Object.values(e.methods).forEach(e2=>{
                                    num+=parseFloat(e2.amount);
                                })
                            }
                        })
                    }                
                break;
                /*
                *   服务项目现金非指定
                */
                case "fwxmxjfzd": 
                    let data4 = el.assigned_type;
                    if(data4&&data4.length){
                        data4.forEach(e=>{
                            if(e.assigned_type == 2){
                                if(e.methods&&e.methods.Check){
                                    num+=parseFloat(e.methods.Check.amount);
                                }
                            }
                        })
                    }                  
                break;
                /*
                *   服务项目刷卡非指定
                */
                case "fwxmskfzd": 
                    let data5 = el.assigned_type;
                    if(data5&&data5.length){
                        data5.forEach(e=>{
                            if(e.assigned_type == 2){
                                if(e.methods&&e.methods.CreditCard){
                                    num+=parseFloat(e.methods.CreditCard.amount);
                                }
                            }
                        })
                    }                 
                break;
                /*
                *   服务项目内创
                */
                case "fwxmnc": 
                    let data6 = el.assigned_type;
                    if(data6&&data6.length){
                        data6.forEach(e=>{
                            if(e.assigned_type == 3){
                                Object.values(e.methods).forEach(e2=>{
                                    num+=parseFloat(e2.amount);
                                })
                            }
                        })
                    }                
                break;                                                                                
                /*
                *   服务项目总提成
                */
                case "fwxmztc": 
                    num+=parseFloat(this.getCommission(el,'fwxmzd'));
                    num+=parseFloat(this.getCommission(el,'fwxmfzd'));
                    num+=parseFloat(this.getCommission(el,'fwxmnc'));
                break;
                /*
                *   商品销售提成
                */
                case "spxstc": 
                    if(el.grouped_service){
                        num+=parseFloat(el.grouped_service.amount);
                    }                    
                break;
                /*
                *   开卡提成
                */
                case "kktc": 
                    if(el.member_card){
                        num+=parseFloat(el.member_card.new_card);
                    }                 
                break;
                /*
                *   充值提成
                */
                case "cztc": 
                    if(el.member_card){
                        num+=parseFloat(el.member_card.recharge);
                    }                    
                break;  
                /*
                *   充值开卡总提成
                */
                case "kkztc": 
                    num+=parseFloat(this.getCommission(el,'cztc'));
                    num+=parseFloat(this.getCommission(el,'kktc'));
                break;
                /*
                *   订购套餐总提成
                */
                case "dgtctc": 
                    if(el.grouped_service){
                        num+=parseFloat(el.grouped_service.amount);
                    }
                break;
                /*
                *   退款扣除总提成
                */
                case "tkkctc": 
                    if(el.refund){
                        num+=parseFloat(el.refund.amount);
                    }
                break;
                /*
                *   总计
                */
                case "zj": 
                    num+=parseFloat(this.getCommission(el,'fwxmztc'));
                    num+=parseFloat(this.getCommission(el,'kkztc'));
                    num+=parseFloat(this.getCommission(el,'dgtctc'));
                    num-=parseFloat(this.getCommission(el,'tkkctc'));
                break;
                default: 
                    num = 0;
                break;                                                                                                                                            
            }
            return num.toFixed(2);
        },
        exportsCsv () {
            let index = 1;          
            this.$refs['tables'].exportCsv({
                filename: 'employee-commission',
                columns: [{
                    title: '编号',
                    render (h,p) {
                        return index++;
                    }
                },{
                    title: '员工级别+姓名',
                    render (h,p) {
                        return p.row.job_title_name+","+p.row.employee_name;
                    }
                },{
                    title: '服务项目提成',
                    render (h,p) {
                        return this.getCommission(p.row,'fwxmztc');
                    }
                },{
                    title: '商品销售提成',
                    render (h,p) {
                        return this.getCommission(p.row,'spxstc');
                    }
                },{
                    title: '开卡充值提成',
                    render (h,p) {
                        return this.getCommission(p.row,'kkztc');
                    }
                },{
                    title: '订购套餐提成',
                    render (h,p) {
                        return this.getCommission(p.row,'dgtctc');
                    }
                },{
                    title: '退款扣除提成',
                    render (h,p) {
                        return this.getCommission(p.row,'tkkctc');
                    }
                },{
                    title: '总计',
                    render (h,p) {
                        return this.getCommission(p.row,'zj');
                    }
                }],
                data: this.data
            })
        }
    },
    components: {
        SelectStafftype,
        SelectStore
    },
    mounted () {
        let date = moment((new Date()).Format('yyyy-MM'));
        this.params.start_at = date.startOf('month').format("YYYY-MM-DD");
        this.params.end_at = date.endOf('month').format("YYYY-MM-DD");        
        if(this.store_id){
            this.getData();
        }
    }
}
</script>

<style>
.table th, .table td { 
    text-align: center;
    vertical-align: middle!important;
    font-weight: normal;
}
</style>
