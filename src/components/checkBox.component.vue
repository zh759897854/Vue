<style lang="less">
    .checkBox {
        display: inline-block;
        font-size: 14px;
        line-height: 14px;
        color: @color-333;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        vertical-align: middle;
        input {
            display: none;
        }

        /*多选 多选共有样式*/
        .checkBox-wapper {
            position: relative;
            height: 20px;
            display: inline-block;
            margin-right: 10px;
            .checkbox-icon {
                position: absolute;
                left: 0;
                top: 2px;
                display: inline-block;
                width: 14px;
                height: 14px;
                border: 1px solid @link-border-color;
                font-size: 12px;
                > span {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    color: #fff;
                    line-height: 14px;
                    text-align: center;
                }
            }
            .checkbox-label{
                position: absolute;
                width: auto;
                top: 0;
                left: 0;
                display: inline-block;
                height: 20px;
                line-height: 20px;
                text-indent: 20px;
            }
        }

        /*单选*/
        .not-multiple {
            display: inline-block;
            .checkbox-icon {
                border-radius: 14px;
                overflow: hidden;
            }
        }

        /*选中样式*/
        .checked {
            .checkbox-icon {
                border-color: @color-primary !important;
                > span {
                    background: @color-primary;
                    background-image: url("./image/select-icon.png");
                    background-repeat: @background-repeat;
                    background-position: 1px 2px;
                }
            }
        }

        .select-all-btn {
            width: 70px;
        }
    }

</style>
<template>
    <div class="checkBox">
        <!--多选-->
        <div class="multiple" v-if="multiple">
            <span v-for="(item,index) in checkDataMap" :key="index" class="checkBox-wapper" :class="{'checked':item.status}" :style="{'width': setWidth + 'px'}">
                <span class="checkbox-icon">
                    <span></span>
                </span>
                <label class="checkbox-label" :for="'label' + + labelType + index">{{item.label}}</label>
                <input type="checkbox" :id="'label' + + labelType + index" :value="item.value" v-model="checkedValues" @click="change(index)" title=""/>
            </span>
            <!--全选按钮-->
            <span class="checkBox-wapper select-all-btn" :class="{'checked':selectAllTab}" v-if="selectAllBtn">
                <span class="checkbox-icon">
                    <span></span>
                </span>
                <label class="checkbox-label" for="selectAll">{{selectText}}</label>
                <input type="checkbox" id="selectAll"  @click="selectAll()">
            </span>
        </div>

        <!--单选-->
        <div class="not-multiple" v-else>
            <span  v-for="(item,index) in checkDataMap" :key="index" class="checkBox-wapper" :class="{'checked':item.status}" :style="{'width': setWidth + 'px'}">
                <span class="checkbox-icon">
                    <span></span>
                </span>
                <label class="checkbox-label" :for="'label' + labelType + index">{{item.label}}</label>
                <input type="radio" :id="'label' + labelType + index" :value="item.value" v-model="checkedValue" @click="change(index)" title=""/>
            </span>
        </div>
    </div>
</template>
<script>
    /**
     * author: ZH
     * @description : 单选复选框 单选/多选
     * @params :<check :checkBoxData="checkBoxData" v-model="valueData"></check>
     *          checkBoxData: type: Array  父级传递数据
     *          multiple: type: Boolean, 单选多选模式 默认单选
     *          selectIndex: type: Array, 默认显示第几个 与父级的v-model尽量不要并存  要么传value值 要么传index value会覆盖index效果
     *          selectAllBtn: type: Boolean, 复选情况下是否有全选反选按钮
     *          setWidth： String 宽度
     *          labelType: 必传 复用时label标签唯一区别标识
     * @return : String '中国,北京'
     */
    export default{
        data() {
            return {
                checkedValues: [], // 复选值
                checkedValue: '', // 单选值
                selectText: '全选',
                selectAllTab: false, // 全选\反选开关,
                flashpoint: false
            }
        },
        model: {
            prop: 'value',
            event: 'valueChange',
        },
        props:{
            checkBoxData: { // 父级数据
                type: Array,
                default: function() {
                    return []
                }
            },
            selectIndex: { // 默认选中
                type: Array,
                default: function() {
                    return []
                }
            },
            multiple: { // 单选||双选
                type: Boolean,
                default: function() {
                    return false
                }
            },
            selectAllBtn: { // 是否有全选按钮
                type: Boolean,
                default: function() {
                    return true
                }
            },
            setWidth: {
                type: [String,Number],
                default: function() {
                    return 110
                }
            },
            labelType: {
                type: String,
                default: function() {
                    return ''
                }
            },
            value: {
                type: [String,Number],
                default: function() {
                    return ''
                }
            }
        },
        watch: {
            value(newVal,oldVal) {
                if(!oldVal) {
                    this.setInitActive();
                }
            }
        },
        computed: {
            dataMap() {
                let that = this;
                let result = [];
                // 添加初始化属性
                let data = this.checkBoxData || [];
                if(data.length > 0) {
                    data.map(function(value) {
                        value.status = false
                    });
                }
                result = data;

                // 代替mounted钩子 只加载一次确保能拿到props的数据
                this.setInitActive();
                return result
            },
            checkDataMap() {
                let that = this;
                that.flashpoint = !that.flashpoint;
                return [].concat(that.dataMap);
            }
        },
        methods:{
            // 选中
            change(index) {
                // 选中值
                let that = this;
                setTimeout(function() {
                    if(!that.multiple) { // 单选
                        that.$emit('valueChange',that.checkedValue)
                    }else {
                        that.$emit('valueChange',that.checkedValues.join(','))
                    }

                    if(that.selectAllBtn) {
                        (that.checkedValues.length === that.checkDataMap.length)?that.selectAllTab = true:that.selectAllTab = false;
                    }
                },20);

                // 更改icon
                if(index > -1) {
                    let checkDataMap = that.checkDataMap;
                    if(!that.multiple) { // 单选
                        for(let i = 0; i < checkDataMap.length; i++) {
                            checkDataMap[i].status = false;
                        }
                        checkDataMap[index].status = true;
                    }else { // 多选
                        checkDataMap[index].status = !checkDataMap[index].status;
                    }
                }
                that.flashpoint = !that.flashpoint;
            },

            // 全选/反选
            selectAll() {
                let that = this;
                that.selectAllTab = !that.selectAllTab;
                if(that.selectAllTab) {
                    let checkBoxData = that.checkBoxData;
                    that.checkedValues = [];
                    that.selectText = '全不选';
                    for(let i = 0; i < checkBoxData.length; i++) {
                        that.checkDataMap[i].status = true;
                        that.checkedValues.push(checkBoxData[i].value);
                    }
                    setTimeout(function() {
                        that.$emit('valueChange',that.checkedValues.join(','))
                    },10);
                }else {
                    that.selectText = '全选';
                    for(let i = 0; i < that.checkDataMap.length; i++) {
                        that.checkDataMap[i].status = false;
                    }
                    that.checkedValues = '';
                    setTimeout(function() {
                        that.$emit('valueChange',that.checkedValues);
                        that.checkedValues = [];
                    },10);
                }
            },
            //设置默认选中或回显
            setInitActive() {
                let that = this;
                setTimeout(function() {
                    let selectIndex = that.selectIndex,
                        checkBoxData = that.checkDataMap;
                    // 有默认选中更改状态 选中index值
                    if(selectIndex.length > 0 && checkBoxData.length > 0) {
                        for(let i = 0; i < selectIndex.length; i++) {
                            if(parseFloat(selectIndex[i]) > checkBoxData.length) {
                                console.error('默认参数设置有误！')
                            }else {
                                if(!that.multiple) { // 单选
                                    let max = Math.max.apply(null, selectIndex);
                                    if(max < checkBoxData.length-1) {
                                        checkBoxData[max].status = true;
                                        that.checkedValue = checkBoxData[max].value;
                                    }
                                }else {
                                    checkBoxData[selectIndex[i]].status = true;
                                    that.checkedValues.push(checkBoxData[selectIndex[i]].value)
                                }
                            }
                        }
                    }

                    // 有默认选中更改状态 传入value值
                    if(that.value !== '') {
                        let value = that.value.toString();
                        if(!that.multiple) { // 单选
                            that.checkedValue = value;
                        }else {
                            that.checkedValues = value.split(',')
                        }
                        let dateStatusList = value.split(',');
                        for(let m = 0; m < checkBoxData.length; m++) {
                            checkBoxData[m].status = false;
                            for(let k = 0; k < dateStatusList.length; k++) {
                                dateStatusList[k] == checkBoxData[m].value?checkBoxData[m].status = true:'';
                            }
                        }
                    }

                    if(!that.multiple) {
                        // 单选
                        that.$emit('valueChange',that.checkedValue)
                    }else {
                        // 多选
                        that.$emit('valueChange',that.checkedValues.join(','))
                    }

                    //检查是否需要是选中全部
                    if(that.selectAllBtn) {
                        if(that.checkedValues.length === that.checkDataMap.length) {
                            that.selectAllTab = false;
                            that.selectAll();
                        }else {
                            that.selectAllTab = false;
                        }
                    }
                },100);
            }
        },
    }
</script>
