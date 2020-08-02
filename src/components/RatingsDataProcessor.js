import fetch from 'node-fetch'

import baseEndpoint from './../utils'

const API_CALL_TYPES = {
  NAME: 'seriesName',
  ID: 'seriesId'
}

class RatingsDataProcessor {
  constructor(callType, apiInput) {
    this.currentApiCallType = callType
    this.apiInput = apiInput
  }

  async fetchSeasonsRatings() {
    const endpoint = this.getApiEndpoint()

    return fetch(endpoint)
      .then(response => {
        return response.json()
      })
      .then(ratingsData => {
        if (ratingsData.Error) {
          throw ratingsData
        }
        return ratingsData
      })
      .catch(error => {
        console.log(error)
        throw error
      })
  }

  getApiEndpoint() {
    switch (this.currentApiCallType) {
      case API_CALL_TYPES.NAME:
        return `${baseEndpoint()}/ratings/name/${this.apiInput}`
      case API_CALL_TYPES.ID:
        return `${baseEndpoint()}/ratings/id/${this.apiInput}`
      default:
        throw new Error('Could not determine which API to use')
    }
  }
}

export { API_CALL_TYPES, RatingsDataProcessor }
