import {action, observable, runInAction, computed} from 'mobx';
import { getResult ,getProvince,getCity,getHistoryTab,getRutForm} from '../api';
import prompt from "@/utils/prompt";
export default class NormalQueryStore {
    //查询结果数据列表
    @observable.ref listData = [];
    //控制点击或隐藏
    @observable.ref queryCriteria = [];
    //控制条点击显示或隐藏
    @observable showCondition = true;
    //查询结果列表显示或隐藏条
    @observable showResult = true;
    //查询结果列表显示
    @observable showQueryResult = false;
    //点击选中背景颜色切换
    @observable.ref activeIndex = [];
    //弹框
    @observable active = false;
    //弹框
    @observable activeTb = false;
    //获取省份
    @observable.ref ProvinceList = [];
    //获取市
    @observable.ref CityList =[];
    //数据详情
    @observable.ref HistoryTab = [];
    //台风简报
    @observable TyphoonBriefing = [];
    //地图
    @computed get TyphoonDetails() {
        return this.TyphoonBriefing.map((v) => {
            const {strength, ...newV} = v;
            return newV
        })
    }
    //台风详细数据
    @observable TyphoonName = [] || {};
    @observable TyphoonData = [] || {};
    //查询参数
    @observable queryParams = {
        tfbhs:'',
        lat:'',
        lon:'',
        llWidth:'',
        beginTime:'',
        endTime:'',
        landCity: '',
        dlprovince1:'',
        province: 0,
        dlcity1:'',
        city: 0,
        strength:'',
        dlbefore: false,
        strengthOrValue: 1,
        minpressure:'',
        maxpressure:'',
        minvelocity:'',
        maxvelocity:'',
        latlngType: 1
    };

    //导出数据
    @action
    getRutForm = (params) =>{
        getRutForm(params).then(
            (resp) =>runInAction(()=>{
                console.log(resp);
                this.simplifiedEdition = resp.data;
            }),
            (resp) =>runInAction(()=>{
                prompt.error(resp.msg)
            })
        )
    };

    //获取数据
    @action
    getResult = (params) =>{
        getResult(params).then(
            (resp) => runInAction(() =>{
                this.resultData = resp.data || [];
                const typhoonData = this.resultData.data;
                //循环对应数据回调
                this.listData = typhoonData.map((v) => ({
                    left: v.tfbh,
                    right: v.chnname + v.name
                }));
            }),
            (resp) => runInAction(() => {
                prompt.error(resp.msg);
            })
        )
    };

    //获取省数据
    @action
    getProvince = () =>{
        getProvince().then(
            (resp) => runInAction(() =>{
                this.province = resp.data;
                const Province = this.province;
                this.ProvinceList = Province.map((v) =>({
                    label:v
                }));
                this.getCity(resp.data[0]);
            }),
            (resp) => runInAction(() => {
                prompt.error(resp.msg);
            })
        )
    };

    //获取市数据
    @action
    getCity =(province) =>{
        getCity(province).then(
            (resp) =>runInAction(() =>{
                this.city = resp.data;
                const City = this.city;
                this.CityList = City.map((v) =>({
                    label:v
                }))
            }),
            (resp) =>runInAction(()=>{
                prompt.error(resp.msg);
            })
        )
    };

    //获取台风详情数据
    getHistoryTab = (id, cb) => {
        getHistoryTab(id).then(
            (resp) => runInAction(() => {
                const { pathData ,name,tfbh} = resp.data;
                this.TyphoonName = resp.data;
                this.TyphoonData = pathData;
                this.name = name;
                this.tfbh = tfbh;
                this.TyphoonBriefing = pathData.map(item=> ({
                    datetime:item.datetime.slice(0,13)+"时",
                    lon:item.lon,
                    lat:item.lat,
                    windv:item.windv,
                    pressure:item.pressure,
                    strength: item.strength
                }));
                cb && cb(this.TyphoonData,this.TyphoonName);
            }),
            (resp) => runInAction(() => {
                prompt.error(resp.msg);
            })
        )
    };
    //市
    @action
    setCityList = (cityList) =>{
        this.CityList = cityList
    };
    //省
    @action
    setProvinceList = (ProvinceList) =>{
        this.ProvinceList= ProvinceList
    };
    //台风数据
    @action
    setQueryParams = (queryParams)=>{
        this.queryParams = Object.assign(this.queryParams, queryParams);
    };
    @action
    setListData = (listData) =>{
        this.listData = listData
    };
    @action
    setQueryCriteria = (queryCriteria) => {
        this.queryCriteria = queryCriteria;
    };
    @action
    setShowCondition = (showCondition) =>{
        this.showCondition = showCondition;
    };
    @action
    setShowResult = (showResult) =>{
        this.showResult = showResult
    };
    @action
    setShowQueryResult = (showQueryResult) =>{
        this.showQueryResult = showQueryResult
    };
    @action
    setActiveIndex = (activeIndex) =>{
        this.activeIndex = activeIndex
    };
    @action
    setActive = (active) =>{
        this.active = active
    }
    @action
    setActiveTb = (activeTb) =>{
        this.activeTb = activeTb
    }
}