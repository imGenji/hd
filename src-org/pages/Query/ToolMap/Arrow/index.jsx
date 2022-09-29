import React, {useContext,useState} from 'react';
import {observer} from 'mobx-react-lite';
import {MapUtilCtx} from '#/MapEngine';
const rightArrow = require('../img/right-arrow.png');

const Arrow = ({show,setShow}) =>{

    const [transform,setTransform] = useState(`rotateY(0deg)`)
    const handleClickHidden = () =>{
        if(show){
            setShow(false)
            setTransform(`rotateY(180deg)`)
        }else{
            setShow(true)
            setTransform(`rotateY(0deg)`)
        }
    }
    return (
            <div
                onClick={handleClickHidden}
                className="tool-map-wrap"
            >
                <img src={rightArrow} alt=""/>
                {/*language=SCSS*/}
                <style jsx>{`
                 .tool-map-wrap{
                    display: flex;
                    background: #e0e0e2;
                    border-radius: 5px;
                    margin: 0 4px;
                    align-items: center;
                    height: 40px;
                    img{
                        vertical-align: middle;
                        display: block;
                        width: 22px;
                        height: 22px;
                        transform: ${transform};
                    }

                }
            `}</style>
            </div>

    )
}

Arrow.propTypes = {
};

export default observer(Arrow);