import React, {Fragment, useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite"
import {TypeNormalQueryStore} from "../../../..//model/NormalQueryStore";
import Skeleton from "@/pages/Query/commonUI/Skeleton";
import Input from "@/pages/Query/commonUI/Input";
import {MapUtilCtx} from '#/MapOfLeaflet';

const RegionQuery:React.FC<{normalQueryStore: TypeNormalQueryStore}> =( {normalQueryStore} ) =>{
    const mapUtil = useContext(MapUtilCtx);
    const {setCircle, setRect, circle, rectangle} = normalQueryStore;
    const [state, setState] = useState({
        circleLat: 0,
        circleLng: 0,
        circleRadius: 0,
        north: 0,
        east: 0,
        south: 0,
        west: 0
    })
    const {circleLat, circleLng, circleRadius, north, east, south, west} = state;
    const wrapperSetState = (updateState: object) => {
        setState(prevState => {
            return {
                ...prevState,
                ...updateState
            }
        })
    }
    useEffect(() => {
        if(circle) {
            circle.setLatLng([circleLat, circleLng])
            circle.setRadius(circleRadius*1000)
        }
    }, [circleLat, circleLng, circleRadius])
    useEffect(() => {
        if(rectangle) {
            rectangle.setBounds([[south,west], [north, east]]);
        }
    }, [north, east, south, west])
    useEffect(() => {
        normalQueryStore.setShowQueryResult(false);
        return () => {
            removeRect();
            removeCircle();
            normalQueryStore.setShowQueryResult(false);
        }
    }, [])
    const drawCircle = () => {
        mapUtil.mouseTool.circle().then((newCircle: L.Circle) => {
            const center = newCircle.getLatLng();
            const radius = newCircle.getRadius();
            setCircle(newCircle)
            wrapperSetState({
                circleLat: center.lat,
                circleLng: center.lng,
                circleRadius: radius/1000
            })
        })
    }
    const drawRect = () => {
        mapUtil.mouseTool.rectangle().then((newRectangle: L.Rectangle) => {
            setRect(newRectangle)
            const bounds = newRectangle.getBounds();
            const north = bounds.getNorth();
            const east = bounds.getEast();
            const south = bounds.getSouth();
            const west = bounds.getWest();
            wrapperSetState({
                north,
                east,
                south,
                west
            })
        })
    }
    const redrawCircle = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        wrapperSetState({
            [key]: Number(e.target.value)
        })
    }
    const redrawRect = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        wrapperSetState({
            [key]: Number(e.target.value)
        })
    }
    const removeCircle = () => {
        console.log(circle);
        circle && circle.remove();
        setCircle(null);
    }
    const removeRect = () => {
        rectangle && rectangle.remove();
        setRect(null);
    }

    return(
        <Fragment>
            {/*区域查询*/}
            <Skeleton
                label="圆形查询"
                content={
                    <Fragment>
                        <div className="query-title">经纬度圆形</div>
                        <div className="query-content">
                            <div className="query-core">
                                <div className="queryCriteria-title">中心</div>
                                <div className="query-north">
                                    <Input
                                        type="number"
                                        name="tfbh"
                                        value={circleLng}
                                        style={{width:"80%",border:"1px solid #000",marginLeft:10}}
                                        // placeholder=""
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => redrawCircle(e, 'circleLng')}
                                    />
                                    <label className="query-label">N</label>
                                </div>
                                <div className="query-south">
                                    <Input
                                        type="number"
                                        name="tfbh"
                                        value={circleLat}
                                        style={{width:"80%",border:"1px solid #000",marginLeft:10}}
                                        // placeholder=""
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => redrawCircle(e, 'circleLat')}
                                    />
                                    <label className="query-label">S</label>
                                </div>
                                <div className="query-cancel" onClick={removeCircle}>取消</div>
                            </div>
                            <div className="query-radius">
                                <div className="queryCriteria-title">半径</div>
                                <div className="query-kilometre">
                                    <Input
                                        type="number"
                                        name="tfbh"
                                        value={circleRadius}
                                        style={{width:"90%",border:"1px solid #000",marginLeft:10}}
                                        // placeholder=""
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => redrawCircle(e, 'circleRadius')}
                                    />
                                    <label className="query-label-kilometre" >公里</label>
                                </div>
                                <div className="query-circular" onClick={drawCircle}>图上画圆</div>
                            </div>
                        </div>
                    </Fragment>
                }
            />
            <Skeleton
                label="矩形查询"
                content={
                    <Fragment>
                        <div className="query-title">经纬度矩形</div>
                        <div className="query-content">
                            <div className="query-core">
                                <div className="queryCriteria-title">左下</div>
                                <div className="query-north">
                                    <Input
                                        type="number"
                                        name="tfbh"
                                        value={west}
                                        style={{width:"80%",border:"1px solid #000",marginLeft:10}}
                                        // placeholder=""
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => redrawRect(e, 'west')}
                                    />
                                    <label className="query-label">N</label>
                                </div>
                                <div className="query-south">
                                    <Input
                                        type="number"
                                        name="tfbh"
                                        value={south}
                                        style={{width:"80%",border:"1px solid #000",marginLeft:10}}
                                        // placeholder=""
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => redrawRect(e, 'south')}
                                    />
                                    <label className="query-label">S</label>
                                </div>
                                <div className="query-cancel" onClick={removeRect}>取消</div>
                            </div>
                            <div className="query-radius">
                                <div className="queryCriteria-title">右上</div>
                                <div className="query-north">
                                    <Input
                                        type="number"
                                        name="tfbh"
                                        value={east}
                                        style={{width:"80%",border:"1px solid #000",marginLeft:10}}
                                        // placeholder=""
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => redrawRect(e, 'east')}
                                    />
                                    <label className="query-label">N</label>
                                </div>
                                <div className="query-south">
                                    <Input
                                        type="number"
                                        name="tfbh"
                                        value={north}
                                        style={{width:"80%",border:"1px solid #000",marginLeft:10}}
                                        // placeholder=""
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => redrawRect(e, 'north')}
                                    />
                                    <label className="query-label">S</label>
                                </div>
                                <div className="query-circular" onClick={drawRect}>图上画矩形</div>
                            </div>
                        </div>
                    </Fragment>
                }
            />
            {/*language=SCSS*/}
            <style jsx>{`
                .query-title{
                  border-bottom: 1px solid #000;
                  height: 26px;
                  line-height: 26px;
                  color:#000;
                  font-weight:bold;
                  font-size:13px
                }
                .query-label{
                  margin-left:5px;
                }
                .queryCriteria-title{
                  width: 15%;
                  background: #777;
                  text-align: center;
                  color:#fff;
                  line-height: 26px;
                  padding: 0 2px;
                }
                .query-north{
                  display: flex;
                  width: 35%;
                  line-height: 26px;
                }
                .query-south{
                  display: flex;
                  width: 35%;
                  line-height: 26px;
                }
                .query-content{
                  margin:5px 0 5px 0 ;
                  .query-core{
                    width: 100%;
                    display: flex;
                    .query-cancel{
                      width: 12%;
                      background: #999;
                      text-align: center;
                      line-height: 26px;
                      color:#fff;
                      margin-left: 10px;
                      cursor: pointer;
                    }
                  }
                  .query-radius{
                    width: 100%;
                    margin-top: 5px;
                    height: 26px;
                    display: flex;
                    .query-kilometre{
                      width: 52%;
                      display: flex;
                      .query-label-kilometre{
                        width: 30%;
                        line-height: 26px;
                        margin-left: 5px;
                      }
                    }
                    .query-circular{
                      width: 30%;
                      margin-left: 10px;
                      background: #87ceeb;
                      line-height: 26px;
                      text-align: center;
                      cursor: pointer;
                      color:#fff;
                    }
                  }
                }
            `}</style>
        </Fragment>
    )
};
export default observer(RegionQuery)