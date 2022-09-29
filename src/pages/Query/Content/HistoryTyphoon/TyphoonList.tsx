import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ListTitle from '../../commonUI/ListTitle'
import {MapUtilCtx} from "#/MapOfLeaflet";
import { TypeHistoryStore } from '../../model/HistoryStore';

const TyphoonList: React.FC<{historyStore: TypeHistoryStore}> = ({historyStore}) => {
    const { selectedTyphoonDataIndies, setTyphoonDataIndies, typhoonData } = historyStore;
    const mapUtil  = useContext(MapUtilCtx);
    const drawTyphoon = (data: {
        name: string;
        tfbh: string;
        pathData: API.TypeTyphoonPoint[];
    }) => {
        mapUtil.typhoon.clearAllLayer();
        const { name, tfbh } = data;
        let panelMarker:L.Marker;
        // 绘制真实台风路径
        mapUtil.typhoon.drawRealTyphoon(tfbh, data.pathData, {
            "point:click": (e, typhoonPoint) => {
                // 绘制预报台风路径
                mapUtil.typhoon.drawForecastTyphoon(tfbh, typhoonPoint);
            },
            "point:mouseover": (e, typhoonPoint) => {
                panelMarker =  mapUtil.typhoon.drawRealTyphoonDetailPanel({tfbh, name, data: typhoonPoint})
            },
            "point:mouseout": (e, typhoonPoint) => {
                panelMarker && panelMarker.remove();
            }
        })
    }
    const handleClick = (index: number) => {
        if(selectedTyphoonDataIndies.includes(index)) {
            const newArr = selectedTyphoonDataIndies.filter((item) => item!==index);
            setTyphoonDataIndies(newArr,drawTyphoon);
        } else {
            setTyphoonDataIndies(selectedTyphoonDataIndies.concat(index), drawTyphoon);
        }
    };
// console.log(selectedTyphoonDataIndies)
    return (
        <ListTitle
            data={typhoonData.data.map(item => ({
                left:item.tfbh,
                right:item.chnname+" "+item.name,
                ty: ''
            }))}
            onClick={handleClick}
            activeIndex={selectedTyphoonDataIndies}
        />
    )
};

export default observer(TyphoonList);
