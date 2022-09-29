import React from "react";

interface BjColorProps{
    content: React.ReactNode,
    title: string
}

const Container: React.FC<BjColorProps> = ({content,title}) =>{
    return(
        <div className="single-content">
            <div className="single-content-title">
                <h3>{title}</h3>
            </div>
            {content}
            {/*language=SCSS*/}
            <style jsx>{`
                .single-content{
                    width: 48%;
                    background: #002952;
                    padding: 5px 10px;
                    float: left;
                    height: 100%;
                    margin-right: 2%;
                    margin-top:5px;
                    .single-content-title{
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    color:#fff;
                    background: #003566;
                    h3{
                      color: #0A94F7;
                      float: left;
                      font-size: 12px;
                      padding: 0 10px;
                    }
                  }
                }
            `}</style>
        </div>
    )
};

export default Container