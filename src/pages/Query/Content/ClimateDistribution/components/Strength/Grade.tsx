import React, {Fragment, useState} from "react"
import {observer} from "mobx-react-lite";
import {EnumTyphoonStrengthLegend, EnumTyphoonStrengthType} from '../../../../constants/EnumTyphoon'
import {TypeClimateStore} from "@/pages/Query/model/ClimateStore";

const Grade : React.FC<{climateStore: TypeClimateStore}> =({climateStore}) =>{
    const [gradeCheck,setGradeCheck] = useState([])

    const gradeChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {value} = e.target
        if(gradeCheck.includes(value)) {
            const newArr = gradeCheck.filter((item) => item!==value);
            setGradeCheck(newArr);
        } else {
            setGradeCheck(gradeCheck.concat(value));
        }
    };
    climateStore.setQueryParams({
        strengthStr:gradeCheck.toString()
    });
    return(
        <Fragment>
            <div className="TyphoonIntensity_checkBox">
                {
                    Object.values(EnumTyphoonStrengthLegend).filter(item => item.value !== EnumTyphoonStrengthType.TC).map((item,index)=>{
                        return(
                            <label key={index}>
                                <input
                                    name="isGoing"
                                    type="checkbox"
                                    value={item.value}
                                    onChange={gradeChange}
                                />
                                <span>{item.label}</span>
                            </label>
                        )
                    })
                }
            </div>

            {/*language=SCSS*/}
            <style jsx>{`
                .TyphoonIntensity_checkBox{
                  width: 100%;
                  display: flex;
                  flex-wrap: wrap;
                  label{
                    width: 30%;
                    span{
                    }
                  }
                }
            `}</style>
        </Fragment>
    )
};


export default observer(Grade)
