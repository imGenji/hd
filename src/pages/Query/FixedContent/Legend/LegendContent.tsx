import React from 'react';
import Card from '../../commonUI/Card'

export interface TypeLegendContentItem {
    headline: string;
    data: {color: string; label: string; value?: string}[];
}

interface LegendContentProps {
    data: TypeLegendContentItem[];
    line?: string;
}

const LegendContent: React.FC<LegendContentProps> = ({data,line}) => {

    return (
        <Card>
            {
                data.map((item,index)=>{
                    return(
                        <div className="typhoonLegend" key={index}>
                            <p>{item.headline}</p>
                            <ul>
                                {
                                    item.data.map((item,index)=>{
                                        return(
                                            <li key={index}>
                                                <span className="round" style={{background:item.color}}></span>
                                                {item.label}
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
                                border-radius: 20px;
                            }
                        }
                    }
                }
            `}</style>
        </Card>
    )
};

export default LegendContent;
