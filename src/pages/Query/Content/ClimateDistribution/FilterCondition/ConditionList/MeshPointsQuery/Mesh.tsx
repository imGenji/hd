import React, { Fragment }  from "react"
import Skeleton from "../../../../../commonUI/Skeleton";
import Input from "../../../../../commonUI/Input";
import {observer} from "mobx-react-lite";
import {TypeClimateStore} from "@/pages/Query/model/ClimateStore";

const Mesh: React.FC<{climateStore: TypeClimateStore}> =({climateStore}) =>{
    //编号搜索
    const numberChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        climateStore.setQueryParams({
            locateStr: e.target.value
        });
    };

    return(
        <Fragment>
            {/*编号*/}
            <Skeleton
                label="网格"
                content={
                    <div className="inputWrap">
                        <Input
                            type="text"
                            name="tfbh"
                            value={climateStore.queryParams.locateStr}
                            placeholder="请输入网格点编号, 或经纬度坐标"
                            onChange={numberChange}
                        />
                    </div>
                }
            />
            {/*language=SCSS*/}
            <style jsx>{`
                .inputWrap{
                    border: 1px solid #7c7c7c;
                    margin: 10px 0;
                }
            `}</style>
        </Fragment>
    )
};


export default observer(Mesh)
