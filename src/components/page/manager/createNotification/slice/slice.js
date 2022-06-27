import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reducerRegistry from '../../../../../store/reducerRegister'
import { del, get } from '../../../../service/requestApi'

export const getDataListNoticeDraft = createAsyncThunk(
  'noticeListDraft/getDataListNoticeDraft',
  async (item) => {
    const response = await get(
      `/admin/notifications/list?per_page=${item.perPage}&page=${item.page}&sort=asc`,
    )
    return response
  },
)

export const delItemListNoticeDraft = createAsyncThunk(
  'noticeListDraft/delItemListNoticeDraft',
  async (id) => {
    const response = await del(`/admin/notifications/delete/${id}`)
    return response
  },
)

const initialState = {
  tableData: [],
  per_page: 10,
  page: 1,
  total: 0,
  lastPage: 0,
  currentPage: 1,
  loading: true,
}

const noticeListDraft = createSlice({
  name: 'noticeListDraft',
  initialState,
  reducers: {
    setItemPerPage(state, action) {
      state.per_page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDataListNoticeDraft.fulfilled, (state, action) => {
      state.total = action.payload.meta?.total
      state.tableData = action.payload?.data
      state.per_page = action.payload.meta?.per_page
      state.page = action.payload.meta?.current_page
      state.lastPage = action.payload.meta?.last_page
      state.currentPage = action.payload?.meta.current_page
      state.loading = false
    })
    builder.addCase(getDataListNoticeDraft.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getDataListNoticeDraft.rejected, (state, action) => {
      state.loading = true
    })
    builder.addCase(delItemListNoticeDraft.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(delItemListNoticeDraft.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(delItemListNoticeDraft.rejected, (state, action) => {
      state.loading = true
    })
  },
})

export const { setItemPerPage } = noticeListDraft.actions
reducerRegistry.register(noticeListDraft.name, noticeListDraft.reducer)
