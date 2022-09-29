import L, {CircleMarker, CircleMarkerOptions, LatLng, LatLngBounds, LatLngExpression} from 'leaflet';
export type WC = (string|number|null)[];

function setOptions(obj: L.CircleMarker, options: L.CircleMarkerOptions) {
    if (!obj.hasOwnProperty('options')) {
        obj.options = obj.options ? Object.create(obj.options) : {};
    }
    for (var i in options) {
        //@ts-ignore
        obj.options[i] = options[i];
    }
    return obj.options;
}
const WindCircle = L.CircleMarker.extend({
    beforeAdd: function (map: L.Map) {
        // Renderer is set here because we need to call renderer.getEvents
        // before this.getEvents.
        this._renderer = map.getRenderer(this);
        this._map = map;
    },
    initialize: function (latlngs: L.LatLng, circle :WC, options: L.CircleMarkerOptions) {
        setOptions(this, options);
        this._latlng = latlngs;
        this._circle = circle;
    },
    redraw: function () {
        if (this._map) {
            this._updatePath(this);
        }
        return this;
    },
    _getLatRadius: function (r: number) {
        return r / 40075017 * 360
    },
    _getLngRadius: function (lr: number) {
        return lr / Math.cos((Math.PI / 180) * this._latlng.lat)
    },


    _updateBounds: function () {
        var e = this._latlng;
        this._point = this._map.latLngToLayerPoint(e);
        //northeast
        var t_northeast = this._getLngRadius(this._getLatRadius(this._circle[1] * 1000)),
            i_northeast = this._map.latLngToLayerPoint([e.lat, e.lng - t_northeast]);
        this._radius_northeast = Math.max(this._point.x - i_northeast.x, 1);
        //southeast
        var t_southeast = this._getLngRadius(this._getLatRadius(this._circle[2] * 1000)), i_southeast = this._map.latLngToLayerPoint([e.lat, e.lng - t_southeast]);
        this._radius_southeast = Math.max(this._point.x - i_southeast.x, 1);
        //southwest
        var t_southwest = this._getLngRadius(this._getLatRadius(this._circle[3] * 1000)), i_southwest = this._map.latLngToLayerPoint([e.lat, e.lng - t_southwest]);
        this._radius_southwest = Math.max(this._point.x - i_southwest.x, 1);
        //northwest
        var t_northwest = this._getLngRadius(this._getLatRadius(this._circle[4] * 1000)), i_northwest = this._map.latLngToLayerPoint([e.lat, e.lng - t_northwest]);
        this._radius_northwest = Math.max(this._point.x - i_northwest.x, 1);
        var r = this._radius = Math.max(this._radius_northeast, this._radius_southeast, this._radius_southwest, this._radius_northwest),
            r2 = this._radiusY || r,
            w = this._clickTolerance(),
            p = [r + w, r2 + w];
        this._pxBounds = new L.Bounds(this._point.subtract(p), this._point.add(p));
    },

    _update: function () {
        if (this._map) {
            this._updatePath();
        }
    },

    _updatePath: function () {
        this._renderer._setPath(this, this.getPathString());
    },

    getPathString: function () {
        /*//"M742,269 A 65,65, 0 ,0 ,1,807,334 L798,334A 56,56, 0 ,0 ,1,742,390 L742,369A 35,35, 0 ,0 ,1,707,334 L684,334A 58,58, 0 ,0 ,1,742,276 z"
         //"M1631,833 ae 1631,864 31,31 29490750,-5898150 L1655,864 ae 1631,864 24,24 23592600,-5898150 L1631,888 ae 1631,864 24,24 17694450,-5898150 L1600,864 ae 1631,864 31,31 11796300,-5898150X
         */

        if (this._radius_northeast && this._radius_southeast && this._radius_southwest && this._radius_northwest) {
            var t = this._point;

            var e_northeast = this._radius_northeast;
            var path_svg = "M" + t.x + "," + (t.y - e_northeast);
            var path_vml = "M" + t.x + "," + (t.y - e_northeast);
            path_svg += "A" + e_northeast + "," + e_northeast + ",0,0,1," + (t.x + e_northeast) + "," + t.y;
            path_vml += " ae " + t.x + "," + t.y + " " + e_northeast + "," + e_northeast + " " + 65535 * 450 + "," + -5898150;

            var e_southeast = this._radius_southeast;
            path_svg += "L" + (t.x + e_southeast) + "," + t.y;
            path_svg += "A" + e_southeast + "," + e_southeast + ",0,0,1," + t.x + "," + (t.y + e_southeast);
            path_vml += " ae " + t.x + "," + t.y + " " + e_southeast + "," + e_southeast + " " + 65535 * 360 + "," + -5898150;

            var e_southwest = this._radius_southwest;
            path_svg += "L" + t.x + "," + (t.y + e_southwest);
            path_svg += "A" + e_southwest + "," + e_southwest + ",0,0,1," + (t.x - e_southwest) + "," + t.y;
            path_vml += " ae " + t.x + "," + t.y + " " + e_southwest + "," + e_southwest + " " + 65535 * 270 + "," + -5898150;

            var e_northwest = this._radius_northwest;
            path_svg += "L" + (t.x - e_northwest) + "," + t.y;
            path_svg += "A" + e_northwest + "," + e_northwest + ",0,0,1," + t.x + "," + (t.y - e_northwest) + "z";
            path_vml += " ae " + t.x + "," + t.y + " " + e_northwest + "," + e_northwest + " " + 65535 * 180 + "," + -5898150 + "X";
            return L.Browser.svg ? path_svg : path_vml;
        }
        return "";
    }
})
export const windCircle = function(latlngs: L.LatLng, circle: WC, options: L.CircleMarkerOptions) {
    //@ts-ignore
    return new WindCircle(latlngs, circle, options)
}