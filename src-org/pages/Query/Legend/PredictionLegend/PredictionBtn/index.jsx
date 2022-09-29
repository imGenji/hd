import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import Legend from '../../../commonUI/Legend'

const PredictionBtn = ({legendStore}) =>{
    const {activePrediction,changeActivePrediction} =legendStore
    return (
        <Legend
            active={activePrediction}
            style={{borderRadius:"0 15px 15px 0",left:"60px"}}
            styleWrap={{left:"150px"}}
            onClick={()=>{activePrediction ? changeActivePrediction(false) :changeActivePrediction(true)}}
            LegendLabel="预报机构"
        />
    )
}

PredictionBtn.propTypes = {
    legendStore: PropTypes.object.isRequired
};

export default observer(PredictionBtn);