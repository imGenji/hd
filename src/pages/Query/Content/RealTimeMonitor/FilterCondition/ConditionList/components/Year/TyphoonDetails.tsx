import React, {Fragment, useEffect} from "react";
import Container from "../Container";
import {observer} from "mobx-react-lite"
import {TypeRealTimeMonitorStore} from "@/pages/Query/model/RealTimeMonitorStore";
import Table from "@/pages/Query/commonUI/Table";

const columns = [
    {
        title:"序号",
        dataIndex: "serialNumber",
    },
    {
        title:"年份",
        dataIndex: "year",
    },
    {
        title:"中文名",
        dataIndex: "chineseName",
    },
    {
        title:"英文名",
        dataIndex: "englishName",
    },
    {
        title:"台风编号",
        dataIndex: "typhoonNumber",
    },
    {
        title: "风速(m/s)",
        dataIndex: "windSpeed"
    }
];

const TyphoonDetails: React.FC<{realTimeMonitorStore: TypeRealTimeMonitorStore}> = ({realTimeMonitorStore}) =>{
    const { WindSpeed } = realTimeMonitorStore;
    useEffect(()=>{
        realTimeMonitorStore.getWindSpeedList()
    },[]);
    return(
        <div>
            <Container
                title="风速"
                content={
                    <Fragment>
                        <Table
                            columns={columns}
                            dataSource={WindSpeed}
                            theadStyle={{background:"#01305F",color:"#4085CA"}}
                            tbodyStyle={{background:"#e9e8e7" }}
                        />
                    </Fragment>
                }
            />
        </div>
    )
};
export default observer(TyphoonDetails)