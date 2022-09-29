import React from 'react'
import PropTypes from 'prop-types'

interface BjColorProps{
    content: React.ReactNode
}

const BjColor: React.FC<BjColorProps> = ({content}) =>{
    return(
        <div>
            {content}
            {/*language=SCSS*/}
            <style jsx>{`
              div{
                width:350px;
                padding:10px;
                background: rgba(0,0,0,0.3);
              }
            `}</style>
        </div>
    )
}

BjColor.prototype = {
    content:PropTypes.node
}

export default BjColor
