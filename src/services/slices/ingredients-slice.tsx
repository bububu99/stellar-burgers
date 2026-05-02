import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);

export interface TIngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | undefined;
}

export const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: undefined
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIsIngredientsLoading: (state) => state.loading,
    getIngredientsError: (state) => state.error
  }
});

export const {
  getIngredientsSelector,
  getIsIngredientsLoading,
  getIngredientsError
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
