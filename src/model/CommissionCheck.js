import AbstractModel from "./AbstractModel";

export default class CommissionCheck extends AbstractModel {
    //指定
    getAssignedAmount() {
        let amount = 0;
        let data = this.getAssignedTypeData("1");
        if(data && data.amount) {
            amount = parseFloat(data.amount);
        }
        return amount;
    }

    getAssignedTypeData(assignedType) {
        let v = this.getData("assigned_type");
        if(!v) {
            return {};
        }
        let data = {};
        v.map((item)=>{
            if(item.assigned_type == assignedType) {
                data = item;
            }
        });
        return data;
    }
    //非指定
    getNoneAssignedAmount() {
        let amount = 0;
        let data = this.getAssignedTypeData("2");
        console.log(data);
        if(data.amount) {
            amount = parseFloat(data.amount);
        }
        return amount;
    }

    //内创
    geRecommendAmount() {
        let amount = 0;
        let data = this.getAssignedTypeData("3");
        if(data.amount) {
            amount = parseFloat(data.amount);
        }
        return amount;
    }
    
    //服务项目总提成
    getServiceTotalAmount() {
        let amount = 0;
        let v = this.getData("assigned_type");
        if(!Array.isArray(v)) {
            v = [];
        }
        v.map((item)=>{
            let iAmount = parseFloat(item.amount);
            amount += iAmount;
        })
        return amount;
    }

    //商品销售
    getProductSellAmount() {
        return 0.00;
    }

    //开卡
    getNewMemberCardAmount() {
        if(this.member_card && this.member_card.new_card) {
            return parseFloat(this.member_card.new_card);
        }
        return 0.00;
    }

    //冲值
    getRechargeMemberCardAmount() {
        if(this.member_card && this.member_card.recharge) {
            return parseFloat(this.member_card.recharge);
        }
        return 0.00;
    }
    //开卡冲值总提成
    getMemberCardTotalAmount() {
        return this.getNewMemberCardAmount() + this.getRechargeMemberCardAmount();
    }

    //订购套餐
    getGroupedServiceAmount() {
        if(this.grouped_service && this.grouped_service.amount) {
            return parseFloat(this.grouped_service.amount);
        }
        return 0;
    }
    //退款扣除
    getRefundAmount() {
        if(this.refund && this.refund.amount) {
            return parseFloat(this.refund.amount);
        }
        return 0;
    }

    getGrandTotalAmount() {
        console.log(this.getServiceTotalAmount());
        console.log(this.getProductSellAmount() );
        console.log(this.getMemberCardTotalAmount());
        console.log(this.getGroupedServiceAmount());
        let v = this.getServiceTotalAmount() + this.getProductSellAmount() + this.getMemberCardTotalAmount() +
            this.getGroupedServiceAmount();
        return v;
    }

}