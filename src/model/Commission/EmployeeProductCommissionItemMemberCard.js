import EmployeeProductCommissionItem from "./EmployeeProductCommissionItem";

export default class EmployeeProductCommissionItemMemberCard extends EmployeeProductCommissionItem {

    getNewMemberCardAmount() {
        return this.getCommissionAmount();
    }

    getRechargeMemberCardAmount() {
        return this.getCommissionAmount();
    }

    isRecharge() {
        return this.getData("member_card_operation","int") == 2;
    }

    isNewMemberCard() {
        return this.getData("member_card_operation","int") == 1;
    }

    getCommissionRateWithLabel() {
        let v =
            (this.isRecharge() ? "冲值提成: " : "开卡提成") +
            String(this.getCommissionAmount().toFixed(2)) ;
        return  v + (this.isFixedAmount() ? "元" : "%");
    }
}