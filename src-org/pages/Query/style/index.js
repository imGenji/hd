import css from 'styled-jsx/css';

// 基础样式
// language=SCSS
export const baseStyle = css.global`
    html,body,h1,h2,h3,h4,
    h5,h6,p,a,li,ol,ul,input,textarea,form{
        margin: 0;
        padding: 0;
    }
    html,body{
        height:100%;
    }
    body{
        font-size: 12px;
        font-family: "Microsoft YaHei",Arial,"Hiragino Sans GB",simsun,sans-serif;
        min-width: 1200px;
        min-height: 600px;
        overflow: hidden;
    }
    ul {
        list-style: none;
    }
    a{
        text-decoration: none;
    }
    input{
        border: none;
        outline: none;
        background: transparent;
    }
    select{
        -moz-appearance:none;
        -webkit-appearance:none;
        appearance:none;
    }
    button{
        cursor: pointer;
        margin: 5px 0;
        border-radius: 3px;
        font-size: 13px;
        border: none;
        outline: none;
        text-align: center;
        width: 50px;
        height: 24px;
        line-height: 24px;
        background: #84b4dc;
        color: #fff;
    }
    
    button:hover{
        background: #428bca;
    }
`
