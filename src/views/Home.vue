<template>
    <div class="home">
        <div>复选值为：{{valueData}}</div>
        <check :checkBoxData="checkBoxData" v-model="valueData"></check>
        <br/><br/><br/><br/>

        <div>复选值为：{{valueData1}}</div>
        <check :checkBoxData="checkBoxData1" v-model="valueData1" labelType="flash" :multiple="true"></check>
        <br/><br/><br/><br/>

        <date-picker v-model="startDate" :okBtn="true" :clearBtn="true" :initBtn="true" @confirm="confirm"></date-picker>
        <div>时间开始：{{startDate}}</div>
        <date-picker1 v-model="endDate" :maxDate="startDate" :noAfterToday="true"></date-picker1>
        <div>结束时间：{{endDate}}</div>
        <br/><br/><br/><br/>

        <selec :options="options" v-model="slectValue"></selec>
        <div>选中值为：{{slectValue}}</div>
        <br/><br/><br/><br/>

        <selec :options="options1" v-model="slectValue1" :multiple="true"></selec>
        <div>选中值为：{{slectValue1}}</div>
        <br/><br/><br/><br/>

        <common-btn btnText="查询" :btnIcon="icon" btnIconColor="#14b8d4"></common-btn>
        <br/><br/><br/><br/>

        <input-component :iptPlaceholder="'请输入内容'"
                         :iptValue="iptValue"
                         :iptReadonly="iptReadonly"
                         :iptError="iptError"
                         :errorInfo="'输入有误'"
                         :isRelated="isRelated"
                         :relateData="relateData"
                         @iptEvent="input"
                         @chooseData="chooseCompany"
                         @iptKeyup="iptKeyup" @iptClick="iptClick">
        </input-component>
        <br/><br/><br/><br/>

        <div>
            <sy-table :scrollX="true"
                      :titleData="titleData"
                      :bodyData="bodyData"
                      :trClass="trClass"
                      @tdClick="tdClick"
                      @getSortData="getSortData">
            </sy-table>
        </div>
        <br/><br/><br/><br/>

        <div>
            <button>获取行政区域划分</button>
        </div>

    </div>
</template>

<script>

    import DatePicker from '@/components/datePicker.component'
    import DatePicker1 from '@/components/datePicker.component'
    import check from '@/components/checkBox.component'
    import selec from '@/components/select.component'
    import commonBtn from '@/components/button.component'
    import inputComponent from '@/components/input.component'
    import SyTable from '@/components/table.component'
    export default {
        name: 'home',
        components: {
            inputComponent,
            DatePicker1,
            DatePicker,
            commonBtn,
            SyTable,
            check,
            selec
        },
        data() {
            return {
                trClass: [{
                    index: 5,
                    className: 'detail'
                }],
                titleData : [
                    {company: '公司名称',className: 'companyName'},
                    {type: '公司类型'},
                    {target: '收购标的'},
                    {legalPreson: '法人代表'},
                    {capital: '注册资本<br><small>(万元)</small>',sortValue: 'capital',sortType: ''},
                    {detail: '详情'},
                ],
                bodyData : [{
                        type: "非挂牌",
                        target: "2020-01-10",
                        company: "北京视野金融信息服务有限公司",
                        legalPreson: '张三',
                        capital: "1500",
                        detail: "详情",
                    },
                    {
                        type: "A股上市",
                        target: "2020-01-10",
                        company: "字节跳动",
                        legalPreson: '李四',
                        capital: "2500",
                        detail: "详情",
                    }
                ],
                selectIndex: [2],
                icon: '',
                valueData: 'jack',
                valueData1: 'jack111,John222,mark333',
                checkedNames: [],
                startDate: '',
                endDate: '',
                slectValue: '2019-06-10',
                slectValue1: '2019-06-11,2019-06-12',
                selected: '1',
                options: ['2019-06-28','2019-06-09','2019-06-10','2019-06-11','2019-06-12'],
                options1: ['2019-06-28','2019-06-09','2019-06-10','2019-06-11','2019-06-12'],
                checkBoxData: [
                    {
                        value: 'jack',
                        label: '杰克'
                    },
                    {
                        value: 'John',
                        label: '约翰'
                    }
                ],
                checkBoxData1: [
                    {
                        value: 'jack111',
                        label: '杰克111'
                    },
                    {
                        value: 'John222',
                        label: '约翰222'
                    },
                    {
                        value: 'mark333',
                        label: '马克333'
                    }
                ],
                iptValue : '',
                iptReadonly : false,
                iptError : false,
                isRelated : false,
                relateData : [],
                scrollX : false,
            }
        },
        methods: {
            // 表格排序
            getSortData (sortData){
                let that = this;
                let titleData = that.titleData || [];
                if(sortData.sortType){
                    for(let i = 0, l = titleData.length; i < l; i++){
                        if(titleData[i].hasOwnProperty(sortData.sortValue)){
                            titleData[i].sortType = sortData.sortType;
                        }
                    }
                }
            },
            // 表格点击事件
            tdClick(value) {
                console.log(value,'点击事件')
            },
            confirm() {
                console.log(this.startDate,'==11==')
            },
            input (value){
                this.iptValue = value
                if(value == 1){
                    this.iptError = true
                }else{
                    this.iptError = false
                }

                if(value === '银行'){
                    this.isRelated = true;
                    this.relateData = [
                        {name : '中国银行', code : '686425'},
                        {name : '交通银行', code : '688688'},
                        {name : '建设银行', code : '686425'},
                        {name : '招商银行', code : '686425'},
                        {name : '农业银行', code : '686425'},
                        {name : '工商银行', code : '686425'},
                        {name : '民生银行', code : '686425'},
                    ]
                }else{
                    this.isRelated = false;
                    console.log('==22==')
                }
            },
            chooseCompany (data){
                this.iptValue = data.name || '';
                this.isRelated = false;
            },
            iptKeyup(value) {

            },
            iptClick(value) {
                console.log(value,'==33==')
            },
        }
    }
</script>
