import React from "react";
const Logo: React.FC = () => {
    return (
        <div className="th_logo">
            <div className="logo"></div>
            <div className="title">| &nbsp; 国家气候中心台风平台</div>
            {/*<img src={require("./img/logo.png")} alt="金风科技logo" />*/}
            {/*language=SCSS*/}
            <style jsx>{`
                .th_logo{
                    margin: 1px 0 0 20px;
                    font-size: 16px;
                    float: left;
                    width: 450px;
                    height: 55px;
                    display: flex;
                    .logo{
                        float:left; 
                        width: 120px;
                        height: 55px;
                        background: url(${require("./img/logo.png")}) no-repeat right;
                        background-size: 75% 100%;
                    }
                    .title{
                        float:left;
                        width: 200px;
                        line-height: 55px;
                        color:#fff;
                        font-size:18px;
                        font-weight: 600;
                        text-align: center;
                    }
                }
            `}</style>
        </div>
    )
};

export default Logo;