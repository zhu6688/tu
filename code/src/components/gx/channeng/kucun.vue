<template>
    <div class="wrap">
        <div class="h500" id="capacity"></div>
    </div>
</template>

<script>
const echarts = require('echarts'); 
export default {
    data(){
        return {
            zx:{
                xData:[],
                yData:[],
                nameData:[],
                unit:''
            }
        }
    },
    created(){

    },
    mounted(){ 
        this.getData().then(res=>{
            let allData = res.data.data;
            let name = [];
            let nData = [];
            let all = [];
            allData.forEach(item => {
                name.push(item.date);
                nData.push(item.area);
                this.zx.unit = item.unit;
            });

            
            let cName = new Set(name);
            let titData = new Set(nData);
            
            this.zx.xData = [...cName]
            this.zx.nameData = [...titData];
           // console.log(allData);

            [...titData].forEach((item,index)=>{
                all.push({name:item,type:'line',data:[]});
                allData.forEach(i=>{
                    if(item===i.area){
                        all[index].data.push(i.cn)
                    }
                })
            })
            this.zx.yData = all;

            this.drawZxChart(this.zx.nameData,this.zx.xData,this.zx.yData,this.zx.unit);
        })
    },
    methods:{
        getData(){
           return new Promise((resolve,reject)=>{
                this.$ajax.get('./static/json/cn.json').then(res=>{
                    resolve(res)
                },err=>{
                    reject(err);
                })
            })
        },
        drawZxChart(nameData,x,all,u){ 
            let zxChart = echarts.init(document.getElementById('capacity'))
            var option = {
                title: {
                    text: '折线图堆叠',
                    textStyle:{
                        color:'#fff',
                        fontSize:15
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    textStyle:{
                        color:'#fff'
                    },
                    itemWidth:12,
                    itemHeight:12,
                    data:nameData
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel:{
                        color:'#fff'
                    },
                    data: x
                },
                yAxis: {
                    type: 'value',
                    name:u,
                    nameTextStyle:{
                        color:'#fff'
                    },
                    axisLabel:{
                        color:'#fff'
                    },
                },
                series: all
            };

            zxChart.setOption(option);
            window.onresize=function(){
                zxChart.resize()
            }
        }
    }
}
</script>

<style scoped lang="less">
#capacity{
    padding:10px 8px;
    height:480px;
}
</style>