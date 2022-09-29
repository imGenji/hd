import { action, observable, runInAction } from 'mobx';
import { getTyphoonByFilter ,getProvince,getCity,getTyphoonPathDataById ,getTyphoonPath} from '../api';
import prompt from "@/utils/prompt";

interface TypeTyphoonDetail {
    name: string;
    tfbh: string;
    pathData: API.TypeTyphoonPoint[]
}

export default class NormalQueryStore {
    //查询结果数据列表
    @observable.ref typhoonData:API.TypeTyphoon = {
        data: [],
        totalStrength:{},
        strength: {},
        monthStrength:{}
    };
    @observable.ref circle: L.Circle = null;

    @observable.ref rectangle: L.Rectangle = null;
    //查询结果列表显示
    @observable isShowQueryResult = false;

    //获取省份
    @observable.ref ProvinceList: string[] = [];

    //获取市
    @observable.ref CityList: string[] =[];

    //台风简报
    @observable.ref TyphoonBriefing: TypeTyphoonDetail = {
        name: "",
        tfbh: "",
        pathData: []
    };

    //查询参数
    @observable.ref queryParams: API.TypeNormalQueryParams = {
        tfbhs:'',
        lat:'',
        lon:'',
        llWidth:'',
        beginTime:'',
        endTime:'',
        landCity: '',
        landProvince: '',
        isLanding: 0,
        strength:'',
        dlbefore: false,
        strengthOrValue: 1,
        minpressure:'',
        maxpressure:'',
        minvelocity:'',
        maxvelocity:'',
        latlngType: 1,
        locateStr: ''
    };

    // 设置查询参数
    @action
    setQueryParams = (queryParams: API.TypeNormalQueryParams)=>{
        this.queryParams = Object.assign({}, this.queryParams, queryParams);
    };

    @action
    setShowQueryResult = (showQueryResult: boolean) =>{
        this.isShowQueryResult = showQueryResult
    };

    //获取台风数据
    @action
    getTyphoonByFilter = () =>{
        getTyphoonByFilter(this.queryParams).then(
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

    //获取省数据
    @action
    getProvince = () =>{
        getProvince().then(
            (resp) => runInAction(() =>{
                this.ProvinceList = resp.data;
                this.setQueryParams({
                    landProvince: resp.data[0]
                })
                this.getCity(resp.data[0]);
            }),
            (resp) => runInAction(() => {
                prompt.error(resp.msg);
            })
        )
    };

    //获取市数据
    @action
    getCity =(province: string) =>{
        getCity(province).then(
            (resp) =>runInAction(() =>{
                this.CityList = resp.data
                this.setQueryParams({
                    landCity: resp.data[0]
                })
            }),
            (resp) =>runInAction(()=>{
                prompt.error(resp.msg);
            })
        )
    };
    @action
    setCircle = (circle: L.Circle) => {
        if(circle) {
            const center = circle.getLatLng();
            const radius = circle.getRadius();
            this.setQueryParams({
                lat:center.lat.toFixed(3),
                lon:center.lng.toFixed(3),
                llWidth:(radius/1000).toFixed(3),
            })
        } else {
            this.setQueryParams({
                lat:'',
                lon:'',
                llWidth:'',
            })
        }

        this.circle = circle;
    }
    @action
    setRect = (rect: L.Rectangle) => {
        if(rect) {
            const bounds = rect.getBounds();
            const north = bounds.getNorth();
            const east = bounds.getEast();
            const south = bounds.getSouth();
            const west = bounds.getWest();
            // console.log(west + ' ' + south + ',' + east + ' ' + north);
            this.setQueryParams({
                locateStr: west+' '+south+','+east+' '+north
            })
        } else {
            this.setQueryParams({
                locateStr: ''
            })
        }

        this.rectangle = rect;
    }
}

export type TypeNormalQueryStore = NormalQueryStore;
