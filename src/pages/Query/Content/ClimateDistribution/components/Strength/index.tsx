import React, { Fragment } from "react"
import Skeleton from "../../../../commonUI/Skeleton";
import {observer} from "mobx-react-lite";
import TyphoonIntensity from './TyphoonIntensity'
import WindFiltration from './WindFiltration'
import {TypeClimateStore} from "@/pages/Query/model/ClimateStore";

const strengRadio = [
    {
        label:"台风过程强度",
        value:0
    },
    {
        label:"登陆前台风强度",
        value:1
    }
];

const Index : React.FC<{climateStore: TypeClimateStore}> =({climateStore}) =>{
    const strengthChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        climateStore.setQueryParams({
            isLanding:e.target.value
        });
    };

    return(
        <Fragment>
            <Skeleton
                label="强度"
                content={
                    <div>
                        <div className="condition-center-t">
                            {
                                strengRadio.map((item,index)=>{
                                    return(
                                        <label htmlFor={item.label} key={index}>
                                            <input
                                                value={item.value}
                                                id={item.label}
                                                name="name1"
                                                type="radio"
                                                onChange={strengthChange}
                                            />
                                            <span>{item.label}</span>
                                        </label>
                                    )
                                })
                            }
                        </div>
                        <TyphoonIntensity climateStore={climateStore}/>
                    </div>
                }
            />

            {/*language=SCSS*/}
            <style jsx>{`
              .condition-center-t{
                height: 26px;
                line-height: 26px;
                color:#000;
                font-weight:bold;
                font-size:13px;
                label{
                  margin-right: 10px;
                  span{
                    font-size:12px;
                    margin-left: 4px;
                  }
                }
              }
              .condition-center-t:nth-child(1){
                border-bottom: 1px solid #000;
              }
            `}</style>
        </Fragment>
    )
};


export default observer(Index)
