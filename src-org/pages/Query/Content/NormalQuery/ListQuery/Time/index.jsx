import React from "react"
import {EnumNormalQuery} from "../../../../constants/EnumNormalQuery";
import Skeleton from "../../../../commonUI/Skeleton";
import DatePicker from "../../../../commonUI/DatePicker";
import {observer} from "mobx-react-lite";
import PropTypes from "prop-types";

const Time =({normalQueryStore}) =>{
    const { queryCriteria } = normalQueryStore;
    const begOnChange = (e) =>{
        normalQueryStore.setQueryParams({
            beginTime: e
        });
    };
    const endOnChange = (e) =>{
        normalQueryStore.setQueryParams({
            endTime: e
        });
    };
    return(
        <div>
            {/*时间*/}
            {
                queryCriteria.includes(EnumNormalQuery[1].value) && <Skeleton
                    label="时间"
                    content={
                        <div>
                            <div className="condition-center-t">时间查询</div>
                            <div className="condition-center-time">
                                <DatePicker
                                    onStartChange={begOnChange}
                                    startTimeTitle="开始时间"
                                    endTimeTitle="结束时间"
                                    onEndChange={endOnChange}
                                />
                            </div>
                        </div>
                    }
                />
            }
            {/*language=SCSS*/}
            <style jsx>{`
              .condition-center-t{
                border-bottom: 1px solid #000;
                height: 26px;
                line-height: 26px;
                color:#000;
                font-weight:bold;
                font-size:13px
              }
              .condition-center-time{
                margin: 5px 0;
              }
            `}</style>
        </div>
    )
};

Time.propTypes = {
    normalQueryStore:PropTypes.object,
    queryCriteria:PropTypes.string,
};

export default observer(Time)
