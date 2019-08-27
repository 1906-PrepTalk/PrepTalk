import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFaceData} from '../store/face'

class FacialDataReport extends Component {
  componentDidMount() {
    this.props.getFaceData(this.props.archiveId)
  }
  render() {
    console.log('facedata', this.props)
    const {faceData} = this.props
    return typeof faceData === 'object' &&
      Object.keys(faceData).length !== 0 ? (
      <div id="face-data">
        {/* <h3>Angry</h3>
        <p>{faceData.angry}</p>
        <h3>Disgusted</h3>
        <p>{faceData.disgusted}</p>
        <h3>Fearful</h3>
        <p>{faceData.fearful}</p>
        <h3>Happy</h3>
        <p>{faceData.happy}</p>
        <h3>Neutral</h3>
        <p>{faceData.neutral}</p>
        <h3>Sad</h3>
        <p>{faceData.sad}</p>
        <h3>Surprised</h3>
        <p>{faceData.surprised}</p> */}
      </div>
    ) : (
      <h1 className="text-center">Loading...</h1>
    )
  }
}

const mapStateToProps = state => {
  return {
    videoId: state.videoId,
    faceData: state.faceData.expressions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFaceData: archiveId => dispatch(getFaceData(archiveId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FacialDataReport)
