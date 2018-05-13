<template>
    <div>
        <Alert type="warning"><Icon type="alert" color="#9f1d49" style="margin-right:15px"></Icon>请勾选需要的员工职位类型，移动端仅显示高级员工。</Alert>
        <Form :label-width="120">
            <FormItem label="选择门店">
                <select-store style="width:200px"></select-store>
            </FormItem>
            <FormItem label="选择员工类型">
                <CheckboxGroup v-model="selected" @on-change="dataChange">
                    <div v-for="item in data" :key="item.id" class="check-wrap">
                            <Checkbox :label="item.id" class="text-warning">{{item.name}}</Checkbox> 
                            <div class="check-wrap-body">
                                <Checkbox :label="el.id" v-for="el in item.children" :key="el.id">{{el.name}}</Checkbox> 
                            </div>                                          
                    </div>
                </CheckboxGroup>                
            </FormItem>                     
        </Form>
    </div>
</template>
<script>
    import SelectStore from '../store_select'
    export default {
        name: 'AddStaffType',
        data () {
            return {
                data: [],
                selected: []
            }
        },
        computed: {
            store_id () {
                return this.$store.state.story.store_id;
            },
            staffTypeList () {
                return this.$store.state.story.staffTypeList;
            }
        },
        watch: {
            staffTypeList (n,o) {
                let arr = [];
                n.forEach(e=>{
                    arr.push(e.system_item_id);
                    if(e.children){
                        e.children.forEach(e2=>{
                            arr.push(e2.system_item_id);
                        })
                    }
                })
                this.selected = arr;
            }
        },
        methods: {
            cancelManageGroup(){
                
            },
            dataChange (v) {
                this.data.forEach(e=>{
                    let flag = false;
                    e.children.forEach(e2=>{
                        if(v.includes(e2.id)){
                            flag = true;
                        }
                    })
                    if(flag){
                        if(!v.includes(e.id)){
                            this.selected.push(e.id);
                        }
                    }
                })
            },
            handManageGroup(){
                let d = JSON.parse(JSON.stringify(this.data));
                let format = (data)=>{
                    let a = data.filter(e=>{
                        return this.selected.includes(e.id);
                    });    
                    a.forEach(e=>{
                        e.system_item_id = e.id;
                        if(e.children&&e.children.length){
                            e.children = format(e.children);
                        }
                    }) 
                    return a;            
                }
                let data = {store_id: this.store_id,items: format(d)};
                this.$store.dispatch("ADD_STAFF_TYPE",data).then((msg)=>{
                    this.$Message.success(msg);
                    this.$emit("on-change");
                }) 
            }                               
        },
        mounted () {
            this.$http.get("/boss/storeEmployeeJobTitle/listSystemDefinedJotTitles").then(res=>{
                this.data = res.data;
            })
            if(this.staffTypeList.length){
                let arr = [];
                this.staffTypeList.forEach(e=>{
                    arr.push(e.system_item_id);
                    if(e.children){
                        e.children.forEach(e2=>{
                            arr.push(e2.system_item_id);
                        })
                    }
                })
                this.selected = arr;
            }
        },
        components: {
            SelectStore
        }
    }
</script>
<style lang="less" scoped>
    .check-wrap{
        padding: 5px 0;
        .check-wrap-body{
            
        }
        & +&{
            border-top: 1px solid #ddd;
        }
    }
</style>
