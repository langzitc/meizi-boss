<template>
    <div>
        <div class="GroupCheckBox">
            <div style="padding-bottom:4px;">
                <Checkbox
                        :indeterminate="indeterminate"
                        :value="checkAll"
                        @click.prevent.native="handleCheckAll"> {{group.name}}</Checkbox>
            </div>
            <div  class="group-checkbox-options-container">
                <CheckboxGroup v-model="checkedValues"
                               @on-change="checkAllGroupChange">
                    <span class="option-item" v-for="option in InnerOptions" :key="option.value">
                        <Checkbox
                                v-bind:true-value="option.value"
                                v-bind:false-value="0"
                                v-bind:label="option.value">
                            <span class="option-title">{{option.label}}</span>
                        </Checkbox>
                    </span>
                </CheckboxGroup>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .group-checkbox-options-container .option-title{
        padding-left:2px;
    }
    .group-checkbox-options-container{
        padding:10px 0px;
        margin-bottom:15px
    }
</style>

<script>
    import Utils from '../../model/Utils'
    export default {
        name:"GroupCheckBox",
        props: [
            "options",
            "values",
            "group"
        ],
        data () {
            return {
                indeterminate: false,
                checkAll: false,
                checkedValues: [],
                optionValues:[],
            }
        },
        mounted: function () {
            if(!this.group) {
                this.group = {
                    name:"全选",
                    id:0
                }
            }
            console.log("mounted" + this.group.name);
            console.log( this.checkedValues);
            this.$emit('init', {data: this.checkedValues, group: this.group.id});
        },
        computed: {
            InnerOptions: function() {
                let op = [];
                if(typeof(this.options) == undefined) {
                    return op;
                }
                this.options.map((item)=>{
                    let opi = {
                        value:item.value +"",
                        label:item.label,
                    };
                    this.optionValues.push(opi.value);
                    op.push(opi)
                });
                return op;
            }
        },
        watch:{
            values(newValue, oldValue) {
                this.checkedValues = [];
                newValue.map((v)=>{
                    let strV = v+"";
                    if(this.checkedValues.indexOf(strV) == -1 && this.optionValues.indexOf(strV) != -1) {
                        this.checkedValues.push(strV);
                    }
                });
                this.setCheckBoxStatus(this.checkedValues);
                this.$emit('init', {data: this.checkedValues, group: this.group.id});
            }
        },
        methods: {
            setCheckedValues(isInit = false) {
                if(this.values != undefined) {
                    this.values.map((item)=>{
                        if( typeof(item) == undefined) {
                            return;
                        }
                        if(this.checkedValues.indexOf(item) == -1) {
                            this.checkedValues.push({
                                value:item.value +"",
                                label:item.label,
                            });
                        }
                    });
                    if(this.values.length == this.checkedValues.length) {
                        this.checkAll = true;
                        this.indeterminate = true;
                    }
                }
                this.setCheckBoxStatus(this.checkedValues, isInit)
            },

            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                this.options.map((item)=>{
                    let valueIndex = -1;

                    if( (valueIndex = this.checkedValues.indexOf(item.value + "")) !== -1) {
                        delete this.checkedValues[valueIndex];
                    }
                    this.checkedValues = this.checkedValues.filter((value)=>{
                        return value !== null && value !== "null";
                    });
                });

                if (this.checkAll) {
                    this.options.map((item)=>{
                        this.checkedValues.push(item.value + "");
                    });
                } else {
                    this.checkedValues = [];
                }
                this.$emit('changed', {data: this.checkedValues, group: this.group.id});
            },

            checkAllGroupChange (data, isInit = false) {
                if(isInit == false) {
                    this.$emit('changed', {data: data, group: this.group.id});
                }
                this.setCheckBoxStatus(data);

            },
            setCheckBoxStatus: function(data) {
                let checkedValueItemCount = 0;
                this.InnerOptions.map((option)=>{
                    if(data.indexOf(option.value) !== -1) {
                        checkedValueItemCount++;
                    }
                });
                if (checkedValueItemCount === this.options.length) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (checkedValueItemCount > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            }
        }
    }
</script>
