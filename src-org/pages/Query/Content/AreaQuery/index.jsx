import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import Tooltip from '../../commonUI/Tooltip'
// const tooltipData = [{
//     title:"标题",
//     list:[
//         {
//             title:"过去时间",
//             text:"8月15日14时"
//         },
//         {
//             title:"过去时间",
//             text:"8月15日14时"
//         },
//         {
//             title:"过去时间",
//             text:"8月15日14时"
//         }
//     ],
//     table:[
//         {
//             dataSource1:"七级",
//             dataSource2:"22",
//             dataSource3:"33",
//             dataSource4:"44",
//             dataSource5:"55",
//         }
//     ]
// }];
// <Tooltip tooltipData={tooltipData}/>
const AreaQuery = () => {
    return (
        <div>区域查询</div>
    )
};

AreaQuery.propTypes = {
    queryStore: PropTypes.object.isRequired
};

export default observer(AreaQuery);
