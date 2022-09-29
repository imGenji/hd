import React, {Fragment} from "react"
import { observer } from "mobx-react-lite"
import {TypeRealTimeMonitorStore} from "../../../../model/RealTimeMonitorStore";
import Skeleton from "./components/Skeleton";

import YearFlat from "./components/Year/YearFlat";
import TyphoonDetails from "./components/Year/TyphoonDetails";
import GenerationFrequency from "./components/Year/GenerationFrequency";
import ExtremeStrength from "./components/Year/ExtremeStrength";

const Year: React.FC<{realTimeMonitorStore: TypeRealTimeMonitorStore}> = ({ realTimeMonitorStore }) =>{
    return(
        <Skeleton
            content={
                <Fragment>
                    <YearFlat realTimeMonitorStore={realTimeMonitorStore}/>
                    <TyphoonDetails realTimeMonitorStore={realTimeMonitorStore}/>
                    <GenerationFrequency realTimeMonitorStore={realTimeMonitorStore}/>
                    <ExtremeStrength realTimeMonitorStore={realTimeMonitorStore}/>
                </Fragment>
            }
        />
    )
};
export default observer(Year)