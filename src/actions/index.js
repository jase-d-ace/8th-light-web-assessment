import * as types from '../constants/types';

const searchQueryUnsafe = query => ({
  type: types.SEARCH_QUERY,
  query
})

export const searchQuery = query => (dispatch, getState) => {
  setTimeout(() => {
    dispatch(searchQueryUnsafe(query))
  }, 100)
}
