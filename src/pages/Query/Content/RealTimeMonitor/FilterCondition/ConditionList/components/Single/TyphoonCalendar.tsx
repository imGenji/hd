import React, {Fragment, useEffect} from "react";
import {observer} from "mobx-react-lite";
import Scatter from "@/components/App/chart/Scatter";
import { TypeRealTimeMonitorStore } from "@/pages/Query/model/RealTimeMonitorStore";
import Container from "../Container";

const TyphoonCalendar: React.FC<{realTimeMonitorStore: TypeRealTimeMonitorStore}> = ({realTimeMonitorStore}) =>{
    const { TyphoonCalendarData ,TyphoonCalendarxAxis} = realTimeMonitorStore;
    useEffect(()=>{
        realTimeMonitorStore.TyphoonCalendar()
    },[]);
    return(
        <Fragment>
            <Container
                title="台风历"
                content={
                    <Fragment>
                        <Scatter
                            width={350}
                            height={200}
                            year={TyphoonCalendarxAxis}
                            month={['1', '2', '3','4', '5', '6', '7','8','9','10','11','12']}
                            data={TyphoonCalendarData}
                        />
                    </Fragment>
                }
            />
        </Fragment>
    )
};

export default observer(TyphoonCalendar)