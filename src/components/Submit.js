
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

  // const correctAnswerCount = questions.filter(
  //   q => q.chosenAnswer === q.correct_answer
  // ).length

  return (
    <div>
      <h2> Congrats! You got {sumCorrectAnswers()}/10 answers correct! </h2>
      <h4> Want to try again?
        <button className='ma2' onClick={clearSelectedCategory}>
          Select another category
        </button>
      </h4>
      <ul>
        {/* {questions.map((question, index) => (

        ))} */}
      </ul>
    </div>

  )
}
