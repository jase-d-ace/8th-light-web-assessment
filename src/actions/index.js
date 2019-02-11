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

const queryLoading = () => ({
  type: types.QUERY_LOADING
})

const offsetUp = () => ({
  type: types.OFFSET_UP
})

const offsetDown = () => ({
  type: types.OFFSET_DOWN
})

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
 * The next two dispatchers are the pagination functions
 * They take the current offset and then modify it,
 * then make the API request using the new startIndex,
 * and then finally change the state to reflect the new offset
 * solution to calling other dispatchers found here:
 * https://stackoverflow.com/questions/48067180/redux-calling-one-action-from-another-action-creator
*/



export const pageUp = () => (dispatch, getState) => {
  const offset = getState().search.offset + 1
  dispatch(makeSearch(offset))
  dispatch(offsetUp())
};

export const pageDown = () => (dispatch, getState) => {
  const offset = getState().search.offset - 1
  dispatch(makeSearch(offset))
  dispatch(offsetDown())
}

/*
 * This dispatcher makes a fetch request to the google books API for the title that the user searched for
 * Once the request is made, it is then resolved and the incoming data is cleaned and then sent to the front end
 * Or it is rejected and the error is sent to the front end.
*/

export const makeSearch = (offset = 0) => (dispatch, getState) => {
  //send the fetch request to the google api
  dispatch(queryLoading())
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${getState().search.searchQuery}&startIndex=${40*offset}&maxResults=40`)
  .then(res => new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("The API took too long to respond")
    }, 3000)
    resolve(res.json())
  }))
  .then(({ items }) => {
    if (items) {
      let identifier = 0;
      const cleanData = items.map(({ volumeInfo }) => {
        const { title, authors, publisher, infoLink, ...rest } = volumeInfo;
        if (rest.imageLinks) {
          const { thumbnail } = rest.imageLinks;
          return { id: identifier++, title, authors, publisher, infoLink, thumbnail }
        } else {
          return { id: identifier++, title, authors, publisher, infoLink }
       }
    });
    //dispatch the query resolution action with the filtered array of objects
    dispatch(queryResolution(cleanData, getState().search.searchQuery));

    /* Uncomment this line and comment the line above to test api errors */
    // dispatch(queryRejection(new Error('some error'), getState().search.searchQuery));
    } else {
      dispatch(queryRejection(new Error('Your search returned no results'), getState().search.searchQuery))
    }
  })
  .catch(err => {
    //if the request is rejected, set state to the error
    dispatch(queryRejection(new Error(err || 'something no good'), getState().search.searchQuery));
  });
};
