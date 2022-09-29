import React, {useEffect} from "react"
import {EnumNormalQuery} from "../../../../constants/EnumNormalQuery";
import Skeleton from "../../../../commonUI/Skeleton";
import Input from "../../../../commonUI/Input";
import {observer} from "mobx-react-lite";
import PropTypes from "prop-types";

const Number =({normalQueryStore}) =>{
    const { queryCriteria } = normalQueryStore;
    //编号搜索
    const onChange = (e) =>{
        normalQueryStore.setQueryParams({
            tfbhs: e.target.value
        });
    };
    return(
        <div>
            {/*编号*/}
            {
                queryCriteria.includes(EnumNormalQuery[0].value) && <Skeleton
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
            }
            {/*language=SCSS*/}
            <style jsx>{`
                
            `}</style>
        </div>
    )
};

Number.propTypes = {
    normalQueryStore:PropTypes.object,
    queryCriteria:PropTypes.string,
};
export default observer(Number)
