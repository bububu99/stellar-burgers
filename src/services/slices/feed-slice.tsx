import { getFeedsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeeds = createAsyncThunk(
  'feed/getFeeds',
  async () => await getFeedsApi()
);

export interface TFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | undefined;
}

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: undefined
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    getFeedsSelector: (state) => state.orders,
    getFeedTotalSelector: (state) => state.total,
    getFeedTotalTodaySelector: (state) => state.totalToday,
    getFeedLoadingSelector: (state) => state.loading
  }
});

export const {
  getFeedsSelector,
  getFeedTotalSelector,
  getFeedTotalTodaySelector,
  getFeedLoadingSelector
} = feedSlice.selectors;

export default feedSlice.reducer;
