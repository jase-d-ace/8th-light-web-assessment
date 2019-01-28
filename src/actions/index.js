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

export const buildQuery = query => (dispatch, getState) => {
  dispatch(searchQueryUnsafe(query))
}

export const makeSearch = () => (dispatch, getState) => {
  //send the fetch request to the google api
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${getState().search.searchQuery}&maxResults=5`)
  .then(res => res.json())
  .then(json => {
    //if the request is resolved, set state to the json response
    const { items } = json;
    const cleanData = items.map(({ volumeInfo }) => {
      let el = {};
      let { authors, title, publisher, imageLinks, infoLink } = volumeInfo;
      el['title'] = title;
      el['authors'] = authors;
      el['publisher'] = publisher;
      el['image'] = imageLinks.thumbnail;
      el['info'] = infoLink
      return el;
    })
    dispatch(queryResolution(cleanData));
  })
  .catch(err => {
    console.log(err);
    //if the request is rejected, set state to the error
    dispatch(queryRejection(err));
  });
};
