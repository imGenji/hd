import React,{ Fragment }  from 'react';
import Input from "../../commonUI/Input";
import Card from '../../commonUI/Card'
import {observer} from "mobx-react-lite";

interface LegendInputProps {
    data: {
        label: string;
        value: string;
        color: string;
    }[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
}

const LegendInput: React.FC<LegendInputProps> = ({data, selectedValues, onChange}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value;

        if(selectedValues.includes(value)) {
            const newArr = selectedValues.filter((item) => item !== value);
            onChange && onChange(newArr);
        } else {
            onChange && onChange(selectedValues.concat(value));
        }
    };

    return (
        <Card>
            <div className="card">
                {
                    data.map((item,index)=>{
                        return(
                            <Fragment key={index}>
                                <Input
                                    onChange={handleChange}
                                    type="checkbox"
                                    value={item.value}
                                    name = "country"
                                    label={item.label}
                                    checkedSelection={selectedValues.includes(item.value)}
                                    styleWrap={{width:"20%",display: "flex",justifyContent: "center",alignItems: "center"}}
                                />
                                <span
                                    style={{background:item.color}}
                                    className="line"
                                ></span>
                                <span
                                    style={{background:item.color}}
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
        </Card>
    )
};

export default observer(LegendInput);
