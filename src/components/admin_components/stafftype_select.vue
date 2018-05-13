<template>
    <Select @on-change="typeChange" v-model="id" :placeholder="placeholder">
            <Option value="" >全部分组</Option>
            <span v-for="el in staffTypeList" :key="el.id">
                <Option :value="el.id" disabled><span style="color: #000">{{el.name}}</span></Option>
                <Option :value="el2.id" :key="el2.id" v-for="el2 in el.children">
                    <span style="margin-left: 10px">{{el2.name}}</span>
                </Option>
            </span>   
    </Select>     
</template>

<script>
export default {
    name: 'select-stafftype',
    data (){
        return {
            id: ''
        };
    },
    computed: {
        staffTypeList (){
            return this.$store.state.story.staffTypeList;
        }
    },
    props: {
        stafftype_id: {
            type: String
        },
        placeholder: {
            type: String,
            default: '请选择分组'
        }
    },
    watch: {
        stafftype_id (){
            this.id = this.stafftype_id;
        }
    },
    methods: {
        typeChange (v) {
            this.$emit('stafftype-change',v);
        }
    },
    mounted () {
        this.$store.dispatch('GET_STAFF_TYPE_LIST');
    }
}
</script>

<style>

</style>
