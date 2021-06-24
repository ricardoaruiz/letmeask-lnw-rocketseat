import React from 'react'

import 'styles/question.scss'

type QuestionProps = {
    children?: React.ReactNode
    content: string
    author: {
        name: string
        avatar: string
    }
}

export const Question = ({ children, content, author }: QuestionProps) => {
    return (
        <div className="question">
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

