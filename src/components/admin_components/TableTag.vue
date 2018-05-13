<template>
    <div class="mzmy-table-tag-box">
        <tag  :color="color" v-for="(item,index) in data" :key="index" v-if="showAll ? true : index === 0">{{item}}</tag>
        <Button v-if="data.length>1" type="text" :icon="icon" size="small" class="tag-util" @click="stateChange">{{showAll ? '收起' : '展开'}}</Button>
    </div>
</template>
<script>
    export default {
        name: 'table-tag',
        props: {
            data: {
                type: Array,
                default () {
                    return []
                }
            },
            color: {
                type: String,
                default: 'blue'
            }
        },
        data () {
            return {
                icon: 'chevron-down',
                showAll: false
            }
        },
        methods: {
            stateChange () {
                this.showAll = !this.showAll;
                this.icon = this.icon === 'chevron-down' ? 'chevron-up' : 'chevron-down';
            }
        }
    }
</script>
<style lang="less">
    .mzmy-table-tag-box{
        position: relative;
        padding-right: 50px;
        width:100%;
    }
    .tag-util{
        position: absolute;
        right: -15px;
        top: 0;
    }
</style>