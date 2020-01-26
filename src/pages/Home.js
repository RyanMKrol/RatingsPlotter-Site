import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import {
  API_CALL_TYPES,
  RatingsDataProcessor,
  RatingsPlotter,
  LoadingIcon,
} from './../components'

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seriesName: '',
      seriesId: '',
      seriesData: undefined,
      isLoading: undefined,
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

        this.setState({
          isLoading: true,
        }, () => {
          new RatingsDataProcessor(apiType, this.state.seriesName)
            .fetchSeasonsRatings()
            .then((response) => {
              this.setState({
                seriesData: response,
                seriesName: response.Title,
                seriesId: response.imdbID,
                isLoading: false,
              })
            })
        })
        break;
      case API_CALL_TYPES.ID:
        if (this.state.submittedData === this.state.seriesId) return

        this.setState({
          isLoading: true,
        }, () => {
          new RatingsDataProcessor(apiType, this.state.seriesId)
            .fetchSeasonsRatings()
            .then((response) => {
              this.setState({
                seriesData: response,
                seriesName: response.Title,
                seriesId: response.imdbID,
                isLoading: false,
              })
            })
        })
        break;
      default:
        throw new Error('Could not determine which API to call')
    }
  }

  generateContent() {
    if ( typeof this.state.isLoading === 'undefined') return null

    const seriesPlot = (!this.state.isLoading && typeof this.state.seriesData !== 'undefined') ?
      <div className="home-page-plot">
        <RatingsPlotter ratings={Object.values(this.state.seriesData.ratings)}/>
      </div> :
      null

    const poster = (!this.state.isLoading && typeof this.state.seriesData !== 'undefined') ?
      <div className="home-page-poster">
        <img src={this.state.seriesData.Poster}/>
      </div>:
      null

    const loadingIcon = (this.state.isLoading) ?
      <div className="home-page-loading">
        <LoadingIcon />
      </div> :
      null

    return (
      <div className="home-page-content">
        {seriesPlot}
        {poster}
        {loadingIcon}
      </div>
    )
  }

  render() {
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </form>
          {this.generateContent()}
        </div>
      </div>
    );
  }
}


export default Home;
