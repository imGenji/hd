import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import Legend from '../../../commonUI/Legend'

const TyphoonBtn = ({legendStore}) =>{
    const {activeTyphoon,changeActiveTyphoon} =legendStore

    return (
        <Legend
            active={activeTyphoon}
            style={{borderRadius:"15px 0 0 15px"}}
            onClick={()=>{activeTyphoon ? changeActiveTyphoon(false) :changeActiveTyphoon(true)}}
            LegendLabel="台风图例"
        />
    )
}

// Legend.propTypes = {
//     queryStore: PropTypes.object.isRequired
// };

export default observer(TyphoonBtn);