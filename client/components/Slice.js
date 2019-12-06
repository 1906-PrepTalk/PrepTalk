import React from 'react'
import * as d3 from 'd3'

function translate(x, y) {
  return `translate(${x}, ${y})`
}

export default class Slice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isHovered: false}
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
  }

  onMouseOver() {
    this.setState({isHovered: true})
  }

  onMouseOut() {
    this.setState({isHovered: false})
  }

  render() {
    let {
      value,
      label,
      fill,
      innerRadius = 0,
      outerRadius,
      cornerRadius,
      padAngle,
      ...props
    } = this.props
    if (this.state.isHovered) {
      outerRadius *= 1.1
    }
    let arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(cornerRadius)
      .padAngle(padAngle)

    // console.log(value.data, `color:${fill}`)

    return (
      <g onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} {...props}>
        <path d={arc(value)} fill={fill} />
        <text
          // transform={translate(...arc.centroid(value))}
          transform={translate(...arc.centroid(value))}
          dy=".35em"
          className="label"
          fontSize="30px"
        >
          {`${label[0]}: ${label[1]}%`}
        </text>
      </g>
    )
  }
}
