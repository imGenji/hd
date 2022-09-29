import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useEcharts from './common/useEcharts';
import { EChartOption } from 'echarts';

require('echarts/lib/chart/scatter');

/**
 * 柱状图组件
 */
const Scatter: React.FC<{width: number,height: number,year:number[],month:string[],data:number[][]}> = ({ width, height ,year,month,data}) => {
    const divRef = useRef(null);
    useEcharts(divRef, getConfig(year,month,data));
        return (
        <div ref={divRef} style={{ width, height }} />
    )
};

Scatter.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

export default Scatter;
const getConfig = (year:number[],month:string[],dataList:number[][]):EChartOption => {
    return {
        tooltip: {
            position: 'top',
            formatter: function (params: { value: number[]; }) {
                return  year[params.value[0]] + '年' + month[params.value[1]] +'月'+ params.value[2] +'个';
            }
        },
        grid: {
            left: '5%',
            bottom: "20%",
            right: "5%",
            top:"12%",
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: year,
            boundaryGap: false,
            splitLine: {
                show: false,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#376394'
                }
            },
            axisTick:{
                show:false
            },
        }],
        yAxis: {
            name:"日期",
            type: 'category',
            data: month,
            nameTextStyle:{
                verticalAlign:"top"
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#376394'
                }
            },
            axisLabel:{
                show:true,
            },
            axisTick:{
                show:false
            }
        },
        dataZoom: [
            {
                show: true,
                xAxisIndex: [0],
                bottom:'0%',
                borderColor:"#90979c",
                handleStyle:{
                    color:"#d3dee5",
                },
                textStyle:{
                    color:"#fff"
                },
            }
        ],
        series: [{
            name: '',
            type: 'scatter',
            symbolSize: function (val: number[]) {
                return val[2] * 1;
            },
            itemStyle:{
                normal:{
                    color:"#197CAC"
                }
            },
            data: dataList
        }]
    }
};