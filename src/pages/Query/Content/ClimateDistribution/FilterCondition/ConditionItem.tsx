import React from 'react'
import ListItem from "../../../commonUI/ListItem";
import { EnumConditionType } from './constants'
import { TypeClimateStore } from '../../../model/ClimateStore';

interface ConditionItemProps {
    showConditionTypes: string[];
    setShowConditionTypes: (conditionTypes: string[]) => void;
    climateStore:TypeClimateStore
}

const ConditionItem: React.FC<ConditionItemProps> =({ showConditionTypes, setShowConditionTypes,climateStore }) =>{
    const { setShowQueryResult,isShowQueryResult } = climateStore;

    return(
        <div className="normal-query-list">
            <ListItem
                mode="multiple"
                listData={Object.values(EnumConditionType)}
                value={showConditionTypes}
                onChange={(changeValue, isActive) => {
                    changeValue = changeValue as string[];
                    const lastValue = changeValue[changeValue.length - 1];
                    setShowConditionTypes((isActive ? changeValue.filter(v => v !== lastValue) : changeValue) as string[])
                    if(isActive){
                        setShowQueryResult(false)
                    }
                }}
            />

            {/*language=SCSS*/}
            <style jsx>{`
                .normal-query-list{
                  position: relative;
                  top:40px;
                }
            `}</style>
        </div>
    )
}

export default ConditionItem
