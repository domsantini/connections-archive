import React from 'react'

function AnswerBoard({ correctAnswers }: {correctAnswers: { title: string, answers: string[]}[]}) {
  
  return (
      <div className=' grid grid-cols-4 gap-2 border-2 border-solid border-orange-300'>
        {correctAnswers.map(({ title, answers }) => (
          <AnswerItem title={title} answers={answers}/>
        ))}
      </div>
  )
}

function AnswerItem({ title, answers }: {title: string, answers: string[]}) {
  return (
    <div className='col-span-full flex flex-col justify-center items-center border-2 border-solid border-neutral-300 rounded-lg'>
      <p>{title}</p>
      <p><span>{answers[0]}</span>, <span>{answers[1]}</span>, <span>{answers[2]}</span>, <span>{answers[3]}</span></p>
    </div>
  )
}

export default AnswerBoard;