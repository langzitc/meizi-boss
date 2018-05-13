<template>
  <span @click="showModal">
      <slot>
          <Button type="info">班次设置</Button>
      </slot>
        <Modal
            title="班次设置"
            v-model="modalState"
            ok-text="确认"
            class-name="modal-scroll"
            :loading="modalState"
            width="650"
            :mask-closable="false"            
        >
            <div slot="footer">
            </div>                              
            <div style="height: 400px">
                <Row :gutter="20">
                    <i-col :sm="6">
                        <Input type="text" v-model="formItem.flight_name" placeholder="请输入班次名称"></Input>
                    </i-col>
                    <i-col :sm="10">
                        <TimePicker style="width: 100%" type="timerange" v-model="formItem.time_range" placeholder="请选择班次时间段"></TimePicker>
                    </i-col>
                    <i-col :sm="8">
                        <Button type="ghost" icon="checkmark-circled" size="small" @click="save">保存</Button>
                    </i-col>
                </Row>   
                <hr>
                <Row :gutter="20" v-for="el in flightLists" :key="el.id" style="margin-top: 15px">
                    <i-col :sm="6">
                        <Input type="text" v-model="el.flight_name" placeholder="请输入班次名称"></Input>
                    </i-col>
                    <i-col :sm="10">
                        <TimePicker style="width: 100%" v-model="el.time_range" type="timerange" placeholder="请选择班次时间段"></TimePicker>
                    </i-col>
                    <i-col :sm="8">
                        <Button type="ghost" size="small" icon="edit" @click="update(el)">修改</Button>
                        <Button type="ghost" size="small" icon="android-remove" @click="remove(el.id)">删除</Button>
                    </i-col>
                </Row>                 
            </div>                
        </Modal>      
  </span>
</template>

<script>
export default {
    name: 'banci',
    data () {
        return {
            modalState: false,
            formItem: {
                flight_name: '',
                time_range: []
            }
        }
    },
    props: {
        store_id: {
            type: String,
            required: true
        },
        flightList : {
            type: Array,
            required: true
        }
    },
    computed: {
        flightLists (){
            let arr = [];
            this.flightList.map(e=>{
                let o = JSON.parse(JSON.stringify(e));
                o.time_range = [e.start_at,e.end_at];
                arr.push(o);
            })
            return arr;
        }
    },
    methods: {
        showModal () {
            this.modalState = true;
        },
        save () {
            if(this.formItem.flight_name&&this.formItem.time_range.length){
                let params = {
                    store_id: this.store_id,
                    start_at: this.formItem.time_range[0].Format('hh:mm:ss'),
                    end_at: this.formItem.time_range[1].Format('hh:mm:ss'),
                    flight_name: this.formItem.flight_name
                };
                this.$http.post("/boss/flight/create",params).then(res=>{
                    this.$Message.success(res.message);
                    this.formItem.flight_name = "";
                    this.formItem.time_range = [];
                    this.$emit('banci-change');
                });
            }
        },
        update (el) {
             let store_id = this.store_id;
             this.$Modal.confirm({
                title: '系统提示',
                content: '确认修改？',
                onOk: ()=>{
                    let params = {
                        id: el.id,
                        store_id: this.store_id,
                        start_at: el.time_range[0].Format('hh:mm:ss'),
                        end_at: el.time_range[1].Format('hh:mm:ss'),
                        flight_name: el.flight_name
                    };
                    this.$http.post("/boss/flight/update",params).then(res=>{
                        this.$Message.success(res.message);
                        this.$emit('banci-change');
                    })                    
                }
            });           
        },
        remove (id) {
            this.$Modal.confirm({
                title: '系统提示',
                content: '确认删除？',
                onOk: ()=>{
                    this.$http.post("/boss/flight/delete",{id}).then(res=>{
                        this.$Message.success(res.message);
                        this.$emit('banci-change');
                    })                    
                }
            });
        }
    }
}
</script>

<style>

</style>
