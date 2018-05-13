<template>
    <Card>
        <div slot="title">
            <Alert type="warning">
                <h5>结账支付</h5>
                <p>
                    <span class="text-item">订单号: &nbsp;&nbsp;<span class="text-success">{{order.trans_number}}</span></span>
                </p>
                <p>
                    <span class="text-item">总消费: <span class="text-amount">{{total_count}}</span>元</span>
                    <span class="text-item">抵扣: <span class="text-amount">{{reduce_count}}</span>元</span>
                    <span class="text-item">应收金额: <span class="text-amount">{{receive_count}}</span>元</span>
                </p>
            </Alert>
        </div>
        <div class="zdy-tab">
            <Tabs type="card" v-model="fk_style">
                <TabPane label="现金" name="cash">
                    <Row class="tab-pane-wrap" :gutter="5" type="flex" align="middle" style="height: 400px">
                        <i-col :xs="24" style="position: relative">
                            <Input placeholder="输入收银金额" size="large" v-model="sh_amount">
                            </Input>
                            <div class="input-tip" :class="tipsClass" v-show="tips">{{tips}}</div>
                            <div class="input-tip input-tip-prepend">实收&nbsp;&nbsp;<Icon type="social-yen"></Icon></div>
                        </i-col>
                        <i-col :xs="6">
                            <Button type="ghost" @click="keyboard(7)" long>7</Button>
                        </i-col>
                        <i-col :xs="6">
                            <Button type="ghost" @click="keyboard(8)" long>8</Button>
                        </i-col>
                        <i-col :xs="6">
                            <Button type="ghost" @click="keyboard(9)" long>9</Button>
                        </i-col>
                        <i-col :xs="6">
                            <Button type="ghost" @click="keyboard(10)" long>C</Button>
                        </i-col> 
                        <i-col :xs="6">
                            <Button type="ghost" @click="keyboard(4)" long>4</Button>
                        </i-col>
                        <i-col :xs="6">
                            <Button type="ghost" @click="keyboard(5)" long>5</Button>
                        </i-col>
                        <i-col :xs="6">
                            <Button type="ghost" @click="keyboard(6)" long>6</Button>
                        </i-col>
                        <i-col :xs="6">
                            <Button type="ghost" @click="keyboard(11)" long><Icon type="arrow-left-c"></Icon></Button>
                        </i-col>  
                        <i-col :xs="6">
                            <Button type="ghost" @click="keyboard(1)" long>1</Button>
                        </i-col> 
                        <i-col :xs="6">
                            <Button type="ghost" @click="keyboard(2)" long>2</Button>
                        </i-col>
                        <i-col :xs="6">
                            <Button type="ghost" @click="keyboard(3)" long>3</Button>
                        </i-col>
                        <i-col :xs="6">
                            <Button type="ghost" @click="keyboard(12)" long>00</Button>
                        </i-col>
                        <i-col :xs="6">
                            <Button type="ghost" @click="keyboard(0)" long>0</Button>
                        </i-col>  
                        <i-col :xs="6">
                            <Button type="ghost" @click="keyboard(13)" long>.</Button>
                        </i-col> 
                        <i-col :xs="12">
                            <Button type="primary" @click="keyboard(14)" long>结算</Button>
                        </i-col>                                                                                                                                                                        
                    </Row>
                </TabPane>
                <TabPane label="刷卡" name="card">
                    <div class="text-center">
                        <img src="../../../../static/u2389.png" class="responsive" alt="">


                    </div>                    
                </TabPane>
                <TabPane label="微信" name="weixin" >
                    <div class="text-center">
                        <img src="../../../../static/u2157.png" class="responsive" alt="">

                    </div>
                    <div class="pay-page" style="margin-top:-120px; margin-left:30px;">
                        <Input v-model="weiPayCode" @on-focus="weiPayOnFocus()"
                               @on-change="startWeiPay()" style="height:100px;width:95%;" placeholder="请扫描..."
                               ></Input>

                        <div style="padding:10px 0px;font-size:20px;color:orangered">{{payResultMessage}}</div>
                    </div>
                </TabPane>
                <TabPane label="二维码台卡" name="cardcode">
                    <div class="text-center">
                        <img src="../../../../static/u2274.png" class="responsive" alt="">
                    </div>
                </TabPane>
            </Tabs>                 
        </div>
		<div class="part-loading" v-show="loading">
            <Spin fix>
                <Icon type="load-c" size=28 class="part-loading-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>			
		</div>        
    </Card>
</template>

<style>
    .pay-page .ivu-input {
        height:100px;
        font-size:40px;
    }
</style>

<script>
export default {
    name: 'cashier-jiezhang',
    data () {
        return {
            sh_amount: 0,
            tipsClass: 'text-info',
            fk_style: 'cash',
            pay_result_message: "",
            id: '',
            weiPayCode:"",
            state: '',
            order: {

            },
            loading: false
        }
    },
    computed: {
        payResultMessage() {
            return this.pay_result_message;
        },
        reduce_count () { 
            let n = 0;
            if(this.order.payments){
                this.order.payments.map(e=>{
                    if(e.method!=='ToBeDetermined'){
                        n+=parseFloat(e.amount);
                    }
                });  
            }
            return n.toFixed(2);                            
        },
        total_count () {
            let n = 0;
            if(this.order.payments){
                this.order.payments.map(e=>{
                    n+=parseFloat(e.amount);
                });  
            }
            return n.toFixed(2);                  
        },
        receive_count (){
            return this.total_count-this.reduce_count;
        },
        tips () {
            let s = parseFloat(this.sh_amount);
            if(s>this.receive_count){
                this.tipsClass = "text-success";
                return "找零"+parseFloat(s-this.receive_count).toFixed(2)+"元";
            }else if(s<this.receive_count){
                this.tipsClass = "text-danger";
                return "还缺"+parseFloat(this.receive_count-this.sh_amount).toFixed(2)+"元";
            }else{
                this.tipsClass = "text-info";
                return '不用找零';
            }
        },
        trans_numbers () {
            if(Array.isArray(this.trans_number)){
                return this.trans_number.join(" | ");
            }else{
                return this.trans_number;
            }
        }
    },
    methods: {
        weiPayOnFocus() {
            this.weiPayCode = "";
        },
        startWeiPay(v) {
            this.pay_result_message = "";
            if(this.weiPayCode.length  != 18) {
                return;
            }
            let params = {
                "order_id": this.order.id,
                "code": this.weiPayCode
            };
            if(this.fk_style == "weixin") {
                let url = "/boss/orderPay/startWeiPay";
                this.$http.post(url,params).then((res)=>{
                    console.log(res);
                    if(res.data.result && res.data.wei_order) {
                        this.pay_result_message = "支付成功,微信交易号: " + res.data.wei_pay_trade_no;
                        this.pay_result_message += ", 支付金额: " + (parseFloat(res.data.wei_order.total_fee) / 100).toFixed(2);
                    } else {
                        this.pay_result_message = res.data.details;
                    }
                    this.weiPayCode = "";
                })
            }
        },
        keyboard (num){
            if(num<10){
                this.sh_amount = this.sh_amount+''+num;
                this.sh_amount = parseFloat(this.sh_amount);
            }else{
                switch(num){
                    case 10: break;
                    case 11: 
                        let s = this.sh_amount.toString();
                        if(s.length>1){
                            this.sh_amount = s.substring(0,s.length-1);                            
                        }else{
                            this.sh_amount = "";
                        }
                    break;
                    case 12: 
                        this.sh_amount = this.sh_amount+''+'00';
                    break;
                    case 13: 
                        this.sh_amount = this.sh_amount+''+'.';
                    break;
                    case 14: 
                        this.$Modal.confirm({
                            title: '系统提示',
                            okText: '确认结算',
                            content: "确认支付结算？",
                            onOk: ()=>{
                                let m = "";
                                switch(this.fk_style){
                                    case 'cash': 
                                        m = 'Check';
                                    break;
                                    case 'cardcode': 
                                        m = 'Alipay';
                                    break;
                                    case 'card': 
                                        m = 'CreditCard';
                                    break;
                                    case 'weixin': 
                                        m = 'WeChatPay';
                                    break;
                                    default: 
                                        m = 'Check';
                                    break;
                                }
                                let params = {
                                    method: m
                                };
                                let url;
                                if(this.state === 'suspend'){
                                    params.order_id = this.id;
                                    url = "/boss/order/batchCapture";
                                }else{
                                    params.id = this.id;
                                    url = "/boss/order/capture";
                                }                        
                                this.$http.post(url,params).then(res=>{
                                    this.$Notice.success({
                                        title: '系统通知',
                                        duration: 10,
                                        desc: res.message
                                    });
                                    this.$router.push({
                                        name: 'cashier'
                                    });
                                })
                            }                            
                        });                        
                    break;
                }
            }
        }        
    },
    mounted () {
        if(this.$route.query.order_id){
            this.id = this.$route.query.order_id;
            this.loading = true;
            let params = {
                order_id: this.$route.query.order_id
            };
            this.$http.get("/boss/order/orderInfo",{params}).then(res=>{
                this.order = res.data;
                this.loading = false;
                setTimeout(()=>{
                    this.sh_amount = this.order.need_to_pay;
                },100)
            }).catch(e=>{
                this.loading = false;
            });                                            
        }else{
            this.$router.go(-1);

        }
    }
}
</script>

<style lang="less">
    .text-item{
        margin-right: 15px;
    }
    .zdy-tab > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
        padding: 5px 36px 4px;
    }    
    .tab-pane-wrap{
        padding: 15px 0;
        max-width: 700px;
        .ivu-btn{
            padding: 20px 12px;
            font-size: 25px;
        }
        .ivu-input-large{
            height: 50px;
            padding: 6px 100px;
            font-size: 22px;
        }
    }
    .input-tip{
        position: absolute;
        right: 0;
        z-index: 9999;
        height: 50px;
        line-height: 50px;
        width: 100px;
        top: 0;
        text-align: center;
        font-size: 12px;
    }
    .input-tip-prepend{
        left: 0;
    }
</style>
