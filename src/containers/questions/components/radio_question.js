import React from 'react'

class RadioQuestion extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      selectedValue: this.props.answer
    }
  }

  validate = () => {
    let validity = true

    if(this.props.question.is_required && this.state.selectedValue === null) {
      validity = false
    }

    this.props.setValidity(validity)
  }

  componentDidMount () {
    this.validate()
  }

  /**
   * Appends / updates the state for the current answer and calls the prop function
   * to update the parent with the given answer
   *
   * @param e
   */
  handleChange = (e) => {
    this.setState({
      selectedValue: e.target.value
    }, () => {
      this.validate()
      this.props.setAnswer(this.props.question.id, this.state.selectedValue)
    })
  }

  renderChoices = () => {
    return this.props.question.choices.map(choice => {
      return (
        <React.Fragment key={choice.key}>
          <div className="form-check">
            <input className="form-check-input" type="radio" name={choice.key} id={choice.key} value={choice.value} onChange={this.handleChange} checked={(this.state.selectedValue === choice.value) ? true : false} />
            <label className="form-check-label" htmlFor={choice.key}>{choice.text}</label>
          </div>
        </React.Fragment>
      )
    })
  }

  render ()  {
    return (
      <React.Fragment>
        <p className={"prompt text-center"}>{this.props.question.prompt}</p>
        <small><p className={"text-center"}>{this.props.question.is_required ? "* Required" : "* Optional"}</p></small>
        {this.renderChoices()}
      </React.Fragment>
    )
  }
}

export default RadioQuestion