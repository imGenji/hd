import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { observer,toJS } from 'mobx-react-lite';
import Select from '@/pages/Query/commonUI/Select'

const SelectHistory = ({historyStore}) => {
    var date=new Date;
    const {selectValue,changeSelectValue,activeIndex,changeActiveIndex} = historyStore
    //select数据
    useEffect(() => {
        const param = {year:selectValue }
        historyStore.getHistoryLabel(param)
    }, [selectValue]);
    const year = [];  //select的value
    for(let i = date.getFullYear();i > 1949-1;i--){
        year.push({label:i,value:i})
    }
    const handleChangeSelect = (e) =>{
        e.preventDefault();
        changeSelectValue(e.target.value);
        changeActiveIndex([])
    };

    const handleClickTr=()=>{};
    return (
        <div className={"list_title"}>
            <div className={"list_label"}>台风列表</div>
            <Select
                selectData={year}
                onChange={handleChangeSelect}
            />
            {/*language=SCSS*/}
            <style jsx>{`
                .list_title{
                  display: flex;
                  height: 40px;
                  border-bottom: 1px solid #bbb;
                  .list_label{
                    color: #166abe;
                    font-size: 16px;
                    margin-left: 10px;
                  }
                }
            `}</style>
        </div>
    )
};

SelectHistory.propTypes = {
    historyStore: PropTypes.object.isRequired
};

export default observer(SelectHistory);
