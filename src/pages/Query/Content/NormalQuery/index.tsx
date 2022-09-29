import React from 'react';
import { observer } from "mobx-react-lite";
import FilterCondition from './FilterCondition';
import Result from './Result';
import { TypeQueryStore } from '../../model/QueryStore';

const NormalQuery: React.FC<{queryStore: TypeQueryStore}> = ({ queryStore }) => {
    const { normalQueryStore,climateStore} = queryStore;
    const { isShowQueryResult } = normalQueryStore;
    const { setShowQueryResult } = climateStore;
    setShowQueryResult(false)
    return (
        <div className="normal-query">
            <FilterCondition normalQueryStore={normalQueryStore} />
            {isShowQueryResult ? <Result normalQueryStore={normalQueryStore} /> : null}
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
export default observer(NormalQuery);