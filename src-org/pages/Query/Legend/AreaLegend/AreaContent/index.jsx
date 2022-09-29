import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import Card from '../../../commonUI/Card'
import LegendContent from '../../../commonUI/LegendContent'
import Popup from '../../../commonUI/Popup'
import {AreaLegend} from '@/pages/Query/constants/EnumLegend'
const AreaContent = ({legendStore}) =>{
    const {activeArea} = legendStore
    return (
        <Popup
            active={activeArea}
        >
            <Card>
                <LegendContent
                    LegendData={AreaLegend}
                    borderRadius="0"
                />
            </Card>
        </Popup>
    )
}

AreaContent.propTypes = {
    legendStore: PropTypes.object.isRequired
};

export default observer(AreaContent);
