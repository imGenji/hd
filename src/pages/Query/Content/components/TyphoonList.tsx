import React, { useContext } from 'react';
import Button from "../../commonUI/Button";
import BjColor from "../../commonUI/BjColor";
import ListTitle from "../../commonUI/ListTitle";
import { observer } from "mobx-react-lite";
import {MapUtilCtx} from "#/MapOfLeaflet";
import { exportData, exportStatistics, exportKMZ} from '@/pages/Query/api';
import { TypeClimateStore } from '../../model/ClimateStore';
import { TypeNormalQueryStore } from '../../model/NormalQueryStore';

interface QueryResultsListProps {
    setIsShowDetail: (isShowDetail: boolean) => void;
    selectedTyphoonIndies: number[];
    setSelectedTyphoonIndies: (indies: number[]) => void;
    store:TypeClimateStore | TypeNormalQueryStore
}

const QueryResultsList:React.FC<QueryResultsListProps> = ({ store, setIsShowDetail, selectedTyphoonIndies, setSelectedTyphoonIndies }) => {
    const {typhoonData,getTyphoonDetail} = store;
    const mapUtil  = useContext(MapUtilCtx);
    const handleClick = (index: number, tfbh: string, ty: string) => {
        if(selectedTyphoonIndies.includes(index)) {
            setIsShowDetail(false);
            setSelectedTyphoonIndies(selectedTyphoonIndies.filter((item) => item!==index));
                mapUtil.typhoon.delRealTyphoon(tfbh);
        } else {
            setIsShowDetail(true);
            setSelectedTyphoonIndies(selectedTyphoonIndies.concat(index));
                // 获取单条台风详情
                getTyphoonDetail(tfbh, ty, (data: {
                name: string;
                tfbh: string;
                pathData: API.TypeTyphoonPoint[];
            }) => {
                const { name } = data;
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
            });
        }
    };

    //全选
    const allElection = () =>{
        setSelectedTyphoonIndies(typhoonData.data.map((_, index) => index));
    };

    //反选
    const reverseElection = () =>{
        let otherIndies = [];
        for(let i = 0; i < typhoonData.data.length; i++){
        if(!selectedTyphoonIndies.includes(i)){
            otherIndies.push(i);
        }
    }
        setSelectedTyphoonIndies(otherIndies)
    };

    //取消
    const cancelSelection =() =>{
        setSelectedTyphoonIndies([])
    };
    const getDownloadParam = () => {
        const selectedTyphoons = typhoonData.data.filter((v, k) => selectedTyphoonIndies.includes(k));
        let tys = selectedTyphoons.map(v => v.ty).join(',');
        let bhs = selectedTyphoons.map(v => v.tfbh).join(',');
        return {
            tys,
            bhs
        }
    };
    const onExportData =(type: string) =>{
        const params = getDownloadParam();
        exportData(params.tys, params.bhs, type);
    };
    const onExportKMZ = () => {
        const params = getDownloadParam();
        exportKMZ(params.bhs)
    };
    const onExportStatistics = () => {
        const params = getDownloadParam();
        exportStatistics(params.tys, params.bhs);
    };
    return(
        <div className="result-list">
            <BjColor content={
                <div>
                    <p className="result-list-t">搜索到{typhoonData.data.length}条结果</p>
                    <ListTitle
                        data={typhoonData.data.map((v) => ({
                            left: v.tfbh,
                            right: v.chnname + v.name,
                            ty: v.ty
                        }))}
                        onClick={handleClick}
                        activeIndex={selectedTyphoonIndies}
                        style={{border:"none",height:"300px"}}
                    />

                    <div className="normal-query-result">
                        <Button
                            background="#84b4dc"
                            style={{marginRight: "10px"}}
                            onClick={allElection}
                        >全选</Button>
                        <Button
                            style={{marginRight: "10px"}}
                            background="#84b4dc"
                            onClick={reverseElection}
                        >反选</Button>
                        <Button
                            style={{marginRight: "10px"}}
                            background="#84b4dc"
                            onClick={cancelSelection}
                        >取消</Button>

                        <Button style={{
                            border: "1px solid #e9e8e7",
                            borderRadius: "7px",
                            width: "45%",
                            marginRight: "30px",
                            marginTop: "10px"
                        }}
                                background="#888"
                                hoverBackground="#fff"
                                color="#000"
                                onClick={() => onExportData('simple')}
                        >导出简版数据</Button>

                        <Button style={{border: "1px solid #e9e8e7", borderRadius: "7px", width: "45%"}}
                                background="#888"
                                hoverBackground="#fff"
                                color="#000"
                                onClick={() => onExportData('normal')}
                        >导出详情数据</Button>

                        <Button style={{
                            border: "1px solid #e9e8e7",
                            borderRadius: "7px",
                            marginRight: "30px",
                            width: "45%"
                        }}
                                background="#888"
                                hoverBackground="#fff"
                                color="#000"
                                onClick={onExportKMZ}
                        >导出KMZ文件</Button>

                        <Button style={{border: "1px solid #e9e8e7", borderRadius: "7px", width: "45%"}}
                                background="#888"
                                hoverBackground="#fff"
                                color="#000"
                                onClick={onExportStatistics}
                        >导出统计结果</Button>
                    </div>
                </div>
            }/>

            {/*language=SCSS*/}
            <style jsx>{`
                .result-list{
                  position: absolute;
                  top:70px;
                  left:490px;
                  width:25%;
                  .result-list-t{
                    text-align: center;
                    color: #dadbde;
                  }
                }
            `}</style>
        </div>
    )
};

export default observer(QueryResultsList)
