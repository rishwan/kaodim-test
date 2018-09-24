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
import AnswerList from '../components/answer_list'
import PropTypes from 'prop-types';
import * as questionActions from '../../../modules/questions'

class QuestionsContainer extends React.Component {

  constructor (props) {
    super(props)

    // used to calculate next index / prev index
    this.state = {
      activeIndex: 0,
      answers: {},
      showAnswers: false
    }
  }

  setAnswer = (index, answer) => {
    const answers = this.state.answers;

    answers[index] = answer

    this.setState({
      answers
    })

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
      return (
        <Loader />
      )
    }
  }



  // reviews the currentQuestion store and switches render for the proper questiontype component
  renderQuestion = () => {

    const {currentQuestion} = this.props

    if (this.props.currentQuestion) {
      switch (currentQuestion.question_type) {
        case "TextQuestion":
          return (
            <TextQuestion key={currentQuestion.id} question={currentQuestion} answer={this.state.answers[currentQuestion.id]} setValidity={this.props.setAnswerValidity} setAnswer={this.setAnswer}/>
          )
        case "CheckboxQuestion":
          return (
            <CheckboxQuestion key={currentQuestion.id} question={currentQuestion} answer={this.state.answers[currentQuestion.id]} setValidity={this.props.setAnswerValidity} setAnswer={this.setAnswer}/>
          )
        case "RadioQuestion":
          return (
            <RadioQuestion key={currentQuestion.id} question={currentQuestion} answer={this.state.answers[currentQuestion.id]} setValidity={this.props.setAnswerValidity} setAnswer={this.setAnswer}/>
          )
        case "FileUpload":
          return (
            <FileUploadQuestion key={currentQuestion.id} question={currentQuestion} answer={this.state.answers[currentQuestion.id]} setValidity={this.props.setAnswerValidity} setAnswer={this.setAnswer}/>
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
      activeIndex: nextIndex,
      showAnswers: false,
    }, () => this.props.setActiveQuestion(nextIndex, questions))
  }

  // handles the navigation to the next question
  changeToNextQuestion = () => {
    const { questions } = this.props.questionList
    let nextIndex = this.state.activeIndex + 1;

    console.log(nextIndex + ' : ' + questions.length)

    if (nextIndex === questions.length) {
      this.setState({showAnswers: true})
    }

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

  renderAnswers = () => {
    if (this.state.showAnswers === true) {
      return (
        <AnswerList answers={this.state.answers} questions={this.props.questionList.questions}/>
      )
    }
  }

  render () {
    return (
      <React.Fragment>
        <Header pageData={this.props.questionList}/>
        <div className={"content"}>
          {this.showLoader()}
          {this.showServerMsg()}
          {this.renderQuestion()}
          {this.renderAnswers()}
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