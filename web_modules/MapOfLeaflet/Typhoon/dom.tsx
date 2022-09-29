import React from 'react';
import { render } from 'react-dom';
import {divIcon} from "#/MapOfLeaflet/node_modules/@types/leaflet";

const getDomByDomId = (domId: string) => document.querySelector(`#${domId.replace(/^#/, "")}`);

/**
 * 警戒线
 */
const GuardLine: React.FC = () => {
    return (
        <div className="guard">
            24<br/>小<br/>时<br/>警<br/>戒<br/>线

            {/*language=SCSS*/}
            <style jsx>{`
                .guard {
                    background: transparent;
                    background-clip: padding-box;
                    border-color: transparent;
                    border-radius: 4px;
                    border-style: solid;
                    border-width: 0px;
                    color: #f08d06;
                    display: block;
                    font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
                    font-weight: bold;
                    padding: 0px;
                    user-select: none;
                    pointer-events: none;
                    white-space: nowrap;
                }
            `}</style>
        </div>
    )
};
interface NameDivProps {
    content: string
}
const NameDiv: React.FC<NameDivProps> = ({content}) => {
    return (
        <div className="typhoon-name-popup">
            {content}
            {/*language=SCSS*/}
            <style jsx>{`
                .typhoon-name-popup{
                    color: red;
                    background: transparent;
                    font-size: 14px;
                    margin: 5px 0 0 5px;
                }

            `}</style>
        </div>
    )
}
interface LatestTimeInfoProps {
    content: string
}
const LatestTimeInfo: React.FC<LatestTimeInfoProps> = ({content}) => {
    return (
        <div className="typhoon-latest-popup">
            {content}
            <style jsx>{`
                .typhoon-name-popup{
                    color: red;
                    background: transparent;
                    font-size: 14px;
                    margin: 5px 0 0 5px;
                }

            `}</style>
        </div>
    )
}
export const insertGuardLine = (domId: string) => {
    render(<GuardLine />, getDomByDomId(domId))
};
export const insertTyphoonName = (domId: string, content: string) => {
    render(<NameDiv content={content}/>, getDomByDomId(domId))
}
export const insertLatestTimeInfo = (domId: string, content: string) => {
    render(<LatestTimeInfo content={content}/>, getDomByDomId(domId))
}
interface RealTyphoonDetailProps {
    tfbh: string;
    name: string;
    data: API.TypeTyphoonPoint;
}

/**
 * 真实台风详情
 */
const RealTyphoonDetail: React.FC<RealTyphoonDetailProps> = ({ tfbh, name, data }) => {
    const formatDate = (datetime: string) => {
        const arr1 = datetime.split(" ")[0].split("-");
        const arr2 = datetime.split(" ")[1].split(":");
        const dateStr = parseInt(arr1[1])+"月"+parseInt(arr1[2])+"日"+arr2[0]+"时";
        return dateStr;
    };

    const formatVal = (value: string | number, name?: "movespeed" | "movedir") => {
        const typhoon_direction = {"N": "北", "W": "西", "E": "东", "S": "南"};
        let formatVal = "";
        value = value.toString().trim();

        if(name == "movespeed"){
            if(value != "" && value != null && value != "null"){
                formatVal =  value + "公里/小时";
            }
        }else if(name == "movedir"){
            if(value != null && value!="ALMOST" && value.length > 0 ){
                const sp = value.split("");
                for(let i=0; i < sp.length; i++){
                    formatVal += typhoon_direction[sp[i] as "N"|"W"|"E"|"S"];
                }
            }
        }else if( value !="" && value != null && value != "null"){
            formatVal = value;
        }

        return formatVal;
    };

    return (
        <div className="typhoon_routeinfo">

            <div className="typhoon_routename">
                <span>{tfbh}</span>
                <span style={{marginLeft: 4}}>{(name == data.engname ? '' : name) + data.engname}</span>
            </div>

            <div className="typhoon_detail">
                <table cellPadding="0" cellSpacing="0" className="ty_basic_info">
                    <tbody>
                    <tr>
                        <td>过去时间：</td>
                        <td>{formatDate(data.datetime)}</td>
                    </tr>
                    <tr>
                        <td>中心位置：</td>
                        <td>{ `${data.lat}N/${data.lon}E`}</td>
                    </tr>
                    <tr>
                        <td>最大风速：</td>
                        <td>{`${data.windv}米/秒`}</td>
                    </tr>
                    <tr>
                        <td>中心气压：</td>
                        <td>{`${data.pressure}百帕`}</td>
                    </tr>
                    <tr>
                        <td>移动方向：</td>
                        <td>{formatVal(data.movedir,"movedir")}</td>
                    </tr>
                    <tr>
                        <td>移动速度：</td>
                        <td>7公里/小时</td>
                    </tr>
                    </tbody>
                </table>
                <table cellPadding="0" cellSpacing="5px" className="ty_wind_info">
                    <tbody>
                    <tr>
                        <td>风圈半径</td>
                        <td>东北</td>
                        <td>东南</td>
                        <td>西南</td>
                        <td>西北</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>七级</td>
                        <td>{formatVal(data.wind7v1)}</td>
                        <td>{formatVal(data.wind7v2)}</td>
                        <td>{formatVal(data.wind7v3)}</td>
                        <td>{formatVal(data.wind7v4)}</td>
                        <td>(Km)</td>
                    </tr>
                    <tr>
                        <td>十级</td>
                        <td>{formatVal(data.wind10v1)}</td>
                        <td>{formatVal(data.wind10v2)}</td>
                        <td>{formatVal(data.wind10v3)}</td>
                        <td>{formatVal(data.wind10v4)}</td>
                        <td>(Km)</td>
                    </tr>
                    <tr>
                        <td>十二级</td>
                        <td>{formatVal(data.wind12v1)}</td>
                        <td>{formatVal(data.wind12v2)}</td>
                        <td>{formatVal(data.wind12v3)}</td>
                        <td>{formatVal(data.wind12v4)}</td>
                        <td>(Km)</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {/*language=SCSS*/}
            <style jsx>{`
                .typhoon_routeinfo{
                    color: #fff;
                    background-clip: padding-box;
                    border-radius: 0px;
                    border-style: solid;
                    border-width: 0px;
                    display: block;
                    font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
                    font-weight: bold;
                    padding: 0px;
                    position: absolute;
                    user-select: none;
                    pointer-events: none;
                    white-space: nowrap;
                    z-index: 6;
                    background: #5cacee;

                    &:before {
                        border-right: 4px solid black;
                        border-right-color: inherit;
                        left: -4px;
                        top: 8px;
                    }

                    .typhoon_routename{
                        padding-left: 10px;
                        height: 28px;
                        line-height: 28px;
                        background: #1874cd;
                        font-weight: bold;
                    }
                    .typhoon_detail{
                        padding: 5px;
                        table{
                            padding-left: 10px;
                            color: #fff;
                        }

                         .ty_basic_info{
                            width: 170px;
                         }

                        .ty_wind_info{
                            padding-left: 5px;
                            width: 220px;
                         }

                         th{
                            font-weight: bold;
                         }

                         tbody tr{
                            height: 18px;
                            line-height: 18px;
                        }
                    }
                }

            `}</style>
        </div>
    )
}


export function insertRealTyphoonDetail(detail: {tfbh: string, name: string, data: API.TypeTyphoonPoint}, domId: string) {

    render(<RealTyphoonDetail {...detail}/>, getDomByDomId(domId))
}

// function parseTyphoonForecastLabel(tfbh, name, data, key) {
//     //var arr1 = data.datetime.split(" ")[0].split("-");
//     //var arr2 = data.datetime.split(" ")[1].split(":");
//     //var dateStr = parseInt(arr1[1])+"月"+parseInt(arr1[2])+"日"+arr2[0]+"时";
//     //var dateValue = new Date(data.datetime);
//     //var dateStr = dateValue.getMonth() + 1 + '月' + dateValue.getDate() + '日' + (dateValue.getHours() < 10 ? ('0' + dateValue.getHours()) : dateValue.getHours()) + '时';
//     var timestamp = new Date(data.validtime).getTime();
//     timestamp += 8*60*60*1000;
//     var d = new Date(timestamp);
//     var dateStr = (d.getMonth()+1)+"月" + d.getDate() +"日" + d.getHours() + "时";
//     var eleStr = '<div class="typhoon_routeinfo"> <div class="typhoon_routename">' + key + ' ' + tfbh + '&nbsp&nbsp' + (name==data.engname?'':name) + data.engname + '</div> <table cellpadding="0" cellspacing="0" class="ty_basic_info"> <tbody> <tr> <td>到达时间：</td> <td>' + dateStr + '</td> </tr> <tr> <td>中心位置：</td> <td>' + data.lat + 'N/' + data.lon + 'E</td> </tr> <tr> <td>最大风速：</td> <td>' + data.windv + '米/秒</td> </tr> <tr> <td>中心气压：</td> <td>' + data.pressure + '百帕</td> </tr> </tbody> </table> </div>';
//     return eleStr;
// }
