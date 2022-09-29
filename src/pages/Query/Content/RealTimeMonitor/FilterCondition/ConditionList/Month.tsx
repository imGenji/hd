import React, {Fragment} from "react"
import { observer } from "mobx-react-lite";
import {TypeRealTimeMonitorStore} from "../../../../model/RealTimeMonitorStore";
import Skeleton from "./components/Skeleton";

import MoonMoment from "./components/Month/MoonMoment";
import TyphoonDetails from "./components/Month/TyphoonDetails";
import GenerationFrequency from "./components/Month/GenerationFrequency";
import ExtremeStrength from "./components/Month/ExtremeStrength";

const Month:React.FC<{realTimeMonitorStore: TypeRealTimeMonitorStore}>= ({realTimeMonitorStore}) =>{
    return(
        <Skeleton
            content={
                <Fragment>
                    <MoonMoment realTimeMonitorStore={realTimeMonitorStore}/>
                    <TyphoonDetails realTimeMonitorStore={realTimeMonitorStore}/>
                    <GenerationFrequency realTimeMonitorStore={realTimeMonitorStore}/>
                    <ExtremeStrength realTimeMonitorStore={realTimeMonitorStore}/>
                </Fragment>
            }
        />
    )
};
export default observer(Month)