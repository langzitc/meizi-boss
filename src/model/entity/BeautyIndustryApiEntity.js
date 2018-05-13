
/**
 * BeautyIndustryApiEntity
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
            "title": {
                    "type": "string",
                    "name": "title",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "group_name": {
                    "type": "string",
                    "name": "group_name",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "description": {
                    "type": "string",
                    "name": "description",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "path": {
                    "type": "string",
                    "name": "path",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "industry_code": {
                    "type": "string",
                    "name": "industry_code",
                    "null": "NO",
                    "comment": "",
                    "default": "beauty"
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get title(){ return this.getData('title');}
    set title(v){ return this.setData('title',v);}

    get group_name(){ return this.getData('group_name');}
    set group_name(v){ return this.setData('group_name',v);}

    get description(){ return this.getData('description');}
    set description(v){ return this.setData('description',v);}

    get path(){ return this.getData('path');}
    set path(v){ return this.setData('path',v);}

    get industry_code(){ return this.getData('industry_code');}
    set industry_code(v){ return this.setData('industry_code',v);}


}
