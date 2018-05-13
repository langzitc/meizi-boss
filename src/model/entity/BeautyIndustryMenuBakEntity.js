
/**
 * BeautyIndustryMenuBakEntity
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
            "pid": {
                    "type": "number",
                    "name": "pid",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "module": {
                    "type": "string",
                    "name": "module",
                    "null": "NO",
                    "comment": "",
                    "default": "beauty"
            },
            "title": {
                    "type": "string",
                    "name": "title",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "icon": {
                    "type": "string",
                    "name": "icon",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "url_value": {
                    "type": "string",
                    "name": "url_value",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "url_type": {
                    "type": "string",
                    "name": "url_type",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "url_target": {
                    "type": "string",
                    "name": "url_target",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "sort": {
                    "type": "number",
                    "name": "sort",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "online_hide": {
                    "type": "number",
                    "name": "online_hide",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "system_menu": {
                    "type": "number",
                    "name": "system_menu",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "status": {
                    "type": "number",
                    "name": "status",
                    "null": "NO",
                    "comment": "",
                    "default": "1"
            },
            "level": {
                    "type": "number",
                    "name": "level",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            },
            "create_time": {
                    "type": "string",
                    "name": "create_time",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "update_time": {
                    "type": "string",
                    "name": "update_time",
                    "null": "YES",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get pid(){ return this.getData('pid');}
    set pid(v){ return this.setData('pid',v);}

    get module(){ return this.getData('module');}
    set module(v){ return this.setData('module',v);}

    get title(){ return this.getData('title');}
    set title(v){ return this.setData('title',v);}

    get icon(){ return this.getData('icon');}
    set icon(v){ return this.setData('icon',v);}

    get url_value(){ return this.getData('url_value');}
    set url_value(v){ return this.setData('url_value',v);}

    get url_type(){ return this.getData('url_type');}
    set url_type(v){ return this.setData('url_type',v);}

    get url_target(){ return this.getData('url_target');}
    set url_target(v){ return this.setData('url_target',v);}

    get sort(){ return this.getData('sort');}
    set sort(v){ return this.setData('sort',v);}

    get online_hide(){ return this.getData('online_hide');}
    set online_hide(v){ return this.setData('online_hide',v);}

    get system_menu(){ return this.getData('system_menu');}
    set system_menu(v){ return this.setData('system_menu',v);}

    get status(){ return this.getData('status');}
    set status(v){ return this.setData('status',v);}

    get level(){ return this.getData('level');}
    set level(v){ return this.setData('level',v);}

    get create_time(){ return this.getData('create_time');}
    set create_time(v){ return this.setData('create_time',v);}

    get update_time(){ return this.getData('update_time');}
    set update_time(v){ return this.setData('update_time',v);}


}
