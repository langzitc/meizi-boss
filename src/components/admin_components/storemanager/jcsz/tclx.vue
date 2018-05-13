<template>
    <div>
        <div style="padding: 15px 0">
            <tclx-modal @on-change="getList">
                <Button type="info">新增类型</Button>
            </tclx-modal>
        </div>
        <Table border :loading="loading" :data="data" :columns="columns"></Table>         
    </div>
</template>

<script>
import TclxModal from './tclxModal'
let _this;
export default {
    name: 'jcsz-tclx',
    data () {
        return {
            data: [],
            loading: false,
            columns: [{
                title: '编号',
                key: 'id'
            },{
                title: '套餐类型名称',
                key: 'name'
            },
            /*{
                title: '所属部门',
                key: 'department_name'
            },*/
            {
                title: '操作',
                align: 'right',
                render: (h,p)=> {
                    return h('span',[
                        h(TclxModal,{
                            props: {
                                data: p.row
                            },
                            on: {
                                'on-change' () {
                                    _this.getList();
                                }
                            }
                        }),
                        h('Button',{
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            on: {
                                click () {
                                    _this.$Modal.confirm({
                                        title: '系统提示',
                                        content: '确认删除类型?',
                                        onOk: ()=>{
                                            _this.$http.post("/boss/category/delete",{
                                                id: p.row.id
                                            }).then(res=>{
                                                _this.getList();
                                                this.$Message.success(res.message);
                                            });
                                        }
                                    });
                                }
                            },
                            style: {
                                marginLeft: '5px'
                            }
                        },'删除'),                        
                    ])
                }
            }]
        }
    },
    methods: {
        getList () {
            this.loading = true;
            this.$http.get('/boss/category/list',{params: {
                type_code: 'grouped_service',
                is_deleted:0,
                is_grouped: 0
            }}).then(res=>{
                this.data = res.data;
                this.loading = false;
            }).catch(e=>{
                this.loading = false;
            })
        }
    },
    components: {
        TclxModal
    },
    mounted () {
        _this = this;
        this.getList();
    }
}
</script>

<style>

</style>
