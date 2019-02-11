import { SEARCH_QUERY,
         QUERY_RESOLVED,
         QUERY_REJECTED,
         QUERY_LOADING
       } from '../constants/types';

const initialState = {
  searchQuery: null,
  queryResult: null,
  promiseResolved: false,
  queryLoading: false,
  err: null,
  previousQuery: null
};

export const search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.query
      }
    case QUERY_RESOLVED:
      return {
        err: null,
        queryLoading: false,
        queryResult: action.query,
        promiseResolved: true,
        previousQuery: action.prev,
        searchQuery: null
      }
    case QUERY_REJECTED:
      return {
        ...state,
        err: action.err,
        previousQuery: action.prev,
        queryLoading: false
      }
    case QUERY_LOADING: 
      return {
        ...state,
        queryLoading: true
      }
    default:
      return state
  }
}
