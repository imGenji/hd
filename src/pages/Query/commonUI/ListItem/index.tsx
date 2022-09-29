import React from 'react';
type TypeVal = string | number;

interface ListItemProps {
    listData: {
        label: string;
        value: TypeVal;
    }[];
    value: TypeVal | TypeVal[];
    onChange?: (value: TypeVal | TypeVal[], selected: boolean) => void;
    mode?: "multiple" | "";
}

const ListItem: React.FC<ListItemProps> = ({listData, value, onChange, mode}) => {
    const values: TypeVal[] = Array.isArray(value) ? value : [value];

    return (
        <ul className="list-item">
            {listData.map(({label, value: val}, index) => {
                return (
                    <li
                        key={index}
                        className={`query_type ${values.includes(val) ? "active" : ""}`}
                        onClick={() => {
                            let changeVal: TypeVal | TypeVal[];
                            changeVal = val;
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
                  //width: 120px;
                  background: rgba(0,0,0,0.5);
                    .query_type {
                        height: 20px;
                        margin: 20px auto;
                        border: 1px solid #fff;
                        border-radius: 2px;
                        p{
                            cursor: pointer;
                            text-align: center;
                            color: #fff;
                            line-height: 20px;
                            padding: 0 10px;
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

export default ListItem;
