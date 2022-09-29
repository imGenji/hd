import React, { Fragment, useEffect }  from "react"
import Skeleton from "../../../../commonUI/Skeleton";
import Input from "../../../../commonUI/Input";
import {observer} from "mobx-react-lite";
import { TypeNormalQueryStore } from '../../../../model/NormalQueryStore';

const Number: React.FC<{normalQueryStore: TypeNormalQueryStore}> =({normalQueryStore}) =>{
    useEffect(() => {
        normalQueryStore.setShowQueryResult(false);
        return() => {
            normalQueryStore.setQueryParams({
                tfbhs: ''
            });
            normalQueryStore.setShowQueryResult(false);
        }
    }, []);

    //编号搜索
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        normalQueryStore.setQueryParams({
            tfbhs: e.target.value
        });
    };

    return(
        <Fragment>
            {/*编号*/}
            <Skeleton
                label="编号"
                content={
                    <Input
                        type="text"
                        name="tfbh"
                        value={normalQueryStore.queryParams.tfbhs}
                        placeholder="台风编号(如1626);多编号查询(用;隔开)"
                        onChange={onChange}
                    />
                }
            />
            {/*language=SCSS*/}
            <style jsx>{`
                
            `}</style>
        </Fragment>
    )
};


export default observer(Number)
