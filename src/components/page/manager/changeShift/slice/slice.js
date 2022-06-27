import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reducerRegistry from '../../../../../store/reducerRegister'
import { get } from '../../../../service/requestApi'

export const getDataListUser = createAsyncThunk(
  'changeShift/getDataUserList',
  async (item) => {
    const response = await get(`admin/shift/list?member_name=${item}`)
    return response
  },
)

const initialState = {
  userList: [],
  loading: true,
}

const changeShift = createSlice({
  name: 'changeShift',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataListUser.fulfilled, (state, action) => {
      state.userList = action.payload.data
      state.loading = false
    })
    builder.addCase(getDataListUser.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getDataListUser.rejected, (state, action) => {
      state.loading = true
    })
  },
})

reducerRegistry.register(changeShift.name, changeShift.reducer)
