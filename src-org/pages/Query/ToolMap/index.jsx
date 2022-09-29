import React, {useContext,useState} from 'react';
import {observer} from 'mobx-react-lite';
import {MapUtilCtx} from '#/MapEngine';
import Popup from '../commonUI/Popup'
import Toolbar from './Toolbar'
import Arrow from './Arrow'

const full = require('./img/full.png');
const enlarge = require('./img/u1433.png');
const narrow = require('./img/u1438.png');
const wholeCountry= require('./img/u1443.png');
const ranging = require('./img/u1448.png');
const administrativeivision = require('./img/u1453.png');
const altitude = require('./img/u1458.png');
const remoteSensing = require('./img/u1463.png');

const ToolMap = ({queryStore}) =>{
    const { fulScreenStore } = queryStore;
    const { fulScreen,changeFulScreen} = fulScreenStore;
    const showToolMap = fulScreen ? "block" : "none";
    const mapUtil  = useContext(MapUtilCtx);
    const toolMapLeft = [
        {
            img:enlarge,
            onClick:() => mapUtil.zoomIn(),
            title:"放大"
        },
        {
            img:narrow,
            onClick:() => mapUtil.zoomOut(),
            title:"缩小"
        },
        {
            img:wholeCountry,
            onClick:() => mapUtil.reset(),
            title:"全国"
        },
        {
            img:ranging,
            onClick:() => mapUtil.mouseTool.measure.start(),
            title:"测距"
        }
    ]
    const toolMapRight = [

        {
            img:administrativeivision,
            onClick:() => mapUtil.updateBaseMap("GaoDe.Normal.Map"),
            title:"行政区划"
        },
        {
            img:altitude,
            onClick:() => mapUtil.updateBaseMap("Google.Normal.Map"),
            title:"高程"
        },
        {
            img:remoteSensing,
            onClick:() => mapUtil.updateBaseMap("GaoDe.Satellite.Map"),
            title:"遥感"
        },
        {
            img:full,
            onClick:() => changeFulScreen(false),
            title:"全屏"
        }
    ]
    const [show,setShow] = useState(true)
    return (
        <div className="tool-map-wrap">
            <div className="tool-map">
                <Arrow
                    show={show}
                    setShow={setShow}
                />
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
                    display: ${showToolMap};
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

ToolMap.propTypes = {

};

export default observer(ToolMap);
