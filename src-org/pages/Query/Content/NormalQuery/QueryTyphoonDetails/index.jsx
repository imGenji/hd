import React, {useContext} from 'react'
import { observer } from "mobx-react-lite";
import BjColor from "../../../commonUI/BjColor";
import PropTypes from "prop-types";
import Table from "../../../commonUI/Table"
import Popup from "../../../commonUI/Popup"
import {MapUtilCtx} from "#/MapEngine";
const columns = [
    {
        title:"时间"
    },
    {
        title:"经度"
    },
    {
        title:"纬度"
    },
    {
        title:"最大风速"
    },
    {
        title:"最低气压"
    }
];

const QueryTyphoonDetails =({normalQueryStore}) =>{
    const {active,activeIndex,setActiveIndex ,TyphoonData,TyphoonName,setActiveTb,TyphoonDetails,showResult,name,tfbh} = normalQueryStore;
    const handleClickTr=()=>{};
    const mapUtil  = useContext(MapUtilCtx);

    const onmouseover =() =>{
        // mapUtil.drawTyphoonRoute(TyphoonData,TyphoonData,TyphoonName)
    };
    const onmouseout = () =>{

    };

    return(
        <Popup active={active}>
            { showResult &&
            <div className="normal-typhoondetails">
                <BjColor content={
                    <div>
                        <p className="normal-title">{name}-{tfbh}-路径简报</p>
                        <Table
                            columns={columns}
                            onClick={handleClickTr}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                            hoverBackground="#999"
                            dataSource={TyphoonDetails}
                            theadStyle={{background:"#666",color:"#e9e8e7"}}
                            border="1px solid #666"
                            tbodyStyle={{background:"#e9e8e7"}}
                            style={{height:320}}
                            onMouseOver={onmouseover}
                            onMouseOut={onmouseout}
                        />
                    </div>
                }/>
                {/*language=SCSS*/}
                <style>{`
                    .normal-typhoondetails{
                      position:absolute;
                      top:70px;
                      left:810px;
                      width:23%;
                    }
                    .normal-title{
                      width:100%;
                      text-align:center;
                      color:#dadbde;
                    }
                `}</style>
            </div>
            }
        </Popup>
    )
};

QueryTyphoonDetails.propTypes = {
    queryStore:PropTypes.object,
    normalQueryStore:PropTypes.object,
    setShowQueryResult:PropTypes.func,
};

export default observer(QueryTyphoonDetails)