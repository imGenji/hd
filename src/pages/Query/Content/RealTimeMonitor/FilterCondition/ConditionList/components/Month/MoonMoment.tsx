import React, {Fragment, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {TypeRealTimeMonitorStore} from "@/pages/Query/model/RealTimeMonitorStore";
import Container from "../Container"
import BarAndLineChart from "@/components/App/chart/BarAndLineChart";

const MoonMoment:React.FC<{realTimeMonitorStore:TypeRealTimeMonitorStore}> = ({realTimeMonitorStore}) =>{
    const { MoonSquareLineData } = realTimeMonitorStore;
    useEffect(()=>{
        realTimeMonitorStore.getMoonSquare()
    },[]);
    return(
        <Fragment>
            <Container
                title="月矩平"
                content={
                    <Fragment>
                        <BarAndLineChart
                            width={350}
                            height={200}
                            // @ts-ignore
                            xAxisName={["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]}
                            barData={MoonSquareLineData}
                        />
                    </Fragment>
                }
            />
        </Fragment>
    )
};
export default observer(MoonMoment)