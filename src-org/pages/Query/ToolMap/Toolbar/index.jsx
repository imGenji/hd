import React from 'react';
import {observer} from 'mobx-react-lite';

const Toolbar = ({toolMapData}) =>{
    return (
        <div className="tool-map-wrap">
            {
                toolMapData.map((item,index)=>{
                    return(
                        <div
                            onClick={item.onClick}
                            key={index}
                            className="option">
                            <img src={item.img} alt=""/>
                            <span>{item.title}</span>
                        </div>
                    )
                })
            }
        {/*language=SCSS*/}
        <style jsx>{`
            .tool-map-wrap{
                display: flex;
                background: #e0e0e2;
                border-radius: 5px;
                margin: 0 4px;
                align-items: center;
                img{
                    vertical-align: middle;
                    display: block;
                    width: 22px;
                    height: 22px;
                }
                .option{
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    height: 40px;
                    margin:0 8px;
                    cursor: pointer;
                    span{
                        font-size: 15px;
                        font-weight: bold;
                        height: 40px;
                        line-height: 40px;
                        color: #000;
                    }
                    span:hover{
                      color: #109dfd;
                    }
                    img{
                        vertical-align: middle;
                        display: block;
                        width: 22px;
                        height: 22px;
                    }
                }
            }
            .dividerLine{
                width: 2px;
                height: 32px;
                background: #fff;
                float: left;
                margin: 4px 0;
            }

        `}</style>
    </div>
    )
}

Toolbar.propTypes = {
};

export default observer(Toolbar);