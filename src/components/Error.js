import React from 'react';

const Error = ({ err }) => (
  <div className="error">
    <h1>Sorry! You were never meant to see this page!</h1>
    <h2>{err}</h2>
  </div>
);

export default Error;
