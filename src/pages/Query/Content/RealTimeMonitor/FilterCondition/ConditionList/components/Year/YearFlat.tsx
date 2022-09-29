import React, {Fragment, useEffect} from "react";
import {TypeRealTimeMonitorStore} from "@/pages/Query/model/RealTimeMonitorStore";
import Container from "../Container";
import BarAndLineChart from "@/components/App/chart/BarAndLineChart";
import {observer} from "mobx-react-lite";

const YearFlat:React.FC<{realTimeMonitorStore:TypeRealTimeMonitorStore}> = ({realTimeMonitorStore}) =>{
    const {YearFlat,YearxAxis} = realTimeMonitorStore;
    useEffect(()=>{
        realTimeMonitorStore.getYearFlat()
    });
    return(
        <Fragment>
            <Container
                title="年矩平"
                content={
                    <Fragment>
                        <BarAndLineChart
                            width={350}
                            height={200}
                            xAxisName={YearxAxis}
                            barData={YearFlat}
                        />
                    </Fragment>
                }
            />
        </Fragment>
    )
};

export default observer(YearFlat)