<template>
  <Cascader :data="data" :v-model="hasSelectCity" @on-change="selectChange" change-on-select :load-data="loadData" :size="size">
    <slot></slot>
  </Cascader>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'Select-City',
        props: {
          size: {
            type: String,
            default: 'large'
          },
            id: {
            type: Number,
            default: 0
          },
          lay: {
            type: Number,
            default: 3
          },
          hasSelectCity: {
            type: Array,
            default(){
              return [];
            }
          }
        },
        data() {
            return {
              data: [],
              clay: 0,
              pid: 0
            }
        },
        methods: {
          getRegion (level) {
            return new Promise((resolve,reject)=>{
              axios.get("/region/list",{params: {pid: this.pid}}).then((res)=>{
                if(res.code == 200){
                  let d = res.data;
                  if(d.length&&level<3){
                    d.map((e)=>{
                      e.loading = false;
                      e.children = [];
                      e.level = level;
                    });
                  }
                  resolve(d);
                }else{
                  reject(false);
                }
              }).catch((e)=>{
                throw(new Error(e));
              })
            })
          },
          loadData (item,callback) {
            let level = item.level+1;
            if(level<4){
              this.pid = item.value;
              item.loading = true;
              this.getRegion(level).then((d)=>{
                item.loading  = false;
                item.level = level;
                if(d.length){
                  item.children = d;
                  callback();
                }
              }).catch((e)=>{
                item.loading = false;
                this.$Message.error("请求错误");
                throw new Error(e);
              });
            }
          },
          selectChange (value,selectData) {
              this.$emit('cityChange',value);
              this.$emit('cityChange2',selectData);
          }
        },
        mounted () {
          this.pid = this.id;
          if(this.pid === 0){
            let d = JSON.parse(JSON.stringify(this.$store.state.source.province));
            d.map((e)=>{
              e.loading = false;
              e.children = [];
              e.level = 1;
            })
            this.data = d;
          }else{
            this.getRegion().then((d)=>{
              this.data = d;
            });
          }
        }
    }
</script>
<style type='less' scoped>
</style>
