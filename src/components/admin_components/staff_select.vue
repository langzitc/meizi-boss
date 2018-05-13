<template>
    <Select @on-change="typeChange" v-model="id" placeholder="请选择员工" :transfer="true">
        <Option v-for="el in employeeList" :key="el.id" :value="el.id" :label="el.name">
            <Row class="clearfix">
                <i-col :xs="12">{{el.name}}</i-col>
                <i-col :xs="12" class="text-right">{{el.employee_number}}</i-col>
            </Row>
        </Option>
    </Select>     
</template>

<script>
export default {
    name: 'staff-select',
    data (){
        return {
            id: '',
            employeeList: []
        };
    },
    props: {
        employee_id: {
            type: String
        }
    },
    computed: {
        store_id () {
            return this.$store.state.story.store_id;
        }
    },
    watch: {
        employee_id (){
            this.id = this.employee_id;
        },
        store_id (n,o) {
            this.dataInit();
        }
    },
    methods: {
        dataInit () {
            this.$http.get("/boss/employee/list",{
                params: {
                    store_id: this.store_id,
                    with_service_items: 1
                }
            }).then(res=>{
                this.employeeList = res.data.items;
            })            
        },
        typeChange (v) {
            let obj = this.employeeList.filter(e=>{
                if(e.id == v){
                    return e;
                }
            })
            this.$emit('staff-change',obj[0]||{});
        }
    },
    mounted () {
        if(this.store_id){
            this.dataInit();
        }
    }
}
</script>

<style>

</style>
