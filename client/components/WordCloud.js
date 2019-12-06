import {
  // main component
  Chart,
  // graphs
  Bars,
  Cloud,
  Dots,
  Labels,
  Lines,
  Pies,
  RadialLines,
  Ticks,
  Title,
  // wrappers
  Layer,
  Animate,
  Transform,
  Handlers,
  // helpers
  helpers,
  DropShadow,
  Gradient
} from 'rumble-charts'
import React, {Component} from 'react'

export default class WordCloud extends Component {
  render() {
    if (this.props.transcript !== 'undefined') {
      const seriesConstruct = () => {
        const wordCount = str => {
          let words = {}
          str.split(' ').forEach(word => {
            if (words[word]) {
              words[word]++
            } else {
              words[word] = 1
            }
          })
          return words
        }

        const countedWords = wordCount(this.props.transcript)

        let arr = []

        Object.keys(countedWords).forEach(word => {
          let obj = {}
          obj.label = word
          obj.y = countedWords[word]
          arr.push(obj)
        })

        return arr
      }

      var series = [{data: seriesConstruct()}]
    }

    return (
      <Chart width={600} height={510} series={series} minY={0}>
        <Transform method="transpose">
          <Cloud
            font="Helvetica"
            minFontSize={12}
            maxFontSize={72}
            padding={2}
          />
        </Transform>
      </Chart>
    )
  }
}
