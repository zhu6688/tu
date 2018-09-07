<template>
    <div>
        <div class="h500" id="jck"></div>
    </div>
</template>

<script>
const echarts = require('echarts');
export default {
    data(){
        return {

        }
    },
    mounted(){
        this.getData().then(res=>{
            let allData = res.data.data;
            let x = [];
            let zkData = []
            let ckData = []
            allData.forEach(item => {
                x.push(item.date)
            });
            let xx = new Set(x);
            x = [...xx]

            x.forEach((item,index)=>{
                allData.forEach(i=>{
                    if(item===i.date){
                        if(i.state =='进口总量'){
                            zkData.push(i.count)
                        }else if(i.state =='出口总量'){
                            ckData.push(i.count)
                        }
                    }
                })
            })

            console.log(allData)
            this.draw(x,zkData,ckData)
        })
        
    },
    methods:{
        draw(x,zk,ck){
            let jckChart = echarts.init(document.getElementById('jck'));
            let option = {
                    color:['lightBlue','pink'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : x,
                            axisLabel:{
                                color:'#fff',
                                rotate:90
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name:'吨',
                            nameTextStyle:{
                                color:'#fff'
                            },
                            axisLabel:{
                                color:'#fff'
                            }
                        }
                    ],
                    series : [
                        {
                            name:'甲醇出口总量',
                            type:'bar',
                            data:ck,
                            markLine : {
                                lineStyle: {
                                    normal: {
                                        type: 'dashed',
                                        color:'red'
                                    }
                                },
                                data : [
                                    [{type : 'min'}, {type : 'max'}]
                                ]
                            }
                        },
                        {
                            name:'甲醇进口总量',
                            type:'bar',
                            data:zk,
                            markLine : {
                                lineStyle: {
                                    normal: {
                                        type: 'dashed',
                                        color:'red'
                                    }
                                },
                                data : [
                                    [{type : 'min'}, {type : 'max'}]
                                ]
                            }
                        }
                    ]
                };
            jckChart.setOption(option);
            
        },
        getData(){
            return new Promise((resolve,reject)=>{
                this.$ajax.get('./static/json/jck.json').then(res=>{
                    resolve(res);
                },err=>{
                    reject(err)
                })
            })
        }
    }
}
</script>

<style scoped>

</style>