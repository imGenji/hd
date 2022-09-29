import React from 'react'
import { observer } from "mobx-react-lite";
import BjColor from "../../../commonUI/BjColor";
import Button from "../../../commonUI/Button";
import PropTypes from "prop-types";
import Time from "./Time";
import LandingPoint from "./LandingPoint"
import Number from "./Number";
const ListQuery =({normalQueryStore}) =>{
    const { queryCriteria, setShowQueryResult, queryParams, showCondition } = normalQueryStore;
    //数据参数
    const onQuery = () => {
        setShowQueryResult(true);
        normalQueryStore.getResult(queryParams)
    };
    return(
        <div className="normal-query-condition">
            {
                showCondition && queryCriteria.length > 0 && <BjColor content={
                    <div>
                        {/*编号*/}
                        <Number normalQueryStore={normalQueryStore}/>
                        {/*时间*/}
                        <Time normalQueryStore={normalQueryStore}/>
                        {/*登陆点*/}
                        <LandingPoint normalQueryStore={normalQueryStore}/>
                        {
                            queryCriteria.length > 0 && <div className="normal-query">
                                <Button
                                    style={{width: "100%", height: "30px", margin: "0", borderRadius: "5px"}}
                                    onClick={onQuery}
                                >查询</Button>
                            </div>
                        }
                    </div>
                }/>
            }
            {/*language=SCSS*/}
            <style>{`
                .normal-query-condition{
                  position:absolute;
                  top:70px;
                  left:130px;
                  width:25%;
                }
                .normal-query{
                  width: 180px;
                  height: 30px;
                  margin: 0 auto;
                }
            `}</style>
        </div>
    )
};

ListQuery.propTypes = {
    normalQueryStore:PropTypes.object,
    setShowQueryResult:PropTypes.func,
};

export default observer(ListQuery)