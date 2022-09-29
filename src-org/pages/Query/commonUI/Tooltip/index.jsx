import React from 'react';
const columns = [
    {title:"风圈半径"},
    {title:"东北"},
    {title:"东南"},
    {title:"西南"},
    {title:"西北"}
]
// const tooltipData = [{
//     title:"标题",
//     list:[
//         {
//             title:"过去时间",
//             text:"8月15日14时"
//         },
//         {
//             title:"过去时间",
//             text:"8月15日14时"
//         },
//         {
//             title:"过去时间",
//             text:"8月15日14时"
//         }
//     ],
//     table:[
//         {
//             dataSource1:"七级",
//             dataSource2:"22",
//             dataSource3:"33",
//             dataSource4:"44",
//             dataSource5:"55",
//         }
//     ]
// }];
const Tooltip = ({tooltipData}) =>{
    return(
        <div className="tooltip">
            <div className="tooltip_title">
                {tooltipData.map(item=>item.title)}
            </div>
            <div className="tooltip_content">
                {
                    tooltipData.map((item)=>{
                        return(
                            item.list.map((item,index)=>{
                                return(
                                    <div key={index} className="tooltip_content_list">
                                        <div
                                            key={index}
                                            className="title"
                                        >{item.title}
                                        </div>
                                        :
                                        <div className="text">{item.text}</div>
                                    </div>

                                )
                            })
                        )
                    })
                }
                <table className="tooltip_content_table">
                    <thead>
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
                    <tbody>
                    {
                        tooltipData.map((item)=>{
                            return(
                                item.table.map((item,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>
                                                {item.dataSource1}
                                            </td>
                                            <td>
                                                {item.dataSource2}
                                            </td>
                                            <td>
                                                {item.dataSource3}
                                            </td>
                                            <td>
                                                {item.dataSource4}
                                            </td>
                                            <td>
                                                {item.dataSource5}
                                            </td>
                                            <td>(Km)</td>
                                        </tr>
                                    )
                                })
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            {/*language=SCSS*/}
            <style jsx>{`
                .tooltip{
                    width: 220px;
                    height: 260px;
                    color:#fbfdfe ;
                    font-weight: bold;
                    .tooltip_title{
                        height: 10%;
                        background: #1774cd;
                        display: flex;
                        align-items: center;
                        padding-left: 6px;
                    }
                    .tooltip_content{
                        height: 90%;
                        background: #5cacee;
                        padding-left: 6px;
                        padding-top: 4px;
                        .tooltip_content_list{
                            width: 100%;
                            display: flex;
                            .text{
                                margin-left: 15px;
                            }
                        }
                        .tooltip_content_table{
                            margin-top: 6px;
                            width: 100%;
                        }
                    }
                }
            `}</style>
        </div>
    )
};
export default Tooltip;