import React, {useContext, useState, Fragment} from 'react'
import { observer } from "mobx-react-lite";
import BjColor from "../../../commonUI/BjColor";
import Table from "../../../commonUI/Table"
import {MapUtilCtx} from "#/MapOfLeaflet";
import {TypeNormalQueryStore} from "../../../model/NormalQueryStore";

const columns = [
    {
        title:"时间",
        dataIndex: "datetime",
    },
    {
        title:"经度",
        dataIndex: "lat",
    },
    {
        title:"纬度",
        dataIndex: "lon",
    },
    {
        title:"最大风速",
        dataIndex: "windv",
    },
    {
        title:"最低气压",
        dataIndex: "pressure",
    }
];

const TyphoonDetail:React.FC<{normalQueryStore:TypeNormalQueryStore}> =({normalQueryStore}) =>{
    const [activeDataIdx, setActiveDataIdx] = useState(-1)

    const { TyphoonBriefing } = normalQueryStore;

    const mapUtil  = useContext(MapUtilCtx);

    const handleClick = (index: number)=>{
        setActiveDataIdx(index);
    };

    const onmouseover =() =>{
    };

    const onmouseout = () =>{

    };

    return(
        <div className="normal-typhoondetails">
            <BjColor content={
                <Fragment>
                    <p className="normal-title">{TyphoonBriefing.name}-{TyphoonBriefing.tfbh}-路径简报</p>
                    <Table
                        columns={columns}
                        onClick={handleClick}
                        activeDataIdx={activeDataIdx}
                        hoverBackground="#999"
                        dataSource={TyphoonBriefing.pathData}
                        theadStyle={{background:"#666",color:"#e9e8e7"}}
                        tbodyStyle={{background:"#e9e8e7"}}
                        style={{height:320}}
                        onMouseOver={onmouseover}
                        onMouseOut={onmouseout}
                    />
                </Fragment>
            }/>

            {/*language=SCSS*/}
            <style>{`
                .normal-typhoondetails{
                  position:absolute;
                  top:70px;
                  left:850px;
                  width:23%;
                }
                .normal-title{
                  width:100%;
                  text-align:center;
                  color:#dadbde;
                }
            `}</style>
        </div>
    )
};


export default observer(TyphoonDetail)
