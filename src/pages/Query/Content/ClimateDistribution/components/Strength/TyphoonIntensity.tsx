import React, {Fragment, useState} from "react"
import {observer} from "mobx-react-lite";
import {EnumTyphoonStrengthLegend} from '../../../../constants/EnumTyphoon'
import Range from "@/pages/Query/Content/ClimateDistribution/components/Strength/Range";
import Grade from "@/pages/Query/Content/ClimateDistribution/components/Strength/Grade";
import {TypeClimateStore} from "@/pages/Query/model/ClimateStore";
import WindFiltration from "@/pages/Query/Content/ClimateDistribution/components/Strength/WindFiltration";

const typhoonIntensity = [
    {
        label:"按强度等级",
        value:1
    },
    {
        label:"按强度范围",
        value:0
    }
];
const TyphoonIntensity: React.FC<{climateStore: TypeClimateStore}> =({climateStore}) =>{
    const [strength,setStrength] = useState('1')
    const gradeChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setStrength(e.target.value)
        climateStore.setQueryParams({
            strengthOrValue:e.target.value
        });
    };
    return(
        <Fragment>
            <div>
                <div className="condition-center-time">
                    <div className="TyphoonIntensity">台风强度</div>
                    <div className="TyphoonIntensity_radio">
                        {
                            typhoonIntensity.map((item,index)=>{
                                return(
                                    <label htmlFor={item.label} key={index}>
                                        <input
                                            value={item.value}
                                            id={item.label}
                                            name="name2"
                                            type="radio"
                                            onChange={gradeChange}
                                        />
                                        <span>{item.label}</span>
                                    </label>
                                )
                            })
                        }
                    </div>
                    {
                        strength == '1' ?
                            <Fragment>
                                <Grade climateStore={climateStore}/>
                                <WindFiltration climateStore={climateStore}/>
                            </Fragment>
                        :
                            <Range climateStore={climateStore}/>
                    }
                </div>
            </div>
            {/*language=SCSS*/}
            <style jsx>{`
              .condition-center-t{
                border-bottom: 1px solid #000;
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
              .condition-center-time{
                margin: 5px 0;
                .condition-select{
                  width: 100%;
                  height: 25px;
                  line-height: 25px;
                  margin-bottom: 5px;
                }
                .TyphoonIntensity{
                    width: 30%;
                    height: 20px;
                    line-height: 20px;
                    background: RGB(81,149,219);
                    text-align: center;
                    color: #fff;
                    background: #777777;
                    margin-bottom: 5px;
                }
                .TyphoonIntensity_radio{
                    display: flex;
                    align-items: center;
                    margin-bottom: 5px;
                    label{
                        display: flex;
                        align-items: center;
                        margin-right: 20px;
                        margin-bottom: 5px;
                        span{
                          font-weight: 600;
                          display: block;
                          color: #000;
                        }
                    }
                }
                .TyphoonIntensity_checkBox{
                    display: flex;
                    flex-wrap: wrap;
                    label{
                        width: 30%;
                        span{
                            
                        }
                    }
                }
              }
            `}</style>
        </Fragment>
    )
};


export default observer(TyphoonIntensity)
