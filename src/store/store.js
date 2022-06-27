import { combineReducers, configureStore } from '@reduxjs/toolkit'
import reducerRegister from './reducerRegister'

const store = configureStore({
  reducer: {
    ...reducerRegister.reducers,
  },
})

reducerRegister.setChangeListener((reducers) => {
  store.replaceReducer(
    combineReducers({
      ...reducers,
    }),
  )
})

export default store
