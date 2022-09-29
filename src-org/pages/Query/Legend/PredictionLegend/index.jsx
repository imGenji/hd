import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import PredictionBtn from './PredictionBtn'
import PredictionContent from './PredictionContent'

const Prediction = ({legendStore}) =>{
    return (
        <Fragment>
            <PredictionContent
                legendStore={legendStore}
            />
            <PredictionBtn
                legendStore={legendStore}
            />
        </Fragment>
    )
}

// Legend.propTypes = {
//     queryStore: PropTypes.object.isRequired
// };

export default observer(Prediction);