import React, {useContext, useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import FilterCondition from "./FilterCondition"
import { TypeQueryStore } from "../../model/QueryStore";
import { getTyphoonPath } from "@/pages/Query/api";
import { MapUtilCtx } from "#/MapOfLeaflet";
interface TypeTyphoonDetail {
    name: string;
    tfbh: string;
    pathData: API.TypeTyphoonPoint[]
}
const RealTimeMonitor: React.FC<{queryStore: TypeQueryStore}> = ({ queryStore }) => {
    const { realTimeMonitorStore } = queryStore;
    const mapUtil  = useContext(MapUtilCtx);
    useEffect(() =>{
        getTyphoonPath().then(
            (resp) => {
                resp.data.forEach((typhoon: TypeTyphoonDetail) => {
                    let panelMarker:L.Marker;
                    const { tfbh, pathData ,name } = typhoon;
                    mapUtil.typhoon.drawRealTyphoon(tfbh, pathData,{
                        'point:click': (e,typhoonPoint) => {
                            // 绘制预报台风路径
                            mapUtil.typhoon.drawForecastTyphoon(tfbh, typhoonPoint);
                        },
                        "point:mouseover": (e, typhoonPoint) => {
                            panelMarker =  mapUtil.typhoon.drawRealTyphoonDetailPanel({tfbh, name, data: typhoonPoint})
                        },
                        "point:mouseout": (e, typhoonPoint) => {
                            panelMarker && panelMarker.remove();
                        }
                    }, true);
                })

            }
        );
    },[]);
    return (
        <div className="realTime-query">
            <FilterCondition
                realTimeMonitorStore={ realTimeMonitorStore }
            />
        </div>
    )
};

export default observer(RealTimeMonitor);