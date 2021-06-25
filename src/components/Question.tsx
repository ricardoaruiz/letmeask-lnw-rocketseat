import classNames from 'classnames'
import React from 'react'

import 'styles/question.scss'

type QuestionProps = {
    children?: React.ReactNode
    content: string
    author: {
        name: string
        avatar: string
    }
    isHighLighted?: boolean
    isAnswered?: boolean
}

export const Question = ({ 
    children, 
    content, 
    author, 
    isHighLighted = false, 
    isAnswered = false 
}: QuestionProps) => {

    const classes = classNames({
        question: true,
        answered: isAnswered,
        highlight: isHighLighted && !isAnswered
    })

    return (
        <div className={classes}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}

