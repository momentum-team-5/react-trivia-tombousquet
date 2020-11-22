import { useState, useEffect } from 'react'
import clsx from 'clsx'

function shuffleArray (array) {
  for (let origLocation = array.length - 1; origLocation > 0; origLocation--) {
    const newLocation = Math.floor(Math.random() * origLocation)
    const temp = array[origLocation]
    array[origLocation] = array[newLocation]
    array[newLocation] = temp
  }
}

export default function Question (props) {
  const { questionText, correctAnswer, incorrectAnswers, chosenAnswer, questionNum, onAnswer, submitted } = props
  const [shuffledAnswers, setShuffledAnswers] = useState([])

  useEffect(() => {
    const answers = incorrectAnswers.slice()
    answers.push(correctAnswer)
    shuffleArray(answers)
    setShuffledAnswers(answers)
  }, [correctAnswer, incorrectAnswers])

  return (
    <li className='ma3'>
      <div>
        <strong>Question {questionNum + 1}:</strong>
        <span dangerouslySetInnerHTML={{ __html: questionText }} />
      </div>
      <div>
        <ul>
          {shuffledAnswers.map(answer => (

            <li
              className={clsx('questions', {
                correct: submitted && answer === correctAnswer,
                incorrect: submitted && answer !== correctAnswer && answer === chosenAnswer
              })} key={answer}
            >
              <label>
                <input
                  disabled={submitted}
                  type='radio'
                  name={'answer-' + questionNum}
                  value={answer}
                  checked={chosenAnswer === answer}
                  onChange={() => {
                    onAnswer(answer)
                  }}
                />
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </label>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}
