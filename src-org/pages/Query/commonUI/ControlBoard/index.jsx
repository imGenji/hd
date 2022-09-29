import React,{useState} from 'react';
import PropTypes from 'prop-types';
import img from '../Select/img/u1761.png'
const ControlBoard = ({name,closeName, onClick,style,background,width,height}) =>{
    const [showImg, setImg] = useState("ControlBoard-img");
    const [isActive, setStatus] = useState(true)

    return (
        <div className="ControlBoard" onClick={onClick} style={style}>
            <span className="ControlBoard-title" >{isActive ? name : closeName}</span>
            <span className={showImg} onClick={()=>{
                if(!isActive){
                    setImg("ControlBoard-img-show")
                    setStatus(true)
                }else{
                    setImg("ControlBoard-img")
                    setStatus(false)
                }
            }}>
                <img src={img} alt="" />
            </span>
            {/*language=SCSS*/}
            <style jsx>{`
                .ControlBoard{
                  //display: none;
                  width:100%;
                  height:30px;
                  background: rgba(0,0,0,0.6);
                  border-radius: 5px;
                  text-align: center;
                  line-height: 30px;
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
                width:${width};
                height:${height};
              }
            `}</style>
        </div>
    )
};

ControlBoard.propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    // name:PropTypes.string,
    onClick:PropTypes.func,
    style:PropTypes.object,
    background:PropTypes.string,
    width:PropTypes.string,
    height:PropTypes.string
};

export default ControlBoard