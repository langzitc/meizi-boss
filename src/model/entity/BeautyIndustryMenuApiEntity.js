
/**
 * BeautyIndustryMenuApiEntity
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
            "menu_id": {
                    "type": "number",
                    "name": "menu_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "api_id": {
                    "type": "number",
                    "name": "api_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get menu_id(){ return this.getData('menu_id');}
    set menu_id(v){ return this.setData('menu_id',v);}

    get api_id(){ return this.getData('api_id');}
    set api_id(v){ return this.setData('api_id',v);}


}
