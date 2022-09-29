import L, {Marker} from 'leaflet';
import { EnumForecastOrg, EnumForecastOrgType, EnumguardLine, EnumTyphoonCircle_colors } from './constants';
import * as dom from "./dom";
import {windCircle} from './extend/WindCircle';
// @ts-ignore

// 台风事件类型
interface TypeTyphoonEvent {
    "point:click"?: (e: L.LeafletMouseEvent, data: API.TypeTyphoonPoint) => void;
    "point:mouseover"?: (e: L.LeafletMouseEvent, data: API.TypeTyphoonPoint) => void;
    "point:mouseout"?: (e: L.LeafletMouseEvent, data: API.TypeTyphoonPoint) => void;
}
interface WindCircleData {
    lat: number,
    lng: number,
    wc: WC
}
type WC = (string|number|null)[][]
export default class Typhoon {
    map: L.Map;

    typhoonManager: Map<string, {
        realLayerGroup: L.LayerGroup;
        forecast: {
            "BABJ": L.LayerGroup,
            "RJTD": L.LayerGroup,
            "PGTW": L.LayerGroup,
        };
        windCircleLayer: L.LayerGroup
    }> = new Map();
    typhoonDivIcons: Marker[]=[]
    constructor(map: L.Map) {
        this.map = map;
    }

    /**
     * 绘制真实台风路径
     */
    drawRealTyphoon = (tfbh: string, pathData: API.TypeTyphoonPoint[], events?: TypeTyphoonEvent, isCurrent = false) => {
        const typhoonManager = this.typhoonManager;
        let layerGroup: L.LayerGroup;

        if(!typhoonManager.has(tfbh)){
            const realLayerGroup = L.layerGroup().setZIndex(201).addTo(this.map);
            typhoonManager.set(tfbh, {
                realLayerGroup,
                windCircleLayer: L.layerGroup().setZIndex(10).addTo(this.map),
                forecast:{
                    "BABJ": L.layerGroup().addTo(this.map),
                    "RJTD": L.layerGroup().addTo(this.map),
                    "PGTW": L.layerGroup().addTo(this.map),
                }
            });

            layerGroup = realLayerGroup;
        }else {
            const { realLayerGroup } = typhoonManager.get(tfbh);
            layerGroup = realLayerGroup;
        }

        const lastPoint = pathData[pathData.length - 1];

        // 绘制台风中心
        L.marker([lastPoint.lat, lastPoint.lon], {
            icon: L.icon({
                iconUrl: require("./img/tf1.gif"),
                iconSize: [28, 28]
            })
        }).addTo(layerGroup);
        this.drawTyphoonLine(pathData, layerGroup, false);
        this.drawTyphoonPoint(pathData, layerGroup, events, false, isCurrent);
    };

    /**
     * 绘制预报台风
     */
    drawForecastTyphoon = (tfbh: string, pathPoint: API.TypeTyphoonPoint) => {
        const { realLayerGroup, forecast, windCircleLayer } = this.typhoonManager.get(tfbh);
        Object.values(forecast).forEach(layerGroup => layerGroup.remove());

        const newForecast = {
            "BABJ": L.layerGroup().addTo(this.map),
            "RJTD": L.layerGroup().addTo(this.map),
            "PGTW": L.layerGroup().addTo(this.map),
        };
        this.typhoonManager.set(tfbh, {realLayerGroup, forecast: newForecast, windCircleLayer});

        for(const [forecastOrg, layerGroup] of Object.entries(newForecast)) {

            switch (forecastOrg) {
                case EnumForecastOrgType.BABJ:
                    this.drawTyphoonLine([pathPoint, ...pathPoint.forcastDataList], layerGroup, true);
                    this.drawTyphoonPoint([pathPoint, ...pathPoint.forcastDataList], layerGroup, null, true);

                    break;
                case EnumForecastOrgType.RJTD:
                    this.drawTyphoonLine([pathPoint, ...(pathPoint.forcast_RJTD_DateList || [])], layerGroup, true);
                    this.drawTyphoonPoint([pathPoint, ...(pathPoint.forcast_RJTD_DateList || [])], layerGroup, null, true);

                    break;
                case EnumForecastOrgType.PGTW:
                    this.drawTyphoonLine([pathPoint, ...(pathPoint.forcast_PGTW_DateList || [])], layerGroup, true);
                    this.drawTyphoonPoint([pathPoint, ...(pathPoint.forcast_PGTW_DateList || [])], layerGroup, null, true);
                    break;
            }

        }
    };

    /**
     * 删除台风
     */
    delRealTyphoon = (tfbh: string) => {
        const typhoonManager = this.typhoonManager;
        const { realLayerGroup, forecast } = typhoonManager.get(tfbh);
        realLayerGroup && realLayerGroup.remove();
        Object.values(forecast).forEach(layerGroup => layerGroup.remove());
        typhoonManager.delete(tfbh);
    };

    /**
     * 设置预报机构台风可见度
     */
    setForecastOrgTyphoonVisible = (forecastOrgList: API.TypeForecastOrg[], type: "show" | "hidden") => {
        for(const [tfbh, value] of this.typhoonManager){
            forecastOrgList.forEach((forecastOrg) => {
                value.forecast[forecastOrg].eachLayer((layer: L.CircleMarker | L.Polyline) => {
                    if(type === "show"){
                        layer.setStyle({ opacity: 1, fillOpacity: 1 })
                    }else if(type === "hidden"){
                        layer.setStyle({ opacity: 0, fillOpacity: 0 })
                    }
                })
            })

        }
    };

    /**
     * 绘制警戒线
     * @param type
     */
    drawGuardLine = (type: "24" | "48" = "24") => {
        const map = this.map;
        const domId = "_guardLine";
        const layerGroup = L.layerGroup().addTo(map)
        L.polyline(EnumguardLine[type] as L.LatLngExpression[], {color: '#FF0', weight: 1, opacity: 1}).addTo(layerGroup);

        L.marker([30.005024, 126.993568], {
            icon: L.divIcon({
                html: `<div id="${domId}"/>`,
                className: 'my-div-icon',
                iconSize:[30, 30],
                iconAnchor: [6, 10],
            }),
        }).addTo(layerGroup);

        dom.insertGuardLine(domId);

        return layerGroup;
    };

    /**
     * 绘制真实台风详情面板
     */
    drawRealTyphoonDetailPanel = (detail: {tfbh: string, name: string, data: API.TypeTyphoonPoint}) =>{
        const { data } = detail;
        const domId = "_typhoon_point_detail";
        const marker = L.marker([data.lat, data.lon], {
            icon: L.divIcon({
                html: `<div id="${domId}"/>`,
                className: 'my-div-icon',
                iconSize:[280, 30],
                iconAnchor: [-3, 3],
            }),
        }).addTo(this.map);

        dom.insertRealTyphoonDetail(detail, domId);

        return marker;
    };
    /**
     * 组装风圈数据
     */
    getWindCircleData = (data: API.TypeTyphoonPoint) => {
        var arr = [
            ['', data.wind7v1 || 0, data.wind7v2 || 0, data.wind7v3 || 0, data.wind7v4 || 0, null],
            ['', data.wind10v1 || 0, data.wind10v2 || 0, data.wind10v3 || 0, data.wind10v4 || 0, null],
            ['', data.wind12v1 || 0, data.wind12v2 || 0, data.wind12v3 || 0, data.wind12v4 || 0, null]
        ];
        return arr;
    }
    /**
     * 绘制风圈
     */
    drawTyphoonWindCircle= (tfbh: string, data: WindCircleData) => {
        /* test data */
        // var data =data|| {
        //     lat: 140.1,
        //     lng: 7.7,
        //     wc: [['30KTS', 220, 180, 180, 220, 2317686],
        //         ['50KTS', 120, 120, 120, 120, 2317686],
        //         ['64KTS', 50, 50, 60, 60, 2317686]]
        // };
        /* test data end */
        let {windCircleLayer} = this.typhoonManager.get(tfbh);
        if(windCircleLayer) {
            windCircleLayer.clearLayers();
        }
        var wcLatlng = L.latLng(data.lat, data.lng);
        var wcLayer_12 = windCircle(wcLatlng, data.wc[2], EnumTyphoonCircle_colors[2]).bringToBack().addTo(windCircleLayer);
        var wcLayer_10 = windCircle(wcLatlng, data.wc[1], EnumTyphoonCircle_colors[1]).bringToBack().addTo(windCircleLayer);
        var wcLayer_7 = windCircle(wcLatlng, data.wc[0], EnumTyphoonCircle_colors[0]).bringToBack().addTo(windCircleLayer);
    }

    /**
     * 绘制台风点
     */
    private drawTyphoonPoint = (pathData: API.TypeTyphoonPoint[], layerGroup: L.LayerGroup, events?: TypeTyphoonEvent, isForecast = false, isCurrent = false) => {
        pathData.forEach((item,index) => {
            const { lat, lon, center, strength, tfbh, chnname, datetime, engname } = item;
            const wcData = {
                'lat': lat,
                'lng': lon,
                'wc': this.getWindCircleData(item)
            };
            const strengthColor = EnumForecastOrg[center].typhoonLevelToColor[strength];

            const options = {
                radius: isForecast ? 3 : 4,
                color: strengthColor,
                weight: 1,
                opacity: 1,
                fill: true,
                fillColor: strengthColor,
                fillOpacity: 1
            };

            const marker = L.circleMarker([lat, lon], options).bringToFront().addTo(layerGroup);
            // marker.__wcData__ = wcData;
            if(isCurrent && index === 0) {
                let domId =  'name-' + tfbh;
                let myIcon = L.divIcon({
                    html: `<div id="${domId}"/>`,
                    className: 'my-div-icon',
                    iconSize:[50, 50],
                    iconAnchor: [0, 0],
                });
                let nameMarker = L.marker([lat, lon], {icon: myIcon}).addTo(this.map);
                dom.insertTyphoonName(domId, chnname);
                this.typhoonDivIcons.push(nameMarker);
            }
            if(isCurrent && index === pathData.length - 1) {
                let domId =  'latestTime-' + tfbh;
                let myIcon = L.divIcon({
                    html: `<div id="${domId}"/>`,
                    className: 'my-div-icon',
                    iconSize:[280, 50],
                    iconAnchor: [-10, 10],
                });
                let timeMarker = L.marker([lat, lon], {icon: myIcon}).addTo(this.map);
                dom.insertLatestTimeInfo(domId, `最新位置：${datetime}`);
                this.typhoonDivIcons.push(timeMarker);
            }
            // 添加点事件
            if(events) {
                if (Reflect.has(events, "point:click")) {
                    marker.on("click", (e: L.LeafletMouseEvent) => {
                        // L.marker([item.lat, item.lon], {
                        //     icon: L.divIcon({
                        //         html: `<div id="_typhoon_point_detail"/>`,
                        //         className: 'my-div-icon',
                        //         iconSize:[280, 30],
                        //         // iconAnchor: [6, 10],
                        //         iconAnchor: [0, 0],
                        //     }),
                        // }).addTo(layerGroup)
                        //
                        // dom.insertRealTyphoonDetail("12", "23", item)
                        events["point:click"](e, item);
                        this.drawTyphoonWindCircle(tfbh, wcData);
                    });
                }

                if (Reflect.has(events, "point:mouseover")) {
                    marker.on("mouseover", (e: L.LeafletMouseEvent) => {
                        events["point:mouseover"](e, item);
                    });
                }

                if (Reflect.has(events, "point:mouseout")) {
                    marker.on("mouseout", (e: L.LeafletMouseEvent) => {
                        events["point:mouseout"](e, item);
                    });
                }
            }
        })
    };

    /**
     * 绘制台风线
     */
    private drawTyphoonLine = (pathData: API.TypeTyphoonPoint[], layerGroup: L.LayerGroup, isForecast = false) => {
        let firstCenter = pathData[0].center,
            firstStrength = pathData[0].strength

        if(!Object.keys(EnumForecastOrgType).includes(firstCenter)) {
            firstCenter = 'BABJ'
        }
        const latlngs: L.LatLngExpression[] = pathData.map(item => {
            const { lat, lon } = item;
            return [lat, lon];
        });
        const options = {
            color: EnumForecastOrg[firstCenter].typhoonLevelToColor[firstStrength],
            weight: 2,
            opacity: 1,
            dashArray: "",
        };
        if (isForecast) {
            options.color = EnumForecastOrg[firstCenter].color;
            options.dashArray = '5 5';
        }
        L.polyline(latlngs, options).addTo(layerGroup);
    }
    /**
     * 添加WMS切片到地图中
     * @param {String} url WMS服务地址
     * @param {Object} options 配置说明： http://leafletjs.com/reference-1.2.0.html#tilelayer-wms
     */
    addWMSLayer = (url: string, options = {}) => {
        const wmsTileLayer = L.tileLayer.wms(url, Object.assign({
            layers: '',
            format: 'image/png',
            transparent: true,
            version: '',
            styles: 'windbarbs',
            minSpeed: 0,
            markSize: 10,
            dateTime: '2018-10-10 06:00:00',
            path: 'Momentum_Component_of_wind_Isobaric_surface_10'
        }, options));

        this.map.addLayer(wmsTileLayer);

        return wmsTileLayer;
    }
    /**
     * 清除所有台风图层
     */
    clearAllLayer = () => {
        this.typhoonDivIcons.forEach((v) => {
            v.remove();
        })
        this.typhoonDivIcons = [];
        this.typhoonManager.forEach((v, k) => {
            v.realLayerGroup.clearLayers();
        })
    }
}
