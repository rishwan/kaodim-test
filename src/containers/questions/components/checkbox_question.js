import React from 'react'

class CheckboxQuestion extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      currentValues: []
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

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const { currentValues } = this.state

    currentValues.push(value)

    this.setState({
      currentValues: currentValues
    }, () => this.validate());
  }

  renderChoices = () => {
    return this.props.question.choices.map(choice => {
      return (
        <React.Fragment key={choice.key}>
          <div className="form-check">
            <input
              className={"form-check-input"}
              key={choice.key}
              name={this.props.question.id}
              type="checkbox"
              onChange={this.handleChange}
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