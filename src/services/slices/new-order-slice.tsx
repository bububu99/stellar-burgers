import { orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const createOrder = createAsyncThunk(
  'newOrder/create',
  async (dataOrder: string[]) => {
    const data = await orderBurgerApi(dataOrder);
    return data;
  }
);

interface TNewOrderState {
  loading: boolean;
  order: TOrder | null;
  error: string | undefined;
}

const initialState: TNewOrderState = {
  loading: false,
  order: null,
  error: undefined
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clearOrder: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = {
          ...action.payload.order,
          ingredients: []
        };
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    getOrderLoad: (state) => state.loading,
    getOrderData: (state) => state.order
  }
});

export const { clearOrder } = newOrderSlice.actions;
export const { getOrderLoad, getOrderData } = newOrderSlice.selectors;
export default newOrderSlice.reducer;
