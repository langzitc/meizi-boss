<template>
  <Card>
    <Tabs v-model="tabName">
        <!-- <Tab-pane name="fwxmlx" label="服务项目类型">

        </Tab-pane> -->
        <Tab-pane name="tclx" label="套餐类型">
            <jcsz-tclx v-if="tabName === 'tclx'"></jcsz-tclx>
        </Tab-pane>
        <!-- <Tab-pane name="ygjb" label="员工级别"></Tab-pane>
        <Tab-pane name="ygjblx" label="员工级别类型"></Tab-pane> -->
        <Tab-pane name="bmfz" label="部门分组">
            <jcsz-bmfz v-if="tabName === 'bmfz'"></jcsz-bmfz>
        </Tab-pane>
    </Tabs>
  </Card>
</template>

<script>
import JcszTclx from './jcsz/tclx'
import JcszBmfz from './jcsz/bmfz'
export default {
    name: 'jcsz-jclxsz',
    data () {
        return {
            tabName: 'tclx'
        }
    },
    computed: {
        store_id () {
            return this.$store.state.story.store_id;
        }
    },
    watch: {
        // store_id (n,o){
        //     if(n){
        //         this.$store.dispatch("GET_DEPARTMENT_LIST",{
        //             store_id: n
        //         })
        //     }
        // }
    },
    mounted () {
        // if(this.store_id){
        //     this.$store.dispatch("GET_DEPARTMENT_LIST",{
        //         store_id: this.store_id
        //     })            
        // }
    },
    components: {
        JcszTclx,
        JcszBmfz
    }
}
</script>

<style>

</style>
