import React from 'react';

interface SelectProps {
    selectData: {
        label: string | number;
        value: string | number;
    }[];
    onChange?: (e: React.ChangeEvent) => void;
    style?: React.CSSProperties;
    placeholder?: string;
}

const Select: React.FC<SelectProps> = ({selectData,onChange,style,placeholder}) => {

    return (
        <select
            onChange={onChange}
            className="select"
            style={style || {}}
            placeholder={placeholder}
        >
            {
                selectData.map((item,index)=>{
                    return(
                        <option className="select_option"
                                key={index}
                                value={item.value}
                        >
                            {item.label}
                        </option>
                    )
                })
            }

            {/*language=SCSS*/}
            <style jsx>{`
                .select{
                    background-position-x: 60px;
                    background: url(${require('./img/u1761.png')}) no-repeat 60px center transparent;
                    text-indent: 0;
                    width:80px;
                    margin-left: 30px;
                    border: 1px solid #888;
                    height: 24px;
                    line-height: 24px;
                    padding-left: 10px;
                    border-radius: 5px;
                    outline: none;
                }
            `}</style>
        </select>
    )
};

export default Select;
