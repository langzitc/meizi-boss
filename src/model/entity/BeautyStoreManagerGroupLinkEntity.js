
/**
 * BeautyStoreManagerGroupLinkEntity
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
                    "comment": "管理员和所管理的店铺组的关联",
                    "default": null
            },
            "manager_id": {
                    "type": "number",
                    "name": "manager_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "group_id": {
                    "type": "number",
                    "name": "group_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get manager_id(){ return this.getData('manager_id');}
    set manager_id(v){ return this.setData('manager_id',v);}

    get group_id(){ return this.getData('group_id');}
    set group_id(v){ return this.setData('group_id',v);}


}
