import BeautyProductEmployeeCommissionItemEntity from "../entity/BeautyProductEmployeeCommissionItemEntity";

export default class EmployeeProductCommissionItem extends BeautyProductEmployeeCommissionItemEntity {

    isPercentAmount() {
        return this.getData("commission_type","int") == 1;
    }

    isFixedAmount() {
        return this.getData("commission_type","int") == 0;
    }

    getCommissionAmount() {
        return parseFloat(this.getData("commission_amount","float").toFixed(2));
    }

    getCommissionRateWithLabel() {
        let v = String(this.getCommissionAmount().toFixed(2)) ;
        return  v + (this.isFixedAmount() ? "元" : "%");
    }

}