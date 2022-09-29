import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useEcharts from './common/useEcharts';
import { EChartOption } from "echarts";
// 引入柱状图
require('echarts/lib/chart/line');

/**
 * 柱状图组件
 */
const BarAndLineChart: React.FC<{width: number,height: number,xAxisName:number[],barData:number[],}> = ({ width, height, xAxisName,barData}) => {
    const divRef = useRef(null);
    useEcharts(divRef, getConfig( xAxisName ,barData ));
    return (
        <div ref={divRef} style={{ width, height }} />
    )
};

BarAndLineChart.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

export default BarAndLineChart;

const getConfig = (xAxisName:number[],barData:number[]):EChartOption => {
    return {
        grid:{
            left:"10%",
            top:"15%",
            right:"5%",
            bottom:"15%"
        },
        xAxis: [{
            type: 'category',
            axisLine:{
                lineStyle:{
                    color:"#1c476d"
                }
            },
            splitLine:{
                show:false
            },
            axisLabel:{
                color:'#5c87B1',
            },
            axisTick:{
                show:false
            },
            data: xAxisName
        },{
            position: 'bottom',
            type: 'category',
            axisLine:{
                lineStyle:{
                    color:"#1c476d"
                }
            },
            splitLine:{
                show:false
            },
            axisLabel:{
                color:'#5c87B1',
            },
            axisTick:{
                show:true
            },
            data: xAxisName
        },
        {
            position: 'top',
            type: 'category',
            axisLine:{
                lineStyle:{
                    color:"#1c476d"
                }
            },
            splitLine:{
                show:false
            },
            axisLabel:{
                show:false,
                color:'#5c87B1',
            },
            axisTick:{
                show:true
            },
            data: xAxisName
        }
        ],
        yAxis: [{
            type: 'value',
            position:'left',
            axisLine:{
                lineStyle:{
                    color:"#1c476d"
                }
            },
            splitLine:{
                show:false
            },
            axisLabel:{
                color:"#5c87B1",
                formatter: (v:number) => {
                    return v
                }
            },
            axisTick:{
                show:true
            }
        },{
            type:'value',
            position:'right',
            axisLabel:{
                color:'#5c87B1'
            },
            axisLine:{
                lineStyle:{
                    color:"#1c476d"
                }
            }
        }],
        series: [
            {
                data: barData,
                type: 'bar',
                name: '柱状图',
                barWidth:barData.length <= 12 ? 10 : 2,
                itemStyle: {
                    normal: {
                        color: '#1eaafc'
                    }
                }
            }
        ]
    }
};