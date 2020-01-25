import React, { Component } from 'react'
import { API_CALL_TYPES, RatingsDataProcessor, RatingsPlotter } from './../components'

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seriesName: '',
      seriesId: '',
      seriesData: undefined,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, inputKey) {
    this.setState({
      [inputKey]: event.target.value
    });
  }

  handleSubmit(event, apiType) {
    // we're building a single page app, so submitting the form shouldn't move the page
    event.preventDefault();

    // we check to see if the data has changed before updating the state because
    // fetching the data is a heavy task that we only want to do if we have new input
    switch(apiType) {
      case API_CALL_TYPES.NAME:
        if (this.state.submittedData === this.state.seriesName) return

        new RatingsDataProcessor(apiType, this.state.seriesName)
          .fetchSeasonsRatings()
          .then((response) => {
            this.setState({
              seriesData: response,
            })
          })

        break;
      case API_CALL_TYPES.ID:
        if (this.state.submittedData === this.state.seriesId) return

        new RatingsDataProcessor(apiType, this.state.seriesId)
          .fetchSeasonsRatings()
          .then((response) => {
            this.setState({
              seriesData: response,
            })
          })

        break;
      default:
        throw new Error('Could not determine which API to call')
    }
  }

  render() {
    const seriesPlot = (typeof this.state.seriesData !== 'undefined') ?
      <RatingsPlotter ratings={this.state.seriesData}/>:
      null

    return (
      <div>
        <form onSubmit={(event) => {this.handleSubmit(event, API_CALL_TYPES.NAME)}}>
          <label>
            Series Name:
            <input type="text" value={this.state.seriesName} onChange={(event) => {this.handleChange(event, API_CALL_TYPES.NAME)}} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <form onSubmit={(event) => {this.handleSubmit(event, API_CALL_TYPES.ID)}}>
          <label>
            Series ID:
            <input type="text" value={this.state.seriesId} onChange={(event) => {this.handleChange(event, API_CALL_TYPES.ID)}} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div>
          {seriesPlot}
        </div>
      </div>
    );
  }
}


export default Home;
