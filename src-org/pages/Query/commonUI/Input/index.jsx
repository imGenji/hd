import React from 'react';
import PropTypes from 'prop-types';

const Input = ({type,style,placeholder,value,onChange,name,id,label,styleWrap,checkedSelection}) =>{
    return(
        <div style={styleWrap}>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                style={style}
                value={value}
                onChange={onChange}
                id={id}
                checked={checkedSelection}
            />
            <label htmlFor={id}>{label}</label>
            {/*language=SCSS*/}
            <style jsx>{`
                input{
                  width: 100%;
                  height: 26px;
                  border-radius: 2px;
                  padding:0 5px;
                }
                label{
                    display: flex;
                    flex-wrap: nowrap;
                    width: 100%;
                }
            `}</style>
        </div>
    )
};

Input.propTypes = {
    value: PropTypes.node,
    type: PropTypes.string,
    style: PropTypes.object,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange:PropTypes.func
};

export default Input