import { observable, action } from 'mobx';

import HeaderMenuStore from './HeaderMenuStore';
import NormalQueryStore from "./NormalQueryStore";
import HistoryStore from "./HistoryStore";
import ClimateStore from "./ClimateStore";
import RealTimeMonitorStore from "./RealTimeMonitorStore";

export default class QueryStore {
    headerMenuStore = new HeaderMenuStore();
    normalQueryStore = new NormalQueryStore();
    historyStore = new HistoryStore();
    realTimeMonitorStore = new RealTimeMonitorStore();
    climateStore = new ClimateStore();

    @observable isFullScreen = false;   // 是否全屏

    @action
    triggerFullScreen = () => {
        this.isFullScreen = !this.isFullScreen;
    }
}

export type TypeQueryStore = QueryStore;
