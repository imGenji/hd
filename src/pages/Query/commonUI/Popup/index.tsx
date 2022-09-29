import React from 'react';
import PropTypes from 'prop-types';

interface PopupProps {
    active?: boolean;
    children: React.ReactNode
}

const Popup: React.FC<PopupProps> = ({active, children}) => {
    if(!active) return null;

    return (
        <div>
            {children}
        </div>
    )
};

Popup.propTypes = {
    active: PropTypes.bool,
    children:PropTypes.node
};

export default Popup;
