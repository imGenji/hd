import React from "react"
import {observer} from "mobx-react-lite";
import Table from "./Table";
import {TypeClimateStore} from "@/pages/Query/model/ClimateStore";
import {EnumTyphoonStrengthLegend,EnumWindSpeed} from '@/pages/Query/constants/EnumTyphoon'
import {string} from "prop-types";

const maxWindvColumns = [
    {
        title:"台风名称",
        dataIndex: "name",
    },
    {
        title:"最大风速",
        dataIndex: "maxWindv",
    }
];

const MaxWindv :React.FC<{climateStore:TypeClimateStore}> =({climateStore}) =>{

    const newData = Object.values(EnumTyphoonStrengthLegend);
    const {data,totalStrength} = climateStore.typhoonData;

    const maxWindvDataSource:{name:string,maxWindv:string}[] = [];
    data.map(item=>{
        maxWindvDataSource.push({
            name:item.tfbh+"-"+item.chnname+item.name,
            maxWindv:item.maxWindv+"m/s"
        })
    })


    return(
        <Table
            columns={maxWindvColumns}
            dataSource={maxWindvDataSource}
        />
    )
};


export default observer(MaxWindv)
