import React from 'react'
import * as d3 from 'd3'
// import {layout} from 'd3-shape'
import Slice from './Slice'

export default class DonutChart extends React.Component {
  constructor(props) {
    super(props)
    // this.colorScale = d3
    //   .scaleOrdinal()
    //   .domain(this.props.data)
    //   .range([
    //     '#F3BC50',
    //     '#25C0C0',
    //     '#FA53A0',
    //     '#FC8BC0',
    //     '#BCECE0',
    //     '#F51720',
    //     '#F8D210'
    //   ])
    this.colorScale = d3
      .scaleOrdinal()
      .domain([
        'angry',
        'disgusted',
        'fearful',
        'happy',
        'neutral',
        'sad',
        'surprised'
      ])
      .range(['red', 'blue', 'green', 'black', 'purple', 'brown', 'yellow'])
    this.renderSlice = this.renderSlice.bind(this)
  }
  render() {
    let {x, y, data} = this.props
    let pie = d3.pie().value(function(d) {
      return d[1]
    })
    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* Render a slice for each data point */}
        {pie(data).map(this.renderSlice)}
      </g>
    )
  }

  renderSlice(value, i) {
    let {innerRadius, outerRadius, cornerRadius, padAngle} = this.props
    console.log(value, i)
    return (
      <Slice
        key={i}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        cornerRadius={cornerRadius}
        padAngle={padAngle}
        value={value}
        label={value.data}
        fill={this.colorScale(i)}
      />
    )
  }
}
