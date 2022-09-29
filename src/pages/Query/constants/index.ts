import EnumEnv from '@/constants/EnumEnv';

interface TypeEnumHeaderMenus {
    [index: string]: {
        label: string;
        value: string;
        redirectUrl?:string;
    }
}

/**
 * 枚举头部菜单
 */
export const EnumHeaderMenus: TypeEnumHeaderMenus = {
    realTimeMonitor: {
        label: "实时监测",
        value: "realTimeMonitor",
    },
    normalQuery: {
        label: "一般查询",
        value: "normalQuery",
    },
    climateDistribution: {
        label: "台风气候分布",
        value: "climateDistribution",
    },
    // typhoonQuery:{
    //     label:"台风查询",
    //     value:"typhoonQuery"
    // },
    historyTyphoon: {
        label: "历史台风查询",
        value: "historyTyphoon",
    },
    guideToUse: {
        label: "使用指南",
        value: "guideToUse",
        redirectUrl: EnumEnv.guideToUseUrl,
    }
};
