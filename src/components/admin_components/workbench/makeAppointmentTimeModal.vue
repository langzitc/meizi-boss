<template>
  <span @click="modalShow">
      <slot>
          <Button type="info" size="small">编辑</Button>
      </slot>
        <Modal
            title="编辑预约"
            v-model="modalState"
            ok-text="确认"
            class-name="modal-scroll"
            :loading="modalState"
            width="450"
            :mask-closable="false"            
        >
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button :loading="loading" type="primary" size="large" @click="save">保存</Button>
            </div>      
            <Form :label-width="100"  v-if="formItem.id">
                <FormItem label="预约时间">
                    <DatePicker :options="{disabledDate: disabledDate}" @on-change="dateChange" style="width:150px" placeholder="选择日期" :transfer="true" type="date" v-model="y_date"></DatePicker> 
                    <Select style="width:150px" :transfer="true" placeholder="选择时间" v-model="y_time">
                        <Option v-for="(el,index) in timeList" :key="index" :value="el">{{el | times}}</Option>
                    </Select>
                </FormItem>                
                <FormItem label="预约人">
                    {{formItem.customer_name}}
                </FormItem>  
                <FormItem label="电话">
                    {{formItem.mobile}}
                </FormItem>  
                <FormItem label="服务项目">
                    <Tag color="blue" v-for="el in formItem.items" :key="el.id">{{el.product_name}}</Tag>
                </FormItem>  
                <FormItem label="预约员工">
                    <Tag color="blue" v-for="(el,index) in employeeList" :key="index">{{el}}</Tag>
                </FormItem>                                                                
            </Form>
        </Modal>  
  </span>      
</template>

<script>
let currentDay = new Date((new Date()).Format('yyyy/MM/dd')+" "+"00:00:00");
currentDay.setDate(currentDay.getDate()-1);
let t1 = currentDay.getTime();
currentDay.setDate(currentDay.getDate()+30);
let t2 = currentDay.getTime();
export default {
    name: 'makeAppointmentTimeModal',
    data () {
        return {
            modalState: false,
            loading: false,
            formItem: {},
            y_date: '',
            y_time: '',
            timeList: []
        }
    },
    watch: {
        modalState (n,o) {
            if(n){
                Object.assign(this.formItem,this.data);
                if(this.data.appointment_start_at){
                    let arr = this.data.appointment_start_at.split(' ');
                    if(arr.length === 2){
                        this.y_date = arr[0];
                        this.y_time = arr[1];
                    }
                }
                this.$nextTick(()=>{
                    this.getTimes();
                })
            }else{
                this.formItem = {};
            }
        }
    },
    computed: {
        employeeList () {
            let set = new Set();
            if(this.formItem.items){
                this.formItem.items.forEach(e=>{
                    e.employees.forEach(e2=>{
                        set.add(e2.employee_name);
                    })
                })
            }
            return Array.from(set);
        }
    },
    methods: {
        getTimes () {
            let set = new Set();
            if(this.formItem.items){
                this.formItem.items.forEach(e=>{
                    e.employees.forEach(e2=>{
                        set.add(e2.employee_id);
                    })
                })
            }            
            this.$http.post('/boss/employee/getCombinationAppointmentTimePoints',{
                employee_id: Array.from(set),
                date: this.y_date.Format('yyyy-MM-dd')
            }).then(res=>{
                this.timeList = res.data.time_points;
            })             
        },
        dateChange () {
            setTimeout(()=>{
                this.getTimes();
            },100)
        },
        modalShow () {
            this.modalState = true;
        },
        cancel () {
            this.modalState = false;
        },
        disabledDate (date) {
            let t = (new Date(date.Format('yyyy/MM/dd')+" "+"00:00:00")).getTime();
            if(t>t1&&t<t2){
                return false;
            }
            return true;
        },
        save () {
            let time = this.y_date.Format('yyyy-MM-dd')+" "+this.y_time;
            let id = this.data.id;
            if(this.y_time&&this.y_date&&id){
                this.loading = true;
                this.$http.post('/boss/orderUpdate/preOrderDate',{
                    time,
                    id
                }).then(res=>{
                    this.loading = false;
                    this.modalState = false;
                    this.$Message.success(res.message);
                    this.$emit('on-change');
                }).catch(e=>{
                    this.loading = false;
                })
            }else{
                this.$Message.error('请选择预约日期及预约时间');
            }
        }
    },
    props: {
        data: {
            type: Object
        }
    }
}
</script>

<style>

</style>
