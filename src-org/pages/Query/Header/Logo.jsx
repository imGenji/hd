import React from "react";

const Logo = () => {
    return (
        <div className="th_logo">
            <img src={require("./img/goldwind-logo.png")} alt="金风科技logo" />

            {/*language=SCSS*/}
            <style jsx>{`
                .th_logo{
                    margin: 1px 0 0 20px;
                    font-size: 0;
                    float: left;
                    img{
                        height: 100%;
                    }
                }
            `}</style>
        </div>
    )
}

export default Logo;
