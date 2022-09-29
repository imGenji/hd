import React, {useEffect} from "react"
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import {EnumNormalQuery} from "../../../../constants/EnumNormalQuery";

import Skeleton from "../../../../commonUI/Skeleton";
import Input from "../../../../commonUI/Input";
import Select from "../../../../commonUI/Select";
const tsIcon = require('../../../../commonUI/Select/img/u1761.png');

const LandingPoint =({normalQueryStore}) =>{
    const { queryCriteria ,CityList, ProvinceList } = normalQueryStore;
    //获取省份
    useEffect(() => {
        normalQueryStore.getProvince()
    }, []);
    //城市搜索input
    const cityOnChange = (e) =>{
        normalQueryStore.setQueryParams({
            landCity: e.target.value
        });
    };
    //省级搜索
    const onProvince = (e) =>{
        normalQueryStore.setQueryParams({
            province: e.target.value,
            dlprovince1:e.target.value
        });
        //获取市
        normalQueryStore.getCity(e.target.value);
    };
    //市搜索
    const onCity =(e) =>{
        normalQueryStore.setQueryParams({
            city:e.target.value,
            dlcity1:e.target.value
        })
    };
    return(
        <div>
            {/*登陆点*/}
            {
                queryCriteria.includes(EnumNormalQuery[2].value) && <Skeleton
                    label="登陆点"
                    content={
                        <div className="condition-center">
                            <div className="condition-query">
                                <div className="condition-center-t">地点查询</div>
                                <div className="condition-input">
                                    <Input style={{height: "21px", border: "1px solid #777"}}
                                           placeholder="可精确到市/区,如厦门"
                                           type="text"
                                           name="city"
                                           value={normalQueryStore.queryParams.landCity}
                                           onChange={cityOnChange}
                                    />
                                </div>
                            </div>

                            <div className="condition-center-time">
                                <div className="condition-select">
                                    <div className="condition-label">省</div>
                                    <div className="condition-label-s">
                                        <Select
                                            selectData={ProvinceList}
                                            style={{width:"100%",margin:"0",background: "url("+tsIcon+") no-repeat 115px center transparent"}}
                                            onChange={onProvince}
                                        />
                                    </div>
                                </div>
                                <div className="condition-select" style={{marginTop:"5px"}}>
                                    <div className="condition-label">市</div>
                                    <div className="condition-label-s">
                                        <Select
                                            selectData={CityList}
                                            style={{width:"100%",margin:"0",background: "url("+tsIcon+") no-repeat 115px center transparent"}}
                                            onChange={onCity}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />
            }
            {/*language=SCSS*/}
            <style jsx>{`
                .condition-query{
                  width: 100%;
                  height: 26px;
                }
                .condition-center-t{
                  float: left;
                  width: 25%;
                  border: none;
                  height: 26px;
                  line-height: 26px; 
                  color:#000;
                  font-weight:bold;
                  font-size:13px;
                }
                .condition-input{
                  width:60%;
                  height: 22px;
                  margin: 4px 0 0 10px;
                  float: left;
                }
                .condition-center-time{
                  margin: 5px 0;
                  clear: both;
                }
                .condition-select{
                  width: 100%;
                  height: 25px;
                  line-height: 25px;
                }
                .condition-label{
                  float: left;
                  width: 30%;
                  background: #777;
                  text-align: center;
                  color: #fff;
                }
                .condition-label-s{
                  float: left;
                  width: 60%;
                  height: 100%;
                  margin-left: 20px
                }
            `}</style>
        </div>
    )
};

LandingPoint.propTypes = {
    normalQueryStore:PropTypes.object,
    queryCriteria:PropTypes.string,
};

export default observer(LandingPoint)
