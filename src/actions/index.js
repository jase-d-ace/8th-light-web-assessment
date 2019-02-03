import * as types from '../constants/types';
import _ from 'underscore';

/* Actions and Payloads */

const searchQueryUnsafe = query => ({
  type: types.SEARCH_QUERY,
  query
});

const queryResolution = (query, prev) => ({
  type: types.QUERY_RESOLVED,
  query,
  prev
});

const queryRejection = (err, prev) => ({
  type: types.QUERY_REJECTED,
  err,
  prev
});

/* Dispatchers and Business Logic */

/*
 * This dispatcher will be called as an onChange function, setting the state to whatever the user types on the front end
 * Once the user sets the state with buildQuery, they can then use makeSearch to make a fetch request based on the state
 * Update 02/01/2019: Added a debouncer so that state doesn't update with every keystroke.
 * Debounce solution can be found here: https://stackoverflow.com/questions/50493683/debounce-method-inside-redux-thunk
*/

const debouncedBuildQuery = _.debounce((query, dispatch) => {
  dispatch(searchQueryUnsafe(query))
}, 100)

export const buildQuery = query => (dispatch, getState) => {
  debouncedBuildQuery(query, dispatch)
}

/*
 * This dispatcher makes a fetch request to the google books API for the title that the user searched for
 * Once the request is made, it is then resolved and the incoming data is cleaned and then sent to the front end
 * Or it is rejected and the error is sent to the front end.
*/

export const makeSearch = () => (dispatch, getState) => {
  //send the fetch request to the google api
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${getState().search.searchQuery}&maxResults=10`)
  .then(res => res.json())
  .then(({ items }) => {
    const cleanData = items.map(({ volumeInfo, etag }) => {
      const { title, authors, publisher, infoLink, imageLinks: { thumbnail } } = volumeInfo;
      return { title, authors, publisher, infoLink, thumbnail, etag }
    });
    //dispatch the query resolution action with the filtered array of objects
    dispatch(queryResolution(cleanData, getState().search.searchQuery));
  })
  .catch(err => {
    //if the request is rejected, set state to the error
    dispatch(queryRejection(new Error(err || 'something no good'), getState().search.searchQuery));
  });
};
