/*
    该文件只是用来枚举台风数据中的关键指标类型
*/

import L from 'leaflet';
import {string} from "prop-types";
export const typhoonConstants = {
    typhoon_strengthDesc: {
        "TC": "热带气旋",
        "TD": "热带低压",
        "TS": "热带风暴",
        "STS": "强热带风暴",
        "TY": "台风",
        "STY": "强台风",
        "SuperTY": "超强台风"
    },
    typhone_type: {
        "BABJ":{
            "TC": "#669900",
            "TD": "#669900",
            "TS": "#00FF00",
            "STS": "#CCFF00",
            "TY": "#FDB700",
            "STY": "#FD5C1C",
            "SUPERTY": "#FD0026"
        },
        "RJTD":{
            "TC": "#FF99FF",
            "TD": "#FF99FF",
            "TS": "#FF66FF",
            "STS": "#FFCCFF",
            "TY": "#FF6699",
            "STY": "#FF3399",
            "SUPERTY": "#FF0033"

        },
        "PGTW":{
            "TC": "#00FFFF",
            "TD": "#00FFFF",
            "TS": "#00CCFF",
            "STS": "#0099FF",
            "TY": "#0066FF",
            "STY": "#006699",
            "SUPERTY": "#003366"
        }
    },
    typhoonCircle_colors: [{
        color: "#F4D000",
        weight: 1,
        opacity: 1,
        fill: true,
        fillColor: "#F4D000",
        fillOpacity: 0.3,
        clickable: true
    }, {
        color: "#FD8B00",
        weight: 1,
        opacity: 1,
        fill: true,
        fillColor: "#FD8B00",
        fillOpacity: 0.3,
        clickable: true
    }, {color: "#FD5C1C", weight: 1, opacity: 1, fill: true, fillColor: "#FD5C1C", fillOpacity: 0.3, clickable: true}],
    typhoon_level: ["七级", "十级", "十二级"],
    typhoon_direction: {"N": "北", "W": "西", "E": "东", "S": "南"},
    guardLine_24: [[34.005024, 126.993568], [21.971252, 126.993568], [17.965860, 118.995521], [10.971050, 118.995521], [4.486270, 113.018959], [-0.035506, 104.998939]],
    guardLine_48: [[-0.035506, 104.998939], [-0.035506, 119.962318], [14.968860, 131.981361], [33.959474, 131.981361]]
};


/**
 * 枚举台风等级类型
 */
export const EnumTyphoonStrengthType = {
    TC: "TC",
    TD: "TD",
    TS: "TS",
    STS: "STS",
    TY: "TY",
    STY: "STY",
    SUPERTY: "SUPERTY",
    SuperTY:"SuperTY"
};


/**
 * 预报机构类型
 */
export const EnumForecastOrgType = {
    BABJ: "BABJ",       // 中国
    RJTD: "RJTD",       // 日本
    PGTW: "PGTW",       // 美国
};


/**
 * 预报机构信息
 */
export const EnumForecastOrg = {
    [EnumForecastOrgType.BABJ]: {
        label: "中国",
        color: "#669900",
        value: EnumForecastOrgType.BABJ,
        typhoonLevelToColor: {
            [EnumTyphoonStrengthType.TC]: "#669900",
            [EnumTyphoonStrengthType.TD]: "#669900",
            [EnumTyphoonStrengthType.TS]: "#00FF00",
            [EnumTyphoonStrengthType.STS]: "#CCFF00",
            [EnumTyphoonStrengthType.TY]: "#FDB700",
            [EnumTyphoonStrengthType.STY]: "#FD5C1C",
            [EnumTyphoonStrengthType.SUPERTY]: "#FD0026",
        },
    },
    [EnumForecastOrgType.RJTD]: {
        label: "日本",
        color: "#FF99FF",
        value: EnumForecastOrgType.RJTD,
        typhoonLevelToColor: {
            [EnumTyphoonStrengthType.TC]: "#FF99FF",
            [EnumTyphoonStrengthType.TD]: "#FF99FF",
            [EnumTyphoonStrengthType.TS]: "#FF66FF",
            [EnumTyphoonStrengthType.STS]: "#FFCCFF",
            [EnumTyphoonStrengthType.TY]: "#FF6699",
            [EnumTyphoonStrengthType.STY]: "#FF3399",
            [EnumTyphoonStrengthType.SUPERTY]: "#FF0033",
        },
    },
    [EnumForecastOrgType.PGTW]: {
        label: "美国",
        color: "#00FFFF",
        value: EnumForecastOrgType.PGTW,
        typhoonLevelToColor: {
            [EnumTyphoonStrengthType.TC]: "#00FFFF",
            [EnumTyphoonStrengthType.TD]: "#00FFFF",
            [EnumTyphoonStrengthType.TS]: "#00CCFF",
            [EnumTyphoonStrengthType.STS]: "#0099FF",
            [EnumTyphoonStrengthType.TY]: "#0066FF",
            [EnumTyphoonStrengthType.STY]: "#006699",
            [EnumTyphoonStrengthType.SUPERTY]: "#003366",
        },
    },
};

/**
 * 枚举警戒线
 */
export const EnumguardLine = {
    "24": [[34.005024, 126.993568], [21.971252, 126.993568], [17.965860, 118.995521], [10.971050, 118.995521], [4.486270, 113.018959], [-0.035506, 104.998939]],
    "48": [[-0.035506, 104.998939], [-0.035506, 119.962318], [14.968860, 131.981361], [33.959474, 131.981361]]
};
/**
 * 枚举台风风圈颜色
 */
export const EnumTyphoonCircle_colors= [{
    color: "#F4D000",
    weight: 1,
    opacity: 1,
    fill: true,
    fillColor: "#F4D000",
    fillOpacity: 0.3,
    clickable: true,
    renderer: new L.SVG(),
    pane: 'tilePane'
}, {
    color: "#FD8B00",
    weight: 1,
    opacity: 1,
    fill: true,
    fillColor: "#FD8B00",
    fillOpacity: 0.3,
    clickable: true,
    renderer: new L.SVG(),
    pane: 'tilePane'
}, {
    color: "#FD5C1C",
    weight: 1,
    opacity: 1,
    fill: true,
    fillColor: "#FD5C1C",
    fillOpacity: 0.3,
    clickable: true,
    renderer: new L.SVG(),
    pane: 'tilePane'
}]