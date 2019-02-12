import { search } from './search';

describe('reducers', () => {
  describe('search', () => {
    const initialState = {
      searchQuery: null,
      queryResult: null,
      promiseResolved: false,
      queryLoading: false,
      err: null,
      previousQuery: null,
      offset: 0
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
      expect(search(state, { type: 'QUERY_RESOLVED', query: [{foo: 'bar'}], prev: 'example'})).toEqual({...state, searchQuery: 'example', queryLoading: false, queryResult: [{foo: 'bar'}], previousQuery: 'example'})
    })
    it('should increment the offset value', () => {
      expect(search(initialState, {type: 'OFFSET_UP'})).toEqual({...initialState, offset: 1})
    })
    it('should decrement the offset value', () => {
      expect(search(initialState, {type: 'OFFSET_DOWN'})).toEqual({...initialState, offset: -1})
    })
    it('should throw an error if an error is passed', () => {
      expect(search(initialState, {type: 'QUERY_REJECTED', err: {message: 'something went wrong', stack: '/path/to/file'}, prev: 'harry potter'})).toEqual({...initialState, previousQuery: 'harry potter', err: {message: 'something went wrong', stack: '/path/to/file'}})
    })
  })
})
