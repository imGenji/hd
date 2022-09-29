import { EnumForecastOrgType, EnumTyphoonStrengthType, EnumForecastOrg } from '#/MapOfLeaflet/Typhoon/constants';

/**
 * 枚举预报机构类型
 */
export { EnumForecastOrgType }

/**
 * 枚举预报机构信息
 */
export { EnumForecastOrg }

/**
 * 台风强度类型
 */
export { EnumTyphoonStrengthType }


/**
 * 枚举台风等级图例
 */
export const EnumTyphoonStrengthLegend = {
    [EnumTyphoonStrengthType.TC]: {
        label: "热带气旋",
        value: EnumTyphoonStrengthType.TC,
        color: "#00cc99",
    },
    [EnumTyphoonStrengthType.TD]: {
        label: "热带低压",
        value: EnumTyphoonStrengthType.TD,
        color: "#00cc99",
    },
    [EnumTyphoonStrengthType.TS]: {
        label: "热带风暴",
        value: EnumTyphoonStrengthType.TS,
        color: "#00ff00",
    },
    [EnumTyphoonStrengthType.STS]: {
        label: "强热带风暴",
        value: EnumTyphoonStrengthType.STS,
        color: "#ccff00",
    },
    [EnumTyphoonStrengthType.TY]: {
        label: "台风",
        value: EnumTyphoonStrengthType.TY,
        color: "#fdb700",
    },
    [EnumTyphoonStrengthType.STY]: {
        label: "强台风",
        value: EnumTyphoonStrengthType.STY,
        color: "#fd5c1c",
    },
    [EnumTyphoonStrengthType.SUPERTY]: {
        label: "超强台风",
        value: EnumTyphoonStrengthType.SUPERTY,
        color: "#fd0026",
    },
    [EnumTyphoonStrengthType.SuperTY]: {
        label: "超强台风",
        value: EnumTyphoonStrengthType.SuperTY,
        color: "#fd0026",
    },
};

/**
 * 枚举区域图例
 */
export const EnumAreaLegend = [
    {
        headline: "沿海5省50年一遇最大风速(m/s)",
        data: [
            {
                label: "<37.5",
                color: "#4575b5"
            },
            {
                label: "37.5~42.5",
                color: "#8da5ba"
            },
            {
                label: "42.5~46",
                color: "#d9e0bf"
            },
            {
                label: "46~50",
                color: "#fcdd9a"
            },
            {
                label: "50~53",
                color: "#f08159"
            },
            {
                label: ">53",
                color: "#d73f2a"
            }

        ]
    },
    {
        headline: "沿海5省70米高度年平均风速(m/s)",
        data: [
            {
                label: "<5",
                color: "#fef980"
            },
            {
                label: "5~6",
                color: "#fcdd5d"
            },
            {
                label: "6~7",
                color: "#f7ba3e"
            },
            {
                label: "7~8",
                color: "#d6852a"
            },
            {
                label: "8~9",
                color: "#9d441c"
            },
            {
                label: ">9",
                color: "#6b1b10"
            }

        ]
    },
    {
        headline: "沿海5省50年一遇最大风速与平均风速比值",
        data: [
            {
                label: "<5",
                color: "#51a80a"
            },
            {
                label: "5~6",
                color: "#6fc411"
            },
            {
                label: "6~7",
                color: "#b0e021"
            },
            {
                label: "7~8",
                color: "#fdf733"
            },
            {
                label: "8~9",
                color: "#f6a931"
            },
            {
                label: "9~10",
                color: "#ee5130"
            },
            {
                label: ">10",
                color: "#ed462f"
            }
        ]
    }
];

export const EnumWindSpeed =[
    {
        label:"≥25",
        value:25,
        strength:"TD"
    },
    {
        label:"≥32.5",
        value:32.5,
        strength:"TS"
    },
    {
        label:"≥42.5",
        value:42.5,
        strength:"STS"
    },
    {
        label:"≥50",
        value:50,
        strength:"TY"
    },
    {
        label:"≥55",
        value:55,
        strength:"STY"
    },
    {
        label:"≥60",
        value:60,
        strength:"SuperTY"
    }
];



