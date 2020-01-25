import React, { Component } from 'react'

import './Home.css';

const apiCallTypes = {
  NAME: 'seriesName',
  ID: 'seriesId',
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seriesName: '',
      seriesId: '',
      submittedData: undefined,
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
      case apiCallTypes.NAME:
        if (this.state.submittedData === this.state.seriesName) return

        this.setState({
          submittedData: this.state.seriesName,
        })

        return;
      case apiCallTypes.ID:
        if (this.state.submittedData === this.state.seriesId) return

        this.setState({
          submittedData: this.state.seriesId,
        })

        return;
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={(event) => {this.handleSubmit(event, apiCallTypes.NAME)}}>
          <label>
            Series Name:
            <input type="text" value={this.state.seriesName} onChange={(event) => {this.handleChange(event, apiCallTypes.NAME)}} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <form onSubmit={(event) => {this.handleSubmit(event, apiCallTypes.ID)}}>
          <label>
            Series ID:
            <input type="text" value={this.state.seriesId} onChange={(event) => {this.handleChange(event, apiCallTypes.ID)}} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}


export default Home;
