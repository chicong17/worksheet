import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get } from '../../../service/requestApi'
import reducerRegistry from '../../../../store/reducerRegister'

export const getTimesheet = createAsyncThunk(
  'getTimesheet',
  async ({ params }) => {
    const { page, sort, start, end, per } = params
    if (start === '' && end === '') {
      console.log('null heetes')
      const res = await get(
        `/worksheet?sort=${sort}&page=${page}&per_page=${per}`,
      )
      return res
    } else if (start === '' && end !== '') {
      const res = await get(
        `/worksheet?sort=${sort}&end_date=${end}&page=${page}&per_page=${per}`,
      )
      return res
    } else {
      const res = await get(
        `/worksheet?sort=${sort}&start_date=${start}&end_date=${end}&page=${page}&per_page=30`,
      )
      return res
    }
  },
)
const timeSheetSlice = createSlice({
  name: 'timesheet',
  initialState: {
    worksheet: [],
    isLoading: true,
  },
  extraReducers: {
    [getTimesheet.fulfilled]: (state, action) => {
      state.worksheet = action.payload
      state.isLoading = false
    },
    [getTimesheet.pending]: (state) => {
      ;(state.worksheet = []), (state.Loading = true)
    },

    [getTimesheet.rejected]: (state) => {
      state.isLoading = true
    },
  },
})

reducerRegistry.register(timeSheetSlice.name, timeSheetSlice.reducer)
