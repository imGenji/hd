import {action, observable, runInAction} from 'mobx';
import prompt from '@/utils/prompt'
import { getHistoryTab, postResult ,getProvince} from '../api';
import HeaderMenuStore from './HeaderMenuStore';
import NormalQuerySore from "./NormalQuerySore";
import HistoryStore from "./HistoryStore";
import LegendStore from "./LegendStore";
import FulScreenStore from "./FulScreenStore";

export default class QueryStore {
    headerMenuStore = new HeaderMenuStore();

    legendStore = new LegendStore();

    normalQueryStore = new NormalQuerySore();

    historyStore = new HistoryStore();

    fulScreenStore = new FulScreenStore();

}