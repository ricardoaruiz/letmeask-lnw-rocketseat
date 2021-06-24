import React from 'react'

import 'styles/button.scss'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
}

export const Button = ({ isOutlined = false, ...props }: ButtonProps ) => {

    return (
        <button className={`button ${isOutlined && 'outlined'}`} {...props} >
            {props.children}
        </button>
    )
}
