<template>
    <Card class="payroll">       
        <Alert type="info">
            <Row>
                <i-col :xs="24" style="line-height: 30px;font-size: 20px;padding:15px 0;text-align:center">
                    <span class="text-danger">{{dates}}</span>工资表
                </i-col>
                <i-col :xs="24">
                    <select-store style="width:150px;text-align:left"></select-store>
                    <select-stafftype style="width:150px;text-align:left" placeholder="选择职位" @stafftype-change="stafftypeChange"></select-stafftype>
                    <DatePicker :transfer="true" type="month" :value="params.start_at" placeholder="选择年月" style="width: 150px" @on-change="dateChange"></DatePicker>
                    <Select placeholder="员工状态" clearable v-model="params2.employee_status" style="width: 150px">
                        <Option value="1">在职</Option>
                        <Option value="0">离职</Option>
                    </Select>
                    <Button type="info" size="small" @click="getData">查询</Button>
                    <Button type="success" size="small">导出表格</Button>
                </i-col>
            </Row>
        </Alert>
        <Card>
        <Row slot="title">
            <i-col :xs="6">员工工资表</i-col>
            <i-col :xs="18" class="text-right">
                <Input style="width: 200px" v-model="employeeName" placeholder="输入员工姓名筛选"></Input>
                <Button type="info" size="small" @click="saixuan">筛选</Button>
            </i-col>
        </Row>      
        <table class="table table-bordered table-condensed">
            <thead>
                <tr class="info">
                    <th>员工编号</th>
                    <th>员工级别+姓名</th>
                    <th>提成(元)</th>
                    <th>底薪(元)</th>
                    <th>奖金(元)</th>
                    <th>扣款(元)</th>
                    <th>代扣款(元)</th>
                    <th>备注</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data" :key="item.employee_id">
                    <td>{{item.employee_number}}</td>
                    <td>{{item.employee_name}}-{{item.employee_job_title}}</td>
                    <td>{{item.commission_amount}}元</td>
                    <td class="hipus"><InputNumber :max="10000" :min="0" v-model="item.base_amount"></InputNumber></td>
                    <td class="hipus"><InputNumber :max="10000" :min="0" v-model="item.bonus_amount"></InputNumber></td>
                    <td class="hipus"><InputNumber :max="10000" :min="0" v-model="item.deduct_amount"></InputNumber></td>
                    <td class="hipus"><InputNumber :max="10000" :min="0" v-model="item.withholding_amount"></InputNumber></td>
                    <td class="hipus"><Input type="textarea" placeholder="输入备注" v-model="item.comment"></Input></td>
                </tr>
                <tr v-show="!data.length">
                    <td colspan="8" class="text-muted">无数据</td>
                </tr>
                <tr class="warning">
                    <td>小计</td>
                    <td></td>
                    <td>{{sum('commission_amount')}}元</td>
                    <td>{{sum('base_amount')}}元</td>
                    <td>{{sum('bonus_amount')}}元</td>
                    <td>{{sum('deduct_amount')}}元</td>
                    <td>{{sum('withholding_amount')}}元</td>
                    <td></td>
                </tr>
                <tr class="success">
                    <td>合计</td>
                    <td colspan="7">{{total}}元</td>
                </tr>                
            </tbody>
        </table>  
        <Button type="info" @click="saveGzb">保存工资表</Button>
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
let backData = [];
export default {
    name: 'Payroll',
    data () {
        return {
            data: [],
            total_count: 0,
            employeeName: '',
            searchDate:'',
            params2: {
                job_title_id: '',
                is_deleted: '',
                employee_status:''
            },
            params: {
                start_at: '',
                end_at: '',
                employee_id: '',
                employee_status: ''
            }
        }
    },
    computed: {
        dates () {
            return (new Date(this.searchDate)).Format('yyyy年MM月');
        },
        store_id () {
            return this.$store.state.story.store_id;
        },
        total () {
            let n = 0;
            this.data.forEach(e=>{
                n+=parseFloat(e.commission_amount);
                n+=parseFloat(e.bonus_amount);
                n+=parseFloat(e.base_amount);
                n-=parseFloat(e.deduct_amount);
                n-=parseFloat(e.withholding_amount);
            })
            return n.toFixed(2);
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
        sum (keys) {
            let n = 0;
            this.data.forEach(e=>{
                n+=parseFloat(e[keys]);
            })
            return n.toFixed(2);            
        },
        saixuan () {
            if(this.employeeName){
                this.data = backData.filter(e=>{
                    return e.name.includes(this.employeeName);
                })
            }else{
                this.data = backData;
            }
        },
        dateChange (v) {
            let a = v.split("-");
            let date = moment(a[0]+"-"+a[1]);
            this.params.start_at = date.startOf('month').format("YYYY-MM-DD");
            this.params.end_at = date.endOf('month').format("YYYY-MM-DD");               
        },
        stafftypeChange (v){
            this.params2.job_title_id = v;
        },
        getData () {
            this.searchDate = this.params.start_at;
            let formatParams = (params)=>{
                for(let k in params){
                    if(params[k] === ''){
                        delete params[k];
                    }
                }                
            }
            let params2 = JSON.parse(JSON.stringify(this.params2));
            let params = JSON.parse(JSON.stringify(this.params));
            params2.store_id = this.store_id;
            params.store_id = this.store_id;

            formatParams(params2);
            formatParams(params);
            let salaryParams = {
                store_id: this.store_id,
                year: (new Date(this.params.start_at)).getFullYear(),
                month: (new Date(this.params.start_at)).getMonth()+1
            };
            if(this.params2.employee_status != "") {
                salaryParams.employee_status = this.params2.employee_status;
            }
            if(this.params2.job_title_id != "") {
                salaryParams.job_title_id = this.params2.job_title_id;
            }

            this.$http.get("/boss/employeeSalary/list",{params:salaryParams}).then(res=>{
                this.data = res.data;
                if(res.data.length){
                    backData = JSON.parse(JSON.stringify(this.data));
                }

                this.$http.get("/boss/employeeSalary/commissionList",{params}).then(res=>{
                    let data = [];
                    this.data.forEach(e=>{
                        let obj = {};
                        let employee_commission_amount = 0;
                        res.data.forEach(e2=>{
                            if(e2.employee_id == e.employee_id){
                                employee_commission_amount = parseFloat(e2.employee_commission_amount).toFixed(2);
                            }
                        })
                        if(!e.id) {
                            e.base_amount = 0;
                            e.deduct_amount = 0;
                            e.withholding_amount = 0;
                            e.bonus_amount = 0;
                        }
                        e.commission_amount = employee_commission_amount;
                    })
                    backData = JSON.parse(JSON.stringify(this.data));
                })
            })
        },
        saveGzb () {
            this.$Modal.confirm({
                title: '系统提示',
                content: '确认保存？',
                onOk: ()=>{
                    let params = {
                        year: (new Date(this.params.start_at)).getFullYear(),
                        month: (new Date(this.params.start_at)).getMonth()+1,
                        items: this.data
                    };
                    this.$http.post("/boss/employeeSalary/createAndReplace",params).then(res=>{
                        this.$Message.success(res.message);
                    })                    
                }
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
        this.searchDate = this.params.start_at;
        if(this.store_id){
            this.getData();
        }
    }
}
</script>

<style lang="less">
.table th, .table td { 
    text-align: center;
    vertical-align: middle!important;
}
.hipus{
    .ivu-input-number,textarea{
        border: none;
    }
    &:hover{
        .ivu-input-number,textarea{
            box-shadow: 0 0 1px #000;
        }        
    }
}
</style>
