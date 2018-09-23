import React from 'react'
import Lottie from 'react-lottie'
import * as loadingAnimation from '../../../components/deadpool.json'


class DeadPool extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isStopped: false,
      isPaused: false
    }
  }

  render () {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: loadingAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }

    return (
      <div className={"loader"}>
        <Lottie
          options={defaultOptions}
          height={200}
          width={290}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
        />
        <p className={"text-center"}>Sorry, I don't know what to do here... I'll walk around till you call someone for help...</p>
      </div>
    )
  }
}

export default DeadPool