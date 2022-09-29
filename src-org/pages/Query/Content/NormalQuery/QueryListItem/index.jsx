import React from 'react'
import PropTypes from "prop-types";
import { observer } from 'mobx-react-lite';
import ListItem from "../../../commonUI/ListItem";
import { EnumNormalQuery } from '../../../constants/EnumNormalQuery'

const QueryListItem =({ normalQueryStore }) =>{
    const { queryCriteria,setQueryCriteria,showCondition} = normalQueryStore;
    return(
        <div className="normal-query-list">
            {showCondition && <ListItem
                mode="multiple"
                listData={EnumNormalQuery}
                value={queryCriteria}
                queryCriteria={queryCriteria}
                setQueryCriteria={setQueryCriteria}
                onChange={(changeValue, isActive) => {
                    let newValue;
                    const lastValue = changeValue[changeValue.length - 1];
                    if(isActive) {
                        newValue = changeValue.filter(v => v !== lastValue)
                    } else {
                        newValue = changeValue;
                    }
                    setQueryCriteria(newValue)
                }}
            />
            }
            {/*language=SCSS*/}
            <style jsx>{`
                .normal-query-list{
                  position: absolute;
                  top:20px;
                  width:10%;
                }
            `}</style>
        </div>
    )
}
QueryListItem.propTypes = {
    listData:PropTypes.array,
    value:PropTypes.array,
    queryCriteria:PropTypes.array,
    setQueryCriteria:PropTypes.func
};
export default observer(QueryListItem)
