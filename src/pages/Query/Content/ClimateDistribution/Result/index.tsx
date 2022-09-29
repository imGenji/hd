import React, {Fragment, useEffect, useState} from 'react'
import TyphoonList from "../../components/TyphoonList";
import {TypeClimateStore} from '../../../model/ClimateStore';
import ControlBoard from "@/pages/Query/commonUI/ControlBoard";
import StatisticsTable from "./StatisticsTable";
import {EnumHeaderMenus} from "@/pages/Query/constants";

const Result: React.FC<{ climateStore: TypeClimateStore }> = ({climateStore}) => {
    const [isShow, setIsShow] = useState(true);
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [selectedTyphoonIndies, setSelectedTyphoonIndies] = useState([]);
    const {typhoonData,getTyphoonDetail,setQueryParams} = climateStore;
    useEffect(() => {

    }, []);
    return (
        <Fragment>
            <ControlBoard
                name="隐藏查询结果"
                closeName="显示查询结果"
                onClick={() => {
                    setIsShow(!isShow)
                }}
                style={{
                    position: "absolute",
                    width: 270,
                    left: 500,
                    top: 30,
                }}
            />
            {
                isShow ? (
                    <Fragment>
                        <TyphoonList
                            store={climateStore}
                            setIsShowDetail={setIsShowDetail}
                            selectedTyphoonIndies={selectedTyphoonIndies}
                            setSelectedTyphoonIndies={setSelectedTyphoonIndies}
                        />
                        <StatisticsTable
                            climateStore={climateStore}
                        />
                    </Fragment>
                ) : null
            }
        </Fragment>
    )
};


export default Result;
