import { useState, useEffect } from 'react'
import Question from './Question'
import Submit from './Submit'

export default function CategoryData (props) {
  const { category, clearSelectedCategory } = props
  const [questionPacks, setQuestionPacks] = useState([])
  const [checkAnswers, setCheckAnswers] = useState(false)

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&category=' + category.id)
      .then(response => response.json())
      .then(data => {
        setQuestionPacks(data.results)
      })
  }, [category])

  if (checkAnswers) {
    return (
      <Submit
        category={category}
        answers={checkAnswers}
        answerView={() => setCheckAnswers(true)}
      />
    )
  }

  function setAnswer (questionNum, answer) {
    // Take all the questions up to the question number we are answering
    let newQuestions = questionPacks.slice(0, questionNum)
    // Add the chosen answer to the question we are answering
    newQuestions.push({
      ...questionPacks[questionNum],
      chosenAnswer: answer
    })
    // Add all questions after the question we are answering
    newQuestions = newQuestions.concat(questionPacks.slice(questionNum + 1))

    setQuestionPacks(newQuestions)
  }

  return (
    <div>
      <h2> Quiz yourself on {category.name}! </h2>
      <h4>
        {' '}
        Not the questions you were looking for?
        <button className='ma2' onClick={clearSelectedCategory}>
          Select another category
        </button>
      </h4>
      <ul>
        {questionPacks.map((question, index) => (
          <Question
            questionText={question.question}
            correctAnswer={question.correct_answer}
            incorrectAnswers={question.incorrect_answers}
            chosenAnswer={question.chosenAnswer}
            questionNum={index}
            key={index}
            onAnswer={(answer) => setAnswer(index, answer)}
          />
        ))}
      </ul>
      <div>
        {' '}
        Ready to check those answers?
        <button type='submit' onClick={() => setCheckAnswers(!checkAnswers)}>
          SUBMIT!
        </button>
      </div>
    </div>
  )
}
