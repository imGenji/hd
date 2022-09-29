import React from 'react';

interface ListTitleProps {
    data: {
        left: string;
        right: string;
        ty: string;
    }[];
    activeIndex: number[];
    onClick?: (index: number, selected: string, ty: string) => void;
    style?: React.CSSProperties;
}

const ListTitle: React.FC<ListTitleProps> = ({data,activeIndex,onClick,style})  => {
    return (
       <ul className="listTitle" style={style}>
           {
               data.map((item,index)=>{
                   return(
                       <li key={index} onClick={() => onClick(index, item.left, item.ty)}>
                           <div className={activeIndex.includes(index) ? 'activeLeft' :'left'}>{item.left}</div>
                           <div className={activeIndex.includes(index) ? 'activeRight' :'right'}>{item.right}</div>
                       </li>
                   )
               })
           }

           {/*language=SCSS*/}
           <style jsx>{`
               .listTitle{
                    border-bottom: 1px solid #bbb;
                    height: 200px;
                    overflow: auto;
                    margin: 5px 0;
                    padding-right: 3px;
                    max-height: 360px;
                    li{
                        cursor: pointer;
                        margin-bottom: 10px;
                        overflow: hidden;
                        display: flex;
                        justify-content: space-around;
                        .left{
                            width: 40%;
                            background: #666;
                            color: #e6eaef;
                            -moz-border-radius: 5px 0 0 5px;
                            -webkit-border-radius: 5px 0 0 5px;
                            border-radius: 5px 0 0 5px;
                            float: left;
                            height: 24px;
                            line-height: 24px;
                            text-align: center;
                        }
                        .right{
                            float: left;
                            height: 24px;
                            line-height: 24px;
                            text-align: center;
                            width: 60%;
                            background: #e6eaef;
                            color: #666;

                        }
                        .activeLeft{
                            width: 40%;
                            background: #5195db;
                            color: #e6eaef;
                            -moz-border-radius: 5px 0 0 5px;
                            -webkit-border-radius: 5px 0 0 5px;
                            border-radius: 5px 0 0 5px;
                            float: left;
                            height: 24px;
                            line-height: 24px;
                            text-align: center;
                        }
                        .activeRight{
                            float: left;
                            height: 24px;
                            line-height: 24px;
                            text-align: center;
                            width: 60%;
                            background: #e6eaef;
                            color: #f00;
                        }
                    }
               }
        `}</style>
       </ul>
    )
};

export default ListTitle;