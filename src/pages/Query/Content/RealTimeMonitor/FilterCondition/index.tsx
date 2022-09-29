import React, {Fragment,useState} from 'react'
import ConditionItem from "./ConditionItem";
import ConditionList from "./ConditionList";
import { TypeRealTimeMonitorStore } from "../../../model/RealTimeMonitorStore";

const FilterCondition : React.FC<{realTimeMonitorStore:TypeRealTimeMonitorStore}> = ({realTimeMonitorStore}) =>{
    const [showConditionTypes, setShowConditionTypes] = useState([]);
    return(
        <Fragment>
            <ConditionItem
                showConditionTypes={showConditionTypes}
                setShowConditionTypes={setShowConditionTypes}
            />
            <ConditionList
                realTimeMonitorStore={realTimeMonitorStore}
                showConditionTypes={showConditionTypes}
            />
        </Fragment>
    )
};

export default  FilterCondition