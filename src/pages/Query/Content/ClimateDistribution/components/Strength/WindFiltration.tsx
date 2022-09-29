import React, {Fragment} from "react"
import {observer} from "mobx-react-lite";
import {TypeClimateStore} from "@/pages/Query/model/ClimateStore";
import {EnumWindSpeed} from '@/pages/Query/constants/EnumTyphoon'

const Strength : React.FC<{climateStore: TypeClimateStore}> =({climateStore}) =>{

    const windvChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        climateStore.setQueryParams({
            minWindSeppd:e.target.value
        });
    };
    return(
        <Fragment>
            <div className="condition-center-t">
                按中心最大风速过滤(m/s)
            </div>
            <div className="condition-center-time">
                {
                    EnumWindSpeed.map((item,index)=>{
                        return(
                            <label key={index}>
                                <input
                                    name="isGoing"
                                    type="radio"
                                    value={item.value}
                                    onChange={windvChange}
                                />
                                <span>{item.label}</span>
                            </label>
                        )
                    })
                }
            </div>
            {/*language=SCSS*/}
            <style jsx>{`
                .condition-center-t{
                  color: #000;
                  font-weight: 600;
                }
              .condition-center-time{
                margin: 5px 0;
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                label{
                  width: 30%;
                  display: flex;
                  align-items: center;
                  span{
                    display: block;
                    margin-left: 5px;
                  }
                }
              }
            `}</style>
        </Fragment>
    )
};


export default observer(Strength)
