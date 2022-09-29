import React, { useState, useContext } from 'react';
import {observer} from 'mobx-react-lite';
import { MapUtilCtx } from '#/MapOfLeaflet'
import { helper } from '@/utils/T'
import LegendContent, { TypeLegendContentItem } from './LegendContent';
import LegendInput from './LegendInput';

import { EnumAreaLegend, EnumForecastOrg, EnumForecastOrgType, EnumTyphoonStrengthLegend, EnumTyphoonStrengthType } from '../../constants/EnumTyphoon';

const forecastData = Object.values(EnumForecastOrg);

const legends = [
    {
        label: "台风图例",
        value: "typhoon",
        data: [{
            headline: "台风等级",
            data: Object.values(EnumTyphoonStrengthLegend).filter(item => item.value !== EnumTyphoonStrengthType.TC)
        }],
    },
    {
        label: "区域图例",
        value: "area",
        data: EnumAreaLegend,
    },
    {
        label: "预报机构",
        value: "prediction",
        data: forecastData
    },
];

const Legend: React.FC = () =>{
    const mapUtil = useContext(MapUtilCtx);

    const [selectedLegends, setSelectedLegends] = useState([]);
    const [selectedForecastOrg, setForecastOrg] = useState([
        EnumForecastOrgType.BABJ,
        EnumForecastOrgType.RJTD,
        EnumForecastOrgType.PGTW,
    ]);

    const handleForecastOrgChange = (values: string[]) => {
        setForecastOrg(values);

        // 隐藏和显示预报台风
        mapUtil.typhoon.setForecastOrgTyphoonVisible(values as API.TypeForecastOrg[], "show");
        const hideForecastOrg = helper.difference([
            EnumForecastOrgType.BABJ,
            EnumForecastOrgType.RJTD,
            EnumForecastOrgType.PGTW,
        ], values);
        mapUtil.typhoon.setForecastOrgTyphoonVisible(hideForecastOrg as API.TypeForecastOrg[], "hidden");
    };

    return (
        <div className="Legend_Wrap">
            {
                legends.map(({data, value},index) => {
                    if(!selectedLegends.includes(value)) return null;
                    if(["typhoon", "area"].includes(value)){
                        return <LegendContent key={index} data={data as TypeLegendContentItem[]} />
                    }else {
                        return <LegendInput
                            key={index}
                            data={data as typeof forecastData}
                            onChange={handleForecastOrgChange}
                            selectedValues={selectedForecastOrg}
                        />
                    }
                })
            }

            <div className="btns">
                {
                    legends.map(({ label, value }, index) => (
                        <Btn
                            key={index}
                            value={value}
                            active={selectedLegends.includes(value)}
                            onClick={(value) => {
                                const selectedIdx = selectedLegends.indexOf(value);
                                if(selectedIdx === -1){
                                    setSelectedLegends([...selectedLegends, value])
                                }else {
                                    const newSelectedLegends = [...selectedLegends];
                                    newSelectedLegends.splice(selectedIdx, 1);
                                    setSelectedLegends(newSelectedLegends)
                                }
                            }}
                        >
                            {label}
                        </Btn>
                    ))
                }
            </div>

            {/*language=SCSS*/}
            <style jsx>{`
                .Legend_Wrap{
                    position: fixed;
                    z-index: 1000;
                    left: 10px;
                    width: 270px;
                    flex-wrap: nowrap;
                    bottom: 10px;
                    
                    .btns{
                        display: flex;
                    }
                }
            `}</style>
        </div>
    )
}

export default observer(Legend);

interface BtnProps {
    active?: boolean;
    value: string;
    onClick?: (value: string) => void;
}
const Btn: React.FC<BtnProps> = ({children, active, value, onClick}) => {

    return (
        <button
            className={`btn ${active ? "active" : ""}`}
            onClick={() => onClick(value)}
        >
            {children}

            {/*language=SCSS*/}
            <style jsx>{`
                .btn{
                    //float: left;
                    width: 70px;
                    text-align: center;
                    height: 30px;
                    line-height: 30px;
                    background: #63b8ff;
                    border-radius: 0px;
                    &.active{
                        background: #0986f0;
                    }
                    
                    &:first-child{
                        border-radius: 15px 0px 0px 15px;
                    }
                    &:last-child{
                        border-radius: 0px 15px 15px 0px;
                    }
                }
            `}</style>
        </button>
    )
}
