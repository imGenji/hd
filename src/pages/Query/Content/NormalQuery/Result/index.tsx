import React, {Fragment, useState} from 'react'
import ControlBoard from "../../../commonUI/ControlBoard";
import TyphoonList from "../../components/TyphoonList";
import TyphoonDetail from "./TyphoonDetail";
import {TypeNormalQueryStore} from '../../../model/NormalQueryStore';

const Result: React.FC<{ normalQueryStore: TypeNormalQueryStore }> = ({normalQueryStore}) => {
    const [isShow, setIsShow] = useState(true);
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [selectedTyphoonIndies, setSelectedTyphoonIndies] = useState([]);
    const {typhoonData,getTyphoonDetail} = normalQueryStore
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
                    left: 520,
                    top: 30,
                }}
            />

            {
                isShow ? (
                    <Fragment>
                        <TyphoonList
                            store={normalQueryStore}
                            setIsShowDetail={setIsShowDetail}
                            selectedTyphoonIndies={selectedTyphoonIndies}
                            setSelectedTyphoonIndies={setSelectedTyphoonIndies}
                        />

                        {isShowDetail ? <TyphoonDetail
                            normalQueryStore={normalQueryStore}
                        />: null}
                    </Fragment>
                ) : null
            }

        </Fragment>
    )
}

export default Result;