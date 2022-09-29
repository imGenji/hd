import React from 'react';
import PropTypes from 'prop-types';

const Table = ({style,tableTitle,columns,onMouseOut,onMouseOver,dataSource,onClick,trIndex,hoverBackground,border,theadStyle,tbodyStyle}) => {
    return (
        <ul style={style}>
            <p>{tableTitle}</p>
            <table cellPadding="0" cellSpacing="1">
                <thead style={theadStyle}>
                <tr >
                    {
                        columns.map((item,index)=>{
                            return(
                                <th key={index}>{item.title}</th>
                            )
                        })
                    }
                </tr>
                </thead>
                <tbody style={tbodyStyle} onMouseOut={onMouseOut}>
                {
                    dataSource.map((item,index)=>{
                        return(
                            <tr
                                key={index}
                                onClick={()=>onClick(index)}
                                onMouseOver={() =>onMouseOver(index)}

                            >
                                {
                                    function(){
                                        const tdArr = [];
                                        for(let i in item){
                                            tdArr.push(<td key={i} style={{borderLeft:border,borderTop:border}}>{item[i]}</td>);
                                        }
                                        return tdArr;
                                    }()
                                }
                            </tr>
                        )
                    })
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
                                height: 26px;
                                line-height: 26px;
                                th {
                                    font-weight: bold;
                                    //color: #4d94f8;
                                    display: table-cell;
                                    vertical-align: inherit;
                                    font-weight: bold;
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
                                height: 26px;
                                line-height: 26px;
                                td {
                                    text-align: center;
                                }
                            }

                        }
                    }
                }
            `}</style>
        </ul>
    )
};
Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    })),
    onClick:PropTypes.func,
    onMouseOut:PropTypes.func,
    onMouseOver:PropTypes.func,
    hoverBackground:PropTypes.string,
    border:PropTypes.string,

};
export default Table;
