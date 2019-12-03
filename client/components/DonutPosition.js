import React from 'react'
import DonutChart from './DonutChart'

export default class DonutPosition extends React.Component {
  render() {
    // For a real world project, use something like
    // https://github.com/digidem/react-dimensions
    let width = window.innerWidth
    let height = window.innerHeight
    let minViewportSize = Math.min(width, height)
    // This sets the radius of the pie chart to fit within
    // the current window size, with some additional padding
    // let radius = (minViewportSize * 0.9) / 2
    let radius = minViewportSize * 0.9
    // Centers the pie chart
    let x = width / 2
    let y = height / 1.5
    // let y = height

    return (
      <div id="container" className="svg-container">
        <svg
          // viewBox="0 0 1400 800"
          viewBox="0 0 1400 1200"
          className="svg-content"
          preserveAspectRatio="xMinYMin meet"
        >
          <DonutChart
            x={x}
            y={y}
            innerRadius={radius * 0.5}
            outerRadius={radius * 0.8}
            cornerRadius={7}
            padAngle={0.02}
            data={this.props.data}
          />
        </svg>
      </div>
    )
  }
}
