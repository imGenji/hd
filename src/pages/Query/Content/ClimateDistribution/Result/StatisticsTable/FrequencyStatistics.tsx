import React from "react"
import {observer} from "mobx-react-lite";
import Table from "./Table";
import {TypeClimateStore} from "@/pages/Query/model/ClimateStore";
import {EnumTyphoonStrengthLegend, EnumTyphoonStrengthType} from '@/pages/Query/constants/EnumTyphoon'
const frequencyStatisticsColumns = [
    {
        title:"台风等级",
        dataIndex: "grade",
    },
    {
        title:"出现频次",
        dataIndex: "frequency",
    }
];

const FrequencyStatistics :React.FC<{climateStore:TypeClimateStore}> =({climateStore}) =>{
    const {totalStrength,monthStrength} = climateStore.typhoonData;
    const newTotalStrength = Object.keys(totalStrength);
    const newGrade = [];
    const newFrequency = Object.values(totalStrength);
    for(let i=0;i<newTotalStrength.length;i++){
        const newLabel = newTotalStrength[i];
        newGrade.push(EnumTyphoonStrengthLegend[EnumTyphoonStrengthType[newLabel]].label || [])
    }
    const frequencyStatisticsDataSource = [];
    for(let i=0;i<newFrequency.length;i++){
        frequencyStatisticsDataSource.push({
            grade:newGrade[i],
            frequency:newFrequency[i]
        })
    }
    return(
        <Table
            columns={frequencyStatisticsColumns}
            dataSource={frequencyStatisticsDataSource}
        />
    )
};

export default observer(FrequencyStatistics)
