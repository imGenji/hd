import React, { Fragment, useEffect } from "react"
import Skeleton from "../../../../commonUI/Skeleton";
import DatePicker from "../../../../commonUI/DatePicker";
import {observer} from "mobx-react-lite";
import moment from 'moment';
import { TypeNormalQueryStore } from '../../../../model/NormalQueryStore';

const Time: React.FC<{normalQueryStore: TypeNormalQueryStore}> = ({normalQueryStore}) =>{
    useEffect(() => {
        normalQueryStore.setShowQueryResult(false);
        normalQueryStore.setQueryParams({
            beginTime: '1949-01-01 00:00:00',
            endTime: moment().format('YYYY-MM-DD HH:mm:ss')
        });
        return () => {
            normalQueryStore.setQueryParams({
                beginTime: '',
                endTime: ''
            });
            normalQueryStore.setShowQueryResult(false);
        }
    }, []);

    const begOnChange = (beginTime: string) =>{
        normalQueryStore.setQueryParams({ beginTime });
    };

    const endOnChange = (endTime: string) =>{
        normalQueryStore.setQueryParams({ endTime });
    };

    return(
        <Fragment>
            <Skeleton
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
        </Fragment>
    )
};

export default observer(Time)