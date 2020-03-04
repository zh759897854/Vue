<!--table组件-->
<template>
    <div class="sy-table" ref="tableWrapper">
        <table v-if="scrollX && titleTempData.length > 0" :class="{'scroll-table' : scrollX}">
            <tbody>
                <tr>
                    <td class="table-left">
                        <div class="table-left-wrapper" ref="tableLeftWrapper">
                            <table ref="leftTable">
                                <thead>
                                    <tr>
                                        <th :class="th.className" v-for="(th,index) in titleData" :key="index" v-show="index === 0">
                                            <template v-if="th.sortValue">
                                                <div class="sort-cell" @click="thSortEvent(th)">
                                                    <span v-html="th[titleTempData[index]]"></span>
                                                    <i v-if="th.sortType === ''" class="icon icon-sort"></i>
                                                    <i v-if="th.sortType === 'asc'" class="icon icon-sort icon-asc"></i>
                                                    <i v-if="th.sortType === 'desc'" class="icon icon-sort icon-desc"></i>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div v-html="th[titleTempData[index]]"></div>
                                            </template>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr :class="{'hover': index===hoverIndex}" v-for="(tr,index) in bodyData" :key="index" @mouseover="mouseEvent('mouseover',index)" @mouseout="mouseEvent('mouseout')">
                                        <td v-for="(titleValue,tdIndex) in titleTempData" :key="tdIndex" :class="getTrClassName(tdIndex)" v-show="tdIndex === 0">
                                            <div v-html="tr[titleValue]" @click="tdClickEvent(tdIndex,tr)"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                    <td class="table-right">
                        <div class="table-rigth-wrapepr" ref="tableRightWrapper">
                            <table ref="rightTable">
                                <thead>
                                <tr>
                                    <th :class="th.className" v-for="(th,index) in titleData" :key="index" v-show="index > 0">
                                        <template v-if="th.sortValue">
                                            <div class="sort-cell" @click="thSortEvent(th)">
                                                <span v-html="th[titleTempData[index]]"></span>
                                                <i v-if="th.sortType === ''" class="icon icon-sort"></i>
                                                <i v-if="th.sortType === 'asc'" class="icon icon-sort icon-asc"></i>
                                                <i v-if="th.sortType === 'desc'" class="icon icon-sort icon-desc"></i>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div v-html="th[titleTempData[index]]"></div>
                                        </template>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr :class="{'hover': index===hoverIndex}" v-for="(tr,index) in bodyData" :key="index" @mouseover="mouseEvent('mouseover',index)" @mouseout="mouseEvent('mouseout')">
                                        <td v-for="(titleValue,tdIndex) in titleTempData" :key="tdIndex" :class="getTrClassName(tdIndex)" v-show="tdIndex > 0">
                                            <div v-html="tr[titleValue]" @click="tdClickEvent(tdIndex,tr)"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <table v-if="!scrollX && titleTempData.length > 0" :class="{'unscroll-table': !scrollX}">
            <thead>
                <tr>
                    <th v-for="(th,index) in titleData" :key="index">
                        <template v-if="th.sortValue">
                            <div class="sort-cell" @click="thSortEvent(th)">
                                <span v-html="th[titleTempData[index]]"></span>
                                <i v-if="th.sortType === ''" class="icon icon-sort"></i>
                                <i v-if="th.sortType === 'asc'" class="icon icon-sort icon-asc"></i>
                                <i v-if="th.sortType === 'desc'" class="icon icon-sort icon-desc"></i>
                            </div>
                        </template>
                        <template v-else>
                            <div v-html="th[titleTempData[index]]"></div>
                        </template>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr :class="{'hover': index===hoverIndex}" v-for="(tr,index) in bodyData" :key="index" @mouseover="mouseEvent('mouseover',index)" @mouseout="mouseEvent('mouseout')">
                    <td v-for="(titleValue,tdIndex) in titleTempData" :key="tdIndex" :class="getTrClassName(tdIndex)">
                        <div v-html="tr[titleValue]" @click="tdClickEvent(tdIndex,tr)"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import IScroll from 'iscroll'

    export default {
        data (){
            return{
                scrollObject : null,
                hoverIndex: null
            }
        },
        props : {
            scrollX : {
                type : Boolean,
                default : function(){
                    return false;
                }
            },
            titleData : {
                type : Array,
                default : function(){
                    return [];
                }
            },
            bodyData : {
                type : Array,
                default : function(){
                    return [];
                }
            },
            trClass : {
                type : Array,
                default : function(){
                    return [];
                }
            },
        },
        updated (){
            let that = this;
            that.updateTrHeight();
            that.updateScrollWidth();
            if(that.scrollObject){
                that.scrollObject.refresh();
            }
        },
        computed: {
            titleTempData() {
                let result = [];
                let titleData = this.titleData;
                if(titleData.length > 0) {
                    for(let i = 0; i < titleData.length; i++) {
                        for(let x in titleData[i]) {
                            if(x !== 'className' && x !== 'sortValue' && x !== 'sortType') {
                                result.push(x);
                            }
                        }
                    }
                }
                return result;
            }
        },
        mounted (){
            let that = this;
            that.updateTrHeight();
            that.updateScrollWidth();
            window.addEventListener('resize',function(){
                that.updateScrollWidth();
                that.updateTrHeight();
            },false);
            if(that.scrollObject){
                that.scrollObject.refresh();
            }
        },
        methods : {
            /*
            * 更新tr class
            * */
            getTrClassName (index){
                let that = this;
                if(that.trClass && that.trClass.length > 0){
                    for(let i = 0, l = that.trClass.length; i < l; i++){
                        if(index + '' === that.trClass[i].index + ''){
                            return that.trClass[i].className;
                        }
                    }
                }
            },
            /*
            * 表头排序
            *  */
            thSortEvent (item){
                let that = this;
                let curSortValue = item.sortValue || '',
                    curSortType = item.sortType || '';
                if(curSortType === ''){
                    that.$emit('getSortData',{sortValue : curSortValue,sortType : 'asc'});
                }else if(curSortType === 'asc'){
                    that.$emit('getSortData',{sortValue : curSortValue,sortType : 'desc'});
                }else{
                    that.$emit('getSortData',{sortValue : curSortValue,sortType : 'asc'});
                }
            },
            /*
            * td绑定点击事件
            * */
            tdClickEvent (index,data){
                let that = this;
                that.$emit('tdClick',{
                    value: data,
                    index: index
                });
            },
            /*
            * 表格左右滑动
            * */
            updateScrollWidth (){
                let that = this;
                if(that.scrollX){
                    that.$refs.tableRightWrapper.style.width = that.$refs.tableWrapper.clientWidth - that.$refs.tableLeftWrapper.clientWidth + 'px';
                    if(that.scrollObject === null){
                        that.scrollObject =  new IScroll(that.$refs.tableRightWrapper,{
                            scrollX: true,
                        });
                    }
                    that.scrollObject.refresh();
                }
            },
            /*
            * 更新表格每行高度
            * */
            updateTrHeight (){
                let that = this;
                if(that.scrollX){
                    let leftTrs = that.$refs.leftTable.querySelectorAll('tr'),
                        rightTrs = that.$refs.rightTable.querySelectorAll('tr');
                    for(let i=0,l=leftTrs.length;i<l;i++){
                        leftTrs[i].style.height = 'auto';
                        rightTrs[i].style.height = 'auto';
                        let maxHeight = Math.max(leftTrs[i].clientHeight,rightTrs[i].clientHeight);
                        leftTrs[i].style.height = maxHeight + 'px';
                        rightTrs[i].style.height = maxHeight + 'px';
                    }
                }
            },
            /**
             * 鼠标划入划出
             * */
            mouseEvent(type,index){
                if(type === 'mouseover'){
                    this.hoverIndex = index;
                }else if(type === 'mouseout'){
                    this.hoverIndex = null;
                }
            },
        }
    }
</script>

<style lang="less">
    .sy-table{
        overflow: hidden;
        table{
            width: 100%;
            font-size: 14px;
            border-collapse: collapse;
        }
        tr.hover{
            background: #f9fefe;
            border-right: 1px solid @table-border-color;
            box-shadow: 0 3px 12px @table-hover-bg;
            td{
                border-right: none;
            }
            cursor: pointer;
        }
        th{
            background: #def3fc;
            font-weight: 400;
            white-space: nowrap;
            >div{
                padding: 18px 10px;
                color: #333;
                text-align: center;
            }
        }
        td{
            padding: 0;
            >div{
                padding: 13px 10px;
                color: #666;
                text-align: center;
            }
        }
        .detail {
            div {
                color: #14B8D4;
            }

        }
        .sort-cell{
            vertical-align: middle;
            span{
                display: inline-block;
            }
            .icon{
                display: inline-block;
                width: 20px;
                height: 20px;
                background-image: url("./image/icon-sort.png");
                background-repeat: no-repeat;
                background-position: 0 0;
            }
            .icon-asc{
                background-position: -20px 0;
            }
            .icon-desc{
                background-position: -40px 0;
            }
        }

        .scroll-table{
            .table-left{
                width: 1%;
                border-collapse: collapse;
                >.table-left-wrapper{
                    min-width: 200px;
                    padding: 0 0;
                    >table{
                        width: 100%;
                    }
                }
                tbody{
                    border-left: 1px solid @table-border-color;
                    border-right: 1px solid @table-border-color;
                }
                td{
                    border-bottom: 1px solid @table-border-color;
                }
            }
            .table-right{
                border-collapse: collapse;
                >.table-rigth-wrapepr{
                    padding: 0 0;
                    overflow: hidden;
                    >table{
                        width: 100%;
                    }
                }
                tbody{
                    border-right: 2px solid @table-border-color;
                }
                td{
                    border-right: 1px solid @table-border-color;
                    border-bottom: 1px solid @table-border-color;
                }
            }
            tr.hover{
                background: #f9fefe;
                border-right: 1px solid @table-border-color;
                box-shadow: 0 3px 12px @table-hover-bg;
                td{
                    border-right: none;
                }
                cursor: pointer;
            }
        }

        .unscroll-table{
            th{
                border-right: 1px solid #def3fc;
            }
            tbody{
                border-left: 1px solid @table-border-color;
            }
            td{
                border-bottom: 1px solid @table-border-color;
                border-right: 1px solid @table-border-color;
            }
        }
    }
</style>
