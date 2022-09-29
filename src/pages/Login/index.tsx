import React, {useState} from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Input, Icon, Button} from 'antd'
import prompt from '@/utils/prompt';
import EnumEnv from '@/constants/EnumEnv';
import {login} from '@/services/auth';
import EnumRouter from "@/constants/EnumRouter";

const Login: React.FC<RouteComponentProps> = ({history}) => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = () => {
        setSubmitting(true);
        login(userName, password).then(resp => {
            if(resp.code === '0') {
                prompt.success("登录成功");
                setSubmitting(false);
                window.open(EnumRouter.query, '_self');
            } else {
                prompt.error("用户名或密码错误");
            }

        }, resp => {
            prompt.error(resp.msg);
            setSubmitting(false);
        })
    };

    return (
        <div className="wrap">
            {/*<div className="logo">*/}
                {/*<img src={require('./img/goldwind-logo.png')} alt="金风科技logo"/>*/}
            {/*</div>*/}
            {/*<div className="title">*/}
                {/*金风科技*/}
            {/*</div>*/}
            <div className="main">
                <div className="login_content">
                    <p>用户登录</p>
                </div>
                <div className="input">
                    <Input
                        {...{
                            size: 'large',
                            prefix: <img style={{width:"24px"}} src={require('./img/user-icon.png')} alt="金风科技logo"/>,
                            placeholder: '',
                            style: {marginBottom: 10},
                            value: userName,
                            onChange: (e) => setUserName(e.target.value.trim())
                        }}
                    />

                    <Input {...{
                        type: "password",
                        size: 'large',
                        prefix: <img style={{width:"24px"}} src={require('./img/password-icon.png')} alt="金风科技logo"/>,
                        placeholder: '',
                        value: password,
                        onChange: (e) => setPassword(e.target.value.trim())
                    }} />
                    <Button type="primary" icon={submitting ? "loading": ""} size="large" onClick={handleSubmit} style={{width: "100%", marginTop: 24}}>登录</Button>
                </div>
            </div>
            {/*language=SCSS*/}
            <style jsx>{`
                .wrap{
                    background: url(${require('./img/windfarm.jpg')}) no-repeat;;
                    width: 100%;
                    height: 100%;
                    min-width: 500px;
                    min-height: 500px;
                    background-size: 100% 100%;
                    overflow: hidden;
                    color: #fff;
                    padding-top: 200px;
                    .logo{
                      width: 310px;
                      margin: 100px auto auto  auto;
                    }
                    .title {
                        margin: 10px 0 30px;
                        font-size: 42px;
                        font-weight: bold;
                        text-align: center;
                    }
                    .main {
                        width: 400px;
                        height: 320px;
                        text-align: center;
                        background: #47729d;
                        background: rgba(71,114,157,0.8);
                        margin: 0 auto;
                        @media screen and (max-width: 576px) {
                            width: 95%;
                        }
                        .login_content{
                            position: relative;
                            width: 100%;
                            text-align: center;
                            padding-bottom: 10px;
                            p {
                                width: 342px;
                                margin: 0 auto;
                                text-align: center;
                                font-size: 25px;
                                line-height: 60px;
                            }
                        }
                        .input{
                           width: 72%;
                           margin: 0 auto;
                           :global(.ant-input-affix-wrapper .ant-input) {
                                border: none;
                                outline: none;
                                height: 60px;
                                font-size: 22px;
                                color: #666;
                                background: #fff;
                           }
                           :global(.ant-btn-primary) {
                                cursor: pointer;
                                width: 290px;
                                text-align: center;
                                margin-top: 25px;
                                height: 60px;
                                line-height: 60px;
                                background-color: #FFCC31;
                                font-size: 22px;
                                border-radius: 5px;
                                color: #fff;
                           }
                        }
                    }
                }
            `}</style>
        </div>
    );
}


export default withRouter(Login)


