
/**
 * BeautyStoreReservationDayEntity
 */
import Utils from './../Utils';
import AbstractModel from '../AbstractModel';
export default class extends AbstractModel {
    FIELDS () { 
        return  {
            "id": {
                    "type": "number",
                    "name": "id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "store_id": {
                    "type": "number",
                    "name": "store_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "week_day": {
                    "type": "number",
                    "name": "week_day",
                    "null": "NO",
                    "comment": "可预约时间,星期一到星期天, 为1-7",
                    "default": null
            },
            "start_at": {
                    "type": "string",
                    "name": "start_at",
                    "null": "NO",
                    "comment": "开始接受预约的时间",
                    "default": "08:00:00"
            },
            "end_at": {
                    "type": "string",
                    "name": "end_at",
                    "null": "NO",
                    "comment": "结束接受预约的时间",
                    "default": "18:00:00"
            },
            "created_at": {
                    "type": "string",
                    "name": "created_at",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "updated_at": {
                    "type": "string",
                    "name": "updated_at",
                    "null": "NO",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get week_day(){ return this.getData('week_day');}
    set week_day(v){ return this.setData('week_day',v);}

    get start_at(){ return this.getData('start_at');}
    set start_at(v){ return this.setData('start_at',v);}

    get end_at(){ return this.getData('end_at');}
    set end_at(v){ return this.setData('end_at',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
