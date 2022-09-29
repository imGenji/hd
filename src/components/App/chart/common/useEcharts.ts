import React, { useEffect} from 'react';
import echarts from 'echarts/lib/echarts';
import { EChartOption } from 'echarts';
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

/**
 * 自定义echarts钩子
 * @param chartRef -> useRef()的结果
 * @param config -> echart 配置
 */
const useEcharts = (chartRef: React.MutableRefObject<HTMLDivElement>, config: EChartOption) => {
    let chartInstance: echarts.ECharts = null;

    useEffect(() => {
        renderChart()
    }, [config]);

    useEffect(() => {
        return () => chartInstance && chartInstance.dispose()
    }, []);

    const renderChart = () => {
        const renderedInstance = echarts.getInstanceByDom(chartRef.current);
        if (renderedInstance) {
            chartInstance = renderedInstance
        } else {
            chartInstance = echarts.init(chartRef.current)
        }

        // @ts-ignore
        chartInstance.setOption(config)
    }
};

export default useEcharts;
