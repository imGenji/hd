import React, { useEffect, useRef } from 'react';
import "./laydate/skins/default/laydate.css";
import "./laydate/laydate";
import "./laydate/need/laydateNew.css"
import img from "./icon.png"
const DatePicker = ({ onStartChange,onEndChange,startTimeTitle,endTimeTitle }) => {
    const divRef = useRef();
    useEffect(() => {

        //日期初始化
        // var layDateParameter1 = {
        //     elem: "#start_time",
        //     format: 'YYYY-MM-DD hh:mm:ss', //日期格式
        //     festival: false, //显示节日
        //     istime: true, //是否开启时间选择
        //     min: startTime, //最小日期
        //     max: endTime, //最大日期
        //     event: 'click', //触发事件
        //     isclear: true, //是否显示清空
        //     istoday: false, //是否显示今天
        //     issure: true, //是否显示确认
        //     start: '2010-1-1 00:00:00',  //开始日期
        //     fixed: false, //是否固定在可视区域
        //     choose: function (datas) { //选择日期完毕的回调
        //         var name = this.elem.substring(1);
        //         $('#beginTime').val(datas);
        //     }
        // };

        //开始时间
        var startTime = {
            elem: "#start_time",
            // elem: divRef.id,
            format: 'YYYY-MM-DD hh:mm:ss', //日期格式
            festival: false, //显示节日
            istime: true, //是否开启时间选择
            min: "1949-01-01 00:00:00", //最小日期
            max: laydate.now(0, "YYYY/MM/DD hh:00:00"), //最大日期
            event: 'click', //触发事件
            isclear: true, //是否显示清空
            istoday: false, //是否显示今天
            issure: true, //是否显示确认
            start: "1949-01-01 00:00:00",  //开始日期
            fixed: false, //是否固定在可视区域
            choose: function (datas) { //选择日期完毕的回调
                var name = this.elem.substring(1);
                $("#startTime").val(datas);
                onStartChange(datas);
            }
        };

        //结束时间
        var endTime = {
            elem: "#end_time",
            format: 'YYYY-MM-DD hh:mm:ss', //日期格式
            festival: false, //显示节日
            istime: true, //是否开启时间选择
            min: "1949-01-01 00:00:00", //最小日期
            max: laydate.now(0, "YYYY/MM/DD hh:00:00"), //最大日期
            event: 'click', //触发事件
            isclear: true, //是否显示清空
            istoday: false, //是否显示今天
            issure: true, //是否显示确认
            start: laydate.now(0, "YYYY/MM/DD hh:00:00"),  //开始日期
            fixed: false, //是否固定在可视区域
            choose: function (datas) { //选择日期完毕的回调
                var name = this.elem.substring(1);
                $("#endTime").val(datas);
                onEndChange(datas);
            }
        };

        laydate(startTime);
        laydate(endTime);
    }, []);

    return (
        <div>
            <div style={{width:"100%",height:"25px",marginBottom:"5px"}}>
                <label className="time-label">{startTimeTitle}</label>
                <div id="start_time" ref={divRef}>1949-01-01 00:00:00</div>
            </div>
            <div style={{width:"100%",height:"25px",marginBottom:"5px"}}>
                <label className="time-label">{endTimeTitle}</label>
                <div id="end_time" ref={divRef}>{laydate.now(0, "YYYY-MM-DD hh:00:00")}</div>
            </div>
            {/*language=SCSS*/}
            <style jsx>{`
                .time-label{
                    width:30%;
                    float:left;
                    line-height:25px;
                    text-align:center;
                    background:#777;
                    color:#fff;
                    margin-right:10px
                }
                #start_time{
                    float:left;
                    width:65%;
                    line-height:25px;
                    height:25px;
                    border:1px solid #000;
                    color:#000;
                    background: url(${img}) no-repeat right center;
                    background-color: #fff !important;
                }
                #end_time{
                    float:left;
                    width:65%;
                    height:25px;
                    line-height:25px;
                    border:1px solid #000;
                    color:#000;
                    background: url(${img}) no-repeat right center;
                    background-color: #fff !important;
                }
            `}</style>
        </div>
    )
};
export default DatePicker;