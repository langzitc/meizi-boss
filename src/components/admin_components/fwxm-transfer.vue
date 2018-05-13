<template>
    <Row>
        <i-col :xs="24">
            <div class="mz-trs-left">
                <div class="mz-trs-header">
                    <Row :gutter="10">
                        <i-col :xs="17">
                            选择服务项目
                        </i-col>
                        <i-col :xs="7" class="text-right">
                            共&nbsp;{{allData.length}}&nbsp;项,已选择&nbsp;{{selectNum}}&nbsp;项
                        </i-col>
                    </Row>
                </div>
                <div class="mz-trs-body">
                    <div v-if="allData.length">
                        <div class="mz-trs-check-item" v-for="(item,index) in allData" :key="index">
                            <Checkbox @on-change="change" :disabled="item.disabled" v-model="item.checked">{{item.label}}</Checkbox>
                            <div>
                                <RadioGroup @on-change="change" v-model="item.attributes[item.attributes.code]" class="mz-trs-radio-group" v-if="item.checked&&item.children&&item.children.length">
                                    <Radio v-for="(el,index) in item.children" :key="index" :label="el.value" class="mz-trs-radio">{{el.label}}</Radio>
                                </RadioGroup>                                
                            </div>
                        </div>
                    </div>               
                    <div class="text-muted text-center" v-else>
                        没有服务项目
                    </div>                       
                </div>
            </div>
        </i-col>
    </Row>
</template>

<script>
export default {
    name: 'fwxm-transfer',
    props: {
        data: Array,
        default () {
            return [];
        }
    },
    data (){
        return {
            allData: []
        }
    },
    methods: {
        init () {
            let arr = [];
            let data = JSON.parse(JSON.stringify(this.data));
            data.forEach(e=>{
                let obj = {};
                obj.value = e.id;
                obj.label = e.name;
                obj.price = e.price;
                obj.checked = false;
                obj.disabled = false;
                obj.attributes = {
                    code: ''
                };
                if(e.advanced_prices&&e.advanced_prices.length){
                    let codeArr = e.price_attributes_detail.map(m=>{
                        return m.code;
                    })
                    let children = [];
                    e.advanced_prices.forEach(e2=>{
                        let obj2 = {
                            price: e2.price,
                            checked: false,
                            disabled: false
                        };
                        codeArr.forEach(n=>{
                            if(e2.attributes[n]){
                                obj2.label = e2.attributes[n].label;
                                obj2.value = e2.attributes[n].value;
                                obj.attributes[n] = '';
                                obj.attributes.code = n;
                            }
                        })
                        children.push(obj2);
                    })
                    obj.children = children;
                }
                arr.push(obj);
            })
            this.allData = arr;
        },
        change () {
            let d = this.allData.filter(e=>{
                return e.checked
            })
            this.$emit('on-change',d);
        }
    },
    watch: {
        data: {
            deep: true,
            handler (n,o) {
                this.init();
            }
        }        
    },
    computed: {
        selectNum () {
            return this.allData.filter(e=>{
                return e.checked;
            }).length;
        }
    },
    mounted () {
        this.init();
    }
}
</script>

<style lang="less">
    .mz-trs-left,.mz-trs-right{
        position: relative;
        height: 250px;
        border-radius: 3px;
        border: 1px solid #ddd;
        width: 100%;
        padding-top: 40px;
    }
    .mz-trs-header{
        background: #f9fafc;
        padding: 5px 15px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
    .mz-trs-body{
        height: 200px;
        padding: 15px;
        overflow: auto;
    }
    .mz-trs-radio-group{
        padding-left: 20px;
    }
    .mz-trs-radio{
        
    }
</style>
