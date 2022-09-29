import React from 'react'
import PropTypes from 'prop-types';
import ControlBoard from "../../../commonUI/ControlBoard";
import { observer } from "mobx-react-lite";
const QueryResultsStrip = ({normalQueryStore}) => {
    const {showResult,setShowResult,showQueryResult} = normalQueryStore
    return(
        <div className="normal-query-result">
            {showQueryResult &&<ControlBoard
                name="显示查询结果"
                closeName="隐藏查询结果"
                onClick={() =>{
                    setShowResult(!showResult)
                }}
            />}

            {/*language=SCSS*/}
            <style jsx>{`
              .normal-query-result{
                  position:absolute;
                  width:230px;
                  left:522px;
                  top:30px;
                }
            `}</style>
        </div>
    )
};
QueryResultsStrip.propTypes = {
    onClick:PropTypes.func,
};
export default observer(QueryResultsStrip)