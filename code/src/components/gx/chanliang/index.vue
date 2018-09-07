<template>
    <div>
        <el-row :gutter="20">
            <el-col :xs="24" :md="12">
                <div class="h1000">
                    <el-select v-model="value" placeholder="请选择" @change="change">
                        <el-option
                        v-for="item in time"
                        :key="item"
                        :value="item">
                        </el-option>
                    </el-select>
                    <div id="zt"></div>
                </div>
            </el-col>
            <el-col :xs="24" :md="12">
                <div class="h1000">
                    <div id="map"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
const echarts = require('echarts');
import '../../../../static/china.js'
    export default {
        data(){
            return {
                time:[],
                value:'2013年',
                zt:{
                    ydata:[],
                    dataList:[],
                    unit:'',
                    // 切换时间的时候当前的数据
                    currentData:[]
                },
                map:{
                    data:[],
                    // 切换时间的时候当前的数据
                    currentData:[],
                    maxVal:999999,
                    minVal:-1
                }
            }
        },
        created(){
            
        },
        mounted(){
            // 解析获取的数据
            this.getData().then(res=>{
                let shijian = [];
                let area = [];
                let allData = [];
                let mapData = [];
                res.forEach(item=>{
                    shijian.push(item.date);
                    area.push(item.area);
                    this.zt.unit = item.unit;
                })
                let dateTime = new Set(shijian);
                let areaDate = new Set(area);
                // y轴的 数据名字
                this.zt.ydata = [...areaDate];
                this.time = [...dateTime]
                // x轴的数据
                this.time.forEach((item,index)=>{
                    allData.push({time:item,data:[]});
                    mapData.push({time:item,data:[]})
                    res.forEach(i=>{
                        if(item===i.date){
                            allData[index].data.push(i.cl);
                            mapData[index].data.push({value:i.cl,name:i.area})
                        }
                    })
                })
                this.zt.dataList = allData;
                this.map.data = mapData;
                //console.log(res)
                this.currentD();
                // 柱状图
                this.draw(this.zt.unit,this.zt.ydata,this.zt.currentData[0].data);
                this.drawMap(this.map.currentData[0].data,this.map.minVal,this.map.maxVal)
            });

           
            
        },
        methods:{
            change(e){ // 改变年
                this.value = e;
                this.currentD();
                this.draw(this.zt.unit,this.zt.ydata,this.zt.currentData[0].data);
                this.drawMap(this.map.currentData[0].data,this.map.minVal,this.map.maxVal)
            },
            currentD(){ // 获取当前选中年的数据
                // 柱状图的当年数据
                this.zt.currentData = this.zt.dataList.filter(item=>{
                    if(item.time===this.value){
                        return item
                    }
                });
                // 地图的当前数据
                this.map.currentData = this.map.data.filter(item=>{
                    if(item.time===this.value){
                        let arr = item.data;
                        arr.sort(function(a,b){
                            return a.value-b.value
                        })
                        this.map.maxVal = Math.ceil( parseFloat(arr[arr.length-1].value)/100 )*100
                        this.map.minVal = Math.floor( parseFloat(arr[0].value) )
                        console.log(arr)
                        return item
                    }
                });
                
            },
            draw(unit,y,d){
                let clChart = echarts.init( document.getElementById('zt') );
                let option = {
                    color:['#00a0ec'],
                    textStyle: {
                        color: '#00a0ec'
                    },
                    title: {
                        text: '产量',
                        left:20,
                        textStyle:{
                            color:'#fff',
                            fontSize:16
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        splitLine:{
                            show:false
                        }
                    },
                    yAxis: {
                        name:unit,
                        data: y,
                    },
                    series: {
                        type:'bar',
                        label:{
                            show:true,
                            position:'right'
                        },
                        data: d
                        
                    }
                };
                clChart.setOption(option);
                window.onresize=function(){
                    clChart.resize()
                }
            },
            getData(){
                return new Promise((resolve,reject)=>{
                    this.$ajax.get('./static/json/chanliang.json').then(res=>{
                        resolve(res.data.dataList);
                    },err=>{
                        reject(err);
                    })
                })
            },
            drawMap(mapData,min,max){
                var MapOption = {
                    title: {
                        text: '产量',
                        textStyle:{
                            color:'#fff',
                        },
                        left:10,
                        top:10
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    visualMap: {
                        inRange: {
                            color: ['#22a0f2', '#1e82de', '#165fc1', '#134099', '#0d378a', '#172a75']
                        },
                        min:0,
                        max:max,
                        left: 'left',
                        top: 'bottom',
                        text: ['高','低'],           // 文本，默认为数值文本
                        calculable: true,
                        textStyle:{
                            color:'#fff'
                        }
                    },
                    series: [
                        {
                            name: '产量',
                            type: 'map',
                            map: 'china',
                            roam: true,
                            scaleLimit:{
                                min:0.5,
                                max:2
                            },
                            top:180,
                            label: {
                                show:true,
                                color:'#fff'
                            },
                            itemStyle:{
                                areaColor:'#00a0ec'
                            },
                            emphasis:{
                                itemStyle:{
                                    areaColor:'#00a0ec',
                                    opacity:0.4,
                                },
                                label:{
                                    color:'#fff',
                                    fontSize:16
                                }
                            },
                            data:mapData
                        },
                    ]
                };
                var MapChart = echarts.init(document.getElementById('map'))
                MapChart.setOption(MapOption);
                window.onresize=function(){
                    MapChart.resize()
                }
            }
        }
    }
</script>

<style scoped lang="less">
.el-select{
    margin-top:10px;
    margin-bottom:10px;
    margin-left: 10px;
}
#zt,#map{
    height:850px;
}
</style>