import React from 'react'
import { observer } from "mobx-react-lite";
import BjColor from "../../../../commonUI/BjColor";
import Button from "../../../../commonUI/Button";
import { TypeClimateStore } from "../../../../model/ClimateStore";
import { EnumConditionType } from '../constants'
import Time from "./TimeQuery";
import SeaArea from "./SeaAreaQuery";
import MeshPoints from "./MeshPointsQuery";

interface ConditionListProps {
    climateStore:TypeClimateStore;
    showConditionTypes: string[];
}

const typeToCom = {
    // 时间
    [EnumConditionType.time.value]: Time,
    // 网格点
    [EnumConditionType.meshPoints.value]: MeshPoints,
    // 海区
    [EnumConditionType.seaArea.value]: SeaArea,
};
const ConditionList:React.FC<ConditionListProps> =({climateStore, showConditionTypes}) => {
    const { setShowQueryResult,isShowQueryResult, getClimateFilter } = climateStore;
    const onQuery = () => {
        setShowQueryResult(true);
        getClimateFilter()
    };

    return(
        <div className="normal-query-condition">
            {
                showConditionTypes.length > 0 && <BjColor content={
                    <div className="wrap">
                        {showConditionTypes.map((type) => {
                            const Com = typeToCom[type];
                            return <Com
                                key={type}
                                climateStore={climateStore}
                            />
                        })}
                        <div className="normal-query">
                            <Button
                                style={{width: "100%", height: "30px", margin: "0", borderRadius: "5px"}}
                                onClick={onQuery}
                            >查询</Button>
                        </div>
                    </div>
                }/>
            }
            {/*language=SCSS*/}
            <style>{`
                .normal-query-condition{
                  position:absolute;
                  top:70px;
                  left:130px;
                  width:350px;
                  overflow-y: scroll;
                  height: 400px;
                }
                .normal-query-condition::-webkit-scrollbar {
                    display: none;
                }
                .normal-query{
                  width: 180px;
                  height: 30px;
                  margin: 0 auto;
                }
            `}</style>
        </div>
    )
};

export default observer(ConditionList)
