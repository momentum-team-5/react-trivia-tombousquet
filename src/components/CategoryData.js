import { useState, useEffect } from 'react'
import Question from './Question'
import Submit from './Submit'

export default function CategoryData (props) {
  const { category, clearSelectedCategory } = props
  const [questionPacks, setQuestionPacks] = useState([])
  const [checkAnswers, setCheckAnswers] = useState(false)

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&category=' + category.id + '&token=8225fa5bad93ffef8bfeb9e0326d39b85e6617a855512c8f87b7fbe5dd9efd2f')
      .then(response => response.json())
      .then(data => {
        setQuestionPacks(data.results)
      })
  }, [category])

  if (checkAnswers) {
    return (
      <Submit
        clearSelectedCategory={clearSelectedCategory}
        questions={questionPacks}
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
      <div className='submit'>
        {' '}
        <button className='pa3 ma2' type='submit' onClick={() => setCheckAnswers(!checkAnswers)}>
          Submit to check answers
        </button>
      </div>
    </div>
  )
}
