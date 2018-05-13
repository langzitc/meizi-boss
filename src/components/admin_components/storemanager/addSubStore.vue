<template>
  <span @click="modalState = true">
    <slot>
      <Button type="info" size="small">编辑</Button>
    </slot>
    <Modal
      v-model="modalState"
      width="70%"
      :mask-closable="false"
      :loading="modalState"
      class-name="modal-scroll"
      :title="id ? '编辑门店' : '添加门店'">
      <div slot="footer">
        <Button type="ghost" @click="cancel">取消</Button>
        <Button type="primary" @click="save">保存</Button>
      </div>
      <div>
        <Card>
          <div slot="title">
            店铺信息设置
          </div>
          <div class="clearfix">
            <Form ref="addSubStoreForm" :model="formValidate" :rules="ruleValidate" :label-width="100" class="clearfix">
              <FormItem label="门店名称" prop="name" class="col-sm-12 col-md-6">
                <Input v-model="formValidate.name" placeholder="中文"></Input>
              </FormItem>
              <FormItem label="店铺分组" prop="group_ids" class="col-sm-12 col-md-6">
                <Select v-model="formValidate.group_ids" placeholder="选择门店分组" v-if="modalState">
                  <Option v-for="item in groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="门店客服" prop="service_tel" class="col-sm-12 col-md-6">
                <Input v-model="formValidate.service_tel" placeholder="手机|座机"></Input>
              </FormItem>
              <FormItem label="联系人姓名" prop="contacts_name" class="col-sm-12 col-md-6">
                <Input v-model="formValidate.contacts_name" placeholder="真实姓名"></Input>
              </FormItem>
              <FormItem label="门店地址" prop="address" class="col-sm-12 col-md-6">
                <Select-City @cityChange="cityChange" @cityChange2="cityChange2" ref="selectCity">
                  <Input size="large" v-model="hasSelectCitys" placeholder="门店地址" slot>
                  </Input>                     
                </Select-City>
              </FormItem>


              <FormItem label="联系人电话" prop="contacts_mobile" class="col-sm-12 col-md-6">
                <Input v-model="formValidate.contacts_mobile" placeholder="手机|座机"></Input>
              </FormItem>
              <FormItem label="详细地址" class="col-sm-12" prop="address">
                <Input v-model="formValidate.address" style="width: 202px"  placeholder="详细地址"></Input>
                <Button type="primary" size="small" @click="infoAddressChange">搜索地图</Button>
              </FormItem>                             
              <FormItem label="地图定位" class="col-sm-12 col-md-12">
                <div :id="mapid" style="height: 200px;margin: 25px 0"></div>
              </FormItem>
              <FormItem label="门店介绍" prop="description" class="col-sm-12 col-md-12">
                <textarea :id="editId" v-model="formValidate.description"></textarea>
              </FormItem>
              <FormItem label="门店标志" prop="logo_path" class="col-sm-12 col-md-12">
                <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                      <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                  </template>
                  <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                  </template>
                </div>
                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :default-file-list="defaultList"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  :data="uploadParams"
                  type="drag"
                  :action="uploadURL"
                  style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                  </div>
                </Upload>
              </FormItem>
              <FormItem label="门店状态" class="col-sm-12 col-md-6">
                <RadioGroup v-model="formValidate.status">
                  <Radio :label="1">
                    营业中
                  </Radio>
                  <Radio :label="0">
                    已打烊
                  </Radio>
                </RadioGroup>
              </FormItem>
            </Form>
          </div>
        </Card>
      </div>
      <div class="part-loading" v-show="loading">
          <Spin fix>
              <Icon type="load-c" size=28 class="part-loading-spin-icon-load"></Icon>
              <div>加载中</div>
          </Spin>			
      </div>        
    </Modal>       
  </span>
</template>

<script>
  import SelectCity from  '../../select_city'
  import tinymce from 'tinymce'
  import util from '../../../util'
  import Utils from "../../../model/Utils"

  let mk;
  let map;
  let infowindow;
  export default {
    name: 'AddSubStore',
    data () {
      return {
        modalState: false,
        defaultList: [],
        loading: false,
        imgName: '',
        visible: false,
        uploadList: [],
        dateTimes: (new Date()).getTime(),
        hasSelectCitys: '',
        formValidate: {
          name: '',
          province_id: '',
          group_ids: '',
          city_id: '',
          area_id: '',
          address: '',
          geo_location: '',
          description: '',
          contacts_name: '',
          contacts_mobile: '',
          service_tel: '',
          logo_path: '',
          status: 1,
          province_name: '',
          city_name: '',
          area_name: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '门店名称不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '门店地址不能为空', trigger: 'blur' }
          ],
          contacts_mobile: [
            { type: "string",pattern: Utils.getMobileNumberRegex(), message: '手机号码格式错误',trigger: 'blur' }
          ],
          service_tel: [
            { type: "string",pattern: Utils.getServiceTelNumberRegex(), message: '座机号码格式错误',trigger: 'blur' }
          ],
          description: [],
          group_ids: [
            { required: true, message: '门店分组不能为空', trigger: 'change' }
          ],
          logo_path: []
        }
      }
    },
    props: {
      id: {
        type: Number,
        default: 0
      }
    },
    watch: {
      modalState(n,o){
        if(n){          
          if(this.id){
            this.loading = true;
            this.init().then(()=>{
              this.getStoreById().then(()=>{
                this.loading = false;
              }).catch(()=>{
                this.loading = false;
              });
            }).catch(()=>{
              this.$Message.error("定位失败");
              this.loading = false;
            })            
          }else{
            this.init();
          }
        }else{
          this.handleReset();
          tinymce.get(this.editId).destroy();
        }
      }
    },
    computed: {
      groupList (){
        return this.$store.state.story.storeGroupList;
      },
      uploadParams (){
        return {sid: this.$store.state.user.sid};
      },
      uploadURL (){
        return `${API_PATH}/store/upload`;
      },
      editId () {
        return 'editor'+this.dateTimes;
      },
      mapid () {
        return 'map'+this.dateTimes;
      }    
    },
    methods: {
      cityChange (city){
        [this.formValidate.province_id,this.formValidate.city_id,this.formValidate.area_id] = city;
      },
      cityChange2 (selectData){
        if(selectData.length){
            let d  = JSON.parse(JSON.stringify(selectData));
            let address = d.map(e=>{
              return e.label;
            }).join(' ');           
            let myGeo = new BMap.Geocoder();
            let that = this;
            myGeo.getPoint(address, function(point){
              if (point) {
                map.centerAndZoom(point, 11);
                mk.setPosition(point);
                infowindow.setContent(address);
                map.openInfoWindow(infowindow,point);
                that.formValidate.geo_location = point.lng+","+point.lat;                  
              }else{
                return false;
              }
            });              
            this.hasSelectCitys = selectData.map(e=>{
              return e.label;
            }).join("/");      
        }
      },
      infoAddressChange (){
            let myGeo = new BMap.Geocoder();
            let that = this;       
            let address = this.hasSelectCitys.split('/').join(" ")+this.formValidate.address;      
            myGeo.getPoint(address, function(point){
              if (point) {
                map.centerAndZoom(point, 11);
                mk.setPosition(point);
                infowindow.setContent(address);
                map.openInfoWindow(infowindow,point);                
                that.formValidate.geo_location = point.lng+","+point.lat;                
              }else{
                return false;
              }
            });         
      },
      getStoreById(){
        return new Promise((resolve,reject)=>{
          this.$store.dispatch('GET_SUB_STORE_INFO',{id: this.id}).then((data)=>{
            Object.assign(this.formValidate,data);
            if(this.formValidate.group_ids.length){
              this.formValidate.group_ids = this.formValidate.group_ids[0];
            }
            this.hasSelectCitys = [this.formValidate.province_name,this.formValidate.city_name,this.formValidate.area_name].join("/");
            let par = this.formValidate.geo_location.split(',');
            let point = new BMap.Point(par[0],par[1]);
            map.centerAndZoom(point,11);
            mk.setPosition(point);
            infowindow.setContent(this.formValidate.address);
            map.openInfoWindow(infowindow,point);            
            tinymce.get(this.editId).setContent(this.formValidate.description);
              this.uploadList = [];
            this.uploadList.push({
              status: 'finished',
              name: this.formValidate.logo_path,
              url: this.formValidate.logo_url
            })
            resolve();
          }).catch(e=>{
            reject();
          });          
        })
      },
      cancel () {
        this.modalState = false;
      },
      save () {
        this.$refs['addSubStoreForm'].validate((valid) => {

          if (valid) {
            let types = this.id ? 'UPDATE_SUB_STORE' : 'ADD_SUB_STORE';
            this.formValidate.description = tinymce.get(this.editId).getContent();
            let d = JSON.parse(JSON.stringify(this.formValidate));
            if(this.id){
              d.id = this.id;
            }
            this.$store.dispatch(types,d).then((msg)=>{
              this.$Message.success(msg);
              this.$refs['addSubStoreForm'].resetFields();
              this.uploadList = [];
              this.defaultList = [];
              this.modalState = false;
            }).catch((e)=>{
              this.$Message.error(e);
            });
          } else {
            this.$Message.error('表单填写错误!');
          }
        })
      },
      handleReset () {
        this.$refs['addSubStoreForm'].resetFields();
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess (res, file) {
        this.uploadList[0].url = res.data.file.full_url;
        this.formValidate.logo_path = res.data.file.path;
      },
      handleError () {
        this.$Message.error("文件上传失败");
      },      
      handleFormatError (file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: '文件 ' + file.name + ' 格式错误, 请上传 jpg 或者 png.'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: '文件  ' + file.name + ' 不能超过2M'
        });
      },
      handleBeforeUpload (f) {
        const check = this.uploadList.length == 0;
        if (!check) {
          this.$Notice.warning({
            title: '只能上传一张图片'
          });
        }
        return check;
      },
      init () {
          return new Promise((resolve,reject)=>{
              let that = this;
              tinymce.init({
                selector: "#"+this.editId,
                branding: false,
                elementpath: false,
                height: 400,
                language: 'zh_CN.GB2312',
                menubar: 'edit insert view format table tools',
                theme: 'modern',
                plugins: [
                  'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                  'searchreplace visualblocks visualchars code fullscreen fullpage',
                  'insertdatetime media nonbreaking save table contextmenu directionality',
                  'emoticons paste textcolor colorpicker textpattern imagetools codesample'
                ],
                toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
                autosave_interval: '20s',
                image_advtab: true,
                table_default_styles: {
                  width: '100%',
                  borderCollapse: 'collapse'
                }
              });               
              util.useBMap().then(()=>{
                  map = new BMap.Map(this.mapid);
                  map.centerAndZoom("成都",11);
                  map.enableScrollWheelZoom(true);
                  let geolocation = new BMap.Geolocation();
                  geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                      mk = new BMap.Marker(r.point);
                      let opts = {
                        width : 150,
                        height: 60,
                        enableCloseOnClick : false
                      };  
                      infowindow = new BMap.InfoWindow(`<p>${r.address.province}${r.address.city}</p>`,opts);
                      map.addOverlay(mk);
                      map.panTo(r.point);
                      map.centerAndZoom(r.point,11);
                      that.formValidate.geo_location = r.point.lng+","+r.point.lat;
                      map.openInfoWindow(infowindow,r.point);
                      resolve();
                    }
                  },{enableHighAccuracy: true});
                  setTimeout(()=>{
                    reject();
                  },10000)
                  map.addEventListener('click',(e)=>{
                    mk.setPosition(e.point);
                    let geoc = new BMap.Geocoder();
                    geoc.getLocation(e.point,(rs)=>{
                      let addComp = rs.addressComponents;
                      let address = addComp.province + "" + addComp.city + "" + addComp.district + "" + addComp.street + "" + addComp.streetNumber;
                      let address2 = addComp.street + "" + addComp.streetNumber;
                      this.formValidate.address = address2;
                      infowindow.setContent(address);
                      map.openInfoWindow(infowindow,e.point); 
                    });                                       
                    that.formValidate.geo_location = e.point.lng+","+e.point.lat;
                  }) 
              });                  
          })
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
    },
    components: {
      SelectCity
    }
  }
</script>

<style scoped>
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
