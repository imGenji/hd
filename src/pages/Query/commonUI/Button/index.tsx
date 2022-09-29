import React, { Fragment } from 'react';

interface ButtonProps {
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent) => void;
    onMouseOver?: (e: React.MouseEvent) => void;
    onMouseOut?: (e: React.MouseEvent) => void;
    children?: React.ReactNode;
    background?: string;
    hoverBackground?: string;
    color?: string;
}

const defaultEventCallback = (e: React.MouseEvent) => {};

const Button: React.FC<ButtonProps> = ({ style, onClick,onMouseOver,onMouseOut,children,background,hoverBackground,color}) => {

    return (
        <Fragment>
        <button
            className="btn"
            style={style}
            onClick={onClick || defaultEventCallback}
            onMouseOver={onMouseOver || defaultEventCallback}
            onMouseOut={onMouseOut || defaultEventCallback}
        >
            {children}
        </button>
            {/*language=SCSS*/}
            <style jsx>{`
                .btn{
                  width:70px;
                  height:25px;
                  background:  ${background || "#509be6"};
                  &:hover{
                    background: ${hoverBackground || "#07a8fb"};
                    transition:background 0.5s;
                    color: ${color || "inherit"};
                  }
                }
            `}</style>

        </Fragment>
    )
};

export default Button;
