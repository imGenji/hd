import React from 'react';
import { observer } from "mobx-react-lite";
import Result from './Result';
import {TypeQueryStore} from '../../model/QueryStore';
import FilterCondition from "@/pages/Query/Content/ClimateDistribution/FilterCondition";

const ClimateDistribution : React.FC<{queryStore: TypeQueryStore}> = ({ queryStore }) => {
    const { normalQueryStore,climateStore} = queryStore;
    const { isShowQueryResult} = climateStore;
    const {setShowQueryResult} = normalQueryStore
    setShowQueryResult(false)
    return (
        <div className="normal-query">
            <FilterCondition climateStore={climateStore} />
            {isShowQueryResult ? <Result climateStore={climateStore} /> : null}
            {/*language=SCSS*/}
            <style jsx>{`
                .normal-query{
                    width:100%;
                    position: relative;
                }
            `}</style>
        </div>
    )
};


export default observer(ClimateDistribution);
