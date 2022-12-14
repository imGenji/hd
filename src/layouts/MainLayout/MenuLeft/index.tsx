import React, {useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import * as css from 'styled-jsx/css';
import { Layout, Menu } from 'antd';
import { TypeMenu } from '../constants/EnumDefaultMenus'
import MapCommandDispatcher from "../MapCommandDispatcher";
import AppIcon from "../AppIcon";
import {theme} from "../theme";
import {EnumMapCommand} from "../constants/EnumMapCommand";
import {queryString} from '@/utils/T'

// 获取默认展开的菜单keys
const recursionOpenKeys = (menus: TypeMenu[], currentUrl: string, openKeys: string[] = []) => {
    for (let i = 0; i < menus.length; i++) {
        const item = menus[i];
        if (item.url.indexOf(currentUrl) !== -1) {
            if(Array.isArray(item.url)){
                openKeys.push(item.url.join('-'))
            }

            if(item.children && item.children.length > 0){
                recursionOpenKeys(item.children, currentUrl, openKeys);
            }
        }
    }

    return openKeys;
};

// 递归获取菜单
const formatLeftMenu = (menus: TypeMenu[], currentUrl: string) => menus.map((val) => {
    if (val.children.length > 0) {
        return (
            <Menu.SubMenu
                key={(val.url as string[]).join('-')}
                title={<span>{ val.icon ? <AppIcon {...val.icon} style={{ fontSize: 14, marginRight: 10 }} /> : null}<span>{val.label}</span></span>}
            >
                {formatLeftMenu(val.children, currentUrl)}

            </Menu.SubMenu>
        );
    } else {
        let realUrl = (() => {
            if (Array.isArray(val.url)) {
                if (val.url.indexOf(currentUrl) !== -1) {
                    return currentUrl;
                }

                return val.url[0];
            }

            return val.url;
        })();

        const linkTo = Array.isArray(val.url) ? val.url[0] : val.url;
        const target = val.target || "";
        const RouteLink = target === "_blank" ? ({children, to,  ...rest}: {children: React.ReactNode, to: string, target: string}) => (<a href={to} {...rest}>{children}</a>) : Link;

        if(val.mapCommand){
            // const key = JSON.stringify({mapCommand: val.mapCommand, url: val.url || ""});
            const key = val.mapCommand;

            return (
                // @ts-ignore
                <Menu.Item key={key} url={val.url}>
                    {val.icon ? <AppIcon {...val.icon} style={{ fontSize: 14, marginRight: 10 }} /> : null}
                    <span>{val.label}</span>
                </Menu.Item>
            );
        }

        return (
            <Menu.Item key={realUrl}>
                <RouteLink to={linkTo} target={target}>
                    {val.icon ? <AppIcon {...val.icon} style={{ fontSize: 14, marginRight: 10 }} /> : null}
                    <span>{val.label}</span>
                </RouteLink>
            </Menu.Item>
        );
    }
});

interface MenuLeftProps extends RouteComponentProps{
    leftMenu: TypeMenu[];
    currentUrl: string;
    leftWidth: number;
    collapsed: boolean;
    onLeftMenuCollapse: (collapsed: boolean) => void;
    mapCommandDispatcher: MapCommandDispatcher;
}

const MenuLeft: React.FC<MenuLeftProps> = ({leftMenu, currentUrl, leftWidth, collapsed, onLeftMenuCollapse, mapCommandDispatcher, history}) => {
    if (leftMenu.length < 1) return null;
    const { mapCommand } = queryString.parse(history.location.search);
    const [currentMapCommand, setCurrentMapCommand] = useState(mapCommand as string);

    useEffect(() => {
        if(mapCommand) {
            setCurrentMapCommand(mapCommand as string);
            mapCommandDispatcher.emit(mapCommand)
        }
    }, [mapCommand])

    // language=SCSS
    const {styles, className} = css.resolve`
        .menu-left{
            overflow: auto;
            height: 100vh;
            position: fixed;
            left: 0px;
            top: ${theme.headerHeight}px;
            z-index: 10000;
        }
    `;

    return (
        <Layout.Sider
            theme="dark"
            className={`${className} menu-left`}
            width={leftWidth}
            collapsible
            collapsed={collapsed}
            onCollapse={onLeftMenuCollapse}
        >
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[currentMapCommand || currentUrl]}
                defaultOpenKeys={recursionOpenKeys(leftMenu, currentUrl)}
                onClick={(e) => {
                    const isMapCommand = Object.values(EnumMapCommand).includes(e.key);
                    if(e.item.props.url == currentUrl && isMapCommand){
                        setCurrentMapCommand(e.key);
                        mapCommandDispatcher.emit(e.key);
                    }else if(e.item.props.url !== currentUrl && isMapCommand){
                        setCurrentMapCommand(e.key);
                        history.push(`${e.item.props.url}?mapCommand=${e.key}`)
                    }else {
                        setCurrentMapCommand(null)
                    }
                }}
            >
                {formatLeftMenu(leftMenu, currentUrl)}
            </Menu>

            {styles}
        </Layout.Sider>
    );
};

MenuLeft.propTypes = {
    leftMenu: PropTypes.array.isRequired,
    currentUrl: PropTypes.string.isRequired,
    leftWidth: PropTypes.number.isRequired,
    collapsed: PropTypes.bool.isRequired,
    onLeftMenuCollapse: PropTypes.func.isRequired,
};

export default withRouter(MenuLeft);
