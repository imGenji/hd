import React from 'react';
import { observer } from 'mobx-react-lite';
import { EnumHeaderMenus } from '../constants';
import { TypeQueryStore } from '../model/QueryStore';

const EnumContent = {
    [EnumHeaderMenus.realTimeMonitor.value]: require("./RealTimeMonitor").default,
    [EnumHeaderMenus.climateDistribution.value]: require("./ClimateDistribution").default,
    [EnumHeaderMenus.normalQuery.value]: require("./NormalQuery").default,
    // [EnumHeaderMenus.typhoonQuery.value]: require("./TyphoonQuery").default,
    [EnumHeaderMenus.historyTyphoon.value]: require("./HistoryTyphoon").default,
};

const Content: React.FC<{queryStore: TypeQueryStore}> = ({ queryStore }) => {
    const { headerMenuStore } = queryStore;
    const { selectedHeaderMenu } = headerMenuStore;
    const AppModule = EnumContent[selectedHeaderMenu] || (() => (<div>未找到对应的模块</div>));

    return (
        <div className="content">
            <AppModule queryStore={queryStore} />
            {/*language=SCSS*/}
            <style jsx>{`
                .content{
                    position: absolute;
                    //z-index: 5;
                    left: 30px;
                    top: 55px;
                }
            `}</style>
        </div>
    )
};

export default observer(Content);