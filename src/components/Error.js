import React from 'react';

/*
 * Obviously this component is kind of a joke.
 * It serves a very real purpose of handling an error, but does so in a way that isn't particularly helpful to the user.
 * If this was meant to be a serious component, there might be some logic here that maybe suggests "close" matches?
 * As it stands, this component is here only to stop the entire app from crashing in case the user messes something up
*/

const Error = ({ err }) => (
  <div className="error">
    <h1>Something went wrong with your search!</h1>
    <p>To make everything better, here's a random stock photo.</p>
    <img src="https://picsum.photos/200" alt="error" />
    <h2>Maybe try your search again or try a different search?</h2>
  </div>
);

export default Error;
