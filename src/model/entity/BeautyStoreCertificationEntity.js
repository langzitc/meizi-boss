
/**
 * BeautyStoreCertificationEntity
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
            "is_main_body_approved": {
                    "type": "string",
                    "name": "is_main_body_approved",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "is_brand_approved": {
                    "type": "string",
                    "name": "is_brand_approved",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "main_body_type": {
                    "type": "number",
                    "name": "main_body_type",
                    "null": "NO",
                    "comment": "主体信息类型,0:个人,1:公司,2:公益组织",
                    "default": null
            },
            "main_body_persional_name": {
                    "type": "string",
                    "name": "main_body_persional_name",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "main_body_persional_id_type": {
                    "type": "number",
                    "name": "main_body_persional_id_type",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "main_body_persional_id_number": {
                    "type": "string",
                    "name": "main_body_persional_id_number",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "main_body_persional_id_front_image_id": {
                    "type": "number",
                    "name": "main_body_persional_id_front_image_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "main_body_persional_id_front_image_path": {
                    "type": "string",
                    "name": "main_body_persional_id_front_image_path",
                    "null": "YES",
                    "comment": "个人身份证正面",
                    "default": null
            },
            "main_body_persional_id_handheld_image_id": {
                    "type": "number",
                    "name": "main_body_persional_id_handheld_image_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "main_body_persional_id_handheld_image_path": {
                    "type": "string",
                    "name": "main_body_persional_id_handheld_image_path",
                    "null": "NO",
                    "comment": "手持证件照",
                    "default": null
            },
            "main_body_company_name": {
                    "type": "string",
                    "name": "main_body_company_name",
                    "null": "NO",
                    "comment": "企业名称",
                    "default": null
            },
            "main_body_company_corporation": {
                    "type": "string",
                    "name": "main_body_company_corporation",
                    "null": "NO",
                    "comment": "公司法人",
                    "default": null
            },
            "main_body_company_corporation_id_front_image_id": {
                    "type": "number",
                    "name": "main_body_company_corporation_id_front_image_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "main_body_company_corporation_id_front_image_path": {
                    "type": "string",
                    "name": "main_body_company_corporation_id_front_image_path",
                    "null": "YES",
                    "comment": "法人证件正面",
                    "default": null
            },
            "main_body_company_corporation_id_back_image_id": {
                    "type": "number",
                    "name": "main_body_company_corporation_id_back_image_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "main_body_company_corporation_id_back_image_path": {
                    "type": "string",
                    "name": "main_body_company_corporation_id_back_image_path",
                    "null": "YES",
                    "comment": "法人证件反面",
                    "default": null
            },
            "main_body_company_license_image_id": {
                    "type": "number",
                    "name": "main_body_company_license_image_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "main_body_company_license_image_path": {
                    "type": "string",
                    "name": "main_body_company_license_image_path",
                    "null": "YES",
                    "comment": "法人证件反面",
                    "default": null
            },
            "main_body_company_license_number": {
                    "type": "string",
                    "name": "main_body_company_license_number",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "main_body_org_name": {
                    "type": "string",
                    "name": "main_body_org_name",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "main_body_org_manager_name": {
                    "type": "string",
                    "name": "main_body_org_manager_name",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "main_body_org_manager_id_front_image_id": {
                    "type": "number",
                    "name": "main_body_org_manager_id_front_image_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "main_body_org_manager_id_front_image_path": {
                    "type": "string",
                    "name": "main_body_org_manager_id_front_image_path",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "main_body_org_manager_id_back_image_id": {
                    "type": "number",
                    "name": "main_body_org_manager_id_back_image_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "main_body_org_manager_id_back_image_path": {
                    "type": "string",
                    "name": "main_body_org_manager_id_back_image_path",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "main_body_org_license_image_id": {
                    "type": "number",
                    "name": "main_body_org_license_image_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "main_body_org_license_image_path": {
                    "type": "string",
                    "name": "main_body_org_license_image_path",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "store_province": {
                    "type": "number",
                    "name": "store_province",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "store_city": {
                    "type": "number",
                    "name": "store_city",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "store_area": {
                    "type": "number",
                    "name": "store_area",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "store_geo": {
                    "type": "string",
                    "name": "store_geo",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "store_address": {
                    "type": "string",
                    "name": "store_address",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "store_frontend_image_id": {
                    "type": "number",
                    "name": "store_frontend_image_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "store_frontend_image_path": {
                    "type": "string",
                    "name": "store_frontend_image_path",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "store_inside_image_id": {
                    "type": "number",
                    "name": "store_inside_image_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "store_inside_image_path": {
                    "type": "string",
                    "name": "store_inside_image_path",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "store_checkstand_image_id": {
                    "type": "number",
                    "name": "store_checkstand_image_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "store_checkstand_image_path": {
                    "type": "string",
                    "name": "store_checkstand_image_path",
                    "null": "NO",
                    "comment": "",
                    "default": null
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
            },
            "verfication_advice": {
                    "type": "string",
                    "name": "verfication_advice",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "verfication_result": {
                    "type": "string",
                    "name": "verfication_result",
                    "null": "YES",
                    "comment": "1:通过, 0:不通过",
                    "default": "0"
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get is_main_body_approved(){ return this.getData('is_main_body_approved');}
    set is_main_body_approved(v){ return this.setData('is_main_body_approved',v);}

    get is_brand_approved(){ return this.getData('is_brand_approved');}
    set is_brand_approved(v){ return this.setData('is_brand_approved',v);}

    get main_body_type(){ return this.getData('main_body_type');}
    set main_body_type(v){ return this.setData('main_body_type',v);}

    get main_body_persional_name(){ return this.getData('main_body_persional_name');}
    set main_body_persional_name(v){ return this.setData('main_body_persional_name',v);}

    get main_body_persional_id_type(){ return this.getData('main_body_persional_id_type');}
    set main_body_persional_id_type(v){ return this.setData('main_body_persional_id_type',v);}

    get main_body_persional_id_number(){ return this.getData('main_body_persional_id_number');}
    set main_body_persional_id_number(v){ return this.setData('main_body_persional_id_number',v);}

    get main_body_persional_id_front_image_id(){ return this.getData('main_body_persional_id_front_image_id');}
    set main_body_persional_id_front_image_id(v){ return this.setData('main_body_persional_id_front_image_id',v);}

    get main_body_persional_id_front_image_path(){ return this.getData('main_body_persional_id_front_image_path');}
    set main_body_persional_id_front_image_path(v){ return this.setData('main_body_persional_id_front_image_path',v);}

    get main_body_persional_id_handheld_image_id(){ return this.getData('main_body_persional_id_handheld_image_id');}
    set main_body_persional_id_handheld_image_id(v){ return this.setData('main_body_persional_id_handheld_image_id',v);}

    get main_body_persional_id_handheld_image_path(){ return this.getData('main_body_persional_id_handheld_image_path');}
    set main_body_persional_id_handheld_image_path(v){ return this.setData('main_body_persional_id_handheld_image_path',v);}

    get main_body_company_name(){ return this.getData('main_body_company_name');}
    set main_body_company_name(v){ return this.setData('main_body_company_name',v);}

    get main_body_company_corporation(){ return this.getData('main_body_company_corporation');}
    set main_body_company_corporation(v){ return this.setData('main_body_company_corporation',v);}

    get main_body_company_corporation_id_front_image_id(){ return this.getData('main_body_company_corporation_id_front_image_id');}
    set main_body_company_corporation_id_front_image_id(v){ return this.setData('main_body_company_corporation_id_front_image_id',v);}

    get main_body_company_corporation_id_front_image_path(){ return this.getData('main_body_company_corporation_id_front_image_path');}
    set main_body_company_corporation_id_front_image_path(v){ return this.setData('main_body_company_corporation_id_front_image_path',v);}

    get main_body_company_corporation_id_back_image_id(){ return this.getData('main_body_company_corporation_id_back_image_id');}
    set main_body_company_corporation_id_back_image_id(v){ return this.setData('main_body_company_corporation_id_back_image_id',v);}

    get main_body_company_corporation_id_back_image_path(){ return this.getData('main_body_company_corporation_id_back_image_path');}
    set main_body_company_corporation_id_back_image_path(v){ return this.setData('main_body_company_corporation_id_back_image_path',v);}

    get main_body_company_license_image_id(){ return this.getData('main_body_company_license_image_id');}
    set main_body_company_license_image_id(v){ return this.setData('main_body_company_license_image_id',v);}

    get main_body_company_license_image_path(){ return this.getData('main_body_company_license_image_path');}
    set main_body_company_license_image_path(v){ return this.setData('main_body_company_license_image_path',v);}

    get main_body_company_license_number(){ return this.getData('main_body_company_license_number');}
    set main_body_company_license_number(v){ return this.setData('main_body_company_license_number',v);}

    get main_body_org_name(){ return this.getData('main_body_org_name');}
    set main_body_org_name(v){ return this.setData('main_body_org_name',v);}

    get main_body_org_manager_name(){ return this.getData('main_body_org_manager_name');}
    set main_body_org_manager_name(v){ return this.setData('main_body_org_manager_name',v);}

    get main_body_org_manager_id_front_image_id(){ return this.getData('main_body_org_manager_id_front_image_id');}
    set main_body_org_manager_id_front_image_id(v){ return this.setData('main_body_org_manager_id_front_image_id',v);}

    get main_body_org_manager_id_front_image_path(){ return this.getData('main_body_org_manager_id_front_image_path');}
    set main_body_org_manager_id_front_image_path(v){ return this.setData('main_body_org_manager_id_front_image_path',v);}

    get main_body_org_manager_id_back_image_id(){ return this.getData('main_body_org_manager_id_back_image_id');}
    set main_body_org_manager_id_back_image_id(v){ return this.setData('main_body_org_manager_id_back_image_id',v);}

    get main_body_org_manager_id_back_image_path(){ return this.getData('main_body_org_manager_id_back_image_path');}
    set main_body_org_manager_id_back_image_path(v){ return this.setData('main_body_org_manager_id_back_image_path',v);}

    get main_body_org_license_image_id(){ return this.getData('main_body_org_license_image_id');}
    set main_body_org_license_image_id(v){ return this.setData('main_body_org_license_image_id',v);}

    get main_body_org_license_image_path(){ return this.getData('main_body_org_license_image_path');}
    set main_body_org_license_image_path(v){ return this.setData('main_body_org_license_image_path',v);}

    get store_province(){ return this.getData('store_province');}
    set store_province(v){ return this.setData('store_province',v);}

    get store_city(){ return this.getData('store_city');}
    set store_city(v){ return this.setData('store_city',v);}

    get store_area(){ return this.getData('store_area');}
    set store_area(v){ return this.setData('store_area',v);}

    get store_geo(){ return this.getData('store_geo');}
    set store_geo(v){ return this.setData('store_geo',v);}

    get store_address(){ return this.getData('store_address');}
    set store_address(v){ return this.setData('store_address',v);}

    get store_frontend_image_id(){ return this.getData('store_frontend_image_id');}
    set store_frontend_image_id(v){ return this.setData('store_frontend_image_id',v);}

    get store_frontend_image_path(){ return this.getData('store_frontend_image_path');}
    set store_frontend_image_path(v){ return this.setData('store_frontend_image_path',v);}

    get store_inside_image_id(){ return this.getData('store_inside_image_id');}
    set store_inside_image_id(v){ return this.setData('store_inside_image_id',v);}

    get store_inside_image_path(){ return this.getData('store_inside_image_path');}
    set store_inside_image_path(v){ return this.setData('store_inside_image_path',v);}

    get store_checkstand_image_id(){ return this.getData('store_checkstand_image_id');}
    set store_checkstand_image_id(v){ return this.setData('store_checkstand_image_id',v);}

    get store_checkstand_image_path(){ return this.getData('store_checkstand_image_path');}
    set store_checkstand_image_path(v){ return this.setData('store_checkstand_image_path',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}

    get verfication_advice(){ return this.getData('verfication_advice');}
    set verfication_advice(v){ return this.setData('verfication_advice',v);}

    get verfication_result(){ return this.getData('verfication_result');}
    set verfication_result(v){ return this.setData('verfication_result',v);}


}
