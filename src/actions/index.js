import * as types from '../constants/types';

const searchQueryUnsafe = query => ({
  type: types.SEARCH_QUERY,
  query
});

const queryResolution = query => ({
  type: types.QUERY_RESOLVED,
  query
});

const queryRejection = err => ({
  type: types.QUERY_REJECTED,
  err
});

export const makeSearch = query => (dispatch, getState) => {
  //set state to what you searched for
  dispatch(searchQueryUnsafe(query));
  //send the fetch request to the google api
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`)
  .then(res => res.json())
  .then(json => {
    //if the request is resolved, set state to the json response
    dispatch(queryResolution(json));
  })
  .catch(err => {
    console.log(err);
    //if the request is rejected, set state to the error
    dispatch(queryRejection(err));
  });
};
