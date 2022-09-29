import React from "react";
import {Link} from 'react-router-dom';
import EnumRouter from '@/constants/EnumRouter';

const Login = () => {
    return (
        <div className="th_info">
            <div className="user_info">
                <Link to={EnumRouter.login}>登录</Link>
            </div>
            <div className="typhoon_info">目前西太平洋海域24小时警戒线内无活动台风</div>
            
            {/*language=SCSS*/}
            <style jsx>{`
                .th_info{
                    float: right;
                    margin: 10px 10px 0 0;
                    
                    .user_info{
                        width: 150px;
                        height: 20px;
                        margin: 0 auto;
                        line-height: 20px;
                        padding-left: 27px;
                        color: #fff;
                        font-size: 14px;
                        background: url(${require("./img/u3084.png")}) no-repeat left center;
                        
                        :global(a){
                            color:#fff;
                        }
                    }
                    .typhoon_info{
                        height: 20px;
                        line-height: 20px;
                        background: url(${require("./img/u3086.png")}) no-repeat left center;
                        font-size: 13px;
                        padding-left: 27px;
                        color: #f07d01;
                    }
                }
            `}</style>
        </div>
    )
}

export default Login;
