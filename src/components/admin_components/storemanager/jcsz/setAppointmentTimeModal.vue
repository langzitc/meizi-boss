<template>
    <span @click="showModal">
        <slot>
            <Button type="info" size="small">配置预约时间段</Button> 
        </slot>
        <Modal
            title="设置预约时间"
            v-model="modalState"
            class-name="modal-scroll"
            :loading="modalState"
            width="450"
            :mask-closable="false"            
        >
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" :loading="btnLoading" size="large" @click="save">确认</Button>
            </div> 
            <div class="text-center" style="margin: 20px 0">
                <RadioGroup v-model="appointment_interval">
                    <Radio :label="30">30分钟</Radio>
                    <Radio :label="60">60分钟</Radio>
                </RadioGroup>                   
            </div>         
        </Modal>           
    </span>      
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'add-lctc-modal',
    data () {
        return {
            modalState: false,
            btnLoading: false,
            appointment_interval: 30    
        }
    },
    watch: {
        modalState (n,o){
            if(n){
                this.$http.get('/boss/store/getSettingValue',{params: {
                    store_id: this.store_id,
                    path: 'appointment_interval'
                }}).then(res=>{
                    this.appointment_interval = parseInt(res.data.value)||30;     
                })           
            }else{
                this.cancel();
            }
        }
    },
    computed: {
        store_id () {
            return this.$store.state.story.store_id;
        }
    },
    methods: {
        showModal () {
            this.modalState = true;
        },
        save () {
            this.btnLoading = true;
            this.$http.post("/boss/store/setting",{appointment_interval: this.appointment_interval}).then(res=>{
                this.$Message.success(res.message);
                this.btnLoading = false;
                this.modalState = false;
            }).catch(e=>{
                this.btnLoading = false;
            })            
        },
        cancel () {
            this.modalState = false;
        }

    }
}
</script>

<style scoped lang="less">
</style>

