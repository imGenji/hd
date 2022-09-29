import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import Legend from '../../../commonUI/Legend'

const AreaBtn = ({legendStore}) =>{
    const {activeArea,changeActiveArea} =legendStore
    return (
        <Legend
            active={activeArea}
            style={{borderRadius:"0",left:"60px"}}
            styleWrap={{left:"80px"}}
            onClick={()=>{activeArea ? changeActiveArea(false) :changeActiveArea(true)}}
            LegendLabel="区域图例"
        />
    )
}

AreaBtn.propTypes = {
    legendStore: PropTypes.object.isRequired
};

export default observer(AreaBtn);