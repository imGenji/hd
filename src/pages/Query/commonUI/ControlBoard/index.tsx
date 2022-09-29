import React,{useState} from 'react';
import PropTypes from 'prop-types';

interface ControlBoardProps {
    name?: React.ReactNode;
    closeName?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    background?: string;
    width?: number;
    height?: number;
}

const ControlBoard: React.FC<ControlBoardProps> = ({name,closeName, onClick,style,background,width,height}) =>{
    const [isActive, setIsActive] = useState(true)

    return (
        <div
            className="ControlBoard"
            onClick={() => {
                onClick && onClick();
                setIsActive(!isActive);
            }}
            style={style}
        >
            <span className="ControlBoard-title" >{isActive ? name : closeName}</span>
            <span className={isActive ? "ControlBoard-img" : "ControlBoard-img-show"} onClick={()=> setIsActive(!isActive)}>
                <img src={require('./img/u1761.png')} alt="" />
            </span>
            {/*language=SCSS*/}
            <style jsx>{`
                .ControlBoard{
                    cursor: pointer;
                  //display: none;
                  width:100%;
                  height:36px;
                  background: rgba(0,0,0,0.6);
                  border-radius: 5px;
                  text-align: center;
                  line-height: 36px;
                  font-size:16px;
                  color:#ccc;
                  font-weight: 800;
                  .ControlBoard-title{
                  display: inline-block;
                    width: 70%;
                  }
                  .ControlBoard-img{
                    display: inline-block;
                    
                    width:30%;
                    height: 30px;
                    img{
                      height: 12px;
                    }
                  }
                  .ControlBoard-img-show{
                    display: inline-block;
                    width:30%;
                    height: 30px;
                    img{
                      height: 12px;
                      transform: rotate(180deg)
                    }
                  }
                }
            `}</style>
            {/*language=SCSS*/}
            <style jsx>{`
              .ControlBoard{
                background: ${background};
                width:${width}px;
                height:${height}px;
              }
            `}</style>
        </div>
    )
};

ControlBoard.propTypes = {
    name: PropTypes.node,
    onClick:PropTypes.func,
    style:PropTypes.object,
    background:PropTypes.string,
    width:PropTypes.number,
    height:PropTypes.number
};

export default ControlBoard
