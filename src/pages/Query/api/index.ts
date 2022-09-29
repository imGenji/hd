import { request } from '@/utils/T';
import { proxyAPI } from '@/services/proxyAPI';
import { PromiseResp } from '@/utils/T/core/request';
const { get ,post, form,postJSON } = request;

/**
 * 获取所有的省份
 */
export const getProvince = (): PromiseResp<string[]> => get(proxyAPI(`dic/getProviAll`));

/**
 * 市数据
 * @param {object} province
 */
export const getCity =(province: string): PromiseResp<string[]> => get(proxyAPI(`dic/getCitysBySf`), {province});

/**
 * 一般查询台风数据
 * @returns {Promise}
 */
export const getTyphoonByFilter = (params: API.TypeNormalQueryParams): PromiseResp<API.TypeTyphoon> =>  post(proxyAPI(`/tf/main.json`), params);

/**
 * 台风气候分布数据
 * @returns {Promise}
 */
export const getClimateFilter = (params: API.TypeClimateStoreParams): PromiseResp<API.TypeTyphoon> =>  postJSON(proxyAPI(`climateDistribution/query`), params);

/**
 * 获取单条台风路径数据
 * @param tfbh 台风编号
 * @returns {Promise}
 */
export const getTyphoonPathDataById = (tfbh: string, ty: string): PromiseResp<{
    name: string;
    tfbh: string;
    pathData: API.TypeTyphoonPoint[];
}> => get(proxyAPI(`tfData/tf_path_data/${ty}/${tfbh}.ajax`));


/**
 * 历史台风查询台风列表数据
 * @params year 年份
 * @returns {Promise}
 */
export const getTyphoonByYear = (params: {year: number}): PromiseResp<API.TypeTyphoon> => post(proxyAPI(`tf/main.json`), params);

/**
 * 实时监测单条台风数据
 */
export const getTyphoonPath = () => get(proxyAPI(`tfData/tf_path_data/realtime.ajax`));

/**
 * 相似台风路径数据
 * @param params
 */
export const getSimilarTyphoons = (params:API.TypeSimilarTyphoons) => get(proxyAPI(`/typhoonSimilar/get`),params);

/**
 * 获取台风历数据
 */
export const getTyphoonCalendar = () => get(proxyAPI(`tfAssessment/singleAssessment`));

/**
 * 获取风速列表数据
 */
export const getWindSpeedList = () =>get(proxyAPI(`tfAssessment/getExtremalWindv`));

/**
 * 获取强度列表
 */
export const getStrengthList = () =>get(proxyAPI(`tfAssessment/getExtremalStrength`));

/**
 * 获取月矩平数据
 */
export const getMoonSquare =() =>get(proxyAPI(`tfAssessment/monthAssessment`));

/**
 * 获取年矩平数据
 */
export const getYearFlat =() =>get(proxyAPI(`tfAssessment/yearAssessment`));

/**
 * 导出数据
 */
export const exportData = (tys: string, bhs: string, exceltype: string) => form(proxyAPI(`tfData/exportDatasToExcel`),{bhs,tys,exceltype},);
/**
 * 导出统计结果
 */
export const exportStatistics = (tys: string,bhs: string, exceltype: string = 'Statistics', lon: string = '120', lat: string = '30', radius: string = '3000') =>
    form(proxyAPI(`/tfData/exportDatasToExcelnew`),{tys, bhs, exceltype, lon, lat, radius});
/**
 * 导出KMZ
 */
export const exportKMZ = (tfbhlist: string) => form(proxyAPI('/tfData/tfkmlData'),{tfbhlist});
