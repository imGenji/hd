import React, { Fragment,useState } from "react";
import Skeleton from "../../../commonUI/Skeleton";
import {observer} from "mobx-react-lite";
import LabelSelect from './LabelSelect'
import MonthCheckbox from './MonthCheckbox'
import { TypeClimateStore } from '../../../model/ClimateStore';

interface YearProps {
    climateStore: TypeClimateStore,
}

const TimeRadio = [
    {
        label:"累年",
        value:"Years"
    },
    {
        label:"累年各月",
        value:"YearsMonths"
    }
];
const Year: React.FC<YearProps> =({climateStore}) =>{

    const [yearRadio, setYearRadio] = useState('Years');
    // 累年/累年各月radio
    const yearsChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setYearRadio(e.target.value)
    };
    //开始时间
    const begOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        climateStore.setQueryParams({
            startYear:e.target.value
        });
    };
    //结束时间
    const endOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        climateStore.setQueryParams({
            endYear:e.target.value
        });
    };
    return(
        <Fragment>
            <Skeleton
                label="时间"
                content={
                    <Fragment>
                        <div>
                            <div className="condition-center-t">
                                {
                                    TimeRadio.map((item,index)=>{
                                        return(
                                            <label htmlFor={item.value} key={index}>
                                                <input
                                                    value={item.value}
                                                    id={item.value}
                                                    name="yearName"
                                                    type="radio"
                                                    onChange={yearsChange}
                                                />
                                                <span>{item.label}</span>
                                            </label>
                                        )
                                    })
                                }
                            </div>
                            <div className="condition-center-time">
                                <LabelSelect
                                    label="开始时间"
                                    onChange={begOnChange}
                                    // value={begValue}
                                />
                                <LabelSelect
                                    label="结束时间"
                                    onChange={endOnChange}
                                    // value={endValue}
                                />
                            </div>
                        </div>
                        {
                            yearRadio=="YearsMonths" ?
                            <MonthCheckbox
                                climateStore={climateStore}
                            /> : null
                        }
                    </Fragment>
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


