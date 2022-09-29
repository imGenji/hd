import React, { Fragment } from "react"
import {observer} from "mobx-react-lite";
import {TypeClimateStore} from "@/pages/Query/model/ClimateStore";

const Range: React.FC<{climateStore: TypeClimateStore}> =({climateStore}) =>{

    const pressureRangeStart = (e: React.ChangeEvent<HTMLInputElement>) =>{
        climateStore.setQueryParams({
            minpressure: e.target.value
        });
    };
    const pressureRangeEnd = (e: React.ChangeEvent<HTMLInputElement>) =>{
        climateStore.setQueryParams({
            maxpressure: e.target.value
        });
    };
    const windSpeedRangeStart = (e: React.ChangeEvent<HTMLInputElement>) =>{
        climateStore.setQueryParams({
            minvelocity: e.target.value
        });
    };
    const windSpeedRangeEnd = (e: React.ChangeEvent<HTMLInputElement>) =>{
        climateStore.setQueryParams({
            maxvelocity: e.target.value
        });
    };
    return(
        <Fragment>
            <div className="Range">
                <span className="label">气压范围</span>
                <div className="input_wrap">
                    <input
                        type="text"
                        onChange={pressureRangeStart}
                        value={climateStore.queryParams.minpressure}
                    />
                </div>
                <div className="company">HPA</div>
                <div className="line"></div>
                <div className="input_wrap">
                    <input
                        type="text"
                        onChange={pressureRangeEnd}
                        value={climateStore.queryParams.maxpressure}
                    />
                </div>
                <div className="company">HPA</div>
            </div>
            <div className="Range">
                <span className="label">风速范围</span>
                <div className="input_wrap">
                    <input
                        type="text"
                        onChange={windSpeedRangeStart}
                        value={climateStore.queryParams.minvelocity}
                    />
                </div>
                <div className="company">M/S</div>
                <div className="line"></div>
                <div className="input_wrap">
                    <input
                        type="text"
                        onChange={windSpeedRangeEnd}
                        value={climateStore.queryParams.maxvelocity}
                    />
                </div>
                <div className="company">M/S</div>
            </div>
            {/*language=SCSS*/}
            <style jsx>{`
              .Range{
                width: 100%;
                span{
                  float: left;
                  width: 50px;
                  height: 20px;
                  line-height: 20px;
                  text-align: center;
                  background: #777777;
                  color: #fff;
                  margin-top: 10px;
                  margin-right: 5px;
                }
                .input_wrap{
                  float: left;
                  border: 1px solid #7c7c7c;
                  margin: 10px 0;
                  width: 18%;
                  margin-right: 5px;
                }
                .company{
                  float: left;
                  line-height: 40px;
                  margin-right: 5px;
                }
                .line{
                  float: left;
                  width: 10px;
                  height: 1px;
                  background: #777777;
                  margin-top: 20px;
                  margin-right: 5px;
                }
              }
            `}</style>
        </Fragment>

    )
};


export default observer(Range)
