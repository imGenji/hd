import React from 'react';

interface TableProps {
    columns: {
        title: React.ReactNode;
        dataIndex: string;
    }[];
    dataSource: {[index:string]: any}[];
}

const Table: React.FC<TableProps> = ({columns,dataSource}) => {
    return (
        <ul>
            <table cellPadding="0" cellSpacing="1">
                <thead>
                <tr >
                    {
                        columns.map((item,index)=>(<th key={index}>{item.title}</th>))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    dataSource.map((item,index)=> (
                        <tr
                            key={index}
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
                    max-height: 200px;
                    overflow: auto;
                    margin: 5px 0;
                    table {
                        width: 100%;
                        thead {
                            display: table-header-group;
                            vertical-align: middle;
                            border-color: inherit;
                            background: #666666;
                            color: #dbdad9;
                            tr {
                                height: 26px;
                                line-height: 26px;
                                th {
                                    font-weight: bold;
                                    display: table-cell;
                                    vertical-align: inherit;
                                    font-weight: bold;
                                    text-align: center
                                }
                            }
                        }
                        tbody {
                            background: #e9e8e7;
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
