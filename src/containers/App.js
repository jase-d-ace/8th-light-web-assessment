import React from 'react';
import { connect } from 'react-redux'
import { makeSearch, buildQuery } from '../actions'
import PropTypes from 'prop-types';
import Search from '../components/Search';

const App = ({ makeSearch, buildQuery }) => (
  <div className="App">
    <Search 
      makeSearch={makeSearch}
      buildQuery={buildQuery}
    />
  </div>
);

App.propTypes = {
  makeSearch: PropTypes.func,
  buildQuery: PropTypes.func
}

export default connect(null, { makeSearch, buildQuery })(App);
