<template>
    <Card>
        <div slot="title">
            <Row class="clearfix" :gutter="20">
                <i-col :sm="6" :md="4">
                    <Select v-model="params.store_id" placeholder="全部门店" clearable transfer>
                        <Option v-for="item in storeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>                      
                </i-col>
                <i-col :sm="6" :md="4">
                    <Select placeholder="选择消费类型" v-model="param.order_type">
                        <Option value="">全部消费类型</Option>
                        <Option :value="0">服务项目消费</Option>
                        <Option :value="1">疗程套餐订购</Option>
                        <Option :value="2">会员充值</Option>
                        <Option :value="3">会员开卡</Option>
                    </Select>
                </i-col>
                <i-col :sm="6" :md="4">
                    <staff-select-search @on-change="employeeChange"></staff-select-search>
                </i-col>                
                <i-col :sm="6" :md="4">
                    <DatePicker :transfer="true" disabled :value="params.start_date" type="date" @on-change="dateChange"></DatePicker>
                </i-col>  
                <i-col :sm="6" :md="4">
                    <Button type="primary" @click="search">查询</Button>
                </i-col>                                
            </Row>
        </div>
        <MemoTable :param="params"></MemoTable>
    </Card>     
</template>
<script>
    import EditOrder from './editOrder'
    import StaffSelectSearch from '../staff_select_search'
    import MemoTable from '../memo_table'
    let nowDay = (new Date()).Format('yyyy-MM-dd');
    export default {
        name: 'TodayMemo',
        data() {
            return {
                param: {
                    mobile: '',
                    customer_name: '',  
                    order_type: ''                    
                },
                params: {
                    start_date: nowDay,
                    end_date: nowDay,
                    order_type: '',
                    with_store_manager_info: 1,
                    mobile: '',
                    customer_name: '',
                    store_id: ''                 
                }
            }
        },
        computed: {
            storeList () {
                return this.$store.state.story.storeList;
            }
        },
        methods: {
            dateChange (v) {
                this.params.start_date = v;
                this.params.end_date = v;
            },
            employeeChange (id,d){
                this.param.mobile = d.mobile;
            },
            search () {
                Object.assign(this.params,this.param);
            },
        },
        components: {
            StaffSelectSearch,
            MemoTable
        }
    }
</script>
<style type='less' scoped>
</style>
