import React, { Fragment }  from "react"
import Skeleton from "../../../../../commonUI/Skeleton";
import {observer} from "mobx-react-lite";
import Select from "@/pages/Query/commonUI/Select";
import { TypeClimateStore } from '../../../../../model/ClimateStore';

const tsIcon = require('../../../../../commonUI/Select/img/u1761.png');

const selectData = [
    {
        label:"台湾以东洋面",
        value:"台湾以东洋面"
    },
    {
        label:"南海中东部",
        value:"南海中东部"
    },
    {
        label:"渤海海峡",
        value:"渤海海峡"
    },
    {
        label:"北部湾",
        value:"北部湾"
    },
    {
        label:"琼州海峡",
        value:"琼州海峡"
    },
    {
        label:"南海西北部",
        value:"南海西北部"
    },
    {
        label:"东海北部",
        value:"东海北部"
    },
    {
        label:"南海西南部",
        value:"南海西南部"
    },
    {
        label:"东海北部",
        value:"东海北部"
    },
    {
        label:"东海南部",
        value:"东海南部"
    },
    {
        label:"台湾海峡",
        value:"台湾海峡"
    },
    {
        label:"巴士海峡",
        value:"巴士海峡"
    },
    {
        label:"南海中西部",
        value:"南海中西部"
    },
    {
        label:"黄海北部",
        value:"黄海北部"
    },
    {
        label:"黄海南部",
        value:"黄海南部"
    },
    {
        label:"南海东北部",
        value:"南海东北部"
    },
    {
        label:"渤海",
        value:"渤海"
    },
    {
        label:"黄海中部",
        value:"黄海中部"
    }
];
const Sea: React.FC<{climateStore: TypeClimateStore}> =({climateStore})=>{

    const seaChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        climateStore.setQueryParams({
            sea: e.target.value
        });
    };
    return(
        <Fragment>
            {/*编号*/}
            <Skeleton
                label="海区"
                content={
                    <div className="inputWrap">
                        <Select
                            selectData={selectData }
                            style={{width:"100%",margin:"0",borderRadius:"0px",background: "url("+tsIcon+") no-repeat 200px center transparent"}}
                            onChange={seaChange}
                        />
                    </div>
                }
            />
            {/*language=SCSS*/}
            <style jsx>{`
                .inputWrap{
                    margin: 10px 0;
                }
            `}</style>
        </Fragment>
    )
};


export default observer(Sea)
