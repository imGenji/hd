import React from 'react';
import PropTypes from 'prop-types';
import { observer } from "mobx-react-lite";
import QueryCriteria from "./QueryCriteriaStrip"
import QueryResults from "./QueryResultsStrip";
import QueryResultsList from "./QueryResultsList";
import QueryListItem from "./QueryListItem";
import ListQuery from "./ListQuery";
import QueryTyphoonDetails from "./QueryTyphoonDetails";
const NormalQuery = ({ queryStore }) => {
    //获取数据
    const { normalQueryStore } = queryStore;
    return (
        <div className="normal-query">
            {/*查询条件*/}
            <QueryListItem normalQueryStore={normalQueryStore}/>
            {/*隐藏-显示查询条件条*/}
            <QueryCriteria normalQueryStore={normalQueryStore}/>
            {/*隐藏-显示查询条件列表*/}
             <ListQuery normalQueryStore={normalQueryStore}/>
            {/*显示-隐藏查询结果条*/}
            <QueryResults normalQueryStore={normalQueryStore}/>
            {/*显示-隐藏查询结果列表*/}
             <QueryResultsList normalQueryStore={normalQueryStore}/>
            {/*查询结果详情列表*/}
            <QueryTyphoonDetails normalQueryStore={normalQueryStore}/>
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
NormalQuery.propTypes = {
    queryStore: PropTypes.object.isRequired,
};
export default observer(NormalQuery);