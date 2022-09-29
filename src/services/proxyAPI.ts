import EnumEnv from '@/constants/EnumEnv';
const apiPrefix = EnumEnv.apiPrefix || '/';

export const proxyAPI = (api: string) => apiPrefix.replace(/\/$/, "") + "/" + api.replace(/^\//, "");
export const proxyDevAPI = (api: string) => apiPrefix.replace(/\/$/, "/dp") + "/" + api.replace(/^\//, "");

