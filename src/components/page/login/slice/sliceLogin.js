import { createSlice } from '@reduxjs/toolkit'
import reducerRegister from '../../../../store/reducerRegister'

const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    isLoading: false,
    errorMessage: '',
    currentUser: null,
  },

  reducers: {
    loginAccess: (state, action) => {
      state.currentUser = action.payload
    },
  },
})

export const { loginAccess } = userSlice.actions
reducerRegister.register(userSlice.name, userSlice.reducer)
