<template>
     <div class="demo-tabs-style2">
      <Card>
        <Row slot="title" class="clearfix" :gutter="20" style="margin-top:20px">
            <i-col :sm="18">
                <RadioGroup v-model="member_type">
                    <Radio label="1">散客</Radio>
                    <Radio label="2">会员</Radio>
                </RadioGroup>
                <staff-select-search style="width:200px" v-if="member_type==2" ref="selectMember" @on-change="employeeChange"></staff-select-search>
                <Button type="info" v-if="member_type==2" @click="tyhymd">同一会员买单</Button>
            </i-col>
            <i-col :sm="6" class="text-right">
                <AddMember ref="addmember"></AddMember>
            </i-col>
            <i-col :sm="24" v-if="selectMembers.id">
                <Alert type="info" style="margin-top: 20px">
                    <p style="margin: 0">
                        <span class="cas-sp-name">姓名:</span>
                        <span class="text-danger cas-sp-num">{{selectMembers.name}}</span>
                        <span>(&nbsp;{{selectMembers.mobile}}&nbsp;)</span>
                        <span class="cas-sp-name">卡名:</span>
                            <span class="text-danger cas-sp-num" v-show="selectMembers.card.name">
                                {{selectMembers.card.name}}
                            </span>
                            <span class="text-muted cas-sp-num" v-show="!selectMembers.card.name">
                                无会员卡
                            </span>
                        <span v-show="selectMembers.card.name">
                            <span class="cas-sp-name">卡金:</span>
                            <span class="text-danger cas-sp-num">{{selectMembers.card.amount | money}}</span>
                            <span>元</span>
                            <span class="cas-sp-name">赠送金:</span>
                            <span class="text-danger cas-sp-num">{{selectMembers.card.given_amount | money}}</span>
                            <span>元</span>
                        </span>
                    </p>
                </Alert>
            </i-col>
        </Row>
        <Tabs v-model="tabName">
          <TabPane label="项目消费" name="xmxf" :disabled="disableXmxf">
             <cashier-xmxf v-if="tabName==='xmxf'" ref="xmxf" :order="order" :couponList="couponList" :member="selectMembers"></cashier-xmxf>
          </TabPane>
          <TabPane label="订购疗程套餐" name="dglctc" :disabled="disableLctc">
              <cashier-dglctc v-if="tabName==='dglctc'" ref="dglctc" :order="order" :couponList="couponList" :member="selectMembers"></cashier-dglctc>
          </TabPane>
          <TabPane label="会员充值" name="hycz" :disabled="disableHycz">
               <cashier-hycz v-if="tabName==='hycz'" ref="hycz" :cardList="cardList" :member="selectMembers" :order="order"></cashier-hycz>
          </TabPane>  
          <TabPane label="开卡" name='kk' :disabled="disableKk">
               <cashier-kk v-if="tabName==='kk'" ref="kk" :cardList="cardList" :member="selectMembers" :order="order"></cashier-kk>
          </TabPane>  
          <Button type="primary" size="small" @click="add" slot="extra" v-show="tabName=='xmxf'">添加服务项目</Button> 
          <Button type="primary" size="small" @click="add" slot="extra" v-show="tabName == 'dglctc'">添加套餐</Button>                  
        </Tabs>       
      </Card>
    </div> 
</template>
<script>
    import AddMember from '../member/addMember'
    import CashierXmxf from './cashier_xmxf'
    import CashierDglctc from './cashier_dglctc'
    import CashierHycz from './cashier_hycz'
    import CashierKk from './cashier_kk'
    import StaffSelectSearch from '../staff_select_search'
    export default {
        name: 'cashier-list',
        data() {
            return {
                tabName: 'xmxf',
                selectMember: "",
                selectMembers: {},
				cardList: [],
                order: {},
                couponList: [],
                member_type: 1
            }
        },
        computed: {
        	store_id () {
        		return this.$store.state.story.store_id;
            },
            disableXmxf () {
                return (this.order&&this.order.order_type)&&(this.order.order_type!=0);
            },
            disableLctc () {
                return (this.order&&this.order.order_type!=1)&&!this.selectMember;
            },
            disableHycz () {
                return Boolean((this.order&&this.order.order_type!=2)&&!(this.selectMember&&this.selectMembers.card&&this.selectMembers.card.id));
            },
            disableKk () {
                let f1 = this.order.order_type&&this.order.order_type==3;
                if(f1){
                    return false;
                }else{
                    if(this.selectMember){
                        if(this.selectMembers.card&&this.selectMembers.card.id){
                            return true;
                        }else{
                            return false;
                        }
                    }else{
                        return true;
                    }
                }
            }
        },
        watch: {
        	store_id () {
        		this.getCoupon();
        	},
            member_type (n,o) {
                this.selectMember= "";
                this.selectMembers = {};
                this.getCoupon();
            }
        },
        methods: {
        	getCoupon () {
				if(this.store_id&&this.selectMembers.id){
	        		this.$http.get("/boss/storeMemberCoupon/list",{
	        			params: {
	        				status: 0,
	        				store_member_id: this.selectMembers.id,
	        				store_id: this.store_id
	        			}
	        		}).then(res=>{
	        			this.couponList = res.data.items;
	        		})					
				}else{
                    this.couponList = [];
                }
        	},
            employeeChange (id,d) {
                this.selectMember = id;
                this.selectMembers = d;
                this.getCoupon();
                sessionStorage.setItem(this.$store.getters.prefix+'cashier_member',JSON.stringify(d));
            },
            tyhymd () {
                let member = sessionStorage.getItem(this.$store.getters.prefix+'cashier_member');
                member = JSON.parse(member);
                if(member&&member.id){
                    this.$refs['selectMember'].resetMember(member.id);
                    setTimeout(()=>{
                        this.getCoupon();
                    },200);
                }
            },
            add (){
                this.$refs[this.tabName].addItem();
            },
            memberChange (id) {
            	this.$nextTick(()=>{
                    this.$refs['selectMember'].resetMember(id);
                })
            }
        },
        components: {
            AddMember,
            CashierXmxf,
            CashierDglctc,
            CashierHycz,
            CashierKk,
            StaffSelectSearch
        },
        mounted (){
        	if(this.$route.query.type&&this.$route.query.type!=='jiezhang'){
				this.tabName = this.$route.query.type;
        	}
        	if(this.$route.query.order_id){
        		let params = {
        			order_id: this.$route.query.order_id
        		};
        		this.$http.get("/boss/order/orderInfo",{params}).then(res=>{
                     this.order = res.data;
                     this.member_type = this.order.member_type;
                    switch(parseInt(this.order.order_type)){
                        case 0: 
                            this.tabName = "xmxf";
                        break;
                        case 1: 
                            this.tabName = "dglctc";
                        break;
                        case 2: 
                            this.tabName = "hycz";
                        break;
                        case 3: 
                            this.tabName = "kk";
                        break;
                    }
                    if(this.order.member_type == 2){
                        this.memberChange(this.order.store_member_id);
                    }
        		});
        	}          
            this.$http.get("/boss/memberCard/list").then(res=>{
                this.cardList = res.data.items;
            });
            this.getCoupon();
            if(this.$route.query.status === 'addmember'){
                this.$nextTick(()=>{
                    this.$refs['addmember'].modalState = true;
                })
            }
        }
    }
</script>
<style type='less'>
    .cas-sp-num{
        margin-left: 5px;
    }
    .cas-sp-name{
        margin-left: 15px;
    }
    .kk-table{
        overflow: scroll;
    }
    .kk-table tr td,.kk-table tr th{
        text-align: center;
        vertical-align: middle!important;
        font-size: 12px;
    }
    .kk-table thead th{
        color: #333;
    }
    .ico-table-td{
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
    }
    .dropdown-modal{
        min-height: 100px;
    } 
</style>
