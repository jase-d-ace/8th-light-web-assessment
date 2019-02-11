import React from 'react';
import PropTypes from 'prop-types';

const errorCheck = err => {
  switch(err.message) {
    case "Your search returned no results":
      return <h2>Your search returned no results</h2>
    default:
      return (
      <div className="error">
        <p>To make everything better, here's a random stock photo.</p>
        <img src="https://picsum.photos/200" alt="error" />
      </div>
    )
  }
}

const Error = ({ err }) => errorCheck(err)

Error.propTypes = {
  err: PropTypes.shape({
    message: PropTypes.string,
    stack: PropTypes.string
  })
}

export default Error;
