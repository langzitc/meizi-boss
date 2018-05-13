<template>
    <Card>
        <div slot="title">
            <Row class="clearfix" :gutter="20">
                <i-col :sm="6" :md="4">
                    <DatePicker @on-change="dateChange" :transfer="true" v-model="start_date" type="date"></DatePicker>
                </i-col>  
                <i-col :sm="6" :md="4">
                    <Select placeholder="选择班次" v-model="flight_id" @on-change="flightChange">
                        <Option value="">全部班次</Option>
                        <Option :value="item.id" v-for="item in flightList" :key="item.id">{{item.flight_name}}</Option>
                    </Select>
                </i-col>                                
            </Row>
        </div>
        <div class="mai">
            <Table border :loading="loading" :width="tableWidth" :columns="columns" :data="data"></Table>
            <div style="margin-top: 20px" class="btn-group cell-table">
                <button type="button" class="btn btn-default">空闲</button>
                <button type="button" class="btn btn-success">已预约</button>
                <button type="button" class="btn btn-primary">休息</button>         
            </div>  
        </div>
        <Modal title="预约状态设置" @on-ok="setStatus" ok-text="保存" v-model="modal.state">
            <div class="text-center">
                <RadioGroup v-model="modal.status">
                    <Radio label="0">
                        空闲
                    </Radio>
                    <!-- <Radio label="1">
                        已预约
                    </Radio> -->
                    <Radio label="-1">
                        休息
                    </Radio>
                </RadioGroup>                  
            </div>
        </Modal>
    </Card>  
</template>

<script>
import SelectStore from '../store_select'
let d = new Date();
export default {
    name: 'MakeAppointmentInfo',
    data () {
        return {
            start_date: d,
            flight_id: '',
            datas: [],
            employeeList: [],
            tableWidth: 1200,
            loading: false,
            flightList: [],
            step: 60,
            start_at: '',
            end_at: '',
            modal: {
                state: false,
                status: 0,
                employee_id: '',
                date: ''
            }           
        }
    },
    watch: {
        start_date (n,o) {
            this.getInfo();
        },
        store_id () {
            this.getSystemSettings();
            this.getInfo();
            this.getEmployeeList();
            this.getFlightList();            
        }
    },
    computed: {
        cwidth () {
            if(this.timeArr.length>7){
                return 100;
            }else{
                return "";
            }
        },
        timeArr () {
            let arr = [];
            let ts,end;
            if(this.flight_id){
                let o = this.flightList.filter(e=>{return e.id==this.flight_id})[0];
                if(o){
                    ts = (new Date('2017/01/01 '+o.start_at)).getTime();
                    end = (new Date('2017/01/01 '+o.end_at)).getTime()+1;                      
                }            
            }else{
                ts = (new Date('2017/01/01 00:00:00')).getTime();
                end = ts+3600*24*1000;
            }
            for(let i = ts;i<end;i+=this.step*60*1000){
                arr.push((new Date(i)).Format('hh:mm'));
            }
            return arr;            
        },
        data () {
            let arr = [];
            this.employeeList.forEach(e=>{
                let obj = Object.assign({},e);
                this.timeArr.forEach(item=>{
                    let v = false;
                    this.datas.forEach(e2=>{
                        if(e.id == e2.employee_id&&e2.time == item){
                            v = Object.assign({},e2);
                        }
                    })   
                    obj[item] = v;                
                })
                arr.push(obj);
            })
            return arr;
        },
        columns () {
            let _this = this;
            let arr = [{
                title: '员工',
                key: 'name',
                align: 'center',
                fixed: 'left',
                width: 120,
                ellipsis: true
            }];
            this.timeArr.forEach(e=>{
                arr.push({
                    title: e,
                    width: this.cwidth,
                    align: 'center',
                    render (h,p) {
                        let type = 0;//空闲
                        if(p.row[e]){
                            type = parseInt(p.row[e].status);
                        }
                        switch(type){
                            case 0: 
                                return h('button',{
                                    attrs: {
                                        class: 'btn btn-default'
                                    },
                                    on: {
                                        click () {
                                            _this.handleClick(p.row,e);
                                        }
                                    }
                                },"空闲")
                            break;
                            case 1: 
                                return h('Poptip',{
                                    props: {
                                        trigger: 'hover',
                                        title: '顾客信息',
                                        content: p.row[e].customer_name+"  "+p.row[e].mobile
                                    }
                                },[
                                    h('button',{
                                        attrs: {
                                            class: 'btn btn-success'
                                        },
                                        on: {
                                            click () {
                                                _this.handleClick(p.row,e);
                                            }
                                        }                                        
                                    },"已预约")                                      
                                ])                          
                            break;
                            case -1: 
                                return h('button',{
                                    attrs: {
                                        class: 'btn btn-primary'
                                    },
                                    on: {
                                        click () {
                                            _this.handleClick(p.row,e);
                                        }
                                    }                                    
                                },"休息")                              
                            break;
                        }
                    }
                });
            })
            return arr;
        },
        store_id () {
            return this.$store.state.story.store_id;
        }
    },
    methods: {
        getEmployeeList () {
            let params = {
                store_id: this.store_id,
                day: this.start_date.Format('yyyy-MM-dd')
            };
            if(this.flight_id){
                params.flight_id = this.flight_id;
            }
            this.$http.get("/boss/employee/list",{params}).then(res=>{
                this.employeeList = res.data.items;
            });
        },
        dateChange (v) {
            setTimeout(()=>{
                this.getEmployeeList();
            },200)
        },
        getInfo () {
            this.loading = true;
            let params = {
                store_id: this.store_id,
                start_date: this.start_date.Format('yyyy-MM-dd'),
                end_date: this.start_date.Format('yyyy-MM-dd')
            };
            if(this.flight_id){
                params.flight_id = this.flight_id;
            }
            this.$http.get("/boss/flight/storeDailyFlightAppointmentInfo",{params}).then(res=>{
                this.datas = res.data;
                this.loading = false;
            }).catch(e=>{
                this.loading = false;
            })
        },
        handleClick (row,e) {
            let s = "0";
            if(row[e]){
                s = row[e].status;
            }
            this.modal.status = s;
            this.modal.employee_id = row.id;
            this.modal.date = this.start_date.Format('yyyy-MM-dd')+" "+e+":00";
            this.modal.state = true;
        },
        setStatus () {
            this.$http.post("/boss/flight/setEmployeeAppointmentStatus",{
                employee_id: this.modal.employee_id,
                date: this.modal.date,
                store_id: this.store_id,
                status: this.modal.status
            }).then(res=>{
                this.$Message.success(res.message);
                this.getInfo();
            })
        },
        getFlightList () {
            this.$http.get("/boss/flight/list",{params:{
                store_id: this.store_id
            }}).then(res=>{
                this.flightList = res.data;
            })
        },
        flightChange () {
            this.getEmployeeList();
            this.getInfo();
        },
        getSystemSettings () {
            this.$http.get('/boss/store/getSettingValue',{
                params:{
                    store_id:this.store_id,
                    path: 'appointment_interval'
                }
            }).then(res=>{
                if(res.data.value){
                    this.step = parseInt(res.data.value);
                }    
            })              
        }
    },
    mounted () {
        let init = ()=>{
            this.tableWidth = parseInt(document.getElementsByClassName('ivu-card-body')[0].style.width)            
        }
        window.addEventListener('resize',()=>{
            init();
        })
        init();
        if(this.store_id){
            this.getSystemSettings();
            this.getInfo();
            this.getEmployeeList();
            this.getFlightList();                      
        }
    },
    components: {
        SelectStore
    }
}
</script>
<style>
    .cell-table button{
        padding: 5px 32px;
    }
    .ivu-table-body .btn{
        font-size: 12px;
        border-radius: 50px;     
        padding: 0;
        height: 50px; 
        width: 50px;
        line-height: 50px; 
        margin: 5px;
    }
    @keyframes light {
        0%{
            box-shadow: 0 0 0px 5px rgba(0,0,0,0);
        }
        25%{
            box-shadow: 0 0 15px 5px rgba(0,0,0,.4);
        } 
        50%{
            box-shadow: 0 0 25px 5px rgba(0,0,0,.6);
        } 
        75%{
            box-shadow: 0 0 15px 5px rgba(0,0,0,.4);
        } 
        100%{
            box-shadow: 0 0 0px 5px rgba(0,0,0,0);
        }                                
    }
    .mai .ivu-table-row button.btn-success{
        animation: light 4s linear infinite;
    }
    .mai .ivu-table-row td:first-child{
        height: 60px;
        line-height: 60px;
    }
</style>
