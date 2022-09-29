import { request } from '@/utils/T';
import { proxyAPI } from '@/services/proxyAPI'
const { get ,post } = request;

/**
 * 省数据
 */
export const getProvince = () => get(proxyAPI(`dic/getProviAll`));

/**
 * 市数据
 * @param {object} province
 */

export const getCity =(province) =>get(proxyAPI(`dic/getCitysBySf`), {province});

/**
 * 一般查询台风数据
 * @param {object} params
 * @param {string} params.id
 * @param {number} params.tfbhs
 * @param {} params.lat
 * @param {} params.lon
 * @param {} params.llWidth
 * @param {date} params.beginTime
 * @param {date} params.endTime
 * @param {} params.landCity
 * @param {number} params.dlprovince1
 * @param {number} params.province
 * @param {} params.dlcity1
 * @param {string} params.city
 * @param {} params.strength
 * @param {boolean} params.dlbefore
 * @param {number} params.strengthOrValue
 * @param {} params.minpressure
 * @param {} params.maxpressure
 * @param {} params.minvelocity
 * @param {} params.maxvelocity
 * @param {number} params.latlngType
 * @returns {Promise}
 */
export const getResult = (params) =>  post(proxyAPI(`tf/main.json`), params);

/**
 * 历史台风查询台风列表数据
 * @param id
 * @returns {Promise}
 */
export const getHistoryTab = (id) => get(proxyAPI(`tfData/tf_path_data/new/${id}.ajax`));

/**
 * 历史台风查询台风列表数据
 * @param {object} params
 * @param {string} params.id
 * @returns {Promise}
 */

export const getHistoryLabel = (params) => post(proxyAPI(`tf/main.json`), params);

/**
 * 导出数据
 */
export const getRutForm = (params) => post(proxyAPI(`tfData/exportDatasToExcel`),{params});