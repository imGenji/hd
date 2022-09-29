import React from 'react';
import PropTypes from 'prop-types';

interface InputProps {
    type?: string;
    style?: React.CSSProperties;
    styleWrap?: React.CSSProperties;
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent) => void;
    name?: string;
    id?: string;
    label?: string;
    checkedSelection?: boolean;
}

const Input: React.FC<InputProps> = ({type,style,placeholder,value,onChange,name,id,label,styleWrap,checkedSelection}) =>{
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
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
    style: PropTypes.object,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange:PropTypes.func
};

export default Input
