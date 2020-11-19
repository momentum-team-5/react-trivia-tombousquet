import { useState, useEffect } from 'react'
import Question from './Question'

export default function CategoryData (props) {
  const { category, clearSelectedCategory } = props
  const [questionPacks, setQuestionPacks] = useState([])

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&category=' + category.id)
      .then(response => response.json())
      .then(data => {
        setQuestionPacks(data.results)
      })
  }, [category])

  return (
    <div>
      <h2> Welcome! </h2>
      <button onClick={clearSelectedCategory}>
        Select another category
      </button>
      <ul>
        {questionPacks.map((question, index) => (
          <Question question={question} questionNum={index} key={index} />
        ))}
      </ul>
    </div>
  )
}
