import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import Logo from './Logo';
import Menus from './Menus';
import Login from './Login';

import { TypeQueryStore } from '../model/QueryStore';

const Header: React.FC<{queryStore: TypeQueryStore}> = ({queryStore}) => {
    const { headerMenuStore } = queryStore;

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
                }
            `}</style>
        </div>
    )
}

export default observer(Header)
