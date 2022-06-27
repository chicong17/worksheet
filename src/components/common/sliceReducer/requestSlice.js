import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reducerRegistry from '../../../store/reducerRegister'
import { get, post, put, del } from '../../service/requestApi'

export const getRequestsOfDay = createAsyncThunk(
  'requests/getRequestsOfDay',
  async (data) => {
    const { url, date } = data
    if (date === -1) {
      return {}
    }
    const response = await get(url, {
      request_for_date: date,
    })
    return response ? response : {}
  },
)

export const postRequests = createAsyncThunk(
  'requests/postRequests',
  async (data) => {
    const { url, requestData } = data
    const response = await post(url, requestData)
    return response.error ? response.error : response
  },
)

export const putRequests = createAsyncThunk(
  'requests/putRequests',
  async (data) => {
    const { id, requestData, url } = data
    return await put(url + id, requestData)
  },
)

export const deleteRequests = createAsyncThunk(
  'requests/deleteRequests',
  async (data) => {
    const { url, id } = data
    return await del(url + id)
  },
)

const requestsSlice = createSlice({
  name: 'requests',
  initialState: {
    request: {},
    status: null,
  },

  extraReducers: {
    [getRequestsOfDay.pending]: (state) => {
      state.status = 'loading'
    },
    [getRequestsOfDay.fulfilled]: (state, action) => {
      state.status = 'success'
      state.request = action.payload
    },
    [getRequestsOfDay.rejected]: (state) => {
      state.status = 'failed'
    },
    [postRequests.pending]: (state, action) => {
      state.status = 'loadingRegister'
    },
    [postRequests.fulfilled]: (state) => {
      state.status = 'successRegister'
    },
    [putRequests.pending]: (state) => {
      state.status = 'loadingUpdate'
    },
    [putRequests.fulfilled]: (state) => {
      state.status = 'successUpdate'
    },
    [deleteRequests.pending]: (state) => {
      state.message = 'loadingDelete'
    },
    [deleteRequests.fulfilled]: (state) => {
      state.status = 'successDelete'
    },
  },
})

reducerRegistry.register(requestsSlice.name, requestsSlice.reducer)
