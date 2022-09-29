import React, {useContext,useState} from 'react';
import {observer} from 'mobx-react-lite';
import {MapUtilCtx} from '#/MapOfLeaflet';

import Popup from '../../commonUI/Popup'
import Toolbar from './Toolbar'
import Arrow from './Arrow'

import { TypeQueryStore } from '../../model/QueryStore';

const ToolMap: React.FC<{queryStore: TypeQueryStore}> = ({queryStore}) =>{
    const { triggerFullScreen } = queryStore;
    const [show, setShow] = useState(true);
    const { toolMapLeft, toolMapRight } = formatToolBarData(triggerFullScreen);

    return (
        <div className="tool-map-wrap">
            <div className="tool-map">
                <Arrow show={show} setShow={setShow} />

                <Popup active={show}>
                    <div className="ToolbarWrap">
                        <Toolbar
                            toolMapData={toolMapLeft}
                        />
                        <div className="dividerLine"></div>
                        <Toolbar
                            toolMapData={toolMapRight}
                        />
                    </div>
                </Popup>
            </div>

            {/*language=SCSS*/}
            <style jsx>{`
                .tool-map-wrap{
                    .tool-map{
                        position: absolute;
                        z-index: 1000;
                        top: 64px;
                        right: 20px;
                        display: flex;
                        justify-content: space-between;

                        .ToolbarWrap{
                            display: flex;
                        }
                        .dividerLine{
                            width: 2px;
                            height: 32px;
                            background: #fff;
                            float: left;
                            margin: 4px 0;
                        }
                    }
                }
            `}</style>
        </div>
    )
}

export default observer(ToolMap);


const formatToolBarData = (triggerFullScreen: Function) => {
    const mapUtil  = useContext(MapUtilCtx);

    return {
        toolMapLeft: [
            {
                img: require('./img/u1433.png'),
                onClick:() => mapUtil.zoomIn(),
                title:"放大"
            },
            {
                img: require('./img/u1438.png'),
                onClick:() => mapUtil.zoomOut(),
                title:"缩小"
            },
            {
                img: require('./img/u1443.png'),
                onClick:() => mapUtil.reset(),
                title:"全国"
            },
            {
                img: require('./img/u1448.png'),
                onClick:() => mapUtil.mouseTool.measure.start(),
                title:"测距"
            }
        ],
        toolMapRight: [
            {
                img: require('./img/u1453.png'),
                onClick:() => mapUtil.updateBaseMap("GaoDe.Normal.Map"),
                title:"行政区划"
            },
            {
                img: require('./img/u1458.png'),
                onClick:() => mapUtil.updateBaseMap("Google.Normal.Map"),
                title:"高程"
            },
            {
                img: require('./img/u1463.png'),
                onClick:() => mapUtil.updateBaseMap("GaoDe.Satellite.Map"),
                title:"遥感"
            },
            {
                img: require('./img/full.png'),
                onClick:() => triggerFullScreen(),
                title:"全屏"
            }
        ]
    }
}
