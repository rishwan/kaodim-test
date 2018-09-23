import React from 'react'
import isJs from 'is_js'

class TextQuestion extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      answer: "",
      valid: false
    }
  }

  componentDidMount () {
    this.validate()
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.question.id === this.props.question.id) {
      return true
    } else {
      this.setState({
        answer: ""
      }, () => this.validate())
      return true
    }
  }

  validate = () => {
    let valid = true

    /**
     * set valid to false if the question is_required and the answer is empty
     */
    if (this.props.question.is_required === true && isJs.empty(this.state.answer)) {
      console.log('answer is required but empty')
      valid = false
    }

    /**
     * If the question is required and the answer is not attempted
     */
    if (this.props.question.is_required === false && (this.state.answer.length === 0)) {
      valid = true
    } else {
      if (this.props.question.min_char_length > this.state.answer.length) {
        console.log('answer length is:  ' + this.state.answer.length)
        valid = false
      } else {
        valid = true
      }
    }

   this.props.setValidity(valid)
  }

  onChange = (e) => {
    this.setState({
      answer: e.target.value
    }, () => this.validate())
  }

  render () {
    return (
      <React.Fragment>
        <p className={"prompt text-center"}>{this.props.question.prompt}</p>
        <small>
          <p className={"text-center"}>{this.props.question.is_required ? "* Required" : "* Optional"}
            <br />
            Min: {this.props.question.min_char_length} characters
          </p>
        </small>

        <div className={"d-block d-sm-none"}>
          <textarea className="form-control" rows="3" placeholder={"Visible on XS"} value={this.state.answer} autoComplete="off" name={this.props.question.id} onChange={this.onChange}/>
        </div>
        <div className={"d-none d-sm-block d-md-none"}>
          <textarea className="form-control" rows="3" placeholder={"Visible on SM"} value={this.state.answer} autoComplete="off" name={this.props.question.id} onChange={this.onChange}/>
        </div>
        <div className={"d-none d-md-block d-lg-none"}>
          <textarea className="form-control" rows="5" placeholder={"Visible on MD"} value={this.state.answer} autoComplete="off" name={this.props.question.id} onChange={this.onChange}/>
        </div>
        <div className={"d-none d-lg-block d-xl-none"}>
          <textarea className="form-control" rows="5" placeholder={"Visible on LG"} value={this.state.answer} autoComplete="off" name={this.props.question.id} onChange={this.onChange}/>
        </div>
        <div className={"d-none d-xl-block"}>
          <textarea className="form-control" rows="5" placeholder={"Visible on XL"} value={this.state.answer} autoComplete="off" name={this.props.question.id} onChange={this.onChange}/>
        </div>
      </React.Fragment>
    )
  }
}

export default TextQuestion