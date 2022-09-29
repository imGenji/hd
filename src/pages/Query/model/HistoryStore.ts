import {action, observable, runInAction} from 'mobx';
import { getTyphoonPathDataById, getTyphoonByYear } from '../api';
import prompt from "@/utils/prompt";

interface TypeTyphoonDetail {
    name: string;
    tfbh: string;
    pathData: API.TypeTyphoonPoint[]
}
export default class HistoryStore {
    //台风路径数据
    @observable typhoonPathData: API.TypeTyphoonPoint[] = [];

    // 历史台风数据
    @observable typhoonData: API.TypeTyphoon = {
        data: [],
        strength: {},
        totalStrength:{}
    };

    //当前被选中的台风列表数据的下标
    @observable selectedTyphoonDataIndies: number[] = [];

    //当前被选中的年份
    @observable selectedYear = new Date().getFullYear();

    /**
     * 获取台风数据
     */
    @action
    getTyphoonPathData = (tfbh: string, ty: string, successCallback?: (data: TypeTyphoonDetail) => void) => {
        getTyphoonPathDataById(tfbh, ty).then(
            (resp) => runInAction(() => {
                const { pathData } = resp.data;
                this.typhoonPathData = pathData
                successCallback && successCallback(resp.data);
            }),
            (resp) => runInAction(() => {
                prompt.error(resp.msg);
            })
        )
    };

    /**
     * 依据年份获取台风
     */
    @action
    getTyphoonByYear= (param: {year: number;}) => {
        getTyphoonByYear(param).then(
            (resp) => runInAction(() => {
                this.typhoonData = resp.data;
            }),
            (resp) => runInAction(() => {
                prompt.error(resp.msg);
            })
        )
    };

    // 设置激活的台风数据索引
    @action
    setTyphoonDataIndies = (indies: number[], successCallback?: (data: TypeTyphoonDetail) => void) => {
        this.selectedTyphoonDataIndies = indies;

        // 加载选中的台风路径数据
        if(indies.length > 0) {
            const lastIndex = indies[indies.length - 1];
            const tfbh = this.typhoonData.data[lastIndex].tfbh;
            const ty = this.typhoonData.data[lastIndex].ty;
            this.getTyphoonPathData(tfbh, ty, successCallback);
        }
        // 无选中台风数据时,清空台风路径数据
        else {
            this.typhoonPathData = [];
        }
    };

    // 设置当前选中的年份
    @action
    setYear = (year: number) => {
        this.selectedYear = year;
    }

}


export type TypeHistoryStore = HistoryStore;
