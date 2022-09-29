import React from 'react';
import PropTypes from 'prop-types';

interface CardProps {
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({children}) => {
    return (
        <div className="card">
            {children}
            {/*language=SCSS*/}
            <style jsx>{`
                .card{
                    width: 275px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-shadow: 0 1px 5px rgba(0,0,0,0.65);
                    background: #fff;
                    margin-top: 10px;
                }
            `}</style>
        </div>
    )
};
Card.propTypes = {
    children: PropTypes.node,
};

export default Card;
