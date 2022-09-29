import React, {Fragment, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {TypeRealTimeMonitorStore} from "@/pages/Query/model/RealTimeMonitorStore";
import Container from "../Container";
import Bar from "@/components/App/chart/Bar";

const GenerationFrequency:React.FC<{realTimeMonitorStore: TypeRealTimeMonitorStore}> = ({realTimeMonitorStore}) =>{
    const {MonthFrequency} = realTimeMonitorStore;
    useEffect(()=>{
        realTimeMonitorStore.getMoonSquare()
    },[]);
    return(
        <Fragment>
            <Container
                title="生成频率"
                content={
                    <Fragment>
                        {/*<div className="single-introduce">*/}
                        {/*    <p>共有{<span>{1899}个</span>}个台风生成，平均每年生成台风{<span>{2699}个</span>}，比常年同期{<span>{25.93}个</span>}偏少{<span>{5.94}</span>}。*/}
                        {/*        其中生成最多的年份为{<span>{1976}年</span>}{<span>（{40}）个</span>}；生成最少年份为{<span>{1998}</span>},{<span>{2014}年</span>}{<span>（{14}）个</span>}。*/}
                        {/*        生成台风最集中的月份是{<span>{8}月</span>}（平均生成{<span>{5.62}个</span>})*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                        <Bar
                            width={350}
                            height={220}
                            title={"逐月生成个数"}
                            // @ts-ignore
                            name={['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']}
                            data={MonthFrequency}
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

export default observer(GenerationFrequency)