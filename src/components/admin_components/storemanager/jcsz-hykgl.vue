//会员卡管理
<template>
  <div>
    <Card>
      <div slot="title">
        <Row>
            <i-col :xs="12" class="text-left">
                <Button icon="android-add" type="info" @click="addCardModal">新增会员卡项</Button>
                <!-- <Button :disabled="true" type="success" @click="addCardModal">批量设置卡项适用门店</Button> -->
                <Button :disabled="true" type="warning" @click="addCardModal">已删除会员卡项</Button>
                <Button :disabled="true" type="primary" @click="addCardModal">删除</Button>
                <Modal
                v-model="modal_add_state"
                :loading="modal_add_state"
                ok-text="保存"
                :mask-closable="false"
                class-name="modal-scroll"
                :title="modalTitle">
                <div slot="footer">
                        <Button type="ghost" @click="handleCancel">取消</Button>
                        <Button type="primary" @click="handleAdd">保存</Button>
                </div>
                <Form :label-width="120" :model="formValidate" :rules="ruleValidate" ref="addProductCardForm">
                    <FormItem label="会员卡编号" prop="sku">
                        <Input type="text" placeholder="请输入..." v-model="formValidate.sku"></Input>
                    </FormItem>
                    <FormItem label="会员卡名称" prop="name">
                    <Input type="text" placeholder="请输入..." v-model="formValidate.name"></Input>
                    </FormItem>
                    <FormItem label="项目折扣" prop="xmzk">
                        <InputNumber  v-model="formValidate.discount_amount_for_service_item" :min="0" :max="10">
                        </InputNumber>
                        <span class="text-warning">&nbsp;&nbsp;折</span>
                    </FormItem>
                    <FormItem label="套餐折扣" prop="tczk">
                        <InputNumber v-model="formValidate.discount_amount_for_service_group" :min="0" :max="10">
                        </InputNumber>
                        <span class="text-warning">&nbsp;&nbsp;折</span>
                    </FormItem>


                    <FormItem label="最低开卡冲值金额" prop="tczk">
                        <InputNumber v-model="formValidate.min_recharge_amount" :min="0" :max="10000000">
                        </InputNumber><span class="text-warning">&nbsp;&nbsp;元</span>
                    </FormItem>

                    <FormItem label="默认赠送金" prop="tczk">
                        <InputNumber v-model="formValidate.given_amount" :min="0" :max="100000000">
                        </InputNumber>
                        <span class="text-warning">&nbsp;&nbsp;元</span>
                    </FormItem>

                        <FormItem label="有效期" prop="expired">
                            <Checkbox v-model="expired">不过期</Checkbox>
                            <DatePicker :transfer="true" v-show="!expired" type="date" placeholder="请选择日期" v-model="formValidate.expired_at"></DatePicker>
                        </FormItem>
                        <FormItem label="详细备注" prop="description">
                            <Input type="textarea" placeholder="请输入..." v-model="formValidate.description"></Input>
                        </FormItem>
                </Form>
                </Modal>
            </i-col>
            <i-col :xs="12" class="text-right">
                <Input icon="ios-search" v-model="keywords" @on-change="keywordSearch" placeholder="输入关键字..." style="width: 200px"></Input>
            </i-col>
        </Row>
      </div>
      <div>
        <Table border :columns="columns" :loading="loading" :data="cardList"></Table>
        <div class="text-right" style="margin-top: 15px">
            <Page :current="page" @on-change="pageChange" :total="total_count" size="small"></Page>
        </div>        
      </div>
    </Card>
  </div>  
</template>

<script>
import util from '../../../util'
import Utils from '../../../model/Utils'

let _this;
export default {
    name: 'jcsz-hykgl',
    data (){
        return {
            store_id: '',
            modal_add_state: false,
            modalTitle: '添加会员卡项',
            keywords: '',
            expired: true,
            cardList: [],
            columns: [{
                title: '编号',
                key: 'sku'
            },{
                title: '会员卡名称',
                key: 'name'
            },{
                title: '项目折扣',
                render(h,p){
                    let num = p.row.discount_amount_for_service_item;
                    if(/^[0-9]*[1-9][0-9]*$/.test(num)){
                        return parseInt(p.row.discount_amount_for_service_item)+"%";
                    }else if(/^\d+(\.\d+)?$/.test(num)){
                        return parseFloat(num).toFixed(2)+"%";
                    }
                    return num+"%";
                    
                }                
            },{
                title: '套餐折扣',
                render(h,p){
                    let num = p.row.discount_amount_for_service_group;
                    if(/^[0-9]*[1-9][0-9]*$/.test(num)){
                        return parseInt(p.row.discount_amount_for_service_group)+"%";
                    }else if(/^\d+(\.\d+)?$/.test(num)){
                        return parseFloat(num).toFixed(2)+"%";
                    }
                    return num+"%";                    
                }
            },{
                title: '金额',
                render(h,p){
                    return Utils.formatMoney(p.row.min_recharge_amount);
                }
            },{
                title: '赠送金',
                render(h,p){
                    return Utils.formatMoney(p.row.given_amount);
                }
            },{
                title: '有效天数',
                render(h,p){
                    return p.row.expired_at_label;
                    if(p.row.expired_at){
                        let ed = (new Date(p.row.expired_at)).getTime();
                        let nd = (new Date()).getTime();
                        let day = Math.abs(parseInt((ed-nd)/(3600*24*1000)));
                        if(ed>nd){
                            return `还有${day}天`;
                        }else{
                            return `已过期${day}天`;
                        }                        
                    }else{
                        return "无限期";
                    }
                }
            },{
                title: '状态',
                key: 'status_label'
            },{
                title: '备注',
                key: 'description'
            },{
                title: '操作',
                className: 'mzmy-table-oper',
                align: 'right',
                width: 150,
                render(h,p){
                    return h('div',[
                        h('Button',{
                            props: {
                                size: 'small',
                                type: 'info'
                            },
                            on: {
                                click(e){
                                    _this.modal_add_state = true;
                                    _this.modalTitle = "编辑会员卡项";
                                    util.clone(_this.formValidate,p.row);
                                    _this.formValidate.id = p.row.id;
                                    _this.formValidate.description = p.row.description;
                                    if(_this.formValidate.discount_amount_for_service_item){
                                        _this.formValidate.discount_amount_for_service_item = parseFloat(_this.formValidate.discount_amount_for_service_item)/10;
                                    }
                                    if(_this.formValidate.discount_amount_for_service_group){
                                        _this.formValidate.discount_amount_for_service_group = parseFloat(_this.formValidate.discount_amount_for_service_group)/10;
                                    }                                       
                                    if(_this.formValidate.expired_at){
                                        _this.expired = false;
                                    }else{
                                        _this.expired = true;
                                    }
                                }
                            }
                        },'编辑'),
                        h('Button',{
                            props: {
                                size: 'small',
                                type: 'primary'
                            },
                            style: {
                                marginLeft: '5px'
                            },                            
                            on: {
                                click(e){
                                    _this.$Modal.confirm({
                                        title: '系统提示',
                                        content: '<h4 class="text-warning text-center">确认删除？</h4>',
                                        onOk: ()=>{
                                            _this.$http.post("/boss/memberCard/delete",{id: p.row.id}).then(res=>{
                                                _this.$Message.success(res.message);
                                                _this.getCardList();
                                            })
                                        }
                                    }); 
                                }
                            }
                        },'删除')
                    ])
                }
            }],
            total_count: 0,
            page_size: 10,
            page: 1,
            formValidate: {
                sku: '',
                name: '',
                discount_amount_for_service_item: 10,
                discount_amount_for_service_group: 10,
                status: 1,
                description: '',
                expired_at: '',
                expired_at_label:"",
                min_recharge_amount:0,
                given_amount:0,
                stores:[]
            },
            ruleValidate: {
                name: [
                    { required: true, message: '会员卡名称不能为空', trigger: 'blur' }
                ],
                sku: [
                    { required: true, message: '会员卡编号不能为空', trigger: 'blur' }
                ],
                xmzk: [
                    
                ],
                tczk: [
                    
                ],
                expired: [

                ],
                description: []                                                   
            }
        }
    },
    computed: {
        loading () {
            return this.$store.state.user.request !== 0;
        }        
    },
    watch: {
        expired (n,o) {
            if(n){
                this.formValidate.expired_at = "";
            }
        },
        modal_add_state (n,o) {
            if(!n){
                this.$refs['addProductCardForm'].resetFields();
            }
        }
    },
    methods: {
        keywordSearch() {
            Utils.delay(()=>{
                this.getCardList();
            },800)
        },
        handleAdd (){
            this.$refs['addProductCardForm'].validate(valid=>{
                if(valid){
                    let path = "/boss/memberCard/create";
                    let params = JSON.parse(JSON.stringify(this.formValidate));
                    if(this.formValidate.id){
                        path = "/boss/memberCard/update";
                    }
                    params.type_code = "membership_card";
                    if(params.discount_amount_for_service_item){
                        params.discount_amount_for_service_item = parseFloat(params.discount_amount_for_service_item)*10;
                    }
                    if(params.discount_amount_for_service_group){
                       params.discount_amount_for_service_group = parseFloat(params.discount_amount_for_service_group)*10;
                    }                      
                    if(this.formValidate.expired_at instanceof Date){
                        params.expired_at = this.formValidate.expired_at.Format("yyyy-MM-dd");
                    }
                    this.$http.post(path,params).then(res=>{
                        this.$Message.success(res.message);
                        this.getCardList();
                        this.$refs['addProductCardForm'].resetFields();
                        this.modal_add_state = false;
                    })
                }else{
                    this.$Message.error("表单填写有误");
                }
            })
        },
        handleCancel (){
            this.modal_add_state = false;
        },
        addCardModal (){
            this.modal_add_state = true;
            this.modalTitle = "添加会员卡项";

            this.formValidate.given_amount=0
            this.formValidate.min_recharge_amount = 0
            
            if(this.formValidate.id){
                delete this.formValidate.id;
            }
        },
        getCardList (){
            let params = {
                page: this.page,
                page_size: this.page_size
            };
            if(this.keywords){
                params.name = this.keywords;
            }
            this.$http.get("/boss/memberCard/list",{params}).then((res)=>{
                this.cardList = res.data.items;
                this.total_count = parseInt(res.data.total_count);
                this.page_size = parseInt(res.data.page_size);
            });
        },
        pageChange (p){
            this.page = p;
            this.getCardList();
        }         
    },
    mounted (){
        _this = this;
        this.getCardList();
    }
}
</script>

<style>

</style>