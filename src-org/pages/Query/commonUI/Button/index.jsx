import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Button = ({ style, onClick,onMouseOver,onMouseOut,children,background,hoverBackground,color}) => {
    return (
        <Fragment>
        <button
            className="btn"
            style={style}
            onClick={onClick}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
        >
            {children}
        </button>
            {/*language=SCSS*/}
            <style jsx>{`
                .btn{
                  width:70px;
                  height:25px;
                  background: #509be6;
                  &:hover{
                    background: #07a8fb;
                    transition:background 0.5s;
                  }
                }
            `}</style>
            {/*language=SCSS*/}
            <style jsx>{`
              .btn{
                background: ${background};
                &:hover{
                  background: ${hoverBackground};
                  color: ${color};
                }
              }
            `}</style>
        </Fragment>
    )
};

Button.propTypes = {
    children:PropTypes.node,
    type: PropTypes.string,
    style: PropTypes.object,
    onClick:PropTypes.func,
};
export default Button;