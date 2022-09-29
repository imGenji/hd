import React from "react";

interface TypeSkeleton{
    content:React.ReactNode
}

const Skeleton:React.FC<TypeSkeleton> = ({content}) =>{
    return(
        <div className="container">
            <h3>查询结果</h3>
            {content}
            {/*language=SCSS*/}
            <style jsx>{`
                .container{
                    width: 820px;
                    padding: 10px;
                    position: absolute;
                    top:20px;
                    left: 200px;
                    background: #00213f;
                    h3{
                        color:#fff;
                        text-align: center;
                        font-size: 18px;
                    }
                }
            `}</style>
        </div>
    )
};
export default Skeleton