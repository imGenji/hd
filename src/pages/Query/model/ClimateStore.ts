import { action, observable, runInAction } from 'mobx';
import { getClimateFilter ,getProvince,getCity,getTyphoonPathDataById } from '../api';
import prompt from "@/utils/prompt";

interface TypeTyphoonDetail {
    name: string;
    tfbh: string;
    pathData: API.TypeTyphoonPoint[]
}

export default class ClimateStore {
    //查询结果数据列表
    @observable.ref typhoonData:API.TypeTyphoon = {
        data: [],
        totalStrength:{},
        strength: {},
        monthStrength:{}
    };

    //查询结果列表显示
    @observable isShowQueryResult = false;

    //台风简报
    @observable.ref TyphoonBriefing: TypeTyphoonDetail = {
        name: "",
        tfbh: "",
        pathData: []
    };

    //查询参数
    @observable.ref queryParams: API.TypeClimateStoreParams = {
        startYear:'2015',//时间查询开始时间
        endYear:'2019',//时间查询结束时间
        isLanding:0,//是否查询登陆
        strengthOrValue:1,//按强度等级或强度范围查询
        MeshBeginTime:'',//网格点查询开始时间
        MeshEndTime:'',//网格点查询结束时间
        seaBeginTime:'',//海区查询开始时间
        seaEndTime:'',//海区查询结束时间
        seaMonths:'',//海区各月
        sea:'',//海区
        monthStr:'',//各月
        strengthStr:'',//台风强度等级
        minpressure:'',//最小气压
        maxpressure:'',//最大气压
        minvelocity:'',//最小风速
        maxvelocity:'',//最大风速
        locateStr:'',//网格点编号
        minWindSeppd:25,
    };
    // 设置查询参数
    @action
    setQueryParams = (queryParams: API.TypeClimateStoreParams)=>{
        this.queryParams = Object.assign({}, this.queryParams, queryParams);
        // console.log( this.queryParams)
    };

    @action
    setShowQueryResult = (showQueryResult: boolean) =>{
        this.isShowQueryResult = showQueryResult
    };

    //获取台风数据
    @action
    getClimateFilter = () =>{
        getClimateFilter(this.queryParams).then(
            (resp) => runInAction(() =>{
                this.typhoonData =  resp.data;
            }),
            (resp) => runInAction(() => {
                prompt.error(resp.msg);
            })
        )
    };

    //获取台风详情数据
    getTyphoonDetail = (id: string, ty: string,  successCallback?: (data: TypeTyphoonDetail) => void) => {
        getTyphoonPathDataById(id, ty).then(
            (resp) => runInAction(() => {
                this.TyphoonBriefing = resp.data;
                successCallback && successCallback(resp.data);
            }),
            (resp) => runInAction(() => {
                prompt.error(resp.msg);
            })
        )
    };
}

export type TypeClimateStore = ClimateStore;
