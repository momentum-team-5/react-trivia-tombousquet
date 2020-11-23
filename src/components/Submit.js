import Question from './Question'
import setAnswer from './CategoryData'

export default function Submit (props) {
  const { clearSelectedCategory, questions } = props

  function sumCorrectAnswers () {
    // //   tallies number of correct answers
    let numCorrect = 0
    for (const question of questions) {
      if (question.chosenAnswer === question.correct_answer) {
        numCorrect += 1
      }
    }
    return numCorrect
  }

  return (
    <div>
      <h2> Congrats! You got {sumCorrectAnswers()}/10 answers correct! </h2>
      <h4>
        <button className='ma2' onClick={clearSelectedCategory}>
          Select another category
        </button>
      </h4>
      <ul>
        {questions.map((question, index) => (
          <Question
            questionText={question.question}
            correctAnswer={question.correct_answer}
            incorrectAnswers={question.incorrect_answers}
            chosenAnswer={question.chosenAnswer}
            questionNum={index}
            key={index}
            onAnswer={(answer) => setAnswer(index, answer)}
            submitted
          />
        ))}
      </ul>
    </div>
  )
}
