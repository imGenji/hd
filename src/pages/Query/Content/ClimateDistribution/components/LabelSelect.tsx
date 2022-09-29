import React, {Fragment, useEffect} from "react"
import {observer} from "mobx-react-lite";
import Select from "@/pages/Query/commonUI/Select";
import { TypeClimateStore } from '../../../model/ClimateStore';
const tsIcon = require('../../../commonUI/Select/img/u1761.png');

interface LabelSelectProps {
    onChange?: (e: React.ChangeEvent) => void;
    label?: string;
}

const LabelSelect: React.FC<LabelSelectProps> = ({label,onChange}) =>{
    return(
        <Fragment>
            <div className="condition-center-time">
                <div className="condition-select">
                    <div className="condition-label">{label}</div>
                    <div className="condition-label-s">
                        <Select
                            selectData={getHistoryYear()}
                            style={{width:"100%",margin:"0",borderRadius:"0px",background: "url("+tsIcon+") no-repeat 100px center transparent"}}
                            onChange={onChange}
                        />
                        <span>年</span>
                    </div>
                </div>
            </div>
            {/*language=SCSS*/}
            <style jsx>{`
                .condition-select{
                  width: 100%;
                  height: 25px;
                  line-height: 25px;
                  margin-bottom: 5px;
                }
                .condition-label{
                  float: left;
                  width: 30%;
                  background: RGB(81,149,219);
                  text-align: center;
                  color: #fff;
                }
                .condition-label-s{
                  float: left;
                  width: 60%;
                  height: 100%;
                  margin-left: 10px;
                  display: flex;
                  span{
                    display: inline-block;
                    margin-left: 5px;
                    color: #000;
                  }
                }
            `}</style>
        </Fragment>
    )
};

export default observer(LabelSelect)
/**
 * 获取历史年份
 */
const getHistoryYear = () => {
    const currentYear = new Date().getFullYear();
    const years = [];

    for(let i = currentYear; i > 1949-1; i--){
        years.push({ label: i, value: i })
    }

    return years;
};
