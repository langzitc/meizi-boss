<template>
  <span @click="modalShow">
      <slot>
          <Button type="ghost" size="small">设置服务</Button>
      </slot>
        <Modal
            title="设置服务项目"
            v-model="modalState"
            ok-text="确认"
            class-name="modal-scroll"
            :loading="modalState"
            width="650"
            :mask-closable="false"            
        >
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" @click="save">保存</Button>
            </div>                              
            <Form ref="setServiceForm" :label-width="120">
                <FormItem label="已选择员工">
                    <Tag :closable="items.length>1" color="blue" v-for="(item,index) in items" @on-close="remove(item.id)" :key="item.id">{{item.name}}</Tag>
                </FormItem>
                <FormItem label="服务项目">
                    <RadioGroup v-model="service_id">
                        <Radio :label="0">全部项目</Radio>
                        <Radio :label="1">自定义项目</Radio>
                    </RadioGroup>                    
                </FormItem>
                <FormItem v-if="service_id == 1">
                    <CheckboxGroup v-model="selectService">
                    <table class="table table-bordered">
                        <thead>
                            <tr style="background-color: #ddd">
                                <th>项目名称</th>
                                <th>项目类别</th>
                                <th>可服务</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in serviceList" :key="item.id">
                                <td>{{item.name}}</td>
                                <td>{{item.selected_category_options | category}}</td>
                                <td><Checkbox :label="item.id">可服务</Checkbox></td>
                            </tr>
                        </tbody>
                    </table>
                    </CheckboxGroup>
                </FormItem>
            </Form>             
        </Modal>  
  </span>
</template>

<script>
import Vue from 'vue'
Vue.filter("category", function(value) {
    let a = value.map(e=>{
        return e.label;
    })
    return a.join(","); 
});
export default {
    name: 'set-service',
    data () {
        return {
            modalState: false,
            disabledGroup: 1,
            serviceList: [],
            selectService: [],
            service_id: 1
        }
    },
    props: {
        store_id: {
            type: String,
            required: true
        },
        items: {
            type: Array
        }
    },    
    watch: {
        modalState (n,o) {
            if(n){
                this.$http.get("/boss/product/list",{params:{
                    store_id: this.store_id,
                    type_code: 'service',
                    response_data_model: 'EMPLOYEE_SERVICE_LINK'
                }}).then(res=>{
                    let d = res.data.items;
                    this.serviceList = d;
                })
                if(this.items.length === 1){
                    this.selectService = this.items[0].service_items.map(e=>{
                        return e.product_id;
                    })
                }
            }
        }
    },
    methods: {
        modalShow () {
            if(this.items.length){
                this.modalState = true;
            }else{
                this.$Message.error("请选择要设置的员工");
            }
        },
        save () {
            let service_id = 0;
            if(this.service_id){
                service_id = this.selectService.join(',');
            }
            let employee_id = this.items.map(e=>{return e.id}).join(',');
            this.$http.post("/boss/employee/updateServiceLink",{
                service_id,
                employee_id
            }).then(res=>{
                this.$Message.success(res.message);
                this.modalState = false;
                this.$emit('on-change');
            });
        },
        cancel () {
            this.modalState = false;
        },
        remove (index) {
            this.$emit('on-remove',index);
        }
    }
}
</script>

<style>

</style>
