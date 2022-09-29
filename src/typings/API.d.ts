declare namespace API{
    // 一般查询参数
    export interface TypeNormalQueryParams {
        tfbhs?: string,
        lat?:string,
        lon?:string,
        llWidth?:string,
        beginTime?:string,
        endTime?:string,
        landCity?: string,
        landProvince?: string,
        isLanding?: number,
        dlprovince1?:string,
        province?: string,
        dlcity1?:string,
        city?: string,
        strength?: string,
        dlbefore?: false,
        strengthOrValue?: number,
        minpressure?:string,
        maxpressure?:string,
        minvelocity?:string,
        maxvelocity?:string,
        latlngType?: number,
        locateStr?: string
    }

    // 台风气候分布查询参数
    export interface TypeClimateStoreParams {
        startYear?:string,
        endYear?:string,
        isLanding?:number | string,//是否查询登陆
        strengthOrValue?:number | string,//按强度等级或强度范围查询
        MeshBeginTime?:string,
        MeshEndTime?:string,
        seaBeginTime?:string,
        seaEndTime?:string,
        monthStr?:string,//各月
        minWindSeppd?:number | string,//按中心最大风速过滤(m/s)
        seaMonths?:string,//海区各月
        sea?:string,//海区
        strengthStr?:string,//台风强度等级
        minpressure?:string;//最小气压
        maxpressure?:string;//最大气压
        minvelocity?:string;//最小风速
        maxvelocity?:string;//最大风速
        locateStr?:string,//网格点编号

    }

    // 台风预报机构
    export type TypeForecastOrg = "BABJ" | "RJTD" | "PGTW";

    // 台风强度强度
    export type TypeTyphoonStrength = "TC" |"TD" | "TS" | "STS" | "TY" | "STY" | "SUPERTY";


    // 台风数据
    export interface TypeTyphoon{
        data:{
            chnname: string;
            maxWind: string;
            maxWindv: string;
            name: string;
            tfbh: string;
            ty: string;
            xuhao: string;
        }[];
        strength:{
            STS?: number;
            STY?: number;
            SuperTY?: number;
            TC?: number;
            TD?: number;
            TS?: number;
            TY?: number;
        };
        totalStrength:{
            STS?: string;
            STY?: string;
            SuperTY?: string;
            TC?: string;
            TD?: string;
            TS?: string;
            TY?: string;
        },
        monthStrength:{}
    }

    // 台风点数据
    export interface TypeTyphoonPoint {
        "id": number,
        "createTime": number,
        "updateTime": number,
        "xuhao": number,
        "tfxh": string,
        "tfbh": string,
        "tfbhbabj": string,
        "engname": string,
        "chnname": string,
        "center": TypeForecastOrg,
        "bwtype": string,
        "datetime": string,
        "handletime": string,
        "validtime": string,
        "fcsthour": string,
        "strength": TypeTyphoonStrength,
        "lon": number,
        "lat": number,
        "windclass": number,
        "windv": number,
        "pressure": number,
        "movedir": string,
        "movespeed": number,
        "wind7class": number,
        "wind7v1": number,
        "wind7v2": number,
        "wind7v3": number,
        "wind7v4": number,
        "wind10class": number,
        "wind10v1": number,
        "wind10v2": number,
        "wind10v3": number,
        "wind10v4": number,
        "wind12class": number,
        "wind12v1": number,
        "wind12v2": number,
        "wind12v3": number,
        "wind12v4": number,
        "wind6class": number,
        "wind6v1": number,
        "wind6v2": number,
        "wind6v3": number,
        "wind6v4": number,
        "memo": string,
        "tsCreated": number,
        "tsUpdated": number,
        "lonlatList": number[] | null,
        "isTwoCircleAlert": boolean,
        "forcastDataList": TypeTyphoonPoint[] | null,
        "forcast_PGTW_DateList": TypeTyphoonPoint[]  | null,
        "forcast_RJTD_DateList": TypeTyphoonPoint[]  | null,
        "fcsttype": string,
        "vdelFlgv": number,
        "vversion": number,
        "createTimeDescp": string,
        "updateTimeDescp": string
    }

    //相似台风路径数据
    export interface TypeSimilarTyphoons {
        tfbh?:string,
        distance?:string,
        startTime?:string,
        endTime?:string,
        topNumlimit?:string
    }
}

