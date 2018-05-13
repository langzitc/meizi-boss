<template>
   <Card>
      <div slot="title">
          <Row :gutter="20">
              <i-col :sm="18">
                  <DatePicker :transfer="true" type="year" v-model="year" style="width:100px"></DatePicker>
                  <Select v-model="week_num" style="width:100px">
                    <Option v-for="el in weekArr" :key="el.value" :value="el.value">{{el.label}}</Option>
                  </Select>             
                  <banci :store_id="store_id" @banci-change="getFlightList" :flightList="flightList"></banci>  
                  <set-appointment-time-modal></set-appointment-time-modal> 
              </i-col>
              <i-col :sm="6" class="text-right">
                  <Button type="primary" @click="setDefault">设为默认排班</Button>
              </i-col>           
          </Row>
      </div>  
      <Table disabled-hover border :columns="columns" :data="data" :loading="loading"></Table>    
  </Card> 
</template>

<script>
import SelectStore from '../store_select'
import moment from 'moment'
import Banci from './banci'
import SetAppointmentTimeModal from './jcsz/setAppointmentTimeModal'
let _this;
let colors = ["#FF00FF","#FF0099","#FF0066","#FF0033","#FF0000","#330066","#0033CC","#6633FF","#CC00CC","#000033","#003300","#330066","#0033CC","#6633FF","#CC00CC","#000033","#003300","#330066"];
export default {
    name: 'SchedulingSettings',
    data () {
        return {
            week_num: moment().week(),
            weekArr: [],
            year: '',
            loading: false,
            columns: [],
            employeeList: [],
            flightList: [],
            storeFlight: [],
            dateArr: []
        }
    },
    computed: {
        data () {
            let arr = [];
            this.employeeList.map(e=>{
                let obj = {};
                obj.id = e.id;
                obj.employee_number = e.employee_number;
                obj.mobile = e.mobile;
                obj.name = e.name;
                this.dateArr.map(e2=>{
                    let flight_id = "";
                    let pb_id = "";
                    this.storeFlight.map(e3=>{
                        if(e3.employee_id == e.id && e3.day == e2){
                            flight_id = e3.flight_id;
                            pb_id = e3.id;
                        }
                    })
                    obj[e2+"-pb-id"] = pb_id;
                    obj[e2] = flight_id;
                })
                arr.push(obj);
            });
            return arr;
        },
        store_id () {
            return this.$store.state.story.store_id;
        }
    },
    watch: {
        week_num () {
            this.getDateRange();
        },
        year () {
            this.getWeekNum();           
        },
        store_id () {
            this.dataInit();
        }
    },
    methods: {
        dataInit (){
            this.getStoreFlightInfo();                
            this.getEmployeeList();
            this.getFlightList();
        },
        getWeekNum () {
            this.$http.get("/public/getMaxWeekNumberOfYear",{params: {
                year: this.year.Format('yyyy')
            }}).then(res=>{
                let w = res.data.result;
                let arr = [];
                for(let i=0;i<w;i++){
                    arr.push({
                        value: i+1,
                        label: `第${i+1}周`
                    });
                }
                this.weekArr = arr;  
                this.getDateRange();              
            });
        },
        getDateRange () {
            if(this.year&&this.week_num){
                this.$http.get("/public/getDateRangeForWeek",{params: {
                    year: this.year.Format('yyyy'),
                    week: this.week_num
                }}).then(res=>{
                    this.getStoreFlightInfo();
                    let d = Object.values(res.data);
                    this.dateArr = d;
                    this.columns = [{
                        align: 'center',
                        className: 'employee-name',
                        fixed: 'left',
                        renderHeader (h,c){
                            return h('div',{
                                style: {
                                    paddingTop: '10px'
                                }
                            },[
                                h('p',{
                                    attrs: {
                                        class: 'text-danger'
                                    }
                                },"员工")
                            ])                            
                        },
                        render (h,p) {
                            return h('Poptip',{
                                props: {
                                    trigger: 'hover',
                                    title: p.row.name,
                                    content: `员工编号: ${p.row.employee_number}`,
                                    placement: 'top'
                                }
                            },[
                                h("span",p.row.name)
                            ])
                        }
                    }];                    
                    d.map((e,i)=>{
                            let w = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
                            this.columns.push({
                                align: 'center',
                                key: e,
                                renderHeader (h,c) {
                                    return h('div',{
                                        style: {
                                            paddingTop: '10px'
                                        }
                                    },[
                                        h('p',{
                                            attrs: {
                                                class: 'text-danger'
                                            }                                            
                                        },w[i]),
                                        h('p',{
                                            attrs: {
                                                class: 'text-warning table-head-date'
                                            }
                                        },e)
                                    ])
                                },
                                render (h,r) {
                                    let bcitem = [];
                                    let btnType = 'ghost';
                                    let banci = "休息";
                                    let color = "#fff";
                                    if(r.row[e]){
                                        btnType = "primary";
                                        _this.flightList.map((f,i)=>{
                                            if(f.id == r.row[e]){
                                                banci = f.flight_name;
                                                color = colors[i];
                                                bcitem.push(
                                                    h('DropdownItem',{
                                                        props: {
                                                            name: ""
                                                        }
                                                    },"休息")                                                       
                                                );                                                
                                            }
                                        })
                                    }
                                    _this.flightList.map(e=>{
                                        if(e.id!=r.row[r.column.key]){
                                            bcitem.push(
                                                h('DropdownItem',{
                                                    props: {
                                                        name: e.id
                                                    }
                                                },e.flight_name),
                                            );                                            
                                        }
                                    })
                                    return h('Dropdown',{
                                        props: {
                                            trigger: 'click'                                           
                                        },
                                        on: {
                                            'on-click'(n){
                                                if(n){
                                                    let params = {
                                                        store_id: _this.store_id,
                                                        day: r.column.key,
                                                        employee_id: r.row.id,
                                                        flight_id: n
                                                    };
                                                    _this.$http.post("/boss/flight/employeeFlightCreate",params).then(res=>{
                                                        _this.getStoreFlightInfo();
                                                    });
                                                }else{
                                                    let params = {
                                                        id: r.row[r.column.key+"-pb-id"]
                                                    };
                                                    _this.$http.post("/boss/flight/employeeFlightDelete",params).then(res=>{
                                                        _this.getStoreFlightInfo();
                                                    });                                                    
                                                }
                                            }
                                        }                                         
                                    },[
                                        h('Button',{
                                            props: {
                                                type: btnType
                                            },
                                            style: {
                                                padding: "22px 12px",
                                                margin: '15px 0',
                                                minWidth: '80px',
                                                backgroundColor: color
                                            },
                                            attrs: {
                                                long: true
                                            }
                                        },banci),
                                        h('DropdownMenu',{
                                            slot: 'list',
                                            placement: 'bottom-start',
                                            style: {
                                                background: '#fff',
                                                color: '#ccc'
                                            }
                                        },bcitem)                                        
                                    ])
                                }
                            });
                    })
                })                  
            }
        },
        getEmployeeList () {
            let params = {
                store_id: this.store_id
            };
            this.$http.get("/boss/employee/list",{params}).then(res=>{
                this.employeeList = res.data.items;
            });
        },
        getFlightList () {
            this.loading = true;
            let params = {
                store_id: this.store_id
            };
            this.$http.get("/boss/flight/list",{params}).then(res=>{
                this.flightList = res.data;
                this.loading = false;
            });            
        },
        getStoreFlightInfo () {
            if(this.store_id&&this.week_num&&this.year){
                let params = {
                    store_id: this.store_id,
                    week: this.week_num,
                    year: this.year.Format('yyyy')
                };            
                this.$http.get("/boss/flight/storeFlightInfo",{params}).then(res=>{
                    this.storeFlight = res.data;
                });                
            }else{
                setTimeout(()=>{
                    this.getStoreFlightInfo();
                },200)
            }
        },
        setDefault () {
            let y = this.year.getFullYear();
            this.$Modal.confirm({
                title: '系统提示',
                content: `确认设置${y}第${this.week_num}周为默认排班?`,
                onOk: ()=>{
                    this.$http.post("/boss/store/setting",{
                        default_flight_week_year: this.year.getFullYear(),
                        default_flight_week_number: this.week_num
                    }).then(res=>{
                        this.$Message.success(res.message);
                    })
                }
            });
        }        
    },
    components: {
        SelectStore,
        Banci,
        SetAppointmentTimeModal
    },
    mounted () {
        this.year = new Date();
        _this = this;
        if(this.store_id){
            this.dataInit();
        }
    }
}
</script>

<style>
    .table-head-date{
        font-size: 10px;
    }
    .ivu-table tbody .employee-name{
        background-color: #f5f7f9;
    }
    .ivu-dropdown-item:hover{
        background-color: #9f1d49;
        color: #fff; 
    }
</style>
