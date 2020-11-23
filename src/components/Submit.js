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

  function submitBanner (numCorrect) {
    if (numCorrect < 4) {
      return <h2>Maybe try another category.</h2>
    } else if (numCorrect < 6) {
      return <h2>Not your strongest subject</h2>
    } else if (numCorrect < 8) {
      return <h2>Not bad! Study a bit and come back again.</h2>
    } else if (numCorrect < 10) {
      return <h2>You really know your stuff</h2>
    } else {
      return <h2>Incredible!</h2>
    }
  }

  return (
    <div>
      <h2> {submitBanner(sumCorrectAnswers())} You got {sumCorrectAnswers()}/10 answers correct! </h2>
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
