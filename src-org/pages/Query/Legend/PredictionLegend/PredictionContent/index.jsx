import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import Card from '../../../commonUI/Card'
import Popup from '../../../commonUI/Popup'
import LegendInput from '../../../commonUI/LegendInput'
import {PredictionLegend} from '@/pages/Query/constants/EnumLegend'
const PredictionContent = ({legendStore}) =>{
    return (
        <Popup
            active={true}
        >
            <Card>
                <LegendInput
                    LegendDataRight={PredictionLegend}
                    legendStore={legendStore}
                />
            </Card>
        </Popup>
    )
}

PredictionContent.propTypes = {
    legendStore: PropTypes.object.isRequired
};

export default observer(PredictionContent);
