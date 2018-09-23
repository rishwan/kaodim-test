import React from 'react'
import Lottie from 'react-lottie'
import * as loadingAnimation from '../../../components/loading.json'


class Loading extends React.Component {
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
      </div>
    )
  }
}

export default Loading