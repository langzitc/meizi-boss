import EmployeeProductCommissionItem from "./EmployeeProductCommissionItem";

export default class EmployeeProductCommissionItemGroupedService extends EmployeeProductCommissionItem {

    getSaleCommissionRate() {
        return this.getCommissionAmount();
    }

    getSaleCommissionRateWithLabel() {
        return "销售提成: "  + this.getSaleCommissionRate() + (this.isFixedAmount() ? "元" : "%");
    }

}