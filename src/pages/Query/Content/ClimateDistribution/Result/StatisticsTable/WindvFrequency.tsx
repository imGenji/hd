import React from "react"
import {observer} from "mobx-react-lite";
import Table from "./Table";
import {TypeClimateStore} from "@/pages/Query/model/ClimateStore";
import {EnumWindSpeed} from '@/pages/Query/constants/EnumTyphoon'

//最大风速频次
const windvFrequencyColumns = [
    {
        title:"中心最大风速 (m/s)",
        dataIndex: "centerMaxWindv",
    },
    {
        title:"出现频次",
        dataIndex: "frequency",
    }
];

const WindvFrequency :React.FC<{climateStore:TypeClimateStore}> =({climateStore}) =>{
    const {totalStrength} = climateStore.typhoonData;
    const windvFrequencyDataSource:{centerMaxWindv:string,frequency:string}[] = [];
    const newTotalStrength = Object.keys(totalStrength);

    EnumWindSpeed.map((item,index)=>{
        const keyStrength = item.strength
        windvFrequencyDataSource.push({
            centerMaxWindv:item.label,
            frequency:totalStrength[newTotalStrength[index]]+"m/s",
        })
    });
    return(
        <Table
            columns={windvFrequencyColumns}
            dataSource={windvFrequencyDataSource}
        />
    )
};


export default observer(WindvFrequency)
