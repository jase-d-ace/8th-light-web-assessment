import { SEARCH_QUERY,
         QUERY_RESOLVED,
         QUERY_REJECTED,
         QUERY_LOADING,
         RESET_OFFSET,
         OFFSET_UP,
         OFFSET_DOWN
       } from '../constants/types';

const initialState = {
  searchQuery: null,
  queryResult: null,
  promiseResolved: false,
  queryLoading: false,
  err: null,
  previousQuery: null,
  offset: 0
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
        ...state,
        err: null,
        queryLoading: false,
        queryResult: action.query,
        promiseResolved: true,
        previousQuery: action.prev
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
    case RESET_OFFSET:
      return {
        ...state,
        offset: 0
      }
    case OFFSET_UP:
      return {
        ...state,
        offset: state.offset + 1
      }
    case OFFSET_DOWN:
      return {
        ...state,
        offset: state.offset - 1
      }
    default:
      return state
  }
}
