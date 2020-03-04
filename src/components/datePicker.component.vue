<style lang="less">
    #date-picker {
        position: relative;
        display: inline-block;
        height: 32px;
        margin-right: 15px;
        overflow-y: visible;
        font-size: 14px;
        color: @color-666;
        background: @color-white;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        .has-day-model,.only-year-model,.has-month-model {
            background: @color-white;
        }
        ::-ms-clear, ::-ms-reveal{
            display: none;
        }
        /*按钮样式*/
        .clear-button {
            width: 20px;
            height: 20px;
            border: 1px solid @color-white;
            border-radius: 20px;
            outline: none;
            background: @color-white;
        }
        .date-input {
            width: 98px;
            height: 30px;
            line-height: 32px;
            padding: 0 10px;
            color: @color-333;
            outline: none;
            border: 1px solid @link-border-color;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            cursor: pointer;
        }
        /*时间弹窗样式*/
        .date-panel {
            position: absolute;
            left: 0;
            top: 33px;
            z-index: 1000;
            width: 360px;
            background: @color-white;
            border: 1px solid @link-border-color;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            /*头部样式 显示年月*/
            .select-contain {
                display: block;
                padding: 5px 20px;
                color: @color-333;
                >div {
                    display: inline-block;
                    width: 100%/3;
                    text-align: center;
                }
                div:nth-child(1) {
                    text-align: left;
                }
                div:nth-child(2) {
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 16px;
                    .down-triangle {
                        position: relative;
                        top: 12px;
                        left: 5px;
                        border: 6px solid @color-white;
                        border-top-color: @color-000;
                    }
                }
                div:nth-child(3) {
                    text-align: right;
                }
                .select-icon {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border: 1px solid @link-border-color;
                    border-radius: 100%;
                    cursor: pointer;
                }
                .prve-month {
                    background-image: url('./image/left-arrow.png');
                    background-position: center;
                    background-repeat: @background-repeat;
                }
                .next-month {
                    background-image: url('./image/right-arrow.png');
                    background-position: center;
                    background-repeat: @background-repeat;
                }
                .mostYear {
                    span {
                        font-size: 15px;
                    }
                }
            }
            /*星期样式 日期样式 年份  月份统一样式*/
            .week-contain, .day-contain, .month-contain, .year-contain {
                padding: 20px 10px 10px 10px;
                >span {
                    position: relative;
                    display: inline-block;
                    width: 37px;
                    height: 37px;
                    margin: 0 5px;
                    line-height: 37px;
                    text-align: center;
                    .disable-click {
                        position: absolute;
                        left: 0;
                        top: 0;
                        display: inline-block;
                        width: 37px;
                        height: 37px;
                        cursor: not-allowed;
                    }
                }
                .disable-color {
                    color: @color-999;
                }
                .day-active {
                    background: @color-primary;
                    color: @color-white;
                }
            }

            /*特性样式*/
            .week-contain {
                color: @color-333;
            }
            /*日期*/
            .day-contain {
                border-top: 1px solid @input-text-color;
                padding: 10px 10px 20px 10px;
                >span {
                    margin-top: 5px;
                    border-radius: 37px;
                    cursor: pointer;
                    text-align: center;
                }
                >span:hover {
                    background: @color-primary;
                    color: @color-white;
                }
                .disable-click {
                    background: @color-white;
                    color: @color-999;
                }
            }
            /*月份 年份*/
            .month-contain, .year-contain {
                >span {
                    padding: 10px 15px;
                    cursor: pointer;
                    text-align: center;
                    margin-top: 5px;
                }
                >span:hover {
                    background: @color-primary;
                    color: @color-white;
                }
            }
            .month-active,.year-active {
                background: @color-primary;
                color: @color-white;
            }
        }
        /*按钮*/
        .btn-panel {
            border-top: 1px solid @input-text-color;
            padding: 10px 10px;
            text-align: right;
            .btn {
                display: inline-block;
                padding: 5px 10px;
                margin-right: 15px;
                background-color: @color-primary;
                border-color: #12a4bd;
                border-radius: 4px;
                cursor: pointer;
                color: @color-white;
            }
        }
    }
</style>

<template>
  <div id="date-picker">
      <input class="date-input" type="text" v-model="dateValue" autocomplete="false" @change="handSetDate" :placeholder="placeholder" @click.stop="panelState = !panelState" title="">
      <button class="clear-button" @click.stop="clearDate" v-if="dateValue !== '' && inputClearBtn">x</button>

      <div class="date-panel" v-show="panelState" :style="coordinates" @click.stop="preventClickEvent">
          <!--全日期选择-->
          <section v-show="selectType === 'hasDay'">
              <div class="has-day-model">
                  <div class="select-contain">
                      <div>
                          <span class="prve-month select-icon" @click.stop="prevMonth"></span>
                      </div>
                      <div @click.stop="changeSatusMonth">
                          <span class="select-year">{{setYear}}年</span>
                          <span>-</span>
                          <span class="select-month">{{setMonth}}月</span>
                          <span class="down-triangle"></span>
                      </div>
                      <div>
                          <span class="next-month select-icon" @click.stop="nextMonth"></span>
                      </div>
                  </div>
                  <div class="week-contain">
                      <span v-for="(week,weekIndex) in weekDates" :key="weekIndex">{{week}}</span>
                  </div>
                  <div class="day-contain">
                      <span v-for="(days,dayIndex) in dayDates" :key="dayIndex+'day'"
                            :class="{'disable-color': days.type !== 'currentMonth','day-active': days.value === tempDay && days.type === activeType}"
                            :type="days.type"
                            :date="days.date"
                            @click.stop="setDayDate(days)">{{days.value}}
                            <span class="disable-click" v-if="disableTab && parseFloat(days.date) > parseFloat(initDateTab)
                             && parseFloat(days.date) > parseFloat(minDate)">{{days.value}}</span>
                      </span>
                  </div>
                  <div class="btn-panel" v-if="okBtn || clearBtn || initBtn">
                      <div class="btn init-btn" v-if="initBtn" @click.stop="ininDateFuc">重置</div>
                      <div class="btn clear-btn" v-if="clearBtn" @click.stop="clearDate">清除</div>
                      <div class="btn ok-btn" v-if="okBtn" @click.stop="saveDate">确定</div>
                  </div>
              </div>
          </section>

          <!--月份选择-->
          <section v-show="selectType === 'hasMonth'">
              <div class="has-month-model">
                  <div class="select-contain">
                      <div>
                          <span class="prve-month select-icon" @click.stop="prevYear"></span>
                      </div>
                      <div @click.stop="changeSatusYear">
                          <span class="select-year">{{setYear}}年</span>
                      </div>
                      <div>
                          <span class="next-month select-icon" @click.stop="nextYear"></span>
                      </div>
                  </div>
                  <div class="month-contain">
                  <span v-for="(month,monthIndex) in monthDates" :key="monthIndex"
                        :class="{'month-active': month.value === setMonth}"
                        @click.stop="setMonthDate(month.value)">{{month.name}}
                  </span>
                  </div>
              </div>
          </section>

          <!--年份选择-->
          <section v-show="selectType === 'hasYear'">
              <div class="only-year-model">
                  <div class="select-contain">
                      <div>
                          <span class="prve-month select-icon" @click.stop="prevYears"></span>
                      </div>
                      <div @click.stop="changeSatusYear" class="mostYear">
                          <span class="select-year">{{startYear-16}}年</span>
                          <span>-</span>
                          <span class="select-month">{{startYear-5}}年</span>
                      </div>
                      <div>
                          <span class="next-month select-icon" @click.stop="nextYears"></span>
                      </div>
                  </div>
                  <div class="year-contain">
                  <span v-for="(year,yearIndex) in yearDates" :key="yearIndex"
                        :class="{'year-active': year === setYear}"
                        @click.stop="setYearDate(year)">{{year}}
                  </span>
                  </div>
              </div>
          </section>
      </div>
  </div>
</template>

<script>
    /**
     * author: ZH
     * @description : 时间选择插件
     * @params :<date-picker v-model="DateValue"></date-picker> 调用示例
     *          selectToday: type: Boolean 是否默认选中当天 默认显示
     *          yearRange: type: Array  设置年限范围  [2019,2050]
     *          okBtn: type: Boolean, 是否显示确定按钮  默认不显示
     *          clearBtn: type: Boolean,是否显示清除按钮  默认不显示
     *          inputClearBtn: type: Boolean, 是否显示input后面的清除按钮  默认不显示
     *          initBtn: type: Boolean, 是否显示返回当前按钮  默认不显示
     *          noAfterToday: type: Boolean, 是否设置今天之后不可选 默认可选
     *
     *          maxDate: type: [String,Number], 最大可选择日期  20190506
     *          minDate: type: [String,Number],最小可选择日期 20190506
     *          && 特别注意:如果页面有两个时间选择器要实现第二个日期不能大于第一个日期 将第一个组件的value值设置为第二个组件的maxDate
     *          并且设置noAfterToday为true minData需手动设置&&
     *
     *          placeholder: type: String, 默认提示词
     *          format：type string  暂时支持了两种 'yy-mm-dd' 'yy年mm月dd' 默认'yy-mm-dd'
     *          isSupportHand type: Boolean, 是否支持手动输入  默认不支持
     *
     *          @confirm type function 点击确定按钮事件
     *          @cancel type function 点击取消按钮事件
     * @return : String '2019-08-08'
     */
    export default {
        name: 'date-picker',
        model: {
            prop: 'value',
            event: 'dateValueChange'
        },
        props: {
            selectToday: { // 是否默认选中当天 默认选中
                type: Boolean,
                default : function() {
                    return true
                }
            },
            yearRange: { // 设置年限范围
                type: Array,
                default: function() {
                    return [1930,2050]
                }
            },
            okBtn: { // 是否显示确定按钮  默认不显示
                type: Boolean,
                default : function() {
                    return false
                }
            },
            clearBtn: { // 是否显示清除按钮  默认不显示
                type: Boolean,
                default : function() {
                    return false
                }
            },
            inputClearBtn: { // 是否显示input后面的清除按钮  默认不显示
                type: Boolean,
                default : function() {
                    return false
                }
            },
            initBtn: { // 是否显示返回今天日期按钮  默认不显示
                type: Boolean,
                default : function() {
                    return false
                }
            },
            noAfterToday: { // 是否设置今天之后不可选  默认不设置
                type: Boolean,
                default: function() {
                    return false
                }
            },
            maxDate: { // 最大可选择日期 默认不设置
                type: [String,Number],
                default: function() {
                    return '0'
                }
            },
            minDate: { //最小可选择日期 默认不设置
                type: [String,Number],
                default: function() {
                    return '0'
                }
            },
            placeholder: { // 提示词
                type: String,
                default: function() {
                    return '请选择日期'
                }
            },
            format: { // 日期格式 默认'yy年mm月dd'
                type: String,
                default: function() {
                    return 'yy-mm-dd'
                }
            },
            isSupportHand: { // 是否支持手动输入
                type: Boolean,
                default: function() {
                    return false
                }
            },
            value: {
                type: String,
                default: function() {
                    return ''
                }
            },
        },
        data () {
            return {
                dataValue: '',
                panelState: false,
                selectType: 'hasDay',
                initYear: '', //初始化显示的年份
                initMonth: '', //初始化显示的月份
                initWeek: '', //初始化对应星期
                initDay: '', //初始化显示的日期
                setYear: '', //选中的年份
                setMonth: '', //选中的月份
                setWeek: '', //对应星期
                setDay: '', //选中的日期
                dateValue: '',
                yearDates: [],
                monthDates: [
                    {name: '1月',value:1},
                    {name: '2月',value:2},
                    {name: '3月',value:3},
                    {name: '4月',value:4},
                    {name: '5月',value:5},
                    {name: '6月',value:6},
                    {name: '7月',value:7},
                    {name: '8月',value:8},
                    {name: '9月',value:9},
                    {name: '10月',value:10},
                    {name: '11月',value:11},
                    {name: '12月',value:12}
                ],
                weekDates: ['周一','周二','周三','周四','周五','周六','周日'],
                startYear: '',
                activeType: '', // 限制样式 防止当前点击的日期与上下月重复
                tempYear: '', // 搭建临时变量(暂时直接改变，后期需要再加需求)
                tempMonth: '',
                tempDay: '',
                coordinates: '',
                dateFormatCheck: false
            }
        },

        mounted() {
            let that = this;
            window.onresize = function() {
                if(window.innerHeight - that.$el.offsetTop <= 380){
                    that.coordinates = {let: '0', top: -(380 - (Math.abs(window.innerHeight - that.$el.offsetTop )) + 30) + 'px'}
                }else {
                    that.coordinates = {top: '31px'}
                }
            };
            if(window.innerHeight - this.$el.offsetTop <= 380){
                this.coordinates = {let: '0', top: -(380 - (Math.abs(window.innerHeight - this.$el.offsetTop )) + 30) + 'px'}
            }

            document.addEventListener('click', this.initPanel);
            this.ininDateFuc();
            if(this.yearRange && this.yearRange.length === 2) { // 父级传递年份范围
                let d = this.yearRange;
                if(this.startYear < d[0] || this.startYear > d[1]) {
                    console.error('参数起始结束范围有误！')
                }
            }else {
                console.error('参数格式错误！')
            }
        },
        beforeDestroy() {
            document.removeEventListener('click', this.initPanel);
        },
        computed: {
            //设置显示日期
            dayDates() {
                let computeyear = this.setYear,
                    computeMonth = this.setMonth,
                    computeWeek = this.setWeek;
                //获取当月的天数
                let currentMonthLength = new Date(computeyear, computeMonth, 0).getDate();
                //先将当月的日期塞入dateList
                let dateList = Array.from({length: currentMonthLength}, (val, index) => {
                    let currenMonth = computeMonth,
                        currenDay = index + 1;
                    currenMonth < 10?currenMonth = '0' + currenMonth:currenMonth;
                    currenDay < 10?currenDay = '0' + currenDay:currenDay;
                    return {
                        type: 'currentMonth',
                        value: index + 1,
                        date: '' + computeyear + currenMonth + currenDay
                    }
                });
                //获取当月1号的星期是为了确定在1号前需要插多少天
                let startDay = computeWeek;
                //确认上个月一共多少天
                let previousMongthLength = new Date(computeyear, computeMonth-1, 0).getDate();
                 //在1号前插入上个月日期
                let preveYear = '';
                computeMonth === 1?preveYear = computeyear-1:preveYear = computeyear;
                for(let i = 0, len = startDay-1; i < len; i++){
                    let prveMonth = computeMonth-1,
                        prveDay = previousMongthLength - i;

                    prveMonth === 0?prveMonth = 12:prveMonth;
                    prveMonth < 10?prveMonth = '0' + prveMonth:prveMonth;
                    prveDay < 10?prveDay = '0' + prveDay:prveDay;
                    dateList = [
                        {
                            type: 'previousMonth',
                            value: previousMongthLength - i,
                            date: '' + preveYear + prveMonth + prveDay
                        }
                    ].concat(dateList)
                }
                //补全剩余位置
                let netYear = '';
                computeMonth === 12?netYear = computeyear+1:netYear = computeyear;
                for(let i = dateList.length, item = 1; i < 42; i++, item++){
                    let netMonth = computeMonth+1,
                        netDay = item;
                    netMonth === 13?netMonth = 1:netMonth;
                    netMonth < 10?netMonth = '0' + netMonth:netMonth;
                    netDay < 10?netDay = '0' + netDay:netDay;
                    dateList[dateList.length] = {
                        type: 'nextMonth',
                        value: item,
                        date: '' + netYear + netMonth + netDay
                    }
                }
                return dateList
            },
            //限制日期条件
            disableTab() {
                let result = false;
                if(this.noAfterToday) {
                    if(this.setYear > this.initYear) { // 大于今年的不可选
                        result = true;
                    }else if(this.setYear === this.initYear) { // 等于今年单独判断
                        if(this.setMonth > this.initMonth) { // 今年情况下 月份大于今年份不可选
                            result = true;
                        }else if(this.setMonth === this.initMonth) { // 等于当前月份的情况下--特殊处理
                            result = true;
                        }
                    }else if(this.setYear === this.initYear-1 &&　this.setMonth　=== 12) { // 去年12月份--特殊处理
                        result = true;
                    }
                }else {
                    result = false;
                }
                return result
            },
            //日期为今天的字符串  作比较用
            initDateTab() {
                let result = '';
                this.maxDate !== '0'?result = this.maxDate:result = '' + this.initYear + this.initMonth + this.initDay;
                if(this.maxDate !== '0') {
                    let reg = /[年,月,-]/g;
                    result = result.replace(reg,'');
                }
                return result
            }
        },
        methods: {
            // 设置与校验手动输入日期的格式
            handSetDate() {
                if(this.isSupportHand) {
                    switch (this.format) {
                        case 'yy-mm-dd':
                            this.checkFormat(this.dateValue,1);
                            break;
                        case 'yy年mm月dd':
                            this.checkFormat(this.dateValue,2);
                            break;
                        default:
                            this.dateValue = this.setYear + '-' + this.setMonth + '-' + this.setDay;
                            this.dateFormatCheck = true;
                            break;
                    }
                    if(this.dateFormatCheck) {
                        this.$emit('dateValueChange',this.dateValue);
                    }else {
                        this.setValue();
                        console.error('输入日期格式错误！请检查后重新输入')
                    }
                }else {
                    this.setValue();
                }
            },
            checkFormat(data,type) {
                let dateList = [];
                let reg = /[年,月]/g;
                if(type === 2) {
                    data = data.replace(reg,'-');
                }

                dateList = [].concat(data.split('-'));
                if(dateList.length === 3) {
                    if(dateList[0].length === 4) { // check年份
                        if(dateList[1].length === 2 && parseFloat(dateList[1]) <= 12) { // check月份
                            if(dateList[2].length === 2) { // check日期长度格式
                                if(parseFloat(dateList[1]) === 2) { //2月份
                                    parseFloat(dateList[2]) <= 28?this.dateFormatCheck = true:this.dateFormatCheck = false;
                                }else if( parseFloat(dateList[1]) === 4 || parseFloat(dateList[1]) === 6 ||
                                    parseFloat(dateList[1]) === 9 || parseFloat(dateList[1]) === 11 ) { // 非润月
                                    parseFloat(dateList[2]) <= 30?this.dateFormatCheck = true:this.dateFormatCheck = false;
                                }else {  // 润月
                                    parseFloat(dateList[2]) <= 31?this.dateFormatCheck = true:this.dateFormatCheck = false;
                                }
                            }
                        }
                    }else {
                        this.dateFormatCheck = false;
                    }
                }else {
                    this.dateFormatCheck = false;
                }
            },
            initPanel() {
                if(this.panelState) {
                    this.panelState = false;
                }
                return false;
            },
            // 选择年份
            setYearDate: function(value) {
                this.setYear = value;
                this.selectType = 'hasMonth';
            },
            // 选择月份
            setMonthDate: function(value) {
                this.setMonth = value || this.initMonth;
                this.setWeek = new Date(this.setYear, this.setMonth-1, 1).getDay();
                (this.setWeek === 0)?this.setWeek = 7:this.setWeek;
                this.selectType = 'hasDay';
            },
            // 选择日期
            setDayDate: function(item) {
                // 父级设置禁止选择数值 大于max或者小于min都禁止点击
                if(this.noAfterToday || this.minDate !== '0' || this.maxDate !== '0') {
                    if(parseFloat(item.date) > parseFloat(this.initDateTab) || parseFloat(item.date) < parseFloat(this.minDate)) {
                        return false;
                    }
                }
                let type = item.type;
                !this.okBtn?this.setDay = item.value:this.tempDay = item.value;

                this.activeType = type;
                //点击上下月 需要特殊处理上下月值
                if(type !== 'currentMonth') {
                    this.activeType = 'currentMonth';
                    switch (type) {
                        case 'nextMonth':
                            this.setMonth += 1;
                            if(this.setMonth === 13) {
                                this.setYear += 1;
                                this.setMonth = 1;
                            }
                            break;
                        case 'previousMonth':
                            this.setMonth -= 1;
                            if(this.setMonth === 0) {
                                this.setYear -= 1;
                                this.setMonth = 12;
                            }
                            break;
                    }
                }

                if(!this.okBtn) {
                    this.setValue();
                    this.tempDay = this.setDay;
                    this.panelState = false;
                    this.$emit('dateValueChange',this.dateValue);
                }
            },
            //显示选择月份界面
            changeSatusMonth: function() {
                this.selectType = 'hasMonth';
            },
            //显示选择年份界面
            changeSatusYear: function() {
                let select_year = this.setYear;
                this.startYear = select_year - 5;
                this.yearDates = [];
                for(let i = this.startYear; i <= this.startYear + 11; i++) {
                    this.yearDates.push(i);
                }
                this.startYear = this.startYear + 16;
                this.selectType = 'hasYear';
            },
            // 显示年份时 上一个年段
            prevYears: function() {
                this.startYear = this.startYear - 27;
                if(this.startYear < this.yearRange[0]) { // 当前是最小年份 直接不全之后缺少的年份
                    this.startYear = this.yearRange[0];
                }
                this.yearDates = [];
                for(let i = this.startYear; i <= this.startYear + 11; i++) {
                    this.yearDates.push(i);
                }
                this.startYear = this.startYear + 16;
            },
            // 显示年份时 下一个年段
            nextYears: function() {
                let startYear = this.startYear,
                    yearRange = this.yearRange;

                startYear = startYear - 5;
                let maxYear = startYear + 11;
                if(maxYear > yearRange[1]) { // 当前是最大年份 直接补全之前缺少的年份
                    maxYear = yearRange[1];
                    startYear = yearRange[1] - 11;
                }

                this.yearDates = [];
                for(let i = startYear; i <= maxYear; i++) {
                    this.yearDates.push(i);
                }
                this.startYear = startYear + 16;
            },
            // 显示日期时下一个月
            nextMonth: function() {
                if(this.setMonth === 12) {
                    this.setMonth = 0;
                    this.setYear += 1;
                }
                this.setMonth += 1;
                this.setMonthDate(this.setMonth)
            },
            // 显示日期时上一个月
            prevMonth: function() {
                if(this.setMonth === 1) {
                    this.setMonth = 13;
                    this.setYear -= 1;
                }
                this.setMonth -= 1;
                this.setMonthDate(this.setMonth)
            },
            // 月份选择界面上一年
            prevYear: function() {
                this.setYear -= 1;
            },
            // 月份选择界面下一年
            nextYear: function() {
                if(this.setYear < this.yearRange[1]) {
                    this.setYear += 1;
                }
            },
            //初始化数据
            ininDateFuc: function() {
                let initDate = new Date();
                this.initYear = initDate.getFullYear();
                this.initMonth = initDate.getMonth()+1;
                this.initWeek = new Date(this.initYear, this.initMonth-1, 1).getDay();
                this.initDay = initDate.getDate();

                (this.initWeek === 0)?this.initWeek = 7:this.initWeek;
                this.setYear = this.initYear; //初始化时显示的年份
                this.setMonth = this.initMonth; //初始化时显示的月份
                this.setWeek = this.initWeek; //初始化时今天对应的星期

                this.startYear = this.setYear;
                if(this.selectToday) { // 初始化显示当前日期
                    this.activeType = 'currentMonth';
                    this.tempDay = this.initDay;
                    this.setDay = this.tempDay;
                    this.setValue();
                }else {
                    this.dateValue = '';
                }
                this.$emit('dateValueChange',this.dateValue);
            },
            //点击确定按钮
            saveDate: function() {
                this.setDay = this.tempDay;
                this.setValue();
                this.panelState = false;
                this.$emit('dateValueChange',this.dateValue);
                this.$emit('confirm')
            },
            // 点击清除按钮
            clearDate: function() {
                this.dateValue = '';
                this.panelState = false;
                this.$emit('dateValueChange',this.dateValue);
                this.$emit('cancel')
            },
            setValue: function() {
                // 拼接日期格式
                let monthValue = this.setMonth < 10? '0' + this.setMonth:this.setMonth,
                    dayValue = this.setDay < 10? '0' + this.setDay:this.setDay;
                switch (this.format) {
                    case 'yy-mm-dd':
                        this.dateValue = this.setYear + '-' + monthValue + '-' + dayValue;
                        break;
                    case 'yy年mm月dd':
                        this.dateValue = this.setYear + '年' + monthValue + '月' + dayValue;
                        break;
                    default: this.dateValue = this.setYear + '-' + monthValue + '-' + dayValue;
                }
            },
            preventClickEvent() {
                return false
            }
        }
    }
</script>

