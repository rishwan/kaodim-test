import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Route } from 'react-router-dom'
import Questions from '../questions'

const App = () => (
  <div>
    <main>
      <Route exact path={"/questions"} component={Questions} />
      <Route exact path="/" component={Questions} />
    </main>
  </div>
)

export default App
