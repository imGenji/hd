import LeafletUtil, { LeafletUtilOpts } from './LeafletUtil';
import Typhoon from './Typhoon';
export interface MapUtilOpts extends  LeafletUtilOpts{}
export default class MapUtil extends LeafletUtil{
    typhoon: Typhoon;
    constructor(idOrHTMLElement: string | HTMLElement, opts: MapUtilOpts){
        super(idOrHTMLElement, opts)
        this.typhoon = new Typhoon(this.map);
    }
    //
    // /**
    //  * 绘制台风路径
    //  */
    // drawTyphoonRoute = ( LabelAndTable) => {
    //     return null;
    //     const map = this.map;
    //     // const L = this._leafletUtil.L;
    //     const strengthColor = {};
    //     TyphoonLegend.map(i => i.label.map(v => (
    //         strengthColor[v.value] = v.bg
    //     )));
    //     const lonLatList = LabelAndTable.pathData.map((item) => ({
    //             lon: item.lon,
    //             lat: item.lat,
    //             strength: item.strength
    //         }
    //     ));
    //
    //     //经纬度线
    //     for (let i = 0; i <= lonLatList.length - 2; i++) {
    //         L.polyline([lonLatList[i], lonLatList[i + 1]], {
    //             "weight": 2,    //线宽
    //             "color": strengthColor[lonLatList[i].strength]//颜色
    //         }).addTo(map);
    //     }
    //     let tooltip = '';
    //     lonLatList.forEach((v, index) => {
    //         //点
    //         const mark = L.circleMarker(L.latLng(v), {
    //             radius: 2,
    //             fill: true,
    //             weight: 5,
    //             color: strengthColor[v.strength],
    //             fillColor: strengthColor[v.strength]
    //         }).addTo(map).on('mouseover', onMapClick).on('mouseout', () => {
    //             tooltip && tooltip.remove()
    //         })
    //
    //         const popUpFirst = L.divIcon({
    //             iconAnchor: [-16, 12],
    //             html: `<div style= "width: 120px;border-radius:5px;border-radius:5px;display:flex;flex-flow: nowrap;position:absolute;left:-3px;top:-2px;color:#fbfdfe;font-weight: bold">
    //                         <div style="position:absolute;left:-12px;top:8px;border-width: 6px;border-style: solid;border-color: transparent #372d83 transparent transparent"></div>
    //                         <div style="height: 10%;border-radius:5px 0 0 5px;background: #61a2e1;display: flex;align-items: center;justify-content:center;padding:4px 6px;flex-flow: nowrap;">
    //                         ${LabelAndTable.tfbh}
    //                         </div>
    //                         <div style="height: 10%;border-radius:0 5px 5px 0;background: #61a2e1;display: flex;align-items: center;padding:4px 6px;flex-flow: nowrap;">
    //                         ${LabelAndTable.name}
    //                         </div>
    //                     </div>`
    //         });
    //         const typhoonIcon = L.divIcon({
    //             iconAnchor: [-16, 12],
    //             html: `<img src={typhoonGif}/>`
    //         });
    //
    //         const arrMovedir = []; //风向转换
    //         const tooltipData = {};//提示框数据
    //         if (index === 0) {
    //             L.marker(L.latLng(v), {icon: popUpFirst}).addTo(map);
    //         } else if (index === lonLatList.length - 1) {
    //             L.marker(L.latLng(v), {icon: typhoonIcon}).addTo(map);
    //         }
    //         LabelAndTable.pathData.map((item) => {
    //             const newMovedir = item.movedir.split("");
    //             const arrData = [];
    //             for (let i = 0; i < newMovedir.length; i++) {
    //                 newMovedir[i] = wind[newMovedir[i]];
    //                 arrData.push(newMovedir[i])
    //             }
    //             arrMovedir.push(arrData.join(""))
    //             const latLon = item.lat + "-" + item.lon;
    //             tooltipData[latLon] = {
    //                 lon: item.lon,
    //                 lat: item.lat,
    //                 datetime: item.datetime,
    //                 windv: item.windv,
    //                 pressure: item.pressure,
    //                 movedir: arrMovedir[index],
    //                 movespeed: item.movespeed,
    //                 wind7v1: item.wind7v1,
    //                 wind7v2: item.wind7v2,
    //                 wind7v3: item.wind7v3,
    //                 wind7v4: item.wind7v4,
    //                 wind10v1: item.wind10v1,
    //                 wind10v2: item.wind10v2,
    //                 wind10v3: item.wind10v3,
    //                 wind10v4: item.wind10v4,
    //                 wind12v1: item.wind12v1,
    //                 wind12v2: item.wind12v2,
    //                 wind12v3: item.wind12v3,
    //                 wind12v4: item.wind12v4,
    //             }
    //         });
    //         let newTooltipData = Object.assign({}, tooltipData);
    //
    //         //提示框
    //         function onMapClick(e) {
    //             const latLng = e.latlng.lat + "-" + e.latlng.lng;
    //             const popUp = L.divIcon({
    //                 iconAnchor: [-16, 12],
    //                 html: `<div style= "position:absolute;left:-2px;top:-2px;width: 220px;color:#fbfdfe;font-weight: bold">
    //                             <div style="position:absolute;left:-12px;top:8px;border-width: 6px;border-style: solid;border-color: transparent #372d83 transparent transparent"></div>
    //                             <div style="height: 10%;background: #1774cd;display: flex;align-items: center;padding-left: 6px;">
    //                             ${LabelAndTable.tfbh} ${LabelAndTable.name}
    //                             </div>
    //                             <div style="height: 90%;background: #5cacee;padding-left: 6px;padding-top: 4px;">
    //                                 <div style="width: 100%;display: flex;">
    //                                     <div>过去时间</div>:
    //                                     <div style="margin-left: 15px;">${newTooltipData[latLng].datetime.slice(0, 13) + "时"}</div>
    //                                 </div>
    //                                 <div style="width: 100%;display: flex;">
    //                                     <div>中心位置</div>:
    //                                     <div style="margin-left: 15px;">${newTooltipData[latLng].lat + "N/" + newTooltipData[latLng].lon + "E"}</div>
    //                                 </div>
    //                                 <div style="width: 100%;display: flex;">
    //                                     <div>最大风速</div>:
    //                                     <div style="margin-left: 15px;">${newTooltipData[latLng].windv + "米/秒"}</div>
    //                                 </div>
    //                                 <div style="width: 100%;display: flex;">
    //                                     <div>中心气压</div>:
    //                                     <div style="margin-left: 15px;">${newTooltipData[latLng].pressure + "百帕"}</div>
    //                                 </div>
    //                                 <div style="width: 100%;display: flex;">
    //                                     <div>移动方向</div>:
    //                                     <div style="margin-left: 15px;">${newTooltipData[latLng].movedir}</div>
    //                                 </div>
    //                                 <div style="width: 100%;display: flex;">
    //                                     <div>移动速度</div>:
    //                                     <div style="margin-left: 15px;">${newTooltipData[latLng].movespeed + "公里/小时"}</div>
    //                                 </div>
    //                                 <table style="margin-top: 6px;width: 100%;margin-bottom: 4px">
    //                                     <thead>
    //                                         <tr >
    //                                             <th>风圈半径</th>
    //                                             <th>东北</th>
    //                                             <th>东南</th>
    //                                             <th>西南</th>
    //                                             <th>西北</th>
    //                                         </tr>
    //                                     </thead>
    //                                     <tbody>
    //                                         <tr >
    //                                             <td>七级</td>
    //                                             <td>${newTooltipData[latLng].wind7v1}</td>
    //                                             <td>${newTooltipData[latLng].wind7v2}</td>
    //                                             <td>${newTooltipData[latLng].wind7v3}</td>
    //                                             <td>${newTooltipData[latLng].wind7v4}</td>
    //                                             <td>(Km)</td>
    //                                         </tr>
    //                                         <tr >
    //                                             <td>十级</td>
    //                                             <td>${newTooltipData[latLng].wind10v1}</td>
    //                                             <td>${newTooltipData[latLng].wind10v1}</td>
    //                                             <td>${newTooltipData[latLng].wind10v1}</td>
    //                                             <td>${newTooltipData[latLng].wind10v1}</td>
    //                                             <td>(Km)</td>
    //                                         </tr>
    //                                         <tr >
    //                                             <td>十二级</td>
    //                                             <td>${newTooltipData[latLng].wind12v1}</td>
    //                                             <td>${newTooltipData[latLng].wind12v2}</td>
    //                                             <td>${newTooltipData[latLng].wind12v3}</td>
    //                                             <td>${newTooltipData[latLng].wind12v4}</td>
    //                                             <td>(Km)</td>
    //                                         </tr>
    //                                     </tbody>
    //                                 </table>
    //                             </div>
    //                         </div>`
    //             });
    //             tooltip = L.marker(L.latLng(v), {icon: popUp}).addTo(map);
    //         }
    //     })
    // }
}
