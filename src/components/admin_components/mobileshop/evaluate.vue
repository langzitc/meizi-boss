<template>
    <Card>
        <Alert type="info" slot="title">
            <Row :gutter="20">
                <i-col :sm="12" :md="6" :lg="4">
                    <staff-select-search @on-change="staffChange"></staff-select-search>              
                </i-col>
                <i-col :sm="12" :md="6" :lg="4">
                    <Select placeholder="全部评价" v-model="params.rate">
                            <Option :value="1">一星</Option>
                            <Option :value="2">二星</Option>
                            <Option :value="3">三星</Option>
                            <Option :value="4">四星</Option>
                            <Option :value="5">五星</Option>
                    </Select>                
                </i-col>  
                <i-col :sm="12" :md="12" :lg="16" style="height: 30px;line-height: 30px">
                    共计<span class="text-amount">{{total_count}}</span>条评价
                </i-col>                                 
            </Row>
        </Alert>
        <div>
            <div class="panel panel-default">
                <div class="panel-heading clearfix">
                    <div class="col-sm-8 panel-title" style="line-height: 30px">评价列表</div>
                    <div class="col-sm-4 text-right">
                        <Input type="text">
                            <Button slot="append" type="primary">搜索</Button>
                        </Input>
                    </div>
                </div>
                <div class="panel-body">
                    <Card v-for="item in data" :key="item.id" style="margin-bottom: 20px">
                        <div class="ev-warp">
                            <div class="ev-avatar">
                                <Avatar shape="square" size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                            </div>
                            <div class="ev-content">
                                <div class="ev-list">
                                    <div class="ev-item">
                                        <span class="ev-label">评分:</span>
                                        <span class="ev-text">
                                             <Rate disabled allow-half show-text v-model="item.rate"></Rate>
                                        </span>
                                    </div>
                                    <div class="ev-item">
                                        <span class="ev-label">服务员工:</span>
                                        <span class="ev-text text-warning">{{item.employee_name}}</span>
                                    </div>     
                                    <div class="ev-item">
                                        <span class="ev-label">顾客评价:</span>
                                        <span class="ev-text text-muted" :title="item.content">{{item.content}}</span>
                                    </div>                                                                   
                                </div>
                                <div class="ev-pic clearfix">
                                    <div class="col-sm-8 ev-pic-item">
                                        <Carousel v-model="index" loop style="width: 100%">
                                            <CarouselItem>
                                                <img class="img-responsive" src="http://www.runoob.com/wp-content/uploads/2014/06/thumbnail_demo.jpg" alt="">
                                            </CarouselItem>
                                            <CarouselItem>
                                                <img class="img-responsive" src="http://www.runoob.com/wp-content/uploads/2014/06/thumbnail_demo.jpg" alt="">
                                            </CarouselItem>
                                            <CarouselItem>
                                                <img class="img-responsive" src="http://www.runoob.com/wp-content/uploads/2014/06/thumbnail_demo.jpg" alt="">
                                            </CarouselItem>
                                            <CarouselItem>
                                                <img class="img-responsive" src="http://www.runoob.com/wp-content/uploads/2014/06/thumbnail_demo.jpg" alt="">
                                            </CarouselItem>
                                        </Carousel>                                        
                                    </div>
                                    <div class="col-sm-4 ev-pic-item">
                                        <Button type="warning" @click="del(item)">删除评价</Button>
                                        <Button type="info" @click="reback(item)" style="margin-left: 15px">回复</Button>
                                    </div>
                                </div>
                                <div class="ev-info text-right text-muted">
                                    <span class="ev-span-item">
                                        <span class="ev-span-label">顾客姓名:</span>
                                        <span class="ev-span-text">{{item.customer_name}}</span>
                                    </span>
                                    <span class="ev-span-item">
                                        <span class="ev-span-label">顾客电话:</span>
                                        <span class="ev-span-text">{{item.mobile}}</span>
                                    </span>
                                    <span class="ev-span-item">
                                        <span class="ev-span-label">评价时间:</span>
                                        <span class="ev-span-text">{{item.updated_at}}</span>
                                    </span>                                                                        
                                </div>
                            </div>                          
                        </div>
                        <div v-if="item.$flag" style="margin-top: 15px">
                            <reply :id="item.id" :content="item.reply" @on-change="replayChange"></reply>
                        </div>                          
                    </Card>
                    <div class="text-right" style="margin-top: 15px">
                        <Page :current="params.page" @on-change="pageChange" :total="total_count" size="small"></Page>
                    </div>                     
                </div>
            </div>
        </div>
    </Card>
</template>

<script>
  import StaffSelectSearch from '../staff_select_search'
  import Reply from '../reply'
  let _this;
  export default {
    name: 'shop-evaluate',
    data () {
      return {
        total_count: 0,
        index: 1,
        data: [],
        params: {
            employee_id: "",
            page: 1,
            page_size: 10,
            rate: ''
        }
      }
    },
    computed: {
        store_id () {
            return this.$store.state.story.store_id;
        }
    },
    watch: {
        store_id () {
            this.getReviewList();
        },
        params: {
            deep: true,
            handler: ()=>{
                _this.getReviewList();
            }
        }
    },
    methods: {
        staffChange (staff,id) {
            this.params.employee_id = id;
        },
        reback (item) {
            item.$flag = true;
        },
        del (item) {
            this.$Modal.confirm({
                title: '系统提示',
                content: '确认删除此条评价?',
                onOk: ()=>{
                    this.$http.post("/boss/review/delete",{params: {id: item.id}}).then(res=>{
                        this.$Message.success(res.message);
                        this.getReviewList();
                    })
                }
            });
        },
        replayChange (flag,id,content) {
            if(flag){
                this.$http.post("/boss/review/createAndUpdate",{
                    id,
                    reply: content
                }).then(res=>{
                    this.$Message.success(res.message);
                    this.getReviewList();
                });
            }else{
                this.data.forEach((e,i)=>{
                    if(e.id === id){
                        e.$flag = false;
                    }
                })
            }
        },
        getReviewList () {
            let params = JSON.parse(JSON.stringify(this.params));
            params.store_id = this.store_id;
            for(let k in params){
                if(params[k] === ''){
                    delete params[k];
                }
            }
            this.$http.get("/boss/review/list",{params}).then(res=>{
                let d = res.data.items;
                d.map(e=>{
                    e.rate = parseFloat(e.rate);
                    e.$flag = false;
                    e.id = parseInt(e.id);
                });
                this.total_count = parseInt(res.data.total_count);
                this.data = res.data.items;
            })
        },
        pageChange (v) {
            this.params.page = v;
            this.getReviewList();
        }
    },
    mounted () {
        _this = this;
        if(this.store_id){
            this.getReviewList();
        }
    },
    components: {
        StaffSelectSearch,
        Reply
    }
  }
</script>

<style lang="less">
    .ev-warp{
        min-height: 200px;
        position: relative;
        padding-left: 100px;
    }
    .ev-avatar{
        position: absolute;
        width: 100px;
        height: 100px;
        top: 0;
        left: 0;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;      
    }
    .ev-avatar .ivu-avatar-large{
        width: 80px;
        height: 80px;
    }
    .ev-content{
        width: 100%;
        font-size: 12px;
    }
    .ev-list{
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        height: 100px;
    }
    .ev-item{
        width: 100%;
    }
    .ev-label{
        width: 100px;
        text-align: right;
        display: inline-block;
    }
    .ev-text{
        padding-left: 24px;
        overflow: hidden;
        text-overflow: ellipsis; 
        white-space: nowrap;
    }
    .ev-pic{
        padding-left: 25px;
        margin: 15px 0;
    }
    .ev-pic-item{
        height: 100px;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-end;
        align-items: flex-end;  
        .ivu-btn{
            height: 30px;
        }      
    }
    .ev-span-item{
        margin-left: 15px;
    }
    .ev-span-text{
        margin-left: 5px;
    }
    .ev-info{
        margin-top: 30px;
    }
</style>
