import React, {Fragment, useContext, useEffect, useState, useRef} from "react"
import { getTyphoonPath } from "../../../../api"
import { observer } from "mobx-react-lite"
import { TypeRealTimeMonitorStore } from "../../../../model/RealTimeMonitorStore";
import Input from "@/pages/Query/commonUI/Input";
import Select from "@/pages/Query/commonUI/Select";
const tsIcon = require('../../../../commonUI/Select/img/u1761.png');
import Button from "@/pages/Query/commonUI/Button";
import { MapUtilCtx } from "#/MapOfLeaflet";
interface TypeTyphoonDetail {
    name: string;
    tfbh: string;
    pathData: API.TypeTyphoonPoint[]
}
const SimilarPath: React.FC<{realTimeMonitorStore: TypeRealTimeMonitorStore}> = ({realTimeMonitorStore}) =>{
    const { typhoonSimilarPath } = realTimeMonitorStore;
    const {distance, endTime, startTime, tfbh, topNumlimit} = typhoonSimilarPath;
    const [ typhoonTime,setTyphoonTime ] = useState([]);
    const [ typhoonNumber,setTyphoonNumber] = useState("");
    const mapUtil  = useContext(MapUtilCtx);
    const originList = useRef([]);
    useEffect(() =>{
        getTyphoonPath().then(
            (resp) => {
                originList.current = resp.data;

                resp.data.forEach((v: TypeTyphoonDetail, k: number) => {
                    if(k === 0) {
                        const {tfbh, pathData} = v;
                        setTyphoonNumber(tfbh);
                        setTyphoonTime(pathData);
                        realTimeMonitorStore.setQueryParams({
                            startTime:pathData[0].datetime,
                            endTime: pathData[pathData.length - 1].datetime
                        })
                    }
                })
            }
        );
    },[]);

    const SimilarPathTyphoon = () =>{
        realTimeMonitorStore.getSimilarTyphoons( typhoonNumber,distance,startTime,endTime,topNumlimit,(data:TypeTyphoonDetail[]) =>{
            let panelMarker:L.Marker;
            data.map((v) => {
                const { tfbh,pathData, name} = v;
                mapUtil.typhoon.drawRealTyphoon(tfbh, pathData, {
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
                });
            })
        })
    };

    //搜索框
    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        realTimeMonitorStore.setQueryParams({
            distance:e.target.value,
        })
    };
    //开始时间
    const onStartTime = (e: React.ChangeEvent<HTMLInputElement>) =>{
        realTimeMonitorStore.setQueryParams({
            startTime:e.target.value,
        })
    };
    //结束时间
    const onEndTime = (e: React.ChangeEvent<HTMLInputElement>) =>{
        realTimeMonitorStore.setQueryParams({
            endTime:e.target.value,
        })
    };
    const onChangeTfbh = (e: React.ChangeEvent<HTMLInputElement>) => {
        realTimeMonitorStore.setQueryParams({
            tfbh: e.target.value
        })
    }
    return(
        <Fragment>
            <div className="similarPath-query">
                <div className="similar-query-time">
                    <div className="condition-center-title">选择台风</div>
                    <div className="condition-select">
                        <div className="condition-label">当前台风</div>
                        <div className="condition-label-s">
                            <Select
                                selectData={originList.current.map((i: TypeTyphoonDetail) => ({label: i.tfbh + ' ' + i.name, value: i.tfbh}))}
                                style={{width:"100%",margin:"0",background: "url("+tsIcon+") no-repeat 125px center transparent"}}
                                onChange={onStartTime}
                            />
                        </div>
                    </div>
                </div>
                <div className="similar-query-time">
                    <div className="condition-center-time">
                        <div className="condition-center-title">时间选择</div>
                        <div className="condition-select">
                            <div className="condition-label">开始时间</div>
                            <div className="condition-label-s">
                                <Select
                                    selectData={typhoonTime.map((i) => ({label: i.datetime, value: i.datetime}))}
                                    style={{width:"100%",margin:"0",background: "url("+tsIcon+") no-repeat 125px center transparent"}}
                                    onChange={onStartTime}
                                />
                            </div>
                        </div>
                        <div className="condition-select" style={{marginTop:"5px"}}>
                            <div className="condition-label">结束时间</div>
                            <div className="condition-label-s">
                                <Select
                                    selectData={typhoonTime.map((v) => ({label: v.datetime, value: v.datetime}))}
                                    style={{width:"100%",margin:"0",background: "url("+tsIcon+") no-repeat 125px center transparent"}}
                                    onChange={onEndTime}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="similarPath-query-spot">
                    <div className="condition-center-title">范围</div>
                    <Input
                        type="text"
                        value={distance}
                        placeholder="请输入范围"
                        onChange={onQueryChange}
                        style={{border:"1px solid #777",borderRadius:2,margin:'0 auto'}}
                    />
                </div>
                <div className="similar-query-btn">
                    <Button style={{width:100}} onClick={SimilarPathTyphoon}>查询</Button>
                </div>
            </div>
            {/*language=SCSS*/}
            <style jsx>{`
                .similarPath-query{
                  position: absolute;
                  top:40px;
                  left:200px;
                  width: 300px;
                  padding: 10px 0;
                  background: rgba(0,0,0,0.3);
                  border-radius: 2px;
                  .condition-center-title{
                    color: #000;
                    font-weight: bold;
                    font-size: 13px;
                    line-height: 30px;
                  }
                  .similar-query-time{
                    width: 90%;
                    margin: 0 auto;
                    background: rgba(255,255,255,0.8);
                    padding: 10px 10px;
                    line-height: 30px;
                  }
                  .similarPath-query-spot{
                    width: 90%;
                    background: rgba(255,255,255,0.8);
                    margin:10px auto auto auto;
                    padding: 10px;
                  }
                  .condition-center-time{
                      margin: 5px 0;
                  }
                  .condition-select{
                     width: 100%;
                     height: 25px;
                     line-height: 25px;
                  }
                  .condition-label{
                    float: left;
                    width: 30%;
                    background: #777;
                    text-align: center;
                    color: #fff;
                  }
                  .condition-label-s{
                    float: left;
                    width: 60%;
                    height: 100%;
                    margin-left: 20px
                  }
                  .similar-query-btn{
                    text-align: center;
                    margin-top: 5px;
                  }
                }
            `}</style>
        </Fragment>
    )
};

export default observer(SimilarPath)