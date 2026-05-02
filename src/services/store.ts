import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './slices/user-slice';
import { ingredientsSlice } from './slices/ingredients-slice';
import { constructorSlice } from './slices/constructor-slice';
import { feedSlice } from './slices/feed-slice';
import { newOrderSlice } from './slices/new-order-slice';
import { userOrdersSlice } from './slices/user-order-slice';
import { orderInfoSlice } from './slices/order-info-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: constructorSlice.reducer,
  feed: feedSlice.reducer,
  newOrder: newOrderSlice.reducer,
  userOrders: userOrdersSlice.reducer,
  orderInfo: orderInfoSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
