import * as types from '../constants/types';

/* Actions and Payloads */

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

/* Dispatchers and Business Logic */

/*
 * This dispatcher will be called as an onChange function, setting the state to whatever the user types on the front end
 * Once the user sets the state with buildQuery, they can then use makeSearch to make a fetch request based on the state
*/

export const buildQuery = query => (dispatch, getState) => {
  dispatch(searchQueryUnsafe(query))
}

/*
 * This dispatcher makes a fetch request to the google books API for the title that the user searched for
 * Once the request is made, it is then resolved and the incoming data is cleaned and then sent to the front end
 * Or it is rejected and the error is sent to the front end.
*/

export const makeSearch = () => (dispatch, getState) => {
  //send the fetch request to the google api
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${getState().search.searchQuery}&maxResults=5`)
  .then(res => res.json())
  .then(json => {
    //destructure the response to strip away the unnecessary stuff and focus on the actual search results
    const { items } = json;
    //take the array of results and start stripping away more unecessary data
    const cleanData = items.map(({ volumeInfo, etag }) => {
      //holder object to keep relevant information
      let el = {};
      //destructure each item to take out more irrelevant information
      let { authors, title, publisher, imageLinks, infoLink } = volumeInfo;
      //populate holder object with relevant information
      el['title'] = title;
      el['authors'] = authors;
      el['publisher'] = publisher;
      el['image'] = imageLinks.thumbnail;
      el['info'] = infoLink
      el['etag'] = etag
      return el;
    });
    //dispatch the query resolution action with the filtered array of objects
    dispatch(queryResolution(cleanData));
  })
  .catch(err => {
    console.log(err);
    //if the request is rejected, set state to the error
    dispatch(queryRejection(err));
  });
};
