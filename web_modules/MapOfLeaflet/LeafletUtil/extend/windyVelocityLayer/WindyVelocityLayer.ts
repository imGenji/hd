import L from 'leaflet';
import Windy, { InitParams, UV } from '../../lib/Windy';
import CanvasLayer from '../../lib/CanvasLayer';

export type WindData = [UV, UV];
export interface Opts extends L.LayerOptions{
    windyParams: InitParams
}

export interface TypeWindyVelocityLayer extends L.Layer{
    setData: (data: WindData) => void;
}

export const getWindyVelocityLayer = (opts: Opts) => {
    // @ts-ignore
    return new WindyVelocityLayer(opts) as TypeWindyVelocityLayer;
};

const WindyVelocityLayer = L.Layer.extend({
    options: {
        windyParams: {
            maxVelocity: 10,        // used to align color scale
            colorScale: null,
            data: null
        }
    },

    _map: null,
    _canvasLayer: null,
    _windy: null,
    _context: null,
    _timer: 0,
    _mouseControl: null,

    initialize: function(options: Opts) {
        // @ts-ignore
        L.setOptions(this, options);
    },

    onAdd: function(map: L.Map) {
        // 添加Canvas Layer到地图中
        this._canvasLayer = new CanvasLayer().delegate(this);
        this._canvasLayer.addTo(map);
        this._map = map;
    },

    onRemove: function() {
        this._destroyWind();
    },

    // 更新风数据
    setData: function setData(data: WindData) {
        this.options.windyParams.data = data;

        if (this._windy) {
            this._windy.setData(data);
            this._clearAndRestart();
        }

        this.fire('load');
    },

    onDrawLayer: function() {
        const self = this;

        if (!this._windy) {
            this._initWindy();
            return;
        }

        if (!this.options.windyParams.data) return;

        if (this._timer) clearTimeout(self._timer);

        this._timer = setTimeout(function () {
            self._startWindy();
        }, 10); // showing velocity is delayed
    },


    /*------------------------------------ PRIVATE ------------------------------------------*/
    _startWindy: function() {
        const bounds = this._map.getBounds();
        const size = this._map.getSize();

        // bounds, width, height, extent
        this._windy.start(
            [
                [0, 0],
                [size.x, size.y]
            ],
            size.x,
            size.y,
            [
                [bounds._southWest.lng, bounds._southWest.lat],
                [bounds._northEast.lng, bounds._northEast.lat]
            ]
        );
    },

    _initWindy: function() {
        const self = this;
        // windy object, copy options
        const options = Object.assign({ canvas: self._canvasLayer._canvas }, self.options.windyParams);
        // @ts-ignore
        this._windy = new Windy(options);

        // prepare context global var, start drawing
        this._context = this._canvasLayer._canvas.getContext('2d');
        this._canvasLayer._canvas.classList.add("velocity-overlay");
        this.onDrawLayer();

        this._map.on('dragstart', self._windy.stop);
        this._map.on('dragend', self._clearAndRestart);
        this._map.on('zoomstart', self._windy.stop);
        this._map.on('zoomend', self._clearAndRestart);
        this._map.on('resize', self._clearWind);

        this._initMouseHandler();
    },

    _initMouseHandler: function() {
        // if (!this._mouseControl && this.options.displayValues) {
        //     var options = this.options.displayOptions || {};
        //     options['leafletVelocity'] = this;
        //     this._mouseControl = L.control.velocity(options).addTo(this._map);
        // }
    },

    _clearAndRestart: function(){
        if (this._context) this._context.clearRect(0, 0, 30000, 30000);
        if (this._windy) this._startWindy();
    },

    _clearWind: function() {
        if (this._windy) this._windy.stop();
        if (this._context) this._context.clearRect(0, 0, 30000, 30000);
    },

    _destroyWind: function() {
        if (this._timer) clearTimeout(this._timer);
        if (this._windy) this._windy.stop();
        if (this._context) this._context.clearRect(0, 0, 30000, 30000);
        if (this._mouseControl) this._map.removeControl(this._mouseControl);
        this._mouseControl = null;
        this._windy = null;
        this._map.removeLayer(this._canvasLayer);
    }
});

export default WindyVelocityLayer;



