<template>
  <span @click="modalState = true" style="cursor: pointer">
      <slot>
          <Button type="info" size="small">编辑</Button>
      </slot>
      <Modal
        v-model="modalState"
        :loading="modalState"
        title="会员资料"
        :mask-closable="false"
        class-name="modal-scroll"
        :width="900"
      >
        <div slot="footer">
            <Button type="info" @click="modalState = false">关闭</Button>
        </div>
        <Tabs v-model="tabName" size="small">
            <TabPane label="基本信息" name="jbxx">
                <MemberBasic :member="member" :isActivated="state1" @open-loading="openLoading" @close-loading="closeLoading" @on-change="onChange2"></MemberBasic>
            </TabPane>
            <TabPane label="详细档案" name="xxda">
                <MemberDoc :member="member" :isActivated="state2" @open-loading="openLoading" @close-loading="closeLoading" @on-change="onChange2"></MemberDoc>
            </TabPane>  
            <TabPane label="评价记录" name="pjjl">
                <MemberTalk :member="member" :isActivated="state3" @open-loading="openLoading" @close-loading="closeLoading" @on-change="onChange"></MemberTalk>
            </TabPane>  
            <TabPane label="奖金卷记录" name="jjjjl">
                <MemberPaper :member="member" :isActivated="state4" @open-loading="openLoading" @close-loading="closeLoading" @on-change="onChange"></MemberPaper>
            </TabPane>  
            <TabPane label="卡金变动记录" name="kjbdjl">
                <MemberCardcash :member="member" :isActivated="state5" @open-loading="openLoading" @close-loading="closeLoading" @on-change="onChange"></MemberCardcash>
            </TabPane>  
            <TabPane label="项目消费记录" name="xmxfjl">
                <MemberTake :member="member" :isActivated="state6" @open-loading="openLoading" @close-loading="closeLoading" @on-change="onChange"></MemberTake>
            </TabPane>  
            <TabPane label="订购套餐记录" name="dgtcjl">
                <MemberTc :member="member" :isActivated="state7" @open-loading="openLoading" @close-loading="closeLoading" @on-change="onChange"></MemberTc>
            </TabPane>  
            <TabPane label="开卡充值记录" name="kkczjl">
                <MemberKkcz :member="member" :isActivated="state8" @open-loading="openLoading" @close-loading="closeLoading" @on-change="onChange"></MemberKkcz>
            </TabPane>  
            <TabPane label="赠送金记录" name="zsjjl">
                <MemberZsj :member="member" :isActivated="state9" @open-loading="openLoading" @close-loading="closeLoading" @on-change="onChange"></MemberZsj>
            </TabPane>                                                                                                                
        </Tabs>
		<div class="part-loading" v-show="loading">
            <Spin fix>
                <Icon type="load-c" size=28 class="part-loading-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>			
		</div>         
      </Modal>
  </span>
</template>

<script>
import MemberZsj from './memberZsj'
import MemberKkcz from './memberKkcz'
import MemberTc from './memberTc'
import MemberTake from './memberTake'
import MemberCardcash from './memberCardcash'
import MemberPaper from './memberPaper'
import MemberTalk from './memberTalk'
import MemberDoc from './memberDoc'
import MemberBasic from './memberBasic'
export default {
    name: 'EditMember',
    data (){
        return {
            modalState: false,
            tabName: 'jbxx',
            member: {},
            loading: false,
            isActivated: false,
            isChanged: false
        }
    },
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    computed: {
        state1 () {
            return 'jbxx' === this.tabName && this.modalState && Boolean(this.member.id);
        },
        state2 () {
            return 'xxda' === this.tabName && this.modalState && Boolean(this.member.id);
        },
        state3 () {
            return 'pjjl' === this.tabName && this.modalState && Boolean(this.member.id);
        },
        state4 () {
            return 'jjjjl' === this.tabName && this.modalState && Boolean(this.member.id);
        },
        state5 () {
            return 'kjbdjl' === this.tabName && this.modalState && Boolean(this.member.id);
        },
        state6 () {
            return 'xmxfjl' === this.tabName && this.modalState && Boolean(this.member.id);
        },
        state7 () {
            return 'dgtcjl' === this.tabName && this.modalState && Boolean(this.member.id);
        },
        state8 () {
            return 'kkczjl' === this.tabName && this.modalState && Boolean(this.member.id);
        },
        state9 () {
            return 'zsjjl' === this.tabName && this.modalState && Boolean(this.member.id);
        }                                                               
    },
    watch: {
        modalState (n,o) {
            if(n){
                this.getMember();
                this.isChanged = false;
            }else{
                if(this.isChanged){
                    this.$emit('on-change');
                }
            }
        }
    },
    methods: {
        getMember () {
            this.loading = true;
            this.$http.get("/boss/storeMember/info",{params: {id: this.id}}).then(res=>{
                this.member = res.data;
                this.loading = false;
            });              
        },
        openLoading () {
            this.loading = true;
        },
        closeLoading () {
            this.loading = false;
        },
        onChange () {
            this.$emit('on-change');
        },
        onChange2 () {
            this.isChanged = true;
        }
    },
    components: {
        MemberZsj,
        MemberKkcz,
        MemberTc,
        MemberTake,
        MemberCardcash,
        MemberPaper,
        MemberTalk,
        MemberDoc,
        MemberBasic
    }
}
</script>

<style scoped>

</style>
