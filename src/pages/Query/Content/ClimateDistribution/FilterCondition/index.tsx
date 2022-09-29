import React, {Fragment, useState} from 'react'
import { helper } from '@/utils/T';
import ControlBoard from "../../../commonUI/ControlBoard";
import ConditionItem from "./ConditionItem";
import ConditionList from "./ConditionList";
import { TypeClimateStore } from '../../../model/ClimateStore';

const FilterCondition: React.FC<{climateStore:TypeClimateStore}> = ({climateStore}) => {
    const [isShow, setIsShow] = useState(true);
    const [showConditionTypes, setShowConditionTypes] = useState([]);
    return (
        <Fragment>
            {helper.showComponent(showConditionTypes.length > 0, <ControlBoard
                name="隐藏查询条件"
                closeName="显示查询条件"
                onClick={() => {
                    setIsShow(!isShow)
                }}

                style={{
                    position: "absolute",
                    width: 270,
                    left: 160,
                    top: 30
                }}
            />)}

            {
                helper.showComponent(isShow, <Fragment>
                    <ConditionItem
                        showConditionTypes={showConditionTypes}
                        setShowConditionTypes={setShowConditionTypes}
                        climateStore={climateStore}

                    />
                    <ConditionList
                        climateStore={climateStore}
                        showConditionTypes={showConditionTypes}
                    />
                </Fragment>)
            }
        </Fragment>
    )
}

export default FilterCondition;
