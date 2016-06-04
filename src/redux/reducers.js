import { handleActions } from 'redux-actions'

export default {

  windowState: handleActions({
    'windowState/set': (state, { payload }) => ({
      ...state,
      ...payload
    })
  }, {
    isFocused: true
  }),

  databases: handleActions({
    'databases/set': (state, { payload }) => payload
  }, []),

  tables: handleActions({
    'tables/set': (state, { payload }) => payload
  }, []),

  rows: handleActions({
    'rows/set': (state, { payload }) => payload
  }, []),

}
