import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get } from '../../../service/requestApi'
import reducerRegistry from '../../../../store/reducerRegister'

export const getModalTimelog = createAsyncThunk(
  'getModalTimelog',
  async (date) => {
    const res = await get(`/time-log/?work_date=${date}`)
    return res
  },
)

const timeLog = createSlice({
  name: 'timelog',
  initialState: {
    worksheet: [],
    isLoading: false,
  },
  extraReducers: {
    [getModalTimelog.pending]: (state) => {
      state.isLoading = true
    },
    [getModalTimelog.fulfilled]: (state, action) => {
      ;(state.worksheet = action.payload), (state.isLoading = false)
    },
  },
})

reducerRegistry.register(timeLog.name, timeLog.reducer)
