import { search } from './search';

describe('reducers', () => {
  describe('search', () => {
    const initialState = {
      searchQuery: null,
      queryResult: null,
      promiseResolved: false,
      err: null
    };

    it('should describe the initial state', () => {
      expect(search(initialState, { query: null, type: 'SEARCH_QUERY'})).toEqual(initialState)
    })

    it('should change searchQuery based a string', () => {
      expect(search(initialState, {type: 'SEARCH_QUERY', query: 'infinite jest'})).toEqual({...initialState, searchQuery: "infinite jest"})
    })
    it('should hold onto the last search in state', () => {
      const state = {
        searchQuery: 'example',
        queryResult: null,
        promiseResolved: true,
        err: null,
        previousQuery: null
      };
      expect(search(state, { type: 'QUERY_RESOLVED', query: [{foo: 'bar'}], prev: 'example'})).toEqual({...state, searchQuery: null, queryResult: [{foo: 'bar'}], previousQuery: 'example'})
    })
  })
})
