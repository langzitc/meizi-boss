//服务项目管理
<template>
     <div class="demo-tabs-style2">
      <Card>
        <Tabs v-model="tabName"> 
          <TabPane label="服务项目" name="fwxm">
              <ServiceItemsFwxm v-if="tabName==='fwxm'" ref="ServiceItemsFwxm"></ServiceItemsFwxm> 
          </TabPane>
          <TabPane label="疗程套餐" name="lctc">
              <ServiceItemsLctc v-if="tabName==='lctc'" ref="ServiceItemsLctc"></ServiceItemsLctc> 
          </TabPane>
          <!--<TabPane label="服务项目会员价设置">-->
              <!--<ServiceItemsFwxmhyjsz ref="ServiceItemsFwxmhyjsz"></ServiceItemsFwxmhyjsz> -->
          <!--</TabPane>          -->
        </Tabs>
      </Card>
    </div> 
</template>

<script>
import ServiceItemsFwxm from './serviceItems_fwxm'
//import ServiceItemsFwxmhyjsz from './serviceItems_fwxmhyjsz'
import ServiceItemsLctc from './serviceItems_lctc'
export default {
    name: 'ServiceItems',
    data (){
        return {
            tabName: 'fwxm'
        }
    },
    components: {
       ServiceItemsFwxm,
//       ServiceItemsFwxmhyjsz,
       ServiceItemsLctc 
    },
    mounted (){
        if(!this.$store.state.story.storeList.length){
            this.$store.dispatch("GET_STORE_LIST");
        }
    }
}
</script>

<style>

</style>