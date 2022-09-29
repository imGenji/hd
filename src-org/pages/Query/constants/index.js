import EnumEnv from '@/constants/EnumEnv';

/**
 * 枚举头部菜单
 */
export const EnumHeaderMenus = {
    realTimeMonitor: {
        label: "实时监测",
        value: "realTimeMonitor",
    },
    normalQuery: {
        label: "一般查询",
        value: "normalQuery",
    },
    areaQuery: {
        label: "区划查询",
        value: "areaQuery",
    },
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
