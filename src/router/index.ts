import transformRouter from '../transformRouter';
import EnumRouter from '@/constants/EnumRouter';

/**
 * 定义路由
 * @type {*[]}
 * 说明:
 *  {
         uri: "/",                                          // 该字段必填
         component: import("./Single/CodeEditor"),      // 该字段必填
         storeKeys: "mobx的状态对象key",                      // 该字段可选
         props: "传入组件的props"                             // 该字段可选, 必须是对象
         isMainLayout: true,                                // 该字段可选, 是否开启MainLayout布局, 默认是true
     }
 */
const routes = [
    {
        uri: EnumRouter.login,
        component: import("@/pages/Login"),
        isMainLayout: false
    },
    {
        uri: EnumRouter.query,
        component: import("@/pages/Query"),
        isMainLayout: false,
        stores:{
            queryStore: require("@/pages/Query/model/QueryStore").default,
        }
    },
];


export default transformRouter(routes);


