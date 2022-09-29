import React from 'react';
import {observer} from 'mobx-react-lite';

const FulScreen = ({fulScreenStore}) =>{
    const {fulScreen,changeFulScreen} = fulScreenStore
    const show = fulScreen ? "none" : "block"
    return (
        <div
            className="fulScreen"
            onClick={()=>changeFulScreen(true)}
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
                    display: ${show};
                }
            `}</style>
        </div>
    )
}

FulScreen.propTypes = {

};

export default observer(FulScreen);