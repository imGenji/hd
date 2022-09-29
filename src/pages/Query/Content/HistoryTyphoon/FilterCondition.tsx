import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Select from '../../commonUI/Select'
import {TypeHistoryStore} from '../../model/HistoryStore'

const FilterCondition: React.FC<{historyStore: TypeHistoryStore}> = ({historyStore}) => {
    const {selectedYear, setYear, setTyphoonDataIndies} = historyStore;

    useEffect(() => {
        historyStore.getTyphoonByYear({ year: selectedYear })
    }, [selectedYear]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        e.preventDefault();
        setYear(parseInt(e.target.value));
        setTyphoonDataIndies([])
    };

    return (
        <div className={"list_title"}>
            <div className={"list_label"}>台风列表</div>

            <Select
                selectData={getHistoryYear()}
                onChange={handleSelectChange}
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

export default observer(FilterCondition);

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
