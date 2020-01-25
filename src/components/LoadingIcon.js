import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

class LoadingIcon extends Component {
  render() {
    return (
      <FontAwesomeIcon
        className ="fa-spin"
        icon={faCircleNotch}
        size="6x"
      />
    );
  }
}

export default LoadingIcon;
