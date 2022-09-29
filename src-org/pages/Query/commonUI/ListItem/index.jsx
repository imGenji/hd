import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({listData, value, onChange, mode}) => {
    const values = Array.isArray(value) ? value : [value];
    return (
        <ul className="list-item">
            {listData.map(({label, value: val}) => {
                return (
                    <li
                        key={val}
                        className={`query_type ${values.includes(val) ? "active" : ""}`}
                        onClick={() => {
                            let changeVal = val;
                            if(mode === "multiple") changeVal = [...values, val];
                            onChange && onChange(changeVal, values.includes(val));
                        }}
                    >
                        <p>{label}</p>
                    </li>
                )
            })}

            {/*language=SCSS*/}
            <style jsx>{`
                .list-item{
                  padding:5px 10px;
                  width: 120px;
                  height:150px;
                  background: rgba(0,0,0,0.5);
                    .query_type {
                        width: 90px;
                        height: 20px;
                        margin: 20px auto;
                        border: 1px solid #fff;
                        border-radius: 2px;
                        p{
                            cursor: pointer;
                            text-align: center;
                            color: #fff;
                            line-height: 20px;
                        }
                        &.active{
                            background: #5195db;
                        }
                    }
                }
            `}</style>
        </ul>
    )
};

ListItem.propTypes = {
    listData: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })),
    // 当mode="multiple"时,value值数数组
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    onChange: PropTypes.func,
    //mode="multiple"是多选模式
    mode: PropTypes.oneOf(["multiple"]),
}

export default ListItem;