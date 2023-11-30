import React from 'react'

const Icon = ({ style, icon }) => {
    return (
        <svg className={style}>
            <use xlinkHref={`src/assets/svg/sprite.svg#${icon}`}></use>
        </svg>
    )
}

export default Icon