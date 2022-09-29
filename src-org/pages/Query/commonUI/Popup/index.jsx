import React from 'react';
import PropTypes from 'prop-types';

const Popup = ({active, children}) => {
    return (
        <div style={{display:active ? "block" : "none"}}>
            {children}
        </div>
    )
};
Popup.propTypes = {
    visible: PropTypes.bool,
    popUpContent:PropTypes.element
};
export default Popup;
