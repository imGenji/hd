import React, { Fragment } from "react"
import {observer} from "mobx-react-lite";
import Mesh from "./Mesh";
import {TypeClimateStore} from "@/pages/Query/model/ClimateStore";

const MeshPoints : React.FC<{climateStore: TypeClimateStore}> =({climateStore}) =>{
    return(
        <Fragment>
            <Mesh climateStore={climateStore}/>
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


export default observer(MeshPoints)
