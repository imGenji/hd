import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import TyphoonBtn from './TyphoonBtn'
import TyphoonContent from './TyphoonContent'

const Typhoon = ({legendStore}) =>{
    return (
        <Fragment>
            <TyphoonContent
                legendStore={legendStore}
            />
            <TyphoonBtn
                legendStore={legendStore}
            />
        </Fragment>
    )
}

// Legend.propTypes = {
//     queryStore: PropTypes.object.isRequired
// };

export default observer(Typhoon);