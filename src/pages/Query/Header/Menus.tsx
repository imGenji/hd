import React, {useContext, useEffect} from "react";
import { observer } from 'mobx-react-lite';
import { EnumHeaderMenus } from '../constants';
import { TypeHeaderMenuStore } from "../model/HeaderMenuStore";
import {MapUtilCtx} from "#/MapOfLeaflet";
const Menus: React.FC<{headerMenuStore: TypeHeaderMenuStore}> = ({ headerMenuStore }) => {
    const { selectedHeaderMenu, setHeaderMenu } = headerMenuStore;
    const mapUtil = useContext(MapUtilCtx);
    useEffect(() => {
        // setHeaderMenu(EnumHeaderMenus.climateDistribution.value)
        // setHeaderMenu(EnumHeaderMenus.realTimeMonitor.value)
    }, []);
    const changeHeaderTab = (value: string) => {
        mapUtil.typhoon.clearAllLayer();
        setHeaderMenu(value)
    };
    return (
        <ul className="query1ist_1">
            {Object.values(EnumHeaderMenus).map(({label, value, redirectUrl}) => {
                return (
                    <li
                        className="query_item"
                        key={value}
                        onClick={() => changeHeaderTab(value)}
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

export default observer(Menus);
