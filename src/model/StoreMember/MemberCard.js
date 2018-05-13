import BeautyStoreMemberCardEntity from "../entity/BeautyStoreMemberCardEntity";

export default class MemberCard extends BeautyStoreMemberCardEntity {

    getItemDiscountRateWithLabel() {
        return (this.discount_amount_for_service_item * 10).toFixed(2) + "折";
    }

    getGroupServiceDiscountRateWithLabel() {
        return (this.discount_amount_for_service_group * 10).toFixed(2) + "折";
    }

    getItemDiscountRate() {
        let v = this.getData("discount_amount_for_service_item", "float");
        if(v > 10) {
            v = v /100;
        }
        if(v>1) {
            v = v/10;
        }
        return v.toFixed(2);
    }

    getGroupServiceDiscountRate() {
        let v = this.getData("discount_amount_for_service_group","float");
        if(v > 10) {
            v = v /100;
        }
        if(v>1) {
            v = v/10;
        }
        return v.toFixed(2);
    }
}