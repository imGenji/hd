import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import AreaBtn from './AreaBtn'
import AreaContent from './AreaContent'

const Area = ({legendStore}) =>{
    return (
        <Fragment>
            <AreaContent
                legendStore={legendStore}
            />
            <AreaBtn
                legendStore={legendStore}
            />
        </Fragment>
    )
}

Area.propTypes = {
    legendStore: PropTypes.object.isRequired
};

export default observer(Area);