import React, { useContext,Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import MapEngine, { MapUtilCtx } from '#/MapEngine';
import { baseStyle} from './style';
import { StoreCtx } from '@/store';
import FulScreen from './FulScreen';
import Header from './Header';
import Content from './Content';
import Legend from './Legend';
import ToolMap from './ToolMap';

const Query = () => {
    const { queryStore } = useContext(StoreCtx);
    const { fulScreenStore,headerMenuStore } = queryStore;
    const { selectedHeaderMenu } = headerMenuStore;

    const handleMapLoaded = () => {
    };

    return (

        <MapEngine
            mapType="leaflet"
            mapOptions={{
                zoom: 4,
                baseLayerTMS: "Google.Normal.Map",
            }}
            onMapLoaded={handleMapLoaded}
        >
            <FulScreen fulScreenStore={fulScreenStore}/>
            <Header queryStore={queryStore} />
            <ToolMap queryStore={queryStore}/>
            { selectedHeaderMenu ? <Content queryStore={queryStore} /> : null}
            <Legend queryStore={queryStore}/>
            {/*language=SCSS*/}
            <style jsx global>{baseStyle}</style>
        </MapEngine>
    )
};

export default observer(Query);