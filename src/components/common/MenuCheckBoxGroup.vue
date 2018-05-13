<template>

    <div>
        <div v-for="group in menuGroups">
            <div class="menu-permission-checkbox-container">
                <GroupCheckBox @changed="checkedStoreChanged"
                                @init="setInitValueOfGroup"
                               :group="group"
                               :options="group.subMenus" :values="formattedValues"></GroupCheckBox>
            </div>
        </div>
    </div>

</template>

<style>
    .menu-permission-checkbox-container .group-checkbox-options-container {
        border-top: solid 1px rgba(0, 0, 0, 0.08);
    }
</style>
<script>
    import GroupCheckBox from './GroupCheckBox';
    import Utils from "../../model/Utils";
    import user from "../../store/user"

    export default  {
        name:"MenuCheckBoxGroup",
        data() {
            return {
                menus:[],
                options:[],
                formattedValues:[],
                menuGroups:[],
                newCheckedMenus:{},
                isInit: true
            }
        },
        components:{
            GroupCheckBox
        },
        update:function(){
            this.loadMenus();
        },
        mounted: function() {
            let menus = this.$store.state.user.menu;
            if(menus.length <= 0) {
                this.$store.dispatch("MENU_INIT",true).then(()=>{
                    this.loadMenus();
                });
            } else {
                this.loadMenus();
            }
        },
        watch: {
            values:function(newValues, oldValues) {
                this.formattedValues = [];
                newValues.map((v)=>{
                    this.formattedValues.push(v);
                })
            }
        },
        props: ["values"],
        methods: {
            setInitValueOfGroup:function(params) {
                let values = params.data;
                let groupId = params.group;
                let key ="group_" + groupId;
                this.newCheckedMenus[key] = values;
            },
            checkedStoreChanged:function(params) {
                this.setInitValueOfGroup(params)
                let newValues = [];
                for(let key in this.newCheckedMenus) {
                    this.newCheckedMenus[key].map((v)=>{
                        newValues.push(v);
                    })
                }
                this.$emit('changed', newValues);
            },
            loadMenus() {
                let menus = this.$store.state.user.menu;
                menus.map((menu)=>{
                    let tempGroup = {
                        id:menu.id,
                        name:menu.name,
                        subMenus:[]
                    };
                    this.menus.push(tempGroup);
                    menu.subMenu.map((subMenu)=>{
                        let tempMenu = {
                            label: subMenu.name,
                            value:subMenu.id
                        }
                        tempGroup.subMenus.push(tempMenu);
                        this.menus.push(tempMenu);
                    });

                    this.menuGroups.push(tempGroup)
                });
            }
        }
    }
</script>