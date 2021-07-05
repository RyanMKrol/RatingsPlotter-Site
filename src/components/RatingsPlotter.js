import React, { Component } from "react";

import "../../node_modules/react-vis/dist/style.css";
import {
  FlexibleWidthXYPlot,
  LineMarkSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis
} from "react-vis";

import "./RatingsPlotter.css";

class RatingsPlotter extends Component {
  // React seems to think that the props are always different, I think because
  // the props are objects/arrays which don't seem to be compared properly in JS.
  // Converting to JSON first and then comparing prevents work being redone every
  // time somebody types anything into one of the inputs
  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props);
  }

  // Parses the series ratings into line data for the plot
  updateLineSeries() {
    const lineSeries = this.props.ratings.reduce(
      (acc, seasonRatings, index) => {
        const individualLineSeries = this.convertRatingsToLineSeries(
          seasonRatings,
          index
        );
        acc.push(individualLineSeries);

        return acc;
      },
      []
    );

    this.ratings = lineSeries;
  }

  convertRatingsToLineSeries(seasonRatings, currentSeason) {
    const lineSeriesData = seasonRatings.reduce((acc, item, index) => {
      const dict = {};
      dict.x = index / seasonRatings.length + currentSeason + 1;

      // React-Vis does not like episodes that have a 10/10, so by taking away
      // the tiniest amount from each value, the graphing library is happy while
      // maintining the integrity of the scores as much as possible
      dict.y = item - 1 / Infinity;

      acc.push(dict);
      return acc;
    }, []);

    console.log(lineSeriesData);

    return (
      <LineMarkSeries
        data={lineSeriesData}
        key={`currentSeason_${currentSeason}`}
      />
    );
  }

  render() {
    this.updateLineSeries();
    const listOfTicks = this.props.ratings.map((_, index) => {
      return `${index + 1}`;
    });

    return (
      <FlexibleWidthXYPlot height={450} size={4}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickValues={listOfTicks} />
        <YAxis />
        {this.ratings}
      </FlexibleWidthXYPlot>
    );
  }
}

export default RatingsPlotter;
