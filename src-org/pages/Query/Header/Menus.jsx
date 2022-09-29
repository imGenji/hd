import React,{useEffect} from "react";
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { EnumHeaderMenus } from '../constants';
import EnumEnv from "@/constants/EnumEnv";
// realTimeMonitor: {
//     label: "实时监测",
//         value: "realTimeMonitor",
// },
// normalQuery: {
//     label: "一般查询",
//         value: "normalQuery",
// },
// areaQuery: {
//     label: "区划查询",
//         value: "areaQuery",
// },
// historyTyphoon: {
//     label: "历史台风查询",
//         value: "historyTyphoon",
// },
// guideToUse: {
//     label: "使用指南",
//         value: "guideToUse",
//         redirectUrl: EnumEnv.guideToUseUrl,
// }
const Menus = ({ headerMenuStore }) => {
    const { selectedHeaderMenu, setHeaderMenu } = headerMenuStore;
    useEffect(() => {
        setHeaderMenu('historyTyphoon')
    }, []);
    return (
        <ul className="query1ist_1">
            {Object.values(EnumHeaderMenus).map(({label, value, redirectUrl}) => {
                return (
                    <li
                        className="query_item"
                        key={value}
                        onClick={() => setHeaderMenu(value)}
                    >
                        {(() => {
                            if(redirectUrl){
                                return <p><a target="_blank" href={redirectUrl}>{label}</a></p>
                            }else {
                                return (<p className={selectedHeaderMenu == value ? "selected" : ""}>{label}</p>)
                            }
                        })()}
                    </li>
                )
            })}

            {/*language=SCSS*/}
            <style jsx>{`
                .query1ist_1{
                    float: left;
                    margin-left: 50px;
                    overflow: hidden;

                    .query_item{
                        float: left;
                        margin-right: 5px;
                        p{
                            cursor: pointer;
                            height: 35px;
                            line-height: 35px;
                            margin: 10px 0;
                            padding: 0 5px;
                            text-align: center;
                            color: #fff;
                            font-size: 15px;
                            &:hover{
                                background: #e0e0e2;
                                color: #393b54;
                                font-weight: bold;
                                border-radius: 5px;
                            }
                            &.selected{
                                background: #e0e0e2;
                                color: #393b54;
                                border-radius: 5px;
                                font-weight: bold;
                            }
                        }

                        a{
                            color: #fff;
                        }
                    }
                }
            `}</style>
        </ul>
    );
}

Menus.propTypes = {
    headerMenuStore: PropTypes.object.isRequired
}

export default observer(Menus);
