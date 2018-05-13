<template>
    <Select
        v-model="selectMember"
        filterable
        clearable
        remote
        :remote-method="search"
        placeholder="请输入手机号搜索"
        :loading="loading">
        <Option v-for="(option, index) in memberList" :value="option.id" :key="index" :label="option.name">
            <Row class="clearfix">
            <i-col :xs="12">{{option.name}}</i-col>
            <i-col :xs="12" class="text-right">{{option.mobile}}</i-col>                            
            </Row>
        </Option>
    </Select>     
</template>

<script>
export default {
    name: 'staff-select-search',
    data () {
        return {
            memberList: [],
            loading: false,
            selectMember: "",         
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
        async getMemberInfo (id) {
        	let d = {};
            let getInfo = (id)=>{
                return new Promise((resolve,reject)=>{
                    this.$http.get("/boss/storeMember/info",{params: {id: id}}).then(res=>{
                        resolve(res.data);
                    })                               
                });
            }              
			if(id){
                d = await getInfo(id);
            }
            this.$emit("on-change",id,d);        	
        },
        resetMember (id) {
        	this.getMemberInfo(id);
        }
    },
    watch: {
        selectMember (n,o) {
			this.getMemberInfo(n);
        }        
    }
}
</script>

<style>

</style>
