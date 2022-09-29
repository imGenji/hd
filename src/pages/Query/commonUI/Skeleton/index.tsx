import React from 'react';

interface SkeletonProps {
    label?: React.ReactNode;
    content?: React.ReactNode;
    style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({label,content,style}) =>{
    return (
        <div className="skeleton" style={style}>
            <div className="skeleton-left">
                {label}
            </div>
            <div className="skeleton-right">
                {content}
            </div>

            {/*language=SCSS*/}
            <style jsx>{`
                .skeleton{
                  width: 100%;
                  margin-bottom:10px;
                  display: flex;
                  .skeleton-left{
                    width:20%;
                    background: #5195db;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    color:#d7d7d7;
                    font-size:12px;
                    border-radius: 3px 0 0 3px;
                  }
                  .skeleton-right{
                    width:80%;
                    padding:0 10px;
                    background: rgba(255,255,255,0.8)
                  }
                }
            `}</style>
        </div>
    )
};

export default Skeleton