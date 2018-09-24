import React from 'react'

class CheckboxQuestion extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      currentValues: (this.props.answer) ? this.props.answer : []
    }
  }

  componentDidMount () {
    this.validate()
  }

  validate = () => {
    let validity = true

    if(this.props.question.is_required === true && this.state.currentValues.length === 0) {
      console.log('invalid')
      validity = false
    }

    this.props.setValidity(validity)
  }

  /**
   * Appends / updates the state for the current answer and calls the prop function
   * to update the parent with the given answer
   *
   * @param e
   */
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name

    const { currentValues } = this.state

    //console.log(event)

    currentValues[name] = value

    this.setState({
      currentValues
    }, () => {
      this.validate()
      this.props.setAnswer(this.props.question.id, this.state.currentValues)
    });
  }

  renderChoices = () => {
    const {currentValues} = this.state

    return this.props.question.choices.map(choice => {
      return (
        <React.Fragment key={choice.key}>
          <div className="form-check">
            <input
              className={"form-check-input"}
              key={choice.key}
              name={choice.key}
              type="checkbox"
              onChange={this.handleChange}
              defaultChecked={currentValues[choice.key] ? true : false}
            />
            <label className="form-check-label" htmlFor="defaultCheck1">
              {choice.text}
            </label>
          </div>
        </React.Fragment>
      )
    })
  }



  render () {
    return (
      <React.Fragment>
        <p className={"prompt text-center"}>{this.props.question.prompt}</p>
        <p className={"text-center"}>{this.props.question.is_required ? "* Required" : "* Optional"}</p>
        {this.renderChoices()}
      </React.Fragment>
    )
  }
}

export default CheckboxQuestion