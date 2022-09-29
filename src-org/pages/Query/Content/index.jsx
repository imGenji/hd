import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { EnumHeaderMenus } from '../constants';
import {MapUtilCtx} from "#/MapEngine/src";

const EnumContent = {
    [EnumHeaderMenus.realTimeMonitor.value]: require("./RealTimeMonitor").default,
    [EnumHeaderMenus.normalQuery.value]: require("./NormalQuery").default,
    [EnumHeaderMenus.areaQuery.value]: require("./AreaQuery").default,
    [EnumHeaderMenus.historyTyphoon.value]: require("./HistoryTyphoon").default,
};

const Content = ({queryStore}) => {
    const { headerMenuStore,fulScreenStore } = queryStore;
    const { fulScreen} = fulScreenStore;
    const { selectedHeaderMenu } = headerMenuStore;
    const AppModule = EnumContent[selectedHeaderMenu] || (() => (<div>未找到对应的模块</div>));
    const mapUtil  = useContext(MapUtilCtx)
    const show = fulScreen ? "block" : "none"
    return (
        <div className="content">
            <AppModule queryStore={queryStore} />

            {/*language=SCSS*/}
            <style jsx>{`
                .content{
                    position: absolute;
                    //z-index: 5;
                    left: 10px;
                    top: 55px;
                    display: ${show};
                }
            `}</style>
        </div>
    )
};

Content.propTypes = {
    queryStore: PropTypes.object.isRequired
}

export default observer(Content);
