import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import TableHistory from './TableHistory'
import LabelHistory from './LabelHistory'
import SelectHistory from './SelectHistory'
const HistoryTyphoon = ({queryStore}) => {
    const {historyStore} = queryStore;
    return (
        <div className={"typhoon_history"}>
            <SelectHistory
                historyStore={historyStore}
            />
            <LabelHistory
                queryStore={queryStore}
            />
            <TableHistory
                historyStore={historyStore}
            />
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

HistoryTyphoon.propTypes = {
    queryStore: PropTypes.object.isRequired
};

export default observer(HistoryTyphoon);
