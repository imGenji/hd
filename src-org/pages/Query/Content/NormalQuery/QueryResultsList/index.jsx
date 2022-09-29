import React, {useContext, useEffect} from 'react'
import Button from "../../../commonUI/Button";
import BjColor from "../../../commonUI/BjColor";
import ListTitle from "../../../commonUI/ListTitle";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import {MapUtilCtx} from "#/MapEngine";

const QueryResultsList = ({ normalQueryStore }) => {
    const mapUtil  = useContext(MapUtilCtx);
    const { listData,showQueryResult,onClick,setListData,activeIndex,setActiveIndex,showResult,active,setActive } = normalQueryStore;
    const changeStatus = (index, left) => {
        if(activeIndex.includes(index) && active) {
            setActive(false);
            const newArr = activeIndex.filter((item) => item!==index);
            setActiveIndex(newArr);
        } else {
            setActive(true);
            //获取当前数据
            normalQueryStore.getHistoryTab(left, (coordinate,TyphoonName) => {
                mapUtil.drawTyphoonRoute(coordinate,coordinate,TyphoonName);
            });
            setActiveIndex(activeIndex.concat(index))
        }
    };

    //全选
    const allElectionTest = () =>{
        const indexArr = [];
        for(let k=0; k<=listData.length;k++){
            indexArr.push(k)
        }
        setActiveIndex(indexArr);
    };
    //反选
    const reverseElection = () =>{

    };
    //取消
    const cancelSelection =() =>{
        const cancelIndexArr = [];
        setActiveIndex(cancelIndexArr)
    };

    const simplifiedEditionData =() =>{
        console.log(1)
    };

    return(
        <div className="result-list">
            { showQueryResult && showResult &&
            <BjColor content={
                <div>
                    <p className="result-list-t">搜索到{listData.length}条结果</p>
                    <ListTitle
                        data={listData}
                        setListData={setListData}
                        onClick={changeStatus}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        style={{border:"none",height:"300px"}}
                    />
                    <div className="normal-query-result">
                        <Button
                            background="#84b4dc"
                            style={{marginRight: "10px"}}
                            onClick={allElectionTest}
                        >全选</Button>
                        <Button
                            style={{marginRight: "10px"}}
                            background="#84b4dc"
                            onClick={reverseElection}
                        >反选</Button>
                        <Button
                            style={{marginRight: "10px"}}
                            background="#84b4dc"
                            onClick={cancelSelection}
                        >取消</Button>
                        <Button style={{
                            border: "1px solid #e9e8e7",
                            borderRadius: "7px",
                            width: "45%",
                            marginRight: "30px",
                            marginTop: "10px"
                        }}
                                background="#888"
                                hoverBackground="#fff"
                                color="#000"
                                onClick={simplifiedEditionData}
                        >导出简版数据</Button>
                        <Button style={{border: "1px solid #e9e8e7", borderRadius: "7px", width: "45%"}}
                                background="#888"
                                hoverBackground="#fff"
                                color="#000"
                                onClick={onClick}
                        >导出简版数据</Button>
                        <Button style={{
                            border: "1px solid #e9e8e7",
                            borderRadius: "7px",
                            marginRight: "30px",
                            width: "45%"
                        }}
                                background="#888"
                                hoverBackground="#fff"
                                color="#000"
                                onClick={onClick}
                        >导出简版数据</Button>
                        <Button style={{border: "1px solid #e9e8e7", borderRadius: "7px", width: "45%"}}
                                background="#888"
                                hoverBackground="#fff"
                                color="#000"
                                onClick={onClick}
                        >导出简版数据</Button>
                    </div>
                </div>
            }/>}
            {/*language=SCSS*/}
            <style jsx>{`
                .result-list{
                  position: absolute;
                  top:70px;
                  left:470px;
                  width:25%;
                  .result-list-t{
                    text-align: center;
                    color: #dadbde;
                  }
                }
            `}</style>
        </div>
    )
};

QueryResultsList.propTypes = {
    data:PropTypes.object,
    setListData:PropTypes.func,
    activeIndex: PropTypes.node,
    setActiveIndex:PropTypes.func,
    onClick:PropTypes.object
};

export default observer(QueryResultsList)