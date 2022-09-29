import React,{Fragment, useState }  from 'react';
import PropTypes from 'prop-types';

const LegendContent = ({LegendData,line,borderRadius}) => {

    return (
        <Fragment>
            {
                LegendData.map((item,index)=>{
                    return(
                        <div className="typhoonLegend" key={index}>
                            <p>{item.headline}</p>
                            <ul>
                            {
                                item.label.map((item,index)=>{
                                    return(
                                        <li key={index}>
                                            <span className="round" style={{background:item.bg}}></span>
                                            {item.title}
                                        </li>
                                    )
                                })
                            }
                            </ul>
                        </div>
                    )
                })
            }
            {/*language=SCSS*/}
            <style jsx>{`
                .typhoonLegend{
                    width:300px;
                    display: block;

                    p {
                        font-size: 13px;
                        font-weight: bold;
                        text-indent: 5px;
                    }
                    h3 {
                        height: 25px;
                        line-height: 25px;
                        border-bottom:${line} ;//1px dashed #CCC
                        padding-left: 5px;
                        clear: both;
                    }
                    ul {
                        overflow: hidden;
                        margin: 5px 0;
                        padding-left: 5px;
                        li{
                            width: 85px;
                            line-height: 16px;
                            float: left;
                            .round{
                                width: 8px;
                                height: 8px;
                                display: inline-block;
                                margin-right: 6px;
                                border-radius: ${borderRadius};
                            }
                        }
                    }
                }

            `}</style>
        </Fragment>
    )
};

export default LegendContent;
