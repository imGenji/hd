import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import Logo from './Logo';
import Menus from './Menus';
import Login from './Login';

const Header = ({queryStore}) => {
    const { headerMenuStore,fulScreenStore } = queryStore;
    const { fulScreen} = fulScreenStore;
    const show = fulScreen ? "block" : "none"
    return (
        <div className="typhoon_h">
            <Logo />
                <Menus headerMenuStore={headerMenuStore}/>
            <Login />
            {/*language=SCSS*/}
            <style jsx>{`
                .typhoon_h{
                    width: 100%;
                    min-width: 550px;
                    height: 55px;
                    overflow: hidden;
                    position: absolute;
                    background: rgba(71,114,157,0.8);
                    top: 0;
                    left: 0;
                    z-index: 99;
                    display: ${show};
                }
            `}</style>
        </div>
    )
}

Header.propTypes = {
    queryStore: PropTypes.object.isRequired
}

export default observer(Header)
