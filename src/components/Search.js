import React from 'react';
import { connect } from 'react-redux';
import { makeSearch, buildQuery } from '../actions';
import services from '../services/services';
import PropTypes from 'prop-types';
import List from './List';
import Error from './Error';

/*
 * This component is the main brain of the app.
 * It takes the necessary bits of state and sets up the logic of the entire thing.
 * The props makeSearch and buildQuery are the action dispatchers that we defined in our actions file
 * promiseResolved, previousQuery, err, and queryResult are used in presentational logic.
 * the services file that we import is meant for more code splitting, allowing us to clean up just a little bit more
 * Basically we pass our action dispatchers as callback functions to the methods in the services file, which then do the work for us
*/

const Search = ({ makeSearch, buildQuery, promiseResolved, err, queryResult, previousQuery }) => (
  <div className="search-container">
    {previousQuery ? (<h2>You searched for {previousQuery}</h2>) : (<h2>Please Make a Search</h2>)}
    <form onSubmit={(e) => services.submit(e, makeSearch)} className="search-header">
      <input className="input-bar" type="text" onChange={(e) => services.inputChange(e.target.value, buildQuery)} />
      <input type="submit" value="Click Me" />
    </form>
    <div className="results-container">
      {promiseResolved && !err ? <List queryResult={queryResult} /> : err ? <Error err={err} /> : ''}
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  queryResult: state.search.queryResult,
  promiseResolved: state.search.promiseResolved,
  err: state.search.err,
  previousQuery: state.search.previousQuery
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

export default connect(mapStateToProps, { makeSearch, buildQuery })(Search)
