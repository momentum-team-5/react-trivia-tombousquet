import { useState, useEffect } from 'react'
import Question from './Question'

// function sumCorrectAnswers () {
// // //   tallies number of correct answers
// //   let numCorrect = 0
// //   for (const answer of question) {
// //     if (answer === question.correct_answer) {
// //       numCorrect += 1
// //     }
// //   }
// //   return numCorrect
// // }

export default function Submit (props) {
  const { questions, answers, category, clearSelectedCategory, incorrectAnswers } = props
  const [questionPacks, setQuestionPacks] = useState([])
  const [checkAnswers, setCheckAnswers] = useState(false)

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&category=' + category.id)
      .then(response => response.json())
      .then(data => {
        setQuestionPacks(data.results)
      })
  }, [category])

  return (
    <div>
      <h2> Congrats! You got (X)/10 answers correct! </h2>
      <h4> Want to try again?
        <button className='ma2' onClick={clearSelectedCategory}>
          Select another category
        </button>
      </h4>
      <ul>
        {questionPacks.map((question, index) => (
          <Question question={question} questionNum={index} key={index} />
        ))}
      </ul>
    </div>

  )
}
