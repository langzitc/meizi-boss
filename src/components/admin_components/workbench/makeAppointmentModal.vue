<template>
  <span @click="modalShow">
      <slot>
          <Button type="primary">添加预约</Button>
      </slot>
        <Modal
            title="新增预约"
            v-model="modalState"
            ok-text="确认"
            class-name="modal-scroll"
            :loading="modalState"
            width="650"
            :mask-closable="false"            
        >
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button :loading="btnLoading" type="primary" size="large" @click="save">保存</Button>
            </div>                              
            <Form ref="makeAppointmentForm" :label-width="150">
                <FormItem>
                    <RadioGroup v-model="isMember">
                        <Radio :label="1">会员</Radio>
                        <Radio :label="0">非会员</Radio>
                    </RadioGroup>
                </FormItem>                
                <FormItem class="make-appointment-modal-form" v-if="isMember == 1" label="选择会员">
                    <member-select style="width:335px" @member-change="memberChange"></member-select>
                </FormItem>                
                <FormItem class="make-appointment-modal-form"  v-if="isMember == 0" label="手机号">
                    <Input placeholder="输入手机号" type="text" style="width:335px" v-model="formItem.mobile"></Input>
                </FormItem>
                <FormItem class="make-appointment-modal-form" v-if="isMember == 0" label="预约人">
                    <Input placeholder="输入姓名" style="width:335px" v-model="formItem.customer_name" type="text"></Input>
                </FormItem>
                <FormItem class="make-appointment-modal-form" label="预约门店">
                    <select-store style="width:335px" :store_id="formItem.store_id" @store-change="storeChange"></select-store> 
                </FormItem>  
                <FormItem class="make-appointment-modal-form" label="预约到店时间">
                    <DatePicker :transfer="true" @on-change="dateChange" :options="dateOptions" placeholder="选择日期" type="date"></DatePicker>
                    <!-- <TimePicker :transfer="true" @on-change="timeChange" :steps="[1,30,1]" format="HH:mm" placeholder="选择时间"></TimePicker> -->
                    <Select @on-change="timeChange" :transfer="true" placeholder="选择时间" v-model="f_time" style="width: 166px">
                        <Option v-for="(item,index) in timeArr" :key="index" :value="item">{{item}}</Option>
                    </Select>
                </FormItem>  
                <FormItem class="make-appointment-modal-form" label="预约服务员工">
                    <p class="text-warning" v-show="!(appointment_start_at&&this.store_id)">*请先选择门店及预约时间</p>
                    <Select @on-change="staffChange" style="width:335px" placeholder="请选择员工" :transfer="true">
                        <Option v-for="el in employeeList" :key="el.id" :value="el.id" :label="el.name">
                            <Row class="clearfix">
                                <i-col :xs="12">{{el.name}}</i-col>
                                <i-col :xs="12" class="text-right">{{el.employee_number}}</i-col>
                            </Row>
                        </Option>
                    </Select>  
                </FormItem>  
                <FormItem  label="预约服务" class="trans-f make-appointment-modal-form">
                    <fwxm-transfer @on-change="handleChange" :data="service_items"></fwxm-transfer>
                </FormItem>  
                <FormItem label="备注">
                    <Input type="textarea" v-model="formItem.description"></Input>
                </FormItem>                                                                                                
            </Form>  
            <div class="part-loading" v-show="loading">
                <Spin fix>
                    <Icon type="load-c" size=28 class="part-loading-spin-icon-load"></Icon>
                    <div>加载中</div>
                </Spin>
            </div>                       
        </Modal>  
  </span>
</template>

<script>
import SelectStore from '../store_select'
import MemberSelect from '../member_select'
import FwxmTransfer from '../fwxm-transfer'
export default {
    name: 'MakeAppointmentModal',
    data () {
        return {
            modalState: false,
            isMember: '0',
            employee: {},
            timeArr: [],
            f_date: '',
            f_time: '',
            employeeList: [],
            service_items: [],
            targetService: [],
            loading: false,
            btnLoading: false,
            formItem: {
                mobile: '',
                customer_name: '',
                is_appointment: 1,
                description: '',
                appointment_start_at: '',
                appointment_from: 0,
                store_id: "",
                items: [],
                status: 'pre_order',
                member_type: 1
            },
            dateOptions: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now()-3600*24*1000;
                }
            }
        }
    }, 
    watch: {
        store_id (n,o){
            this.formItem.store_id = n;
            this.getEmployeeList();
        },
        isMember (n,o) {
            if(n==1){
                this.formItem.member_type = 2;
            }else{
                this.formItem.member_type = 1;
            }
        },
        modalState (n,o){
            if(n){
                this.dataInit();
                this.getEmployeeList();
            }
        }
    },
    computed: {
        store_id () {
            return this.$store.state.story.store_id;
        },
        appointment_start_at () {
            if(this.f_date&&this.f_time){
                return this.f_date+" "+this.f_time+":00";
            }else{
                return '';
            }
        }
    },
    methods: {
        dateChange (v){
            this.f_date = v;
            setTimeout(()=>{
                this.getEmployeeList();
            },200)
        },
        timeChange (v) {
            this.f_time = v;
            setTimeout(()=>{
                this.getEmployeeList();
            },200)
        },
        modalShow () {
            this.modalState = true;
        },
        getEmployeeList () {
            if(this.appointment_start_at&&this.store_id){
                this.loading = true;
                this.$http.get('/boss/employee/list',{
                    params: {
                        store_id: this.store_id,
                        with_service_items: 1,
                        allow_appointment: 1,
                        appointment_date_time: this.appointment_start_at                          
                    }
                }).then(res=>{
                    this.employeeList = res.data.items;
                    if(!this.employeeList.length){
                        this.$Message.warning('暂时没有可预约技师');
                    } 
                    this.loading = false;
                }).catch(e=>{
                    this.loading = false;
                })
            }
        },
        dataInit () {
            this.loading = true;
            this.$http.post('/public/batchRequest',[
                {
                    path: '/boss/flight/list',
                    key: 'flight',
                    data: {
                        store_id: this.store_id
                    }
                },{
                    path: '/boss/store/getSettingValue',
                    ket: 'storeset',
                    data: {
                        store_id: this.store_id,
                        path: 'appointment_interval'                        
                    }
                }
            ]).then(res=>{
                let a = [],b = 30;
                res.data.forEach(e=>{
                    if(e.key === 'storeset'){
                        if(e.data.data.value){
                            b = parseInt(e.data.data.value);
                        }
                    }else if(e.key === 'flight'){
                        a = e.data.data;
                    }
                })
                let timeArr = new Set(),baseTime = '2017/01/01 ';
                a.forEach(t=>{
                    let st = (new Date(baseTime+""+t.start_at)).getTime();
                    let et = (new Date(baseTime+""+t.end_at)).getTime();
                    for(let n = st;n<et+1;n+=30*60*1000){
                        timeArr.add((new Date(n)).Format('hh:mm'));
                    }
                })
                this.timeArr = Array.from(timeArr);
                this.loading = false;
            }).catch(()=>{
                this.loading = false;
            })           
        },        
        save () {
            if(!this.formItem.mobile){
                this.$Message.error(this.formItem.member_type == 1 ? '请输入手机号' : '请选择会员');
            }else if(!this.formItem.customer_name){
                this.$Message.error(this.formItem.member_type == 1 ? '请输入预约姓名' : '请选择会员');
            }else if(!this.store_id){
                this.$Message.error('请选择预约门店');
            }else if(!this.f_date){
                this.$Message.error('请选择预约日期');
            }else if(!this.f_time){
                this.$Message.error('请选择预约时间');
            }else if(!this.targetService.length){
                this.$Message.error('请选择预约服务项目');
            }else{
                let flag = false;
                this.targetService.forEach(e=>{
                    if(e.attributes.code&&!e.attributes[e.attributes.code]){
                        flag = true;
                    }
                })
                if(flag){
                    this.$Message.error('请选择预约服务项目属性');
                    return;
                }
                let t1 = (new Date()).getTime()+3600*2*1000;
                let t2 = (new Date((this.f_date+" "+this.f_time+":00").replace(/-/g,"/"))).getTime();
                if(t2<t1){
                    this.$Message.error("请提前两小时预约");
                    return;
                }
                this.formItem.appointment_start_at = this.appointment_start_at;                  
                let params = JSON.parse(JSON.stringify(this.formItem));
                this.targetService.forEach(e=>{
                    let d = this.employee.service_items.filter(item=>{
                        return item.product_id == e.value;
                    });
                    let name = d.length ? d[0].name : '';
                    if(e.attributes.code){
                        delete e.attributes.code;
                    }
                    params.items.push({
                        product_id: e.value,
                        product_name: name,
                        employees: [{
                            employee_id: this.employee.id
                        }],
                        attributes: e.attributes
                    });
                });
                this.btnLoading = true;
                this.$http.post("/boss/order/create",params).then(res=>{
                    this.$Message.success(res.message);
                    this.$emit('yuyue-success');
                    this.modalState = false;
                    this.$refs['makeAppointmentForm'].resetFields();
                    this.btnLoading = false;
                }).catch(e=>{
                    this.btnLoading = false;
                });                          
            }
        },
        cancel () {
            this.modalState = false;
        },
        storeChange (v){
            this.formItem.store_id = v;
        },
        staffChange (v) {
            let obj = this.employeeList.filter(e=>{
                if(e.id == v){
                    return e;
                }
            })          
            this.employee = obj[0]||{};
            this.loading = true;
            this.$http.get('/boss/product/list',{
                params: {
                    type_code: 'service',
                    employee_id: v
                }
            }).then(res=>{
                this.service_items = res.data.items;
                this.loading = false;
            }).catch(e=>{
                this.loading = false;
            })
        },
        memberChange (e) {
            this.formItem.mobile = e.mobile;
            this.formItem.customer_name = e.name;
        },
        handleChange (newTargetKeys) {
            this.targetService = newTargetKeys;
        }       
    },
    mounted () {
        if(this.store_id){
            this.formItem.store_id = this.store_id;
        }
    },
    components: {
        SelectStore,
        MemberSelect,
        FwxmTransfer
    }
}
</script>

<style lang="less">
    .trans-f .ivu-transfer-list-content-not-found{
        margin-top: 5px;
    }
    .make-appointment-modal-form{
        .ivu-form-item-label{
            &:before{
                content: '*';
                color: rgba(159,29,73,1);
                padding: 10px 5px 10px 0;
                font-size: 16px;
                position: relative;
                top: 5px;
            }
        }
    }
</style>
