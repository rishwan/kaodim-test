import React from 'react'
import Header from '../components/header'
import Loader from '../components/loading_lottie'
import Whale from '../components/whale_lottie'
import Pool from '../components/pool_lottie'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TextQuestion from '../components/text_question'
import CheckboxQuestion from  '../components/checkbox_question'
import RadioQuestion from '../components/radio_question'
import FileUploadQuestion from '../components/file_upload_question'
import PropTypes from 'prop-types';
import * as questionActions from '../../../modules/questions'

class QuestionsContainer extends React.Component {

  constructor (props) {
    super(props)

    // used to calculate next index / prev index
    this.state = {
      activeIndex: 0
    }
  }

  // once the component is mounted, fetch the question list
  componentDidMount () {
    this.props.fetchQuestions()
  }

  // show server message if there is any
  showServerMsg = () => {
    if (this.props.isFetching === false && this.props.showServerMsg === true) {
      return (
        <React.Fragment>
          <Whale />
          <p className={"text-center"}>{this.props.serverMsg}</p>
        </React.Fragment>
      )
    }
  }

  // show a loader if the reducer states that its still fetching data
  showLoader = () => {
    if (this.props.isFetching === true) {
      console.log('rendering loader')
      return (
        <Loader />
      )
    }
  }

  // reviews the currentQuestion store and switches render for the proper questiontype component
  renderQuestion = () => {
    if (this.props.currentQuestion) {
      switch (this.props.currentQuestion.question_type) {
        case "TextQuestion":
          return (
            <TextQuestion question={this.props.currentQuestion} setValidity={this.props.setAnswerValidity}/>
          )
        case "CheckboxQuestion":
          return (
            <CheckboxQuestion question={this.props.currentQuestion} setValidity={this.props.setAnswerValidity}/>
          )
        case "RadioQuestion":
          return (
            <RadioQuestion question={this.props.currentQuestion} setValidity={this.props.setAnswerValidity}/>
          )
        case "FileUpload":
          return (
            <FileUploadQuestion question={this.props.currentQuestion} setValidity={this.props.setAnswerValidity}/>
          )
        default:
          return (
            <React.Fragment>
              <Pool />
            </React.Fragment>
          )
      }
    }
  }

  // handles the navigation to the previous quesiton
  changeToPrevQuestion =  () => {
    const { questions } = this.props.questionList

    let nextIndex = this.state.activeIndex - 1;

    this.setState({
      activeIndex: nextIndex
    }, () => this.props.setActiveQuestion(nextIndex, questions))
  }

  // handles the navigation to the next question
  changeToNextQuestion = () => {
    const { questions } = this.props.questionList
    let nextIndex = this.state.activeIndex + 1;

    this.setState({
      activeIndex: nextIndex
    }, () => this.props.setActiveQuestion(nextIndex, questions))

  }

  // renders the footer, including the Prev / Next button
  // if activeIndex is 0 prev button is disabled
  // if currentAnswer is invalid, next button is disabled
  renderFooter = () => {
    return (
      <React.Fragment>
        <footer>
          <div className={"container"}>
          <button type="button" className="btn btn-danger float-left" disabled={this.state.activeIndex === 0 ? true : false} onClick={() => this.changeToPrevQuestion()}> Prev </button>
          <button type="button" className="btn btn-danger float-right" disabled={this.props.isCurrentAnswerValid ? false : true} onClick={() => this.changeToNextQuestion()}> Next </button>
          </div>
        </footer>
      </React.Fragment>
    )
  }

  render () {
    return (
      <React.Fragment>
        <Header pageData={this.props.questionList}/>
        <div className={"content"}>
          {this.showLoader()}
          {this.showServerMsg()}
          {this.renderQuestion()}
        </div>
        {this.renderFooter()}
      </React.Fragment>
    )
  }
}

QuestionsContainer.propTypes = {
  isFetching: PropTypes.bool,
  questionList: PropTypes.object,
  serverMsg: PropTypes.string,
  showServerMsg: PropTypes.bool,
  currentQuestion: PropTypes.object
}

function mapStateToProps (state) {
  return {
    isFetching: state.questionsReducer.isFetching,
    questionList: state.questionsReducer.questionList,
    serverMsg: state.questionsReducer.serverMsg,
    showServerMsg: state.questionsReducer.showServerMsg,
    currentQuestion: state.questionsReducer.currentQuestion,
    isCurrentAnswerValid: state.questionsReducer.isCurrentAnswerValid
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchQuestions: questionActions.fetchQuestions,
    setAnswerValidity: questionActions.setAnswerValidity,
    setActiveQuestion: questionActions.setActiveQuestion
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsContainer)