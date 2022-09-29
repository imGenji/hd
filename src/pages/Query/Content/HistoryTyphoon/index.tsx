import React from 'react';
import {observer} from 'mobx-react-lite';

import PathList from './PathList';
import TyphoonList from './TyphoonList';
import FilterCondition from './FilterCondition';

import { TypeQueryStore } from '../../model/QueryStore';

const HistoryTyphoon: React.FC<{queryStore: TypeQueryStore}> = ({queryStore}) => {
    const {historyStore} = queryStore;
    return (
        <div className={"typhoon_history"}>
            <FilterCondition historyStore={historyStore} />
            <TyphoonList historyStore={historyStore} />
            <PathList historyStore={historyStore} />

            {/*language=SCSS*/}
            <style jsx>{`
              .typhoon_history{
                margin: 20px 0 0 20px;
                float: left;
                background: rgba(255,255,255,0.8) !important;
                width: 330px;
                padding: 10px 15px;
                border: 1px solid #bbb;
                color: #666;
              }
            `}</style>
        </div>
    )
};

export default observer(HistoryTyphoon);
