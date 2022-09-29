import React, { Fragment } from "react"
import Skeleton from "../../../../../commonUI/Skeleton";
import {observer} from "mobx-react-lite";
import LabelSelect from '../../../components/LabelSelect'
import {TypeClimateStore} from "@/pages/Query/model/ClimateStore";

const Year : React.FC<{climateStore: TypeClimateStore}> =({climateStore}) =>{

    //开始时间
    const meshBegChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        climateStore.setQueryParams({
            MeshBeginTime:e.target.value
        });
    };
    //结束时间
    const meshEndChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        climateStore.setQueryParams({
            MeshEndTime:e.target.value
        });
    };
    return(
        <Fragment>
            <Skeleton
                label="时间"
                content={
                    <div>
                        <div className="condition-center-time">
                            <LabelSelect
                                label="开始时间"
                                onChange={meshBegChange}
                            />
                            <LabelSelect
                                label="结束时间"
                                onChange={meshEndChange}
                            />
                        </div>
                    </div>
                }
            />

            {/*language=SCSS*/}
            <style jsx>{`
              .condition-center-time{
                margin: 5px 0;
                .condition-select{
                  width: 100%;
                  height: 25px;
                  line-height: 25px;
                  margin-bottom: 5px;
                }
                .condition-label{
                  float: left;
                  width: 30%;
                  background: RGB(81,149,219);
                  text-align: center;
                  color: #fff;
                }
                .condition-label-s{
                  float: left;
                  width: 60%;
                  height: 100%;
                  margin-left: 20px;
                }
              }
            `}</style>
        </Fragment>
    )
};


export default observer(Year)
