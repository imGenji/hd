import React, {useEffect,useContext} from 'react';
import { observer } from 'mobx-react-lite';
import ListTitle from '@/pages/Query/commonUI/ListTitle'
import {MapUtilCtx} from "#/MapEngine";
const LabelHistory = ({queryStore}) => {
    const {historyStore,legendStore} = queryStore
    const {activeIndex,changeActiveIndex,tableData,data,LabelAndTable} = historyStore;
    const {checkValue,changeCheckValue} = legendStore
    const mapUtil  = useContext(MapUtilCtx);
    //label数据
    useEffect(() => {
        const lastIndex = activeIndex.slice(-1);
        const id = tableData[lastIndex] ? tableData[lastIndex].left : null;
        activeIndex.length == 0 ? null : historyStore.getHistoryTab(id,(LabelAndTable)=>{
            mapUtil.drawTyphoonRoute(LabelAndTable);
        });
    },[activeIndex]);

    const changeListTitle = (index) => {
        if(activeIndex.includes(index)) {
            const newArr = activeIndex.filter((item) => item!==index);
            changeActiveIndex(newArr);
        } else {
            changeActiveIndex(activeIndex.concat(index));
        }
    };
    return (
        <ListTitle changeSelectValue
            data={tableData}
            onClick={changeListTitle}
            activeIndex={activeIndex}
        />
    )
};

export default observer(LabelHistory);
