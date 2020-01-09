<style lang="less">
   .common-button {
       width: auto;
       display: inline-block;
       .btn-waper {
           /*不带icon的按钮*/
           .common-btn {
               position: relative;
               display: inline-block;
               min-width: 52px;
               height: 30px;
               font-size: 14px;
               background: #fff;
               color: #14b8d4;
               padding: 0;
               margin: 0;
               text-align: center;
               border: 1px solid #14b8d4;
               border-radius: 2px;
               outline: none;
               cursor: pointer;
               -webkit-background-size: 20px 20px;
               background-size: 20px 20px;
               background-repeat: no-repeat;
               background-position: 5px 5px;
           }
           .common-btn:active {
               color: #01758a;
               border-color: #01758a;
           }
           .bgc-btn {
               background: #14b8d4;
               color: #fff;
           }
           .bgc-btn:active {
               color: #fff;
               background: #01758a;
               border-color: #01758a;
           }
           /*带icon的按钮*/
           .btn-icon {
               width: 72px;
               padding-left: 20px;
           }
           .bgc-btn-color {
               color: #fff;
               -webkit-background-size: 20px 20px;
               background-size: 20px 20px;
               background-repeat: no-repeat;
               background-position: 5px 5px;
           }
           .bgc-btn-color:active {
               color: #fff;
               background-color: #01758a !important;
           }
       }
   }
</style>
<template>
    <div class="common-button">
        <div class="btn-waper">
            <!--普通按钮-->
            <button class="common-btn" :class="{'bgc-btn': backgroundColor}" v-if="btnIcon === ''" @click="confirm">{{btnText}}</button>
            <!--有icon的按钮-->
            <button class="common-btn btn-icon" :class="{'bgc-btn-color': btnIconColor !== ''}" :style="styleObject"
                    @click="confirm" @mousedown="selectIconOne" @mouseup="selectIconTwo" v-else>{{btnText}}
            </button>
        </div>
    </div>
</template>
<script>

    export default{
        data() {
            return {
                btnIconColorTab: true
            }
        },
        props:{
            btnText: { // 按钮文字
                type: String,
                default: function() {
                    return '查询'
                }
            },
            backgroundColor: { // 背景颜色
                type: Boolean,
                default: function() {
                    return false
                }
            },
            btnIcon: { // 背景图片
                type: [String,Array],
                default: function() {
                    return ''
                }
            },
            btnIconColor: {
                type: String,
                default: function() {
                    return ''
                }
            },
        },
        computed: {
            styleObject() {
                let result = {};
                if(this.btnIconColor !== '') {
                    result.backgroundColor = this.btnIconColor;
                }
                // if(this.btnIcon !== '' && typeof(this.btnIcon) === 'string') {
                //     result.backgroundImage = 'url('+ require( '@/components/image/'+ this.btnIcon ) +')';
                // }else if(typeof(this.btnIcon) === 'object' && this.btnIcon.length >0 && this.btnIconColorTab) {
                //     result.backgroundImage = 'url('+ require( '@/components/image/'+ this.btnIcon[0] ) +')';
                // }else if(this.btnIcon.length >0) {
                //     result.backgroundImage = 'url('+ require( '@/components/image/'+ this.btnIcon[1] ) +')';
                // }
                return result;
            }
        },
        mounted(){

        },
        methods:{
            confirm() {
                this.$emit('confirm')
            },
            selectIconOne() {
                this.btnIconColorTab = !this.btnIconColorTab;
            },
            selectIconTwo() {
                this.btnIconColorTab = !this.btnIconColorTab;
            }
        },
    }
</script>
