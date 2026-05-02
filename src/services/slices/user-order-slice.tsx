import { getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getUserOrders = createAsyncThunk(
  'userOrders/getOrders',
  async () => await getOrdersApi()
);

export interface TUserOrdersState {
  orders: TOrder[];
  loading: boolean;
  error: string | undefined;
}

export const initialState: TUserOrdersState = {
  orders: [],
  loading: false,
  error: undefined
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    getUserOrdersSelector: (state) => state.orders,
    getIsUserOrdersLoading: (state) => state.loading
  }
});

export const { getUserOrdersSelector, getIsUserOrdersLoading } =
  userOrdersSlice.selectors;

export default userOrdersSlice.reducer;
