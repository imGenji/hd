import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import EnumEnv from '@/constants/EnumEnv';

const RealTimeMonitor = ({ queryStore }) => {

    return (
        <ul className="cm_section">
            <li id="cm_section_sim">相似路径台风</li>
            <li><a href={EnumEnv.windFarmUrl} target="_blank">风电场台风范例</a></li>

            {/*language=SCSS*/}
            <style jsx>{`
            .cm_section {
                float: left;
                padding: 20px 15px 0;
                
                li{
                    cursor: pointer;
                    margin-bottom: 20px;
                    width: 120px;
                    height: 32px;
                    background: #63b8ff;
                    -moz-border-radius: 5px;
                    -webkit-border-radius: 5px;
                    border-radius: 5px;
                    text-align: center;
                    line-height: 32px;
                    color: #fff;
                    font-size: 14px;
                    
                    &:hover{
                        background: #5195db;
                    }
                }
    
                a{
                    color: #fff;
                }
            }
        `}</style>
        </ul>
    )
};

RealTimeMonitor.propTypes = {
    queryStore: PropTypes.object.isRequired
};

export default observer(RealTimeMonitor);