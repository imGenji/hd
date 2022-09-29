import React, {Fragment, useEffect} from "react";
import { observer } from "mobx-react-lite";
import {TypeRealTimeMonitorStore} from "@/pages/Query/model/RealTimeMonitorStore";
import Container from "../Container";
import Table from "@/pages/Query/commonUI/Table";

const columns = [
    {
        title:"序号",
        dataIndex: "serialNumber",
    },
    {
        title:"年份",
        dataIndex: "year",
    },
    {
        title:"中文名",
        dataIndex: "chineseName",
    },
    {
        title:"英文名",
        dataIndex: "englishName",
    },
    {
        title:"台风编号",
        dataIndex: "typhoonNumber"
    },
    {
        title: "登录强度等级",
        dataIndex: "typhoonStrength"
    }
];

const ExtremeStrength:React.FC<{realTimeMonitorStore:TypeRealTimeMonitorStore}> = ({realTimeMonitorStore}) =>{
    const { Strength } = realTimeMonitorStore;
    useEffect(()=>{
        realTimeMonitorStore.getStrengthList()
    },[]);
    return(
        <Fragment>
            <Container
                title="极值强度"
                content={
                    <Fragment>
                        {/*<div className="single-introduce">*/}
                        {/*    <p>平均值强度为{<span>{40.1}米/秒</span>}，比去年同期{<span>{35.46}米/秒</span>}偏强{<span>{4.64}米/秒</span>}。*/}
                        {/*        最大极值强度为{<span>{110}米/秒</span>} {<span>（{1958}年）</span>}。其中{<span>{"强热带风暴等级"}</span>}的台风个数最多*/}
                        {/*        ，共有{<span>{442}个</span>}（比例{<span>{23.4}%</span>}）*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                        <Table
                            columns={columns}
                            dataSource={Strength}
                            theadStyle={{background:"#01305F",color:"#4085CA"}}
                            tbodyStyle={{background:"#e9e8e7" }}
                        />
                    </Fragment>
                }
            />
            {/*language=SCSS*/}
            <style jsx>{`
                .single-introduce{
                    margin-top:10px;
                    color:#3b7ba9;
                    background: #01305f;
                    padding:5px 5px;
                    span{
                      color:#dcba47
                    }
                }
            `}</style>
        </Fragment>
    )
};

export default observer(ExtremeStrength)