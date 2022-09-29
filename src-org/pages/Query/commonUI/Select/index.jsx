import React from 'react';
import PropTypes from 'prop-types';
const tsIcon = require('./img/u1761.png');

const Select = ({selectData,onChange,style,placeholder}) => {
    return (
        <select onChange={onChange}  className="select" style={style}>
            {placeholder}
            {/*<option value='' style={{display:"none"}}>placeholder</option>*/}
            {
                selectData.map((item,index)=>{
                    return(
                        <option className="select_option"
                                key={index}
                                value={item.value}
                        >{item.label}
                        </option>
                    )
                })
            }
            {/*language=SCSS*/}
            <style jsx>{`
                .select{
                    background-position-x: 60px;
                    background: url(${tsIcon}) no-repeat 60px center transparent;
                    text-indent: 0;
                    width:80px;
                    margin-left: 30px;
                    border: 1px solid #888;
                    height: 24px;
                    line-height: 24px;
                    padding-left: 10px;
                    -webkit-border-radius: 5px;
                    -moz-border-radius: 5px;
                    border-radius: 5px;
                }
            `}</style>
        </select>
    )
};

Select.propTypes = {
    selectData: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        value: PropTypes.number
    })),
    onChange: PropTypes.func,
    placeholder:PropTypes.string,
    style:PropTypes.object
}

export default Select;
