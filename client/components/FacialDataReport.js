import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFaceData} from '../store/face'

class FacialDataReport extends Component {
  componentDidMount() {
    this.props.getFaceData('999')
  }
  render() {
    const {faceData} = this.props
    console.log(faceData)
    return (
      <div id="face-data">
        <h3>Angry</h3>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    faceData: state.faceData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFaceData: archiveId => dispatch(getFaceData(archiveId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FacialDataReport)
