import { action, observable, runInAction } from 'mobx';
import { getTyphoonPath ,getSimilarTyphoons,getTyphoonCalendar,getStrengthList,getWindSpeedList,getMoonSquare,getYearFlat } from '../api';
import prompt from "@/utils/prompt";

//台风简报类型
interface TypeTyphoonDetail {
    name: string;
    tfbh: string;
    pathData: API.TypeTyphoonPoint[]
}

//台风风速数据类型
interface TypeWindSpeed {
    serialNumber:string,
    year:string,
    chineseName:string,
    englishName:string,
    typhoonNumber:string,
    windSpeed:string
}[];

//强度数据类型
interface TypeStrength {
    serialNumber:string,
    year:string,
    chineseName:string,
    englishName:string,
    typhoonNumber:string,
    typhoonStrength:string
}[];

export default class RealTimeMonitorStore {
    //台风简报
    @observable.ref TheLatestTyphoon: TypeTyphoonDetail = {
        name: "",
        pathData: [],
        tfbh: ""
    };

    //台风相似路径
    @observable typhoonSimilarPath :API.TypeSimilarTyphoons ={
        tfbh: "",
        distance:"",
        startTime:"",
        endTime:"",
        topNumlimit:""
    };

    //台风风速
    @observable.ref WindSpeed:TypeWindSpeed[] = [{
        serialNumber:"",
        year:"",
        chineseName:"",
        englishName:"",
        typhoonNumber:"",
        windSpeed:""
    }];

    //台风等级
    @observable.ref Strength:TypeStrength[] = [{
        serialNumber:"",
        year:"",
        chineseName:"",
        englishName:"",
        typhoonNumber:"",
        typhoonStrength:""
    }];

    //台风历数据
    @observable.ref TyphoonCalendarData:number[][] = [];

    //台风历X轴
    @observable.ref TyphoonCalendarxAxis:number[] = [];

    //月矩平数据
    @observable.ref MoonSquareLineData:number[] = [];

    //月生成频率
    @observable.ref MonthFrequency:number[] = [];

    //年矩平数据
    @observable.ref YearFlat:number[] = [];

    //年生成频率
    @observable.ref YearFrequency:number[] =[];

    //年份
    @observable.ref YearxAxis:number[] =[];

    @action
    setQueryParams = (typhoonSimilarPath: API.TypeSimilarTyphoons)=>{
        this.typhoonSimilarPath = Object.assign(this.typhoonSimilarPath, typhoonSimilarPath);
    };

    //获取台风路径
    @action
    getTyphoonPath = () =>{
        getTyphoonPath().then(
            (resp) =>runInAction(() =>{
                this.TheLatestTyphoon = resp.data;
            }),
            (resp) =>runInAction(()=>{
                prompt.error(resp.msg);
            })
        )
    };

    //查询相似路径数据
    @action
    getSimilarTyphoons = (tfbh:string,distance:string,startTime:string,endTime:string,topNumlimit:string, successCallback?: (data: TypeTyphoonDetail[]) => void) =>{
        getSimilarTyphoons({tfbh,distance,startTime,endTime,topNumlimit}).then(
            (resp) =>runInAction(()=>{
                // this.typhoonSimilarPath = resp.data;
                successCallback && successCallback(resp.data);
            }),
            (resp) => runInAction(() =>{
                prompt.error(resp.msg)
            })
        )
    };

    //台风历数据
    @action
    TyphoonCalendar =() =>{
        getTyphoonCalendar().then(
            (resp)=>runInAction(()=>{
                const calender  = resp.data.Calander;
                const list:number[] = calender.map((v: any[]) => v[1]);
                const set = new Set(list);
                let xAxis: number[] = [];
                set.forEach((v) => {
                    xAxis.push(v)
                });
                this.TyphoonCalendarxAxis = xAxis;
                this.TyphoonCalendarData = calender.map((v: any[] | number[]) => {
                    const value = v.shift();
                    v.push(value);
                    v[0] = this.TyphoonCalendarxAxis.indexOf(v[0]);
                    v[1] = [1,2,3,4,5,6,7,8,9,10,11,12].indexOf(v[1]);
                    return v;
                });
            }),
            (resp)=>runInAction(()=>{
                prompt.error(resp.msg)
            })
        )
    };

    //风速列表数据
    @action
    getWindSpeedList = () =>{
        getWindSpeedList().then(
            (resp)=>runInAction(()=>{
                const { data } = resp;
                this.WindSpeed = data.map((v: number[])=>{
                    return{
                        "serialNumber":v[0],
                        "year":v[1],
                        "englishName":v[2],
                        "chineseName":v[3],
                        "typhoonNumber":v[4],
                        "windSpeed":v[5]
                    }
                })
            }),
            (resp)=>runInAction(()=>{
                prompt.error(resp.msg)
            })
        )
    };

    //强度列表
    @action
    getStrengthList = () =>{
        getStrengthList().then(
            (resp) =>runInAction(()=>{
                const { data } = resp;
                this.Strength = data.map((v: number[])=>{
                    return{
                        "serialNumber":v[0],
                        "year":v[1],
                        "englishName":v[2],
                        "chineseName":v[3],
                        "typhoonNumber":v[4],
                        "typhoonStrength":v[5]
                    }
                });
            }),
            (resp) =>runInAction(()=>{
                prompt.error(resp.msg)
            })
        )
    };

    //月矩平
    @action
    getMoonSquare =() =>{
        getMoonSquare().then(
            (resp) =>runInAction(()=>{
                const { data } = resp;
                const dataList = data[0];
                this.MonthFrequency = dataList.split(',');
                this.MoonSquareLineData = this.MonthFrequency.map((v: number)=> v-data[2]);
            }),
            (resp) =>runInAction(()=>{
                prompt.error(resp.msg)
            })
        )
    };

    //年矩平
    @action
    getYearFlat =() =>{
        getYearFlat().then(
            (resp) =>runInAction(()=>{
                const { data } = resp;
                const yearList = data[1];
                const dataList = data[0];
                this.YearxAxis = yearList.split(',');
                this.YearFrequency = dataList.split(',');
                this.YearFlat = this.YearFrequency.map((v:number)=> v-data[2])
            }),
            (resp) =>runInAction(()=>{
                prompt.error(resp.msg)
            })
        )
    }
}

export type TypeRealTimeMonitorStore = RealTimeMonitorStore;
