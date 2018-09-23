import api from '../lib/mock_api'

/**
 * Constants
 */
const FETCH_QUESTION_LIST_REQUEST = 'FETCH_QUESTION_LIST_REQUEST'
const FETCH_QUESTION_LIST_SUCCESS = 'FETCH_QUESTION_LIST_SUCCESS'
const FETCH_QUESTION_LIST_FAIL = 'FETCH_QUESTION_LIST_FAIL'

const SET_ACTIVE_QUESTION_SUCCESS = 'SET_ACTIVE_QUESTION_SUCCESS'
const SET_ACTIVE_QUESTION_FAIL = 'SET_ACTIVE_QUESTION_FAIL'

const SET_ANSWER_VALID = 'SET_ANSWER_VALID'
const SET_ANSWER_INVALID = 'SET_ANSWER_INVALID'

/**
 * Actions
 */
function fetchQuestionListRequest () {
  return {
    type: FETCH_QUESTION_LIST_REQUEST,
    payload: {
      isFetching: true,
      questions: null
    }
  }
}

function fetchQuestionListSuccess (data) {
  return {
    type: FETCH_QUESTION_LIST_SUCCESS,
    payload: {
      questionList: data.questionList
    }
  }
}

function fetchQuestionListFail () {
  return {
    type: FETCH_QUESTION_LIST_FAIL,
    payload: {
      questions: null,
      isFetching: false,
      serverMsg: "Houston! We seem to have a problem!",
      showServerMsg: true
    }
  }
}

function setActiveQuestionSuccess (data) {
  return {
    type: SET_ACTIVE_QUESTION_SUCCESS,
    payload: {
      currentQuestion: data
    }
  }
}

function setActiveQuestionFail () {
  console.log('setActiveQuestionFail')
  return {
    type: SET_ACTIVE_QUESTION_FAIL,
    payload:  {
      currentQuestion: null
    }
  }
}

function setAnswerValid () {
  // console.log('answerValid')
  return {
    type: SET_ANSWER_VALID,
    payload: {
      isCurrentAnswerValid: true
    }
  }
}

function setAnswerInvalid () {
  // console.log('answerInvalid')
  return {
    type: SET_ANSWER_INVALID,
    payload: {
      isCurrentAnswerValid: false
    }
  }
}


/**
 * Dispatchers
 */

/**
 * Accepts a validity boolean value and sets isCurrentAnswerValid as per given value
 * @param valid
 * @returns {Function}
 */
export function setAnswerValidity (valid) {
  return dispatch => {
    if (valid) {
      dispatch(setAnswerValid())
    } else {
      dispatch(setAnswerInvalid())
    }
  }
}

/**
 * Accepts an index and the array of questions, and sets the current question from the index given
 * against the array of questions passed
 *
 * @param index
 * @param questions
 * @returns {Function}
 */
export function setActiveQuestion (index, questions) {
  try {
    let currentQuestion = questions[index]

    return dispatch => {
      dispatch(setActiveQuestionSuccess(currentQuestion))
    }
  } catch (err) {
    return dispatch => {
      dispatch(setActiveQuestionFail())
    }
  }
}

/**
 * Calls the API to fetch the questions list  JSON payload
 *
 * @returns {Function}
 */
export function fetchQuestions () {
  return dispatch => {
    dispatch(fetchQuestionListRequest())

    api.get('/questions')
      .then(response => {
        if (response.status === 200) {
          console.log(response.data)
          dispatch(fetchQuestionListSuccess(response.data))
          dispatch(setActiveQuestion(0, response.data.questionList.questions))
        } else {
          dispatch(fetchQuestionListFail())
        }
      })
      .catch(error => {
        dispatch(fetchQuestionListFail())
      })
  }
}

/**
 * Reducer
 */

const initialState = {
  isFetching: false, // key to indicate if we are fetching data
  serverMsg: null, // key to store server message
  showServerMsg: false, // key to verify to show or not to show the server message
  questionList: null, // key where all the questions are stored
  currentQuestion: null,  // key where the current question is stored
  isCurrentAnswerValid: false // key to indicate if the answer for the current question is valid
}

export default function questionsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_QUESTION_LIST_REQUEST:
      return {
        ...state,
        isFetching: action.payload.isFetching,
        questions: action.payload.questions
      }
    case FETCH_QUESTION_LIST_FAIL:
      return {
        ...state,
        isFetching: action.payload.isFetching,
        questionList: action.payload.questionList,
        serverMsg: action.payload.serverMsg,
        showServerMsg: action.payload.showServerMsg
      }
    case FETCH_QUESTION_LIST_SUCCESS:
      return {
        ...state,
        isFetching: action.payload.isFetching,
        questionList: action.payload.questionList
      }
    case SET_ACTIVE_QUESTION_SUCCESS:
      return {
        ...state,
        currentQuestion: action.payload.currentQuestion,
        isCurrentAnswerValid: false
      }
    case SET_ANSWER_INVALID:
      return {
        ...state,
        isCurrentAnswerValid: action.payload.isCurrentAnswerValid
      }
    case SET_ANSWER_VALID:
      return {
        ...state,
        isCurrentAnswerValid: action.payload.isCurrentAnswerValid
      }
    default:
      return state
  }
}
