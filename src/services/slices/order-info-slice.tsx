import { getOrderByNumberApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data.orders[0];
  }
);

export const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState: {
    order: null as TOrder | null,
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.loading = false;
      });
  },
  selectors: {
    getOrderByNumberSelector: (state) => state.order
  }
});

export const { getOrderByNumberSelector } = orderInfoSlice.selectors;
export default orderInfoSlice.reducer;
