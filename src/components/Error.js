import React from 'react';

const Error = ({ err }) => (
  <div className="error">
    <h1>Something went wrong with your search!</h1>
    <p>To make everything better, here's a random stock photo.</p>
    <img src="https://picsum.photos/200" />
    <h2>Maybe try your search again or try a different search?</h2>
  </div>
);

export default Error;
