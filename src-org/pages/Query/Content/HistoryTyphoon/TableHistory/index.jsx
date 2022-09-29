import React,{Fragment} from 'react';
import { observer } from 'mobx-react-lite';
import Table from '@/pages/Query/commonUI/Table'
import { wind,columns } from '@/pages/Query/constants/EnumTable'
import {TyphoonLegend} from '@/pages/Query/constants/EnumLegend'
TyphoonLegend.map((item,index)=>{
    item.label.map(item=>{
        item.value == item.title
    })
});

const strength = {};
TyphoonLegend.map(i=>i.label.map(v=>(
    strength[v.value] = v.title
)));
const TableHistory = ({historyStore}) => {
    const {activeIndex,data,tableData} = historyStore;
    const arrMovedir = [];
    data.map((item)=>{
        const newMovedir =item.movedir.split("");
        const arrData = [];
        for(let i = 0; i< newMovedir.length; i++){
            newMovedir[i] = wind[newMovedir[i]];
            arrData.push(newMovedir[i])
        }
        arrMovedir.push(arrData.join(""))
    });
    const tableTitle = tableData.map((item=>{
            return (item.right+"-"+item.left+"-简报路径")
        }
    ));
    return (
        <Fragment>
            <Table
                tableTitle={tableTitle[activeIndex[activeIndex.length-1]]}
                columns={columns}
                dataSource={activeIndex.length === 0 ? [] : data.map((item,index)=> ({
                    datetime:item.datetime.slice(0,13)+"时",
                    windv:item.windv+"m/s",
                    movedir:arrMovedir[index],
                    strength:strength[item.strength],
                }))}
                theadStyle={{color:"#4d94f8"}}
                onClick={()=>{}}
                hoverBackground={"#acd6fd"}
                onMouseOver={()=>{}}
            />
        </Fragment>

    )
};

export default observer(TableHistory);
