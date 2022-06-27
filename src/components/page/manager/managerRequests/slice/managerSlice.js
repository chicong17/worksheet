import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reducerRegistry from '../../../../../store/reducerRegister'
import { get, put } from '../../../../service/requestApi'

export const getRequests = createAsyncThunk(
  'requests/getRequests',
  async (data) => {
    const { url } = data
    return await get(url)
  },
)

export const putRequestsManager = createAsyncThunk(
  'requests/putRequestsManager',
  async (values) => {
    const { url, data } = values
    return await put(url, data)
  },
)

export const putRequestsReject = createAsyncThunk(
  'requests/putRequestsReject',
  async (values) => {
    const { url, data } = values
    return await put(url, data)
  },
)

const managerSlice = createSlice({
  name: 'managerRequest',
  initialState: {
    requests: [],
    status: null,
  },
  extraReducers: {
    [getRequests.pending]: (state) => {
      state.status = 'loading'
    },
    [getRequests.fulfilled]: (state, action) => {
      state.status = 'success'
      state.requests = action.payload.data
    },
    [getRequests.rejected]: (state) => {
      state.status = 'failed'
    },
    [putRequestsManager.pending]: (state) => {
      state.status = 'loadingManagerUpdate'
    },
    [putRequestsManager.fulfilled]: (state, action) => {
      state.status = 'successManagerUpdate'
    },
    [putRequestsReject.pending]: (state) => {
      state.status = 'loadingRejectRequest'
    },
    [putRequestsReject.fulfilled]: (state) => {
      state.status = 'successRejectRequest'
    },
  },
})

reducerRegistry.register(managerSlice.name, managerSlice.reducer)
