import React, {Fragment, useState} from "react"
import {observer} from "mobx-react-lite";
import {TypeClimateStore} from "@/pages/Query/model/ClimateStore";

interface LabelSelectProps {
    monthChange?: (e: React.ChangeEvent) => void;
    climateStore:TypeClimateStore
}
const monthData =[
    {
        label:1,
        value:1
    },
    {
        label:2,
        value:2
    },
    {
        label:3,
        value:3
    },
    {
        label:4,
        value:4
    },
    {
        label:5,
        value:5
    },
    {
        label:6,
        value:6
    },
    {
        label:7,
        value:7
    },
    {
        label:8,
        value:8
    },
    {
        label:9,
        value:9
    },
    {
        label:10,
        value:10
    },
    {
        label:11,
        value:11
    },
    {
        label:12,
        value:12
    }
];
const MonthCheckbox: React.FC<LabelSelectProps> = ({climateStore}) =>{
    const [month,setMonth] = useState([])
    const [monthChecked,setMonthChecked] = useState()
    const allElection = () =>{
        setMonthChecked(true)
    };
    const monthChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {value} = e.target
        if(month.includes(value)) {
            const newArr = month.filter((item) => item!==value);
            setMonth(newArr);
        } else {
            setMonth(month.concat(value));
        }
    };
    climateStore.setQueryParams({
        monthStr:month.toString()
    });
    return(
        <Fragment>
            <div className="condition-center-time">
                <div className="condition-select">
                    <div className="condition-label">选择各月</div>
                    <div className="condition-label-s">
                        <label>
                            <input
                                name="isGoing"
                                type="checkbox"
                                value={"all"}
                                onChange={allElection}
                            />
                            <span>选择所有月</span>
                        </label>
                    </div>
                </div>
                <div className="condition-checkbox">
                    {
                        monthData.map((item,index)=>{
                            return(
                                <label key={index}>
                                    <input
                                        name="isGoing"
                                        type="checkbox"
                                        checked={monthChecked}
                                        value={item.value}
                                        onChange={monthChange}
                                    />
                                    <span>{item.label}</span>
                                </label>
                            )
                        })
                    }
                </div>
            </div>
            {/*language=SCSS*/}
            <style jsx>{`
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
                  //height: 100%;
                  margin-left: 10px;
                  //display: flex;
                  span{
                    display: inline-block;
                    margin-left: 5px;
                    color: #000;
                  }
                }
                .condition-checkbox{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                  label{
                      width: 16%;
                      display: flex;
                      align-items: center;
                      span{
                          display: block;
                          margin-left: 4px;
                      }
                  }
                }
            `}</style>
        </Fragment>
    )
};

export default observer(MonthCheckbox)
