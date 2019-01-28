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
  })
})
