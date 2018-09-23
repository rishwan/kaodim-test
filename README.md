<h1>Kaodim Frontend Test</h1>

* Tools / Libraries used 
    * Bootstrap (for CSS)
    * Axios + Axios Mock Adapter to simulate API calls
    * React-Lottie for some space filler animations (Loader/ Network Error / Unknown Question Type)
    * Redux for state management
    * questions_data (src/lib/questions_data) slightly modified to scale the form to support other question types

<h2> Architecture </h2>

* QuestionsContainer (src/containers/questions/containers/question_container) renders a loader when loading, error message if there
was an error. And if all is good, switches between the type of component to load based on the currently active question
while providing the child components with the current question and a function to call back to set answer validity.

* The child components are:
    * text_question: renders if the current question is text based
    * checkbox_question: renders if the current question is checkbox based (allows multiple choice)
    * radio_question: renders if the current question is radio based (allows one choice)
    * header: renders if the  question list is loaded and shows the title of the form
    * *_lottie(s) components: simple animations used in place for loading, network error and unknown question type (sample: last question)

* Note: 
    * each child component calls its own validate() function to enable / disabled the next button
    * each child component calls validate() whenever there is a a change in the answer controls
    * the axios mock adapter instance used (src/lib/mock_api) uses a 2 second artificial delay to mimic a slow API load time

## Installation

```bash
git clone https://github.com/notrab/create-react-app-redux.git
cd create-react-app-redux
yarn
```

## Get started

```bash
yarn start
```

This boilerplate is built using [create-react-app](https://github.com/facebook/create-react-app) so you will want to read the User Guide for more goodies.
