<template>
    <div class="drop-modal-wrap">
        <div class="drop-select-default">
                <slot>
                    <Button type="ghost">请选择</Button>
                </slot>          
        </div>
        <div class="drop-modal-box">
            <div class="drop-modal-title" v-if="showTitle">
                <slot slot="title">
                    {{title}}
                </slot>            
            </div>    
            <slot name="content" class="drop-modal-content">

            </slot>
            <slot name="footer" class="drop-modal-footer">

            </slot>
        </div>        
    </div>
</template>

<script>
export default {
    name: 'drop-modal',
    data () {
        return {}
    },
    props: {
        position: {
            type: String,
            default: 'bottom'
        },
        showTitle: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: '标题'
        }
    }
}
</script>

<style scoped lang="less">
    .drop-modal-box{
        width: 100%;
        min-height: 100px;
        background-color: #ccc;
        display: inline-block;
    }
</style>
