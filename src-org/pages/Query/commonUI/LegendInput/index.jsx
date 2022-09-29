import React,{ Fragment,useState }  from 'react';
import Input from "@/pages/Query/commonUI/Input";
import {observer} from "mobx-react-lite";

const LegendInput = ({LegendDataRight,legendStore}) => {
    const {checkValue,changeCheckValue} = legendStore
    const handleChangeInput1 = (e) =>{
        const target = e.target;
        const {value} = target
        if(checkValue.includes(value)) {
            const newArr = checkValue.filter((item) => item!==value);
            changeCheckValue(newArr);
        } else {
            changeCheckValue(checkValue.concat(value));
        }
    };

    const lineBg = ["#669900","#00FFFF","#FF99FF"]
    return (
        <div className="card">
            {
                LegendDataRight.map((item,index)=>{
                    return(
                        <Fragment key={index}>
                            <Input
                                onChange={handleChangeInput1}
                                type="checkbox"
                                value={item.value}
                                name = "country"
                                label={item.label}
                                // checkedSelection={true}
                                styleWrap={{width:"20%",display: "flex",justifyContent: "center",alignItems: "center"}}
                            />
                            <span
                                style={{background:item.bg}}
                                className="line"
                            ></span>
                            <span
                                style={{background:item.bg}}
                                className="line"
                            ></span>
                        </Fragment>
                    )
                })
            }
            {/*language=SCSS*/}
            <style jsx>{`
            .card{
                display: flex;
                align-items: center;
                width: 100%;
                .line{
                    margin-left: 2px;
                    display: block;
                    width: 12px;
                    height: 2px;
                    background: #1D2440;
                }
            }
        `}</style>
        </div>
    )
};

export default observer(LegendInput);
