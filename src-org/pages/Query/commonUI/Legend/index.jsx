import React,{ useState }  from 'react';
import PropTypes from 'prop-types';

const Legend = ({active,onClick,LegendLabel,style,styleWrap}) => {

    return (
        <div className="lengend_forcast" style={styleWrap}>
            <button
                style={style}
                onClick={onClick}
                className={active ? "on" : "off"}
            >
                {LegendLabel}
            </button>

            {/*language=SCSS*/}
            <style jsx>{`
                .lengend_forcast {
                    cursor: pointer;
                    overflow: hidden;
                    box-sizing: border-box;
                    position: fixed;
                    z-index: 7;
                    color: #fff;
                    font-size: 13px;
                    bottom: 10px;
                    .off {
                        float: left;
                        width: 70px;
                        text-align: center;
                        height: 30px;
                        line-height: 30px;
                        background: #63b8ff;
                    }
                    .on {
                        float: left;
                        width: 70px;
                        text-align: center;
                        height: 30px;
                        line-height: 30px;
                        background: #0986f0;
                    }
                }
            `}</style>
        </div>
    )
};

export default Legend;
