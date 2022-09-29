import React from 'react'
import PropTypes from 'prop-types'

const BjColor = ({content}) =>{
    return(
        <div>
            {content}
            {/*language=SCSS*/}
            <style jsx>{`
              div{
                width:330px;
                padding:10px;
                background: rgba(0,0,0,0.3);
              }
            `}</style>
        </div>
    )
}

BjColor.prototype = {
    content:PropTypes.object
}

export default BjColor