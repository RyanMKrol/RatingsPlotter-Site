import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';

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
      <RatingsPlotter ratings={Object.values(this.state.seriesData.ratings)}/>:
      null
    const poster = (typeof this.state.seriesData !== 'undefined') ?
      <img src={this.state.seriesData.Poster}/>:
      null

    return (
      <div className="page-container">
        <div className="Home">
        <form onSubmit={(event) => {this.handleSubmit(event, API_CALL_TYPES.NAME)}}>
          <TextField
            id="standard-full-width"
            label="Series Name"
            placeholder="TV Series Name"
            helperText="Find the data you want using plain old English!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={this.state.seriesName} onChange={(event) => {this.handleChange(event, API_CALL_TYPES.NAME)}}
          />
        </form>
        <form onSubmit={(event) => {this.handleSubmit(event, API_CALL_TYPES.ID)}}>
          <TextField
            id="standard-full-width"
            label="Series ID"
            placeholder="TV Series ID"
            helperText="Find the data you want using the IMDb ID! i.e. For Game Of Thrones - https://www.imdb.com/title/tt0944947/?ref_=fn_al_tt_1, the ID is tt0944947"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={this.state.seriesId} onChange={(event) => {this.handleChange(event, API_CALL_TYPES.ID)}}
          />
        </form>
          <div className="home-page-content">
            <div className="home-page-plot">
              {seriesPlot}
            </div>
            <div className="home-page-poster">
              {poster}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Home;
