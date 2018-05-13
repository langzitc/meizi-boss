<template>
    <div>
        <Card>
            <Row slot="title">
                <i-col :xs="12">
                    <p>时间段设置</p>
                </i-col>
                <i-col :xs="12" class="text-right">
                    <Button type="success" @click="add">添加时间段</Button>
                    <Button type="info" @click="intervalSet">时间间隔设置</Button>
                </i-col>
            </Row>
            <Modal
                v-model="modalState"
                :loading="modalState"
                :width="500"
                :mask-closable="false"
                :title="modalTitle"
            >
                <div slot="footer">
                    <Button type="ghost" @click="cancel">取消</Button>
                    <Button type="primary" :loading="sloading" @click="save">保存</Button>
                </div>
                <Form ref="yysjd"  :label-width="100">
                    <FormItem label="开始时间" >
                        <TimePicker :value="formItem.start_at" @on-change="sChange"></TimePicker>
                    </FormItem>
                    <FormItem label="结束时间">
                        <TimePicker :value="formItem.end_at" @on-change="eChange"></TimePicker>
                    </FormItem>
                </Form>
            </Modal>
            <Table border stripe :data="data" :columns="columns" :loading="loading"></Table>
        </Card>
    </div>
</template>

<script>
let _this;
let model = ()=>{
    return {
        id: '',
        store_id: '',
        start_at: '',
        end_at: ''        
    }
}
export default {
    name: 'timeSet',
    data () {
        return {
            data: [],
            columns: [{
                title: '编号',
                key: 'id'
            },{
                title: '开始时间',
                key: 'start_at'
            },{
                title: '结算时间',
                key: 'end_at'
            },{
                title: '操作',
                align: 'right',
                render (h,p) {
                    return h('span',[
                        h('Button',{
                            props: {
                                type: 'info',
                                size: 'small'
                            },
                            on: {
                                click: ()=>{
                                   Object.assign(_this.formItem,p.row);
                                   _this.modalState = true; 
                                }
                            }
                        },'编辑'),
                        h('Button',{
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            on: {
                                click: ()=>{
                                    _this.$Modal.confirm({
                                        title: '系统提示',
                                        content: '确认删除 ?',
                                        onOk: ()=>{
                                            _this.$http.post("/boss/store/deleteAppointmentTimeRange",{id: p.row.id}).then(res=>{
                                                _this.$Message.success(res.message);
                                                _this.getData();
                                            });
                                        }
                                    });
                                }
                            },
                            style: {
                                marginLeft: '5px'
                            }
                        },'删除')
                    ])
                }
            }],
            loading: false,
            sloading: false,
            modalState: false,
            formItem: model()
        }
    },
    computed: {
        modalTitle () {
            if(this.formItem.id){
                return '编辑时间段';
            }else{
                return '添加时间段';
            }
        },
        store_id () {
            return this.$store.state.story.store_id;
        }
    },
    watch: {
        store_id (n,o) {
            if(n){
                this.getData();
            }
        }
    },
    methods: {
        getData () {
            this.loading = true;
            this.$http.get("/boss/store/getStoreAppointmentTimePoints",{params: {
                store_id: this.store_id
            }}).then(res=>{
                this.data = res.data.config||[];
                this.loading = false;
            }).catch(e=>{
                throw new Error(e);
                this.loading = false;
            })
        },
        add () {
            this.formItem = model();
            this.modalState = true;
        },
        save () {
            let params = JSON.parse(JSON.stringify(this.formItem));
            if(!params.start_at){
                this.$Message.error("请选择开始时间");
            }
            if(!params.end_at){
                this.$Message.error("请选择结束时间");
            }                  
            for(let i in params){
                if(params[i] === ''){
                    delete params[i];
                }
            }
            params.store_id = this.store_id;
            if(!params.store_id){
                this.$Message.error('请选择门店');
                return;
            }
            this.sloading = true;
            this.$http.post("/boss/store/addAppointmentTimeRange",params).then(res=>{
                this.sloading = false;
                this.modalState = false;
                this.getData();
                this.$Message.success(res.message);
            });
            this.sloading = true;
        },
        sChange (v){
            this.formItem.start_at = v;
        },
        eChange (v){
            this.formItem.end_at = v;
        },
        cancel () {
            this.modalState = false;
            this.sloading = false;
        },
        intervalSet () {
            let value = 30;
            this.$http.get('/boss/store/getSettingValue',{params: {
                store_id: this.store_id,
                path: 'appointment_interval'
            }}).then(res=>{
                value = parseInt(res.data.value)||30;
                this.$Modal.confirm({
                    title: '时间间隔设置',
                    okText: '保存',
                    render: (h)=>{
                        return h('div',{
                            style: {
                                textAlign: 'center',
                                paddingTop: '20px'
                            }
                        },[
                            h("Select",{
                                props: {
                                    placeholder: '选择时间间隔',
                                    value: value
                                },
                                style: {
                                    width: '200px'
                                },
                                on: {
                                    'on-change' (v) {
                                        value = v;
                                    }
                                }
                            },[
                                h('Option',{
                                    props: {
                                        value: 30
                                    }
                                },'30分钟'),
                                h('Option',{
                                    props: {
                                        value: 60
                                    }
                                },'60分钟'),
                                h('Option',{
                                    props: {
                                        value: 90
                                    }
                                },'90分钟'),
                                h('Option',{
                                    props: {
                                        value: 120
                                    }
                                },'120分钟')                                                                        
                            ])                        
                        ])
                    },
                    onOk: ()=>{
                        _this.$http.post("/boss/store/setting",{appointment_interval: value}).then(res=>{
                            _this.$Message.success(res.message);
                        })
                    }
                });                
            })
        }
    },
    mounted () {
        _this = this;
        if(this.store_id){
            this.getData();
        }
    }
}
</script>

<style>

</style>
