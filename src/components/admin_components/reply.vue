<template>
    <div>
        <div>
            <textarea :id="editId"></textarea> 
        </div>       
        <div class="text-right" style="margin-top:15px">
            <Button type="ghost" @click="cancel">取消</Button>
            <Button type="primary" @click="reply" style="margin-left: 20px">回复</Button>
        </div>
    </div>
</template>

<script>
import tinymce from 'tinymce';
let init = (id)=>{
      tinymce.init({
        selector: '#'+id,
        branding: false,
        elementpath: false,
        height: 100,
        language: 'zh_CN.GB2312',
        menubar: 'edit insert view format table tools',
        theme: 'modern',
        plugins: [
          'emoticons paste textcolor colorpicker'
        ],
        toolbar1: 'styleselect | forecolor backcolor bold italic bullist numlist outdent indent | link image emoticons',
        autosave_interval: '20s',
        image_advtab: true,
        table_default_styles: {
          width: '100%',
          borderCollapse: 'collapse'
        }
      });     
}
let destroy = (id)=>{
    tinymce.get(id).destroy();
}
export default {
    name: 'reply',
    data () {
        return {

        }
    },
    computed: {
        editId () {
            return 'replyeditor'+this.id;
        }
    },
    props: {
        id: {
            type: Number
        },
        content: {
            type: String
        }
    },
    methods: {
        reply () {
            this.$emit('on-change',true,tinymce.get(this.editId).getContent());
        },
        cancel () {
            this.$emit('on-change',false,this.id);
        }
    },
    mounted () {   
        init(this.editId);  
        if(this.content){
            tinymce.get(this.editId).setContent(this.content);            
        }  
    },
    destroyed () {
        destroy(this.editId);
    }
}
</script>

<style>

</style>
