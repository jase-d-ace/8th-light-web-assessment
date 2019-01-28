import React from 'react';
import { connect } from 'react-redux';
import services from '../services/services';
import List from './List';

/*TODO:
 * Build logic to actually show the stuff onscreen
 * Add a ternary that renders either an error component or the results
 * Decide whether I want to keep the search bar onscreen at all times or render that conditionally as well.
*/

const Search = ({ makeSearch, buildQuery, promiseResolved, err, queryResult }) => (
  <div className="search">
    <input type="text" onChange={(e) => services.inputChange(e.target.value, buildQuery)} />
    <button onClick={(e) => services.submit(e, makeSearch)}>Click Me</button>
    {promiseResolved ? <List queryResult={queryResult} /> : err ? <h1>Something went wrong!</h1> : <h1>Please Make a Search</h1>}
  </div>
);

const mapStateToProps = (state) => ({
  queryResult: state.search.queryResult,
  promiseResolved: state.search.promiseResolved,
  err: state.search.err
})

export default connect(mapStateToProps)(Search)
