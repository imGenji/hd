import React, { Fragment} from "react";
import css from 'styled-jsx/css';
import Router from './router';
import LocaleWrapper from './intl';

export default () => {
    const baseStyle = getBaseStyle();
    return (
        <Fragment>
            <LocaleWrapper>
                <Router />
            </LocaleWrapper>
            <style jsx global>{baseStyle}</style>
        </Fragment>
    );
}

/**
 * 全局样式
 */
const getBaseStyle = () => {

    // language=SCSS
    return css.global`
        html, body{
            margin: 0px;
            padding: 0px;
            height: 100%;
        }
        
        #wrapper{
            height: 100%;
        }
    `
}
