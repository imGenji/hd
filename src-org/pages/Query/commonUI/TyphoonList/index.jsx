import React,{Fragment} from 'react';
const TyphoonList = ({}) => {
    const title =[
        {
            "label":"风圈半径"
        },
        {
            "label":"东北"
        },
        {
            "label":"东南"
        },
        {
            "label":"西南"
        },
        {
            "label":"西北"
        }
    ];
    const data =[
        {
            "bj":1,
            "db":2,
            "dn":3,
            "xn":4,
            "xb":5
        }
    ]
    return(
        <Fragment>
            <div className="typhoonList">
                {/*头部*/}
                <div className="typhoonList-header">
                    <p>0623</p>
                    <p>尤特Utor</p>
                </div>
                {/*中部*/}
                <div className="typhoonList-content">
                    <div className="typhoonList-content-span">
                        <span>过去时间：</span>
                        <span>12月12日18时</span>
                    </div>
                    <div>
                        <span>过去时间：</span>
                        <span>12月12日18时</span>
                    </div>
                    <div>
                        <span>过去时间：</span>
                        <span>12月12日18时</span>
                    </div>
                    <div>
                        <span>过去时间：</span>
                        <span>12月12日18时</span>
                    </div>
                    <div>
                        <span>过去时间：</span>
                        <span>12月12日18时</span>
                    </div>
                    <div>
                        <span>过去时间：</span>
                        <span>12月12日18时</span>
                    </div>
                </div>
                {/*底部*/}
                <div className="typhoonList-footer">
                    <table style={{width:"100%",textAlign:"center"}}>
                        <thead style={{width:"100%",height:"30px"}}>
                        <tr >
                            {
                                title.map((item,index)=>{
                                    return(
                                        <th key={index}>{item.label}</th>
                                    )
                                })
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((v,index)=>{
                                return(
                                    <tr key={index}>
                                        <th>{v.bj}</th>
                                        <th>{v.db}</th>
                                        <th>{v.dn}</th>
                                        <th>{v.xn}</th>
                                        <th>{v.xb}</th>
                                        <th>(Km)</th>
                                    </tr>
                                )})
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/*language=SCSS*/}
            <style jsx>{`
              .typhoonList{
                position: absolute;
                top:100px;
                left:300px;
                width:20%;
                height: 100%;
                background: orange;
                .typhoonList-header{
                  width:100%;
                  height:30px;
                  background: #1774CE;
                  p{
                  float: left;
                  line-height: 30px;
                  padding: 0 5px;
                  }
                }
                .typhoonList-content{
                  width:100%;
                  height:120px;
                  background: #5BACEE;
                  .typhoonList-content-span{
                  
                  }
                }
                .typhoonList-footer{
                  width:100%;
                  height: 100%;
                  background: #5BACEE;
                }
              }
        `}</style>
        </Fragment>
    )
};
TyphoonList.propTypes = {

};
export default TyphoonList;
