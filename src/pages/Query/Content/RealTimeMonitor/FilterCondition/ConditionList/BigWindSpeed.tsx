import React, {Fragment,useContext, useEffect} from "react"
import {observer} from "mobx-react-lite"
import {TypeRealTimeMonitorStore} from "../../../../model/RealTimeMonitorStore";
import {MapUtilCtx} from "#/MapOfLeaflet";

const BigWindSpeed:React.FC<{realTimeMonitorStore: TypeRealTimeMonitorStore}> = ({realTimeMonitorStore}) =>{
    const mapUtil  = useContext(MapUtilCtx);
    useEffect(() => {
        // @ts-ignore
        mapUtil.typhoon.addWMSLayer(ENV.apiDomain + '/windBarbsManager/get')
    }, []);
    return(
        <Fragment></Fragment>
    )
};

export default observer(BigWindSpeed)