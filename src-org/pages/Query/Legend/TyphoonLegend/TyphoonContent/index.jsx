import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import Card from '../../../commonUI/Card'
import LegendContent from '../../../commonUI/LegendContent'
import Popup from '../../../commonUI/Popup'
import {TyphoonLegend} from '@/pages/Query/constants/EnumLegend'
const TyphoonContent = ({legendStore}) =>{
    const {activeTyphoon} = legendStore
    return (
        <Popup
            active={activeTyphoon}
        >
            <Card>
                <LegendContent
                    LegendData={TyphoonLegend}
                    borderRadius="20px"
                />
            </Card>
        </Popup>
    )
}

TyphoonContent.propTypes = {
    legendStore: PropTypes.object.isRequired
};

export default observer(TyphoonContent);
