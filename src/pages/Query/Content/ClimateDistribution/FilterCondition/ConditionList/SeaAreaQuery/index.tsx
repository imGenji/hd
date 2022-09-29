import React, { Fragment } from "react"
import {observer} from "mobx-react-lite";
import Sea from './Sea'
import { TypeClimateStore } from "../../../../../model/ClimateStore";

const SeaArea : React.FC<{climateStore: TypeClimateStore}> =({climateStore}) =>{
    return(
        <Fragment>
            <Sea climateStore={climateStore}/>
            {/*language=SCSS*/}
            <style jsx>{`
              .condition-center-t{
                border-bottom: 1px solid #000;
                height: 26px;
                line-height: 26px;
                color:#000;
                font-weight:bold;
                font-size:13px
              }
              .condition-center-time{
                margin: 5px 0;
              }
            `}</style>
        </Fragment>
    )
};


export default observer(SeaArea)
