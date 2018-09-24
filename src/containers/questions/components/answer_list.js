import React from 'react'

class AnswerList extends React.Component {

  /**
   * Swithces between which method to use to render the question and the
   * corresponding answer from props based on the question type
   * @returns {*}
   */
  renderAnswers = () => {
   const { questions, answers} = this.props

    return questions.map(question => {
      console.log(question)

      let answer = answers[question.id]

      switch (question.question_type) {
        case "FileUpload":
          return this.renderFileAnswer(question, answer)
        case "RadioQuestion":
          return this.renderRadioAnswer(question, answer)
        case "CheckboxQuestion":
          return this.renderCheckboxAnswer(question, answer)
        case "TextQuestion":
          return this.renderTextAnswer(question, answer)
        default:
          return <div key={question.id}>-*-</div>
      }
    })
  }

  /**
   * Renders the question & answer for a file based question
   * @param question
   * @param answer
   * @returns {*}
   */
  renderFileAnswer = (question, answer) => {
    if(!answer) {
      return (
        <React.Fragment key={question.id}>
          <p><strong>{question.prompt}</strong></p>
          -
        </React.Fragment>
      )
    }
    return (
      <React.Fragment key={question.id}>
        <p><strong>{question.prompt}</strong></p>
        {
          (answer.length > 0) ?
            answer.map(file => {
              let image = URL.createObjectURL(file)
              return (
                <div key={file.name} >
                  <img src={image} width="50" height="50" alt={"preview"}/>
                </div>
              )
            })
          :
            <div>-</div>
        }
      </React.Fragment>
    )
  }

  /**
   * renders the question & answer for a radio based question
   * @param question
   * @param answer
   * @returns {*}
   */
  renderRadioAnswer = (question, answer) => {
    return (
      <React.Fragment key={question.id}>
        <p><strong>{question.prompt}</strong></p>
        {
          question.choices.map(choice => {
            return (
              <div className="form-check" key={choice.key}>
                <input className="form-check-input" type="radio" name={choice.key} id={choice.key} value={choice.value}  defaultChecked={(answer === choice.value) ? true : false} disabled/>
                <label className="form-check-label" htmlFor={choice.key}>{choice.text}</label>
              </div>
            )
          })
        }
      </React.Fragment>
    )
  }

  /**
   * renders the question & answer for a checkbox based question
   * @param question
   * @param answer
   * @returns {*}
   */
  renderCheckboxAnswer = (question, answer) => {
    return (
      <React.Fragment key={question.id}>
        <p><strong>{question.prompt}</strong></p>
        {
          question.choices.map(choice => {
            if (!answer) {
              return (
                <div className="form-check" key={choice.key}>
                  <input
                    className={"form-check-input"}
                    key={choice.key}
                    name={choice.key}
                    type="checkbox"
                    disabled
                    defaultChecked={false}
                  />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    {choice.text}
                  </label>
                </div>
              )
            }
            return (
              <div className="form-check" key={choice.key}>
                <input
                  className={"form-check-input"}
                  key={choice.key}
                  name={choice.key}
                  type="checkbox"
                  disabled
                  defaultChecked={answer[choice.key] ? true : false}
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  {choice.text}
                </label>
              </div>
            )
          })
        }
      </React.Fragment>
    )
  }

  /**
   * renders the question & answer for a text based question
   * @param question
   * @param answer
   * @returns {*}
   */
  renderTextAnswer = (question, answer) => {
    return (
      <React.Fragment key={question.id}>
        <p><strong>{question.prompt}</strong></p>
        <p>{answer}</p>
      </React.Fragment>
    )
  }

  render () {
    return (
      <React.Fragment>
        <p className="text-center">Success!</p>
        <hr />

        {this.renderAnswers()}

      </React.Fragment>
    )
  }
}

export default AnswerList