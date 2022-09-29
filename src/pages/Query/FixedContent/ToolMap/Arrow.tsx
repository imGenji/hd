import React from 'react';
import {observer} from 'mobx-react-lite';

interface ArrowProps {
    show: boolean;
    setShow: (show: boolean) => void;
}

const Arrow: React.FC<ArrowProps> = ({show, setShow}) => {
    return (
        <div
            onClick={() => setShow(!show)}
            className="tool-map-wrap"
        >
            <img src={require('./img/right-arrow.png')} alt=""/>

            {/*language=SCSS*/}
            <style jsx>{`
             .tool-map-wrap{
                display: flex;
                background: #e0e0e2;
                border-radius: 5px;
                margin: 0 4px;
                align-items: center;
                height: 40px;
                cursor: pointer;
                img{
                    vertical-align: middle;
                    display: block;
                    width: 22px;
                    height: 22px;
                    transform: rotateY(${show ? 0 : 180}deg);
                }
            }
        `}</style>
        </div>

    )
}

export default observer(Arrow);
