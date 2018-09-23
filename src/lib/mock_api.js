import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Questions from './questions_data'

const mock = new MockAdapter(axios, {delayResponse: 2000});

mock.onGet('/questions').reply(200, {
  questionList: Questions
})

mock.onGet('/questions_network_error').networkError()

export default axios