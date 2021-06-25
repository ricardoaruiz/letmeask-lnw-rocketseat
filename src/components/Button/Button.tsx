import React from 'react'

import * as S from './Button.style'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
}

export const Button = ({ isOutlined = false, ...props }: ButtonProps ) => {

    return (
        <S.Button isOutlined={isOutlined} {...props} >
            {props.children}
        </S.Button>
    )
}
