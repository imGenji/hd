import React,{useState,Fragment}  from "react"
import {observer} from "mobx-react-lite";
import BjColor from "../../../../commonUI/BjColor";
import FrequencyStatistics from "./FrequencyStatistics";
import MaxWindv from "./MaxWindv"
import WindvFrequency from "./WindvFrequency"
import {TypeClimateStore} from "@/pages/Query/model/ClimateStore";
import {EnumTyphoonStrengthLegend,EnumWindSpeed} from '@/pages/Query/constants/EnumTyphoon'

const StatisticsTable :React.FC<{climateStore:TypeClimateStore}> =({climateStore}) =>{
    const [tabType,setTabType] = useState(0);

    const EnumTabType = [
        {
            label: "台风频次统计",
            Content: () =><FrequencyStatistics climateStore={climateStore}/>
        },
        {
            label: "台风最大风速",
            Content: () =><MaxWindv climateStore={climateStore}/>
        },
        {
            label: "最大风速频次",
            Content: () =><WindvFrequency climateStore={climateStore}/>
        }
    ];
    const TabContent = EnumTabType[tabType].Content;
    const handleTabChange = (index:number) => {
        setTabType(index);
    };
    return(
        <div className="StatisticsTable">
            <BjColor content={
                <Fragment>
                    <div className="title">统计结果</div>
                    <div className="table">
                        {EnumTabType.map((item, index) => (
                            <div
                                className={`${index === tabType ? "active" : "tab_title"}`}
                                key={index}
                                onClick={() => handleTabChange(index)}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>
                    <div>
                        <TabContent/>
                    </div>
                </Fragment>
            }/>
            {/*language=SCSS*/}
            <style jsx>{`
              .StatisticsTable{
                position: absolute;
                top:70px;
                left:850px;
                width:25%;
                z-index: 1000;
                .title{
                  text-align: center;
                  color: #dadbde;
                  margin-bottom: 4px;
                }
                .table{
                  display: flex;
                  justify-content: space-around;
                  
                  .tab_title{
                      border: 1.2px solid #666666;
                      color: #fff;
                      padding: 2px 4px;
                  }
                  .active{
                      border: 1.2px solid #666666;
                      color: #fff;
                      padding: 2px 4px;
                      background: #666666;
                  }
                }
              }
            `}</style>
        </div>
    )
};


export default observer(StatisticsTable)
