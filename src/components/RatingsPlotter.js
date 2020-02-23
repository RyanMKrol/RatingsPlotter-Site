import React, { Component } from 'react'

import '../../node_modules/react-vis/dist/style.css';
import {
  FlexibleWidthXYPlot,
  LineMarkSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from 'react-vis';

import './RatingsPlotter.css'

class RatingsPlotter extends Component {
  // React seems to think that the props are always different, I think because
  // the props are objects/arrays which don't seem to be compared properly in JS.
  // Converting to JSON first and then comparing prevents work being redone every
  // time somebody types anything into one of the inputs
  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props)
  }

  // Parses the series ratings into line data for the plot
  updateLineSeries() {
    const lineSeries = this.props.ratings.reduce((acc, seasonRatings, index) => {
      const individualLineSeries = this.convertRatingsToLineSeries(seasonRatings, index)
      acc.push(individualLineSeries)

      return acc
    }, [])

    this.ratings = lineSeries
  }


  convertRatingsToLineSeries(seasonRatings, currentSeason) {
    const lineSeriesData = seasonRatings.reduce((acc, item, index) => {
      const dict = {}
      dict.x = (index)/(seasonRatings.length) + currentSeason + 1
      dict.y = item

      acc.push(dict)
      return acc
    }, [])

    return <LineMarkSeries
      data={lineSeriesData}
      key={`currentSeason_${currentSeason}`}
    />
  }

  render() {
    this.updateLineSeries()
    return (
      <FlexibleWidthXYPlot
        height={450}
        size={4}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        {this.ratings}
      </FlexibleWidthXYPlot>
    );
  }
}

export default RatingsPlotter;
