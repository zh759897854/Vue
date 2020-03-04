<!--input组件-->
<template>
    <div class="sy-input">
        <div :class="['input-wrapper', iptReadonly ? 'readonly' : '', focus ? 'on-focus' : '', iptError ? 'error' : '']" :style="{'width': setWidth + 'px'}">
            <input :class="iptClassName"
                   :type="iptType"
                   v-model="iptValue"
                   :maxlength="maxLength"
                   :placeholder="iptPlaceholder"
                   :readonly="iptReadonly"
                   @input="$emit('iptEvent', $event.target.value)"
                   @blur="iptChange('blur')"
                   @focus="iptChange('focus')"
                   @keyup.enter="iptKeyupEvent"/>
            <i v-if="iconShow" class="icon icon-search" @click="iptClickEvent"></i>
            <small class="error-info" v-if="iptError" :title="errorInfo">{{errorInfo}}</small>
            <div ref="relateWrapper" class="relate-block" v-if="isRelated && relateData.length > 0">
                <ul>
                    <li v-for="(item, index) in relateData" :key="index" @click="checkData(item)">
                        <div><span>{{item.name}}</span><span>{{item.code}}</span></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import IScroll from 'iscroll'
    export default {
        data (){
            return{
                focus : false,
                scrollObj : null,
                iptValue: ''
            }
        },
        model: {
            prop: 'value',
            event: 'valueChange',
        },
        props : {
            iptClassName : {
                type : String,
                default : function(){
                    return '';
                }
            },
            iptType : {
                type : String,
                default : function(){
                    return 'text';
                }
            },
            maxLength : {
                type : [String,Number],
                default : function(){
                    return '80';
                }
            },
            iptPlaceholder : {
                type : String,
                default : function(){
                    return '';
                }
            },
            iptReadonly : {
                type : Boolean,
                default : function(){
                    return false;
                }
            },
            iptError : {
                type : Boolean,
                default : function(){
                    return false;
                }
            },
            errorInfo : {
                type : String,
                default : function(){
                    return '';
                }
            },
            isRelated : {
                type : Boolean,
                default : function(){
                    return false;
                }
            },
            relateData : {
                type : Array,
                default : function(){
                    return [];
                }
            },
            iconShow: {
                type : Boolean,
                default : function(){
                    return true;
                }
            },
            setWidth: {
                type : [String,Number],
                default : function(){
                    return 200;
                }
            },
            value: {
                type : [String,Number],
                default : function(){
                    return '';
                }
            }
        },
        watch:{
            value: {
                immediate:true,
                handler:function(newValue,oldValue) {
                    if(newValue) {
                        this.iptValue = newValue;
                    }
                }
            }
        },
        methods : {
            iptChange (status){
                if(status === 'focus'){ // 聚焦
                    this.focus = true;
                    this.$emit('focus',this.iptValue)
                }else{ // 失焦
                    this.focus = false;
                    this.$emit('blur',this.iptValue)
                }
            },
            iptClickEvent (){
                this.$emit('iptClick',this.iptValue)
            },
            iptKeyupEvent (){
                this.$emit('iptKeyup',this.iptValue);
                if(this.$refs.relateWrapper){
                    this.scrollObj = new IScroll(this.$refs.relateWrapper, {
                        scrollY: true,
                        mouseWheel: true,
                        scrollbars: true,
                        interactiveScrollbars: true,
                        fadeScrollbar : true,
                        click : true,
                        preventDefault: false
                    })
                }
            },
            checkData (data){
                this.$emit('chooseData', data)
            }
        }
    }
</script>

<style lang="less">

    .sy-input{
        display: inline-block;
        margin-right: 15px;
        height: 30px;
        vertical-align: middle;

        .input-wrapper{
            position: relative;
            display: inline-block;
            width: auto;
            height: 30px;
            border: 1px solid @link-border-color;
            border-radius: 2px;

            &.readonly{
                background: @input-disbale;
                input{
                    background: @input-disbale;
                }
            }

            &.on-focus{
                border: 1px solid @color-primary;
            }

            &.error{
                border: 1px solid @input-error-border;
            }

            input {
                position: absolute;
                top: 0;
                left: 10px;
                width: 90%;
                height: 28px;
                background: @color-white;
                border: 0;
                color: @color-333;
                font-size: 14px;
                outline: none;
            }

            input::-webkit-input-placeholder{
                color: @color-999;
            }

            input:-moz-placeholder{
                color: @color-999;
            }

            input::-moz-placeholder{
                color: @color-999;
            }

            input:-ms-input-placeholder{
                color: @color-999;
            }

            i{
                display: inline-block;
                position: absolute;
                right: 6px;
                top: 8px;
                width: 16px;
                height: 16px;
            }

            .icon-search{
                background: url("./image/icon-search.png") no-repeat;
            }

            .error-info{
                position: absolute;
                left: 0;
                top: 31px;
                max-width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: @input-error-border;
            }
        }

        .relate-block{
            position: absolute;
            left: 0;
            top: 32px;
            width: 200px;
            max-height: 200px;
            background: @color-white;
            border: 1px solid @link-border-color;
            overflow-y: hidden;

            ul{
                list-style: none;
                margin-block-start: 0;
                margin-block-end: 0;
                margin-inline-start: 0px;
                margin-inline-end: 0px;
                padding-inline-start: 0px;
                border-radius: 2px;
                text-align: left;
                font-size: 14px;
                li{
                    padding: 6px 10px;
                    color: @color-999;
                    &:hover{
                        color: @color-999;
                        background: @link-bg-color;
                        cursor: pointer;
                    }
                    span{
                        margin-right: 10px;
                    }
                }
            }
        }
    }
</style>
