import React from 'react';
import PropTypes from 'prop-types';

const errorCheck = err => {
  switch(err.message) {
    case "Your search returned no results":
      return "Your search returned no results"
    case "The API took too long to respond":
      return "Network issues are slowing your search"
    default:
      return "There was an error in your search"
  }
}

const Error = ({ err }) => (
  <div className="error">
    <h2>{errorCheck(err)}</h2>
    <p>To make everything better, here's a random stock photo.</p>
    <img src="https://picsum.photos/200" alt="error" />
  </div>
) 

Error.propTypes = {
  err: PropTypes.shape({
    message: PropTypes.string,
    stack: PropTypes.string
  })
}

export default Error;
