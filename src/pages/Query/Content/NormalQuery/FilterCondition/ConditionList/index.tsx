import React from 'react'
import { observer } from "mobx-react-lite";

import BjColor from "../../../../commonUI/BjColor";
import Button from "../../../../commonUI/Button";
import { TypeNormalQueryStore } from "../../../../model/NormalQueryStore";
import { EnumConditionType } from '../constants'

import Time from "./Time";
import LandingPoint from "./LandingPoint";
import Number from "./Number";
import RegionQuery from "./RegionQuery";

interface ConditionListProps {
    normalQueryStore:TypeNormalQueryStore;
    showConditionTypes: string[];
}

const typeToCom = {
    // 编号
    [EnumConditionType.tfbh.value]: Number,
    // 时间
    [EnumConditionType.time.value]: Time,
    // 登陆点
    [EnumConditionType.land.value]: LandingPoint,
    //区域查询
    [EnumConditionType.region.value]:RegionQuery
};

const ConditionList:React.FC<ConditionListProps> =({normalQueryStore, showConditionTypes}) => {
    const { setShowQueryResult, getTyphoonByFilter } = normalQueryStore;

    const onQuery = () => {
        setShowQueryResult(true);
        getTyphoonByFilter()
    };

    return(
        <div className="normal-query-condition">
            {
                showConditionTypes.length > 0 && <BjColor content={
                    <div>
                        {showConditionTypes.map((type) => {
                            const Com = typeToCom[type];
                            return <Com
                                key={type}
                                normalQueryStore={normalQueryStore}
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
                  width:25%;
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