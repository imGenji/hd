import React, { Fragment } from "react"
import {observer} from "mobx-react-lite";
import Year from '../../components/Year'
import Strength from '../../components/Strength'
import { TypeClimateStore } from '../../../../model/ClimateStore';

const TimeQuery : React.FC<{climateStore: TypeClimateStore}> =({climateStore}) =>{

    return(
        <Fragment>
            <Year
                climateStore={climateStore}
            />
            <Strength climateStore={climateStore}/>
        </Fragment>
    )
};

export default observer(TimeQuery)