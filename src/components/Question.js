import { useState, useEffect } from 'react'

function shuffleArray (array) {
  // This shuffles the array in-place. It does not make a new array.

  for (let origLocation = array.length - 1; origLocation > 0; origLocation--) {
    const newLocation = Math.floor(Math.random() * origLocation)
    const temp = array[origLocation]
    array[origLocation] = array[newLocation]
    array[newLocation] = temp
  }
}

export default function Question (props) {
  const { question, questionNum } = props

  const [chosenAnswer, setChosenAnswer] = useState(null)
  const [shuffledAnswers, setShuffledAnswers] = useState([])

  useEffect(() => {
    const answers = question.incorrect_answers.slice() // Copies array
    answers.push(question.correct_answer)
    shuffleArray(answers)
    setShuffledAnswers(answers)
  }, [question])

  return (
    <li className='ma3'>
      <div>
        <strong>Question: </strong>
        <span dangerouslySetInnerHTML={{ __html: question.question }} />
      </div>
      <div>
        <ul>
          {shuffledAnswers.map(answer => (
            <li key={answer}>
              <label>
                <input
                  type='radio'
                  name={'answer-' + questionNum}
                  value={answer}
                  checked={chosenAnswer === answer}
                  onChange={() => setChosenAnswer(answer)}
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
