import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import Area from './AreaLegend'
import Prediction from './PredictionLegend'
import Typhoon from './TyphoonLegend'

const Legend = ({queryStore}) =>{
    const { legendStore,fulScreenStore } = queryStore;
    const { fulScreen} = fulScreenStore;
    const show = fulScreen ? "block" : "none"
    return (
        <div className="Legend_Wrap">
            <Typhoon legendStore={legendStore}/>
            <Area legendStore={legendStore}/>
            <Prediction legendStore={legendStore}/>
            {/*language=SCSS*/}
            <style jsx>{`
                .Legend_Wrap{
                    position: fixed;
                    z-index: 1000;
                    left: 10px;
                    width: 270px;
                    flex-wrap: nowrap;
                    bottom: 60px;
                    display: ${show};
                }
            `}</style>
        </div>
    )
}

Legend.propTypes = {
    queryStore: PropTypes.object.isRequired
};

export default observer(Legend);