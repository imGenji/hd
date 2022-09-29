import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useEcharts from './common/useEcharts';
import { EChartOption } from "echarts";
// 引入柱状图
require('echarts/lib/chart/bar');

/**
 * 柱状图组件
 */
const Bar: React.FC<{width: number,height: number,data:number[],name:number[],title:string}> = ({ width, height, data,name,title }) => {
    const divRef = useRef(null);
    useEcharts(divRef, getConfig( data,name,title ));
    return (
        <div ref={divRef} style={{ width, height }} />
    )
};

Bar.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

export default Bar;

const getConfig = (data:number[],name:number[],title:string):EChartOption => {
    return {
        title: {
            text: title,
            top: 10,
            left: 'center',
            textStyle: {
                fontSize: 12,
                color:"#1F78B4"
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisTick: {
                show: false,
            },
            axisLabel: {
                fontSize: 12,
                color: '#376394'
            },
            axisLine: {
                lineStyle: {
                    color: '#376394'
                }
            },
            data: name
        }],
        yAxis: {
            type: 'value',
            name: '单位(个)',
            nameTextStyle: {
                fontSize: 14,
                color: '#376394'
            },
            axisLabel: {
                fontSize: 12,
                color: '#376394'
            },
            splitLine:{
                lineStyle:{
                    color:"#376394"
                }
            },
            axisLine: {
                show:false,
            },
            axisTick:{
                show:false,
            }
        },
        series: [{
            type: 'bar',
            barWidth: data.length <= 12 ? 10 : 2,
            itemStyle:{
                normal:{
                    color:function(params: { value: number; }){
                        const maxData = Math.max(...data);
                        if(params.value < maxData){
                            return "#00ABFF"
                        }else{
                            return "#DCAB36"
                        }
                    }
                }
            },
            data: data
        }]
    }
};
