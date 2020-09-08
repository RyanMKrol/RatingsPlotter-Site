import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import queryString from 'query-string'

import {
  API_CALL_TYPES,
  RatingsDataProcessor,
  RatingsPlotter,
  LoadingIcon
} from './../components'

import './Home.css'

class Home extends Component {
  constructor(props) {
    const qs = queryString.parse(window.location.search)

    super(props)
    this.state = {
      seriesName: qs.seriesName || '',
      seriesId: qs.seriesId || '',
      seriesData: undefined,
      isLoading: false,
      error: undefined
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event, inputKey) {
    this.setState({
      [inputKey]: event.target.value
    })
  }

  handleSubmit(apiType) {
    // we check to see if the data has changed before updating the state because
    // fetching the data is a heavy task that we only want to do if we have new input
    switch (apiType) {
      case API_CALL_TYPES.NAME:
        this.fetchSeriesData(apiType, this.state.seriesName)
        break
      case API_CALL_TYPES.ID:
        this.fetchSeriesData(apiType, this.state.seriesId)
        break
      default:
        throw new Error('Could not determine which API to call')
    }
  }

  fetchSeriesData(apiType, submitData) {
    if (this.state.submittedData === submitData) return

    this.setState(
      {
        isLoading: true,
        error: undefined
      },
      () => {
        new RatingsDataProcessor(apiType, submitData)
          .fetchSeasonsRatings()
          .then(response => {
            this.setState({
              seriesData: response,
              seriesName: response.Title,
              seriesId: response.imdbID,
              isLoading: false,
              error: undefined
            })
          })
          .catch(error => {
            this.setState({
              seriesData: undefined,
              seriesName: this.state.seriesName,
              seriesId: this.state.seriesId,
              isLoading: false,
              error: error
            })
          })
      }
    )
  }

  generateContent() {
    if (typeof this.state.isLoading === 'undefined') return null

    const seriesPlot =
      !this.state.isLoading && typeof this.state.seriesData !== 'undefined' ? (
        <div className="home-page-plot">
          <RatingsPlotter
            ratings={Object.values(this.state.seriesData.ratings)}
          />
        </div>
      ) : null

    const poster =
      !this.state.isLoading && typeof this.state.seriesData !== 'undefined' ? (
        <div className="home-page-poster">
          <img src={this.state.seriesData.Poster} alt="Series poster" />
        </div>
      ) : null

    const loadingIcon = this.state.isLoading ? (
      <div className="home-page-loading">
        <LoadingIcon />
      </div>
    ) : null

    const error = this.state.error ? (
      <div className="home-page-error">
        <h1>Sorry, could not find the title you're looking for!</h1>
      </div>
    ) : null

    return (
      <div className="home-page-content">
        {seriesPlot}
        {poster}
        {loadingIcon}
        {error}
      </div>
    )
  }

  componentDidMount() {
    if (this.state.seriesName) {
      this.handleSubmit(API_CALL_TYPES.NAME)
    }
    if (this.state.seriesId) {
      this.handleSubmit(API_CALL_TYPES.ID)
    }
  }

  render() {
    return (
      <div className="page-container">
        <div className="Home">
          <form>
            <TextField
              id="standard-full-width"
              label="Series Name"
              placeholder="TV Series Name"
              helperText="Find the data you want using plain old English!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              value={this.state.seriesName}
              onChange={event => {
                this.handleChange(event, API_CALL_TYPES.NAME)
              }}
              name="seriesName"
            />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
          <form>
            <TextField
              id="standard-full-width"
              label="Series ID"
              placeholder="TV Series ID"
              helperText="Find the data you want using the IMDb ID! i.e. For Game Of Thrones - https://www.imdb.com/title/tt0944947/?ref_=fn_al_tt_1, the ID is tt0944947"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              value={this.state.seriesId}
              onChange={event => {
                this.handleChange(event, API_CALL_TYPES.ID)
              }}
              name="seriesId"
            />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
          {this.generateContent()}
        </div>
      </div>
    )
  }
}

export default Home
