import React from 'react'
import PropTypes from 'prop-types';
import ControlBoard from "../../../commonUI/ControlBoard";
import { observer } from "mobx-react-lite";
const QueryCriteriaStrip = ({normalQueryStore}) => {
    const {showCondition,setShowCondition,queryCriteria} = normalQueryStore
    return(
        <div className="normal-query-controlBoard">
            {
                queryCriteria.length > 0 &&  <ControlBoard
                    name="显示查询条件"
                    closeName="隐藏查询条件"
                    onClick={() =>{
                        setShowCondition(!showCondition)
                    }}
                />
            }

            {/*language=SCSS*/}
            <style jsx>{`
                .normal-query-controlBoard{
                  position:absolute;
                  width:230px;
                  left:180px;
                  top:30px;
                }
            `}</style>
        </div>
    )
};
QueryCriteriaStrip.propTypes = {
    onClick:PropTypes.func,
};
export default observer(QueryCriteriaStrip);