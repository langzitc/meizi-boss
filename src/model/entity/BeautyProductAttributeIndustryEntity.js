
/**
 * BeautyProductAttributeIndustryEntity
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
            "attribute_id": {
                    "type": "number",
                    "name": "attribute_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "industry_id": {
                    "type": "number",
                    "name": "industry_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get attribute_id(){ return this.getData('attribute_id');}
    set attribute_id(v){ return this.setData('attribute_id',v);}

    get industry_id(){ return this.getData('industry_id');}
    set industry_id(v){ return this.setData('industry_id',v);}


}
