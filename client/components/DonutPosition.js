import React from 'react'
import DonutChart from './DonutChart'

export default class DonutPosition extends React.Component {
  render() {
    let width = window.innerWidth
    let height = window.innerHeight
    let minViewportSize = Math.min(width, height)

    let radius = minViewportSize
    let x = width / 2
    let y = height / 1.5

    return (
      <div id="container" className="svg-container">
        <svg
          viewBox="0 0 1400 1200"
          className="svg-content"
          preserveAspectRatio="xMinYMin meet"
        >
          <DonutChart
            x={x}
            y={y}
            innerRadius={radius * 0.1}
            outerRadius={radius * 0.55}
            cornerRadius={7}
            padAngle={0.02}
            data={this.props.data}
          />
        </svg>
      </div>
    )
  }
}
