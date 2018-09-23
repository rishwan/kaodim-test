import React from 'react'
import Dropzone from 'react-dropzone'

class FileUploadQuestion extends React.Component {
  constructor() {
    super()
    this.state = {
      accepted: [],
      rejected: []
    }
  }

  validate = () => {
    let validity = true

    if (this.props.question.is_required === true && this.state.accepted.length > 0) {
      validity = true
    } else {
      validity = false
    }

    this.props.setValidity(validity)
  }

  componentDidMount () {
    this.validate()
  }

  renderFile = () => {
    if (this.state.accepted.length > 0) {
      console.log(this.state.accepted)

      return this.state.accepted.map(file => {
        let image = URL.createObjectURL(file)
        return (
          <div className={'img_preview'} key={file.name}>
            <img src={image} />
          </div>
        )
      })
    }
  }

  render() {

    return (
      <React.Fragment>
      <p className={"prompt text-center"}>{this.props.question.prompt}</p>
        <p className={"text-center"}>{this.props.question.is_required ? "* Required" : "* Optional"}</p>
        {this.renderFile()}
        <div className="dropzone">
          <Dropzone
            onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }, () => this.validate()); }}
            className={"droparea"}
            accept={this.props.allowed_mime_types}
          >
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
      </React.Fragment>
    )
  }
}

export default FileUploadQuestion