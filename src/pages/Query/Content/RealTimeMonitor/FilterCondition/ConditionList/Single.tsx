import React, {Fragment} from "react"
import {observer} from "mobx-react-lite";
import {TypeRealTimeMonitorStore} from "../../../../model/RealTimeMonitorStore";
import Skeleton from "./components/Skeleton";

import TyphoonCalendar from "./components/Single/TyphoonCalendar";
import TyphoonDetails from "./components/Single/TyphoonDetails";
import GenerationFrequency from "./components/Single/GenerationFrequency"
import ExtremeStrength from "./components/Single/ExtremeStrength";

const Single: React.FC<{realTimeMonitorStore: TypeRealTimeMonitorStore}> = ({realTimeMonitorStore}) =>{
    return(
        <Skeleton
            content={
                <Fragment>
                    <TyphoonCalendar realTimeMonitorStore={realTimeMonitorStore}/>
                    <TyphoonDetails realTimeMonitorStore={realTimeMonitorStore}/>
                    {/*<GenerationFrequency realTimeMonitorStore={realTimeMonitorStore}/>*/}
                    <ExtremeStrength realTimeMonitorStore={realTimeMonitorStore}/>
                </Fragment>
            }
        />
    )
};
export default observer(Single)