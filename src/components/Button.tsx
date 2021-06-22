import React from 'react'

import 'styles/button.scss'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonProps ) => {

    return (
        <button className="button" {...props} >
            {props.children}
        </button>
    )
}
