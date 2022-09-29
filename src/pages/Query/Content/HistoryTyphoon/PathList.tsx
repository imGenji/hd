import React,{Fragment} from 'react';
import { observer } from 'mobx-react-lite';
import Table from '../../commonUI/Table';
import { EnumTyphoonStrengthLegend } from '../../constants/EnumTyphoon';
import { TypeHistoryStore } from '../../model/HistoryStore';
import { formWindDirection } from '../../util/typhoonUtil';

const columns = [
    {
        title:"时间",
        dataIndex: "datetime",
    },
    {
        title:"风速",
        dataIndex: "windv",
    },
    {
        title:"风向",
        dataIndex: "movedir",
    },
    {
        title:"强度",
        dataIndex: "strength",
    }
];

const PathList: React.FC<{historyStore: TypeHistoryStore}> = ({historyStore}) => {
    const {selectedTyphoonDataIndies, typhoonPathData, typhoonData } = historyStore;
    const activeData = typhoonData.data[selectedTyphoonDataIndies[selectedTyphoonDataIndies.length - 1]];

    return (
        <Fragment>
            <Table
                tableTitle={activeData && `${activeData.chnname} ${activeData.name}-${activeData.tfbh}-简报路径`}
                columns={columns}
                dataSource={typhoonPathData.map((item)=> ({
                    datetime: `${item.datetime.slice(0,13)}时`,
                    windv: `${item.windv}m/s`,
                    movedir: formWindDirection(item.movedir),
                    strength: EnumTyphoonStrengthLegend[item.strength] && EnumTyphoonStrengthLegend[item.strength].label,
                }))}
                theadStyle={{color:"#4d94f8"}}
                hoverBackground={"#acd6fd"}
            />
        </Fragment>
    )
};

export default observer(PathList);
