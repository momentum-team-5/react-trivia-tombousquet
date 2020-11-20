import { useState, useEffect } from 'react'

function shuffleArray (array) {
  for (let origLocation = array.length - 1; origLocation > 0; origLocation--) {
    const newLocation = Math.floor(Math.random() * origLocation)
    const temp = array[origLocation]
    array[origLocation] = array[newLocation]
    array[newLocation] = temp
  }
}

export default function Question (props) {
  const { questionText, correctAnswer, incorrectAnswers, chosenAnswer, questionNum, onAnswer } = props
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
            <li className='questions' key={answer}>
              <label>
                <input
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
