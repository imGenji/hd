import React, { useContext, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import MapOfLeaflet from '#/MapOfLeaflet';
import { baseStyle} from './style';
import { StoreCtx } from '@/store';

import Header from './Header';
import Content from './Content';
import {FullScreen, Legend, ToolMap} from './FixedContent';

import { TypeQueryStore } from './model/QueryStore';

const mapOptions = {
    zoom: 4,
    baseLayerTMS: "Google.Normal.Map",
};

const Query = () => {
    const queryStore  = useContext(StoreCtx).queryStore as TypeQueryStore;
    const { headerMenuStore, isFullScreen } = queryStore;
    const { selectedHeaderMenu } = headerMenuStore;

    return (
        <MapOfLeaflet mapOptions={mapOptions} onMapLoaded={(mapUtil) => {
            // 添加24小时警戒线
            mapUtil.typhoon.drawGuardLine("24");
        }}>
            <FullScreen queryStore={queryStore}/>

            {
                !isFullScreen ? (
                    <Fragment>
                        <Header queryStore={queryStore} />
                        <ToolMap queryStore={queryStore}/>
                        { selectedHeaderMenu ? <Content queryStore={queryStore} /> : null}
                        <Legend />
                    </Fragment>
                ) : null
            }

            {/*language=SCSS*/}
            <style jsx global>{baseStyle}</style>
        </MapOfLeaflet>
    )
};

export default observer(Query);
