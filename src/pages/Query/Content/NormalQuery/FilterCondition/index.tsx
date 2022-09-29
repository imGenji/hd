import React, {Fragment, useState} from 'react'
import { helper } from '@/utils/T';
import ControlBoard from "../../../commonUI/ControlBoard";
import ConditionItem from "./ConditionItem";
import ConditionList from "./ConditionList";
import { TypeNormalQueryStore } from '../../../model/NormalQueryStore';

const FilterCondition: React.FC<{normalQueryStore:TypeNormalQueryStore}> = ({normalQueryStore}) => {
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
                    />
                    <ConditionList
                        normalQueryStore={normalQueryStore}
                        showConditionTypes={showConditionTypes}
                    />
                </Fragment>)
            }
        </Fragment>
    )
}

export default FilterCondition;
