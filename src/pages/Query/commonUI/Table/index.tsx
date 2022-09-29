import React from 'react';

interface TableProps {
    style?: React.CSSProperties;
    activeDataIdx?: number;
    tableTitle?: React.ReactNode;
    columns: {
        title: React.ReactNode;
        dataIndex?: string;
    }[];
    dataSource?: {[index:string]: any}[];
    onMouseOut?: (e: React.MouseEvent) => void;
    onMouseOver?: (index: number) => void;
    onClick?: (index: number) => void;
    hoverBackground?: string;
    theadStyle?: React.CSSProperties;
    tbodyStyle?: React.CSSProperties;
}

const Table: React.FC<TableProps> = ({style,tableTitle,columns,activeDataIdx,onMouseOut,onMouseOver,dataSource,onClick,hoverBackground,theadStyle,tbodyStyle}) => {

    return (
        <ul style={style}>
            <p>{tableTitle}</p>
            <table cellPadding="0" cellSpacing="1">
                <thead style={theadStyle}>
                <tr >
                    {
                        columns.map((item,index)=>(<th key={index}>{item.title}</th>))
                    }
                </tr>
                </thead>
                <tbody style={tbodyStyle} onMouseOut={onMouseOut || (() => {})}>
                {
                    dataSource.map((item,index)=> (
                        <tr
                            key={index}
                            onClick={()=> onClick && onClick(index)}
                            onMouseOver={() => onMouseOver && onMouseOver(index)}
                            style={{backgroundColor: activeDataIdx == index ? hoverBackground : ""}}
                        >
                            {columns.map((column, i) => (
                                <td key={i}>
                                    {item[column.dataIndex]}
                                </td>
                            ))}
                        </tr>
                    ))
                }
                </tbody>

            </table>

            {/*language=SCSS*/}
            <style jsx>{`
                ul{
                    height: 200px;
                    overflow: auto;
                    margin: 5px 0;
                    padding-right: 3px;
                    max-height: 360px;
                    p{
                        margin: 10px 0 0 10px;
                        color: #5391cf;
                        font-size: 16px;
                    }
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        height: 220px;
                        max-height: 220px;
                        overflow-y: scroll;
                        thead {
                            display: table-header-group;
                            vertical-align: middle;
                            border-color: inherit;
                            tr {
                                height: 21px;
                                line-height: 21px;
                                th {
                                    font-weight: bold;
                                    //color: #4d94f8;
                                    display: table-cell;
                                    vertical-align: inherit;
                                    text-align: center
                                }
                            }
                        }
                        tbody {
                            display: table-row-group;
                            vertical-align: middle;
                            border-color: inherit;
                            tr:hover{
                              background: ${hoverBackground};
                            }
                            tr {
                                height: 21px;
                                line-height: 21px;
                                td {
                                    text-align: center;
                                    border-top: 1px solid #666;
                                    border-left: 1px solid #666;
                                }
                            }
                        }
                    }
                }
            `}</style>
        </ul>
    )
};

export default Table;
