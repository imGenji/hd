import React,{Fragment} from "react"
import { observer } from "mobx-react-lite";

import {EnumMonitorConditionType} from "../constants"
import { TypeRealTimeMonitorStore } from "../../../../model/RealTimeMonitorStore";

import Single from "./Single";
import Month from "./Month";
import Year from "./Year";
import BigWindSpeed from "./BigWindSpeed";
import SimilarPath from "./SimilarPath";

interface ConditionListProps {
    realTimeMonitorStore:TypeRealTimeMonitorStore;
    showConditionTypes: string[];
}

const TyphoonMonitoring = {
    //单个热带气旋评估
    [EnumMonitorConditionType.single.value] :Single,
    //月热带气旋评估
    [EnumMonitorConditionType.month.value] : Month,
    //年热带气旋评估
    [EnumMonitorConditionType.year.value] : Year,
    //台风过程最大实测风速
    [EnumMonitorConditionType.bigWindSpeed.value] : BigWindSpeed,
    //相似路径查询
    [EnumMonitorConditionType.similarPath.value] : SimilarPath,
};

const ConditionList :React.FC<ConditionListProps> = ({ realTimeMonitorStore,showConditionTypes }) =>{
    return(
        <Fragment>
            {showConditionTypes.map((type) => {
                const Com = TyphoonMonitoring[type];
                return <Com
                    key={type}
                    realTimeMonitorStore={realTimeMonitorStore}
                />
            })}
        </Fragment>
    )
};

export default observer(ConditionList)