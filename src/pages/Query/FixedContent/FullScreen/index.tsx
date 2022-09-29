import React from 'react';
import {observer} from 'mobx-react-lite';
import { TypeQueryStore } from '../../model/QueryStore';

const FullScreen: React.FC<{queryStore: TypeQueryStore}> = ({queryStore}) =>{
    const {isFullScreen, triggerFullScreen} = queryStore;

    if(!isFullScreen) return null;

    return (
        <div
            className="fulScreen"
            onClick={() => triggerFullScreen()}
        >
            退出全屏

            {/*language=SCSS*/}
            <style jsx>{`
                .fulScreen{
                    cursor: pointer;
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    padding: 0 14px;
                    box-shadow: 1px 2px 1px rgba(0,0,0,.15);
                    line-height: 40px;
                    height: 40px;
                    color: #565656;
                    font-size: 13px;
                    z-index: 1000;
                    background: #fff;
                    border-radius: 3px;
                }
            `}</style>
        </div>
    )
}

export default observer(FullScreen);
