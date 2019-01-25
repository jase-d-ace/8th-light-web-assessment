import { SEARCH_QUERY } from '../constants/types';

const initialState = {
  searchQuery: null
};

export const search = (state = initialState.searchQuery, action) => {
  switch (action.type) {
    case SEARCH_QUERY:
      return action.query
    default:
      return state
  };
};
