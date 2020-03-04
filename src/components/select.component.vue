<style lang="less">
    .selectWrap {
        display: inline-block;
        text-align: left;
        height: 32px;
        vertical-align: top;
        ::-ms-clear, ::-ms-reveal{
            display: none;
        }
        /*筛选框样式*/
        .select-wrapper {
            position: relative;
            margin-right: 15px;
            display: inline-block;
            width: 100%;
            .select{
                box-sizing: border-box;
                position: relative;
                min-width: 80px;
                width: 100%;
                height: 32px;
                font-size: 14px;
                line-height: 32px;
                color: @color-333;
                word-break: keep-all;
                overflow: hidden;
                border: 1px solid @link-border-color;
                -webkit-border-radius: 2px;
                -moz-border-radius: 2px;
                border-radius: 2px;
                padding: 0 28px 0 10px;
                cursor: default;
            }
        }

        .triangle-wrapper{
            position: absolute;
            right: 0;
            top: 50%;
            margin-top: -10px;
            width: 28px;
            height: 20px;
            background-color: @color-white;
            cursor: default;
        }
        .triangle-down{
            .triangle {
                position: absolute;
                width: 0;
                height: 0;
                right: 5px;
                transform: translateY(-50%);
                border-left: 7px solid transparent;
                border-right: 7px solid transparent;
            }
            .triangle-down-black {
                border-top: 7px solid @color-white;
                top: 9px;
                z-index: 2;
            }
            .triangle-down-white {
                border-top: 7px solid @color-999;
                top: 11px;
                z-index: 1;
            }
        }
        .triangle-up {
            .triangle {
                position: absolute;
                width: 0;
                height: 0;
                right: 5px;
                transform: translateY(-50%);
                border-left: 7px solid transparent;
                border-right: 7px solid transparent;
            }
            .triangle-down-black {
                border-bottom: 7px solid @color-white;
                top: 11px;
                z-index: 2;
            }
            .triangle-down-white {
                border-bottom: 7px solid @color-999;
                top: 9px;
                z-index: 1;
            }
        }
        /* 单选 选项样式*/
        .option-wrapper{
            box-sizing: border-box;
            position: absolute;
            top: 31px;
            z-index: 1000;
            min-width: 80px;
            width: 100%;
            max-height: 200px;
            overflow: hidden;
            border: 1px solid @link-border-color;
            border-radius: 2px;
            color: @color-999;
            background: @color-white;
            .option-wrapper-scroll {
                width: 110%;
                max-height: 200px;
                overflow: hidden;
                overflow-y: auto;
            }
            .option-item{
                min-width: 80px;
                height: 32px;
                line-height: 32px;
                padding: 0 10px;
                text-align: left;
                font-size: 14px;
                cursor: default;
            }
            .option-item:hover{
                background-color: @select-options;
            }
            .acitve {
                background-color: @select-options;
                color: @color-333;
            }
        }
        /* 多选 选项样式*/
        .multiple-wapper {
            box-sizing: border-box;
            position: absolute;
            top: 31px;
            z-index: 1000;
            min-width: 80px;
            width: 100%;
            max-height: 200px;
            overflow: hidden;
            border: 1px solid @link-border-color;
            border-radius: 2px;
            color: @color-999;
            background: @color-white;
            .option-wrapper-scroll {
                width: 110%;
                max-height: 200px;
                overflow: hidden;
                overflow-y: auto;
            }
            .option-item{
                min-width: 80px;
                height: 32px;
                line-height: 32px;
                padding: 0 10px;
                text-align: left;
                font-size: 14px;
                cursor: pointer;
                .multiple {
                    position: relative;
                    top: 1px;
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    line-height: 10px;
                    border: 1px solid @link-border-color;
                    color: @color-white;
                    >span {
                        display: inline-block;
                        transform: scale(0.6);
                    }
                }
                .multiple-acitve {
                    background: @color-primary;
                    border-color: @color-primary !important;
                    background-image: url("./image/select-icon.png");
                    background-repeat: @background-repeat;
                    background-size: 80%;
                    background-position: 1px 2px;
                }
            }
            .option-item-acitve {
                color: @color-333;
            }
        }
    }

</style>
<template>
    <div class="selectWrap" :style="{'width': selectWidth + 'px'}">
        <div class="select-wrapper">
            <div class="select" @click.stop="triggerOption">
                <div class="select-content">{{valueText}}</div>
                <input class="select-content" type="text" v-model="valueData" v-show="false">
                <div class="triangle-wrapper">
                    <div :class="{'triangle-up':triangle ,'triangle-down': !triangle}">
                        <div class="triangle-down-black triangle"></div>
                        <div class="triangle-down-white triangle"></div>
                    </div>
                </div>
            </div>
            <!--单选-->
            <div class="option-wrapper" v-show="triangle && !multiple" ref="wrapper" :style="coordinates">
                <div class="option-wrapper-scroll">
                    <div class="option-item" v-for = "(item,index) in computedOptions" :key="index" :class="{'acitve':activeIndex == index}" @click.stop="choose(item,index)">{{item.text}}</div>
                </div>
            </div>

            <!--多选-->
            <div class="multiple-wapper" v-show="triangle && multiple" ref="wrapper" :style="coordinates">
                <div class="option-wrapper-scroll">
                    <div class="option-item" :class="{'option-item-acitve': item.status}" v-for = "(item,index) in computedOptions" :key="index" @click.stop="chooseMultiple(item,index)">
                        <span class="multiple" :class="{'multiple-acitve': item.status}"><span></span></span>
                        {{item.text}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /**
     * author: ZH
     * @description : 下拉筛选 单选/多选
     * @params :<selct :options="options" v-model="valueData"></selct>
     *          options: type: Array  父级传递数据
     *          multiple: type: Boolean, 单选多选模式 默认单选
     *          selectIndex: type: Array, 默认显示第几个 与父级的v-model尽量不要并存  要么传value值 要么传index value会覆盖index效果
     *          selectWidth: type: String, 宽度设置
     * @return : String 单选返回'2019-08-08'  多选返回'2019-08-08,2019-08-09'
     */
    export default{
        data() {
            return {
                triangle: false,
                valueData: '',
                valueText: '',
                activeIndex: 0,
                flashpoint: false,
                coordinates: '',
            }
        },
        model: {
            prop: 'value',
            event: 'valueChange',
        },
        props:{
            selectWidth:{ // 默认宽度
                type: [Number,String],
                default: 180,
            },
            options:{ // 选项数据
                type: Array,
                default: function(){
                    return []
                }
            },
            selectIndex:{ // 默认选中
                type: Array,
                default: function(){
                    return []
                }
            },
            multiple: { //单选/双选模式
                type: Boolean,
                default: function(){
                    return false
                }
            },
            value: {
                type: [Number,String],
                default: function(){
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
        computed:{
            // 格式化数据传过来的可能是 数组||对象
            formatData() {
                let that = this;
                let result = [],
                    data = this.options || [];
                if(data.length > 0) {
                    if(typeof(data[0]) === 'string') { // 数组格式
                        for(let k = 0; k < data.length; k++) {
                            result.push({
                                text: data[k],
                                value: data[k],
                                status: false,
                            })
                        }
                    }else if(typeof(data[0]) === 'object'){ // 对象格式
                        let computedKeyMap = []; // 拿到对象的Key值
                        for(let key in data[0]) {
                            computedKeyMap.push(key);
                        }
                        let objs = data.map(o=>{return{
                            text:o[computedKeyMap[0]],
                            value:o[computedKeyMap[1]],
                            status: false
                        }
                        });
                        result = objs || [];
                    }
                }

                // 代替mounted钩子 只加载一次确保能拿到props的数据
                that.setInitActive();
                return result
            },
            // 计算data 用于响应循环
            computedOptions() {
                let that = this;
                let result = [];
                that.flashpoint  = !that.flashpoint ;
                result = [].concat(this.formatData);
                return result
            }
        },
        mounted(){
            let that = this;
            // 自适应显示位置
            let remainingHeight = this.options.length *32;
            if(window.innerHeight - this.$el.offsetTop <= remainingHeight){
                this.coordinates = {let: '0', top: -(remainingHeight)+ 'px'}
            }
            document.addEventListener('click', that.initPanel);
            window.onresize = function() {
                let remainingHeight = that.options.length *32;
                if(window.innerHeight - that.$el.offsetTop <= remainingHeight){
                    that.coordinates = {let: '0', top: -(remainingHeight)+ 'px'}
                }else {
                    that.coordinates = {top: '31px'}
                }
            };
        },
        beforeDestroy() {
            document.removeEventListener('click', this.initPanel);
        },
        methods:{
            // 显示筛选框
            initPanel() {
                if(this.triangle) {
                    this.triangle = false;
                }
                return false;
            },
            // 点击下拉按钮
            triggerOption() {
                this.triangle = !this.triangle;
            },
            // 单选 选中
            choose(item,index) {
                this.activeIndex = index;
                this.valueData = item.value;
                this.valueText = item.text;
                this.triangle = !this.triangle;
                this.$emit('valueChange',this.valueData);
            },
            //多选 选中
            chooseMultiple(item,index) {
                this.formatData[index].status = !this.formatData[index].status;
                let arrayMap = [],
                    arrayTextMap = [];
                for(let i = 0; i < this.formatData.length; i++) {
                    if(this.formatData[i].status) {
                        arrayMap.push(this.formatData[i].value);
                        arrayTextMap.push(this.formatData[i].text);
                    }
                }
                if(arrayMap.length > 0) {
                    this.valueData = arrayMap.join(',');
                    this.valueText = arrayTextMap.join(',');
                    this.$emit('valueChange',this.valueData);
                }else {
                    this.valueData = '';
                    this.valueText = '';
                    this.$emit('valueChange','');
                }
                this.flashpoint = !this.flashpoint;
            },
            //设置默认选中或回显
            setInitActive() {
                let that = this;
                setTimeout(function() {
                    let selectIndex = that.selectIndex;
                    if(!that.multiple && that.computedOptions.length > 0) {
                        // 单选设置默认选中 传入index值
                        if(selectIndex.length > 0) {
                            that.valueData = that.computedOptions[selectIndex[0]].value || '';
                            that.valueText = that.computedOptions[selectIndex[0]].text || '';
                            that.activeIndex = parseFloat(selectIndex[0]);
                        }
                        // 单选设置默认选中 传入value值
                        if(that.value !== '') {
                            let fatherValue = '';
                            for(let i = 0; i < that.computedOptions.length; i++) {
                                (that.value == that.computedOptions[i].value)?fatherValue = i:'';
                            }
                            if(fatherValue !== '') {
                                that.valueData = that.value;
                                that.valueText = that.computedOptions[fatherValue].text;
                                that.activeIndex = fatherValue;
                            }
                        }
                    }else if(that.computedOptions.length > 0) {
                        // 多选选设置默认选中 传入index值
                        if(selectIndex.length > 0) {
                            let arrayMap = [],
                                arrayTextMap = [];
                            for(let i = 0; i < selectIndex.length; i++) {
                                that.formatData[selectIndex[i]].status = true;
                                arrayMap.push(that.formatData[selectIndex[i]].value);
                                arrayTextMap.push(that.formatData[selectIndex[i]].text)
                            }
                            if(arrayMap.length > 0) {
                                that.valueData = arrayMap.join(',');
                                that.valueText = arrayTextMap.join(',');
                            }
                        }
                        // 多选选设置默认选中 传入value值
                        if(that.value !== '') {
                            let arrayMap,
                                arrayTextMap = [];
                            arrayMap = that.value.toString().split(',');
                            for(let i = 0; i < that.formatData.length; i++) {
                                that.formatData[i].status = false;
                                for(let k = 0; k < arrayMap.length; k++) {
                                    if(arrayMap[k] == that.formatData[i].value) {
                                        arrayTextMap.push(that.formatData[i].text);
                                        that.formatData[i].status = true;
                                    }
                                }
                            }
                            if(arrayMap.length > 0) {
                                that.valueData = that.value;
                                that.valueText = arrayTextMap.join(',');
                            }
                        }
                        that.flashpoint  = !that.flashpoint;
                    }
                    that.$emit('valueChange',that.valueData);
                },100);
            }

        },
    }
</script>
