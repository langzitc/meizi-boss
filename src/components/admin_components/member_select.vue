<template>
    <Select
        v-model="selectMember"
        filterable
        remote
        :remote-method="search"
        placeholder="请输入手机号搜索"
        :loading="loading">
        <Option v-for="(option, index) in memberList" :value="option.id" :key="index" :label="option.name">
            <Row class="clearfix">
            <i-col :xs="12" class="text-muted">{{option.name}}</i-col>
            <i-col :xs="12" class="text-right">{{option.mobile}}</i-col>                            
            </Row>
        </Option>
    </Select>   
</template>

<script>
export default {
    name: 'member-select',
    data (){
        return {
            selectMember: "",
            loading: false,
            memberList: []
        };
    },
    watch: {
        selectMember (n,o) {
            let obj = this.memberList.filter(e=>{
                if(e.id == n){
                    return e;
                }
            })
            this.$emit('member-change',obj[0]);
        }
    },
    methods: {
        search (query) {
            if (query !== '' && !this.loading) {
                this.loading = true;
                let params = {
                    mobile: query
                };
                this.$http.get("/boss/storeMember/list",{params}).then(res=>{
                    this.memberList = res.data.items;
                    this.loading = false;
                })  
            } else {
                this.memberList = [];
            }                
        },
    }
}
</script>

<style>

</style>
