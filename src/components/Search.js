import React from 'react';
import { connect } from 'react-redux';
import services from '../services/services';
import PropTypes from 'prop-types';
import List from './List';

/*TODO:
 * Decide whether I want to keep the search bar onscreen at all times or render that conditionally as well.
*/

const Search = ({ makeSearch, buildQuery, promiseResolved, err, queryResult, searchQuery }) => (
  <div className="search-container">
    <div className="search-header">
      {promiseResolved ? (<h2>You searched for {searchQuery}</h2>) : (<h2>Make a Search</h2>)}
      <input className="input-bar" type="text" onChange={(e) => services.inputChange(e.target.value, buildQuery)} />
      <button onClick={(e) => services.submit(e, makeSearch)}>Click Me</button>
    </div>
    <div className="results-container">
    {promiseResolved && !err ? <List queryResult={queryResult} /> : err ? <h1>Something went wrong!</h1> : ''}
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  searchQuery: state.search.searchQuery,
  queryResult: state.search.queryResult,
  promiseResolved: state.search.promiseResolved,
  err: state.search.err
})

Search.propTypes = {
  makeSearch: PropTypes.func.isRequired,
  buildQuery: PropTypes.func.isRequired,
  promiseResolved: PropTypes.bool,
  err: PropTypes.object,
  queryResult: PropTypes.arrayOf(PropTypes.shape({
    etag: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    publisher: PropTypes.string,
    title: PropTypes.string,
    info: PropTypes.string
  }))
}

export default connect(mapStateToProps)(Search)
