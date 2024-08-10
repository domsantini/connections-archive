import React from 'react'

const COLORS = {
  0: '#F7DC6F',
  1: '#82E0AA',
  2: '#85C1E9',
  3: '#BB8FCE',
} as const

function AnswerBoard({ correctAnswers }: {correctAnswers: { level:number, title: string, answers: string[]}[]}) {
  
  return (
      <div className='grid grid-cols-4 gap-2'>
        {correctAnswers.map(({ level, title, answers }, index) => (
          <AnswerItem key={`${title}-${index}`} title={title} answers={answers} level={level}/>
        ))}
      </div>
  )
}

function AnswerItem({ level, title, answers }: { level: number, title: string, answers: string[]}) {
  return (
    <div 
      style={{ backgroundColor: COLORS[level as keyof typeof COLORS]}} 
      className='col-span-full flex flex-col justify-center items-center rounded-lg h-16'
    >
      <p>{title}</p>
      <p><span>{answers[0]}</span>, <span>{answers[1]}</span>, <span>{answers[2]}</span>, <span>{answers[3]}</span></p>
    </div>
  )
}

export default AnswerBoard;