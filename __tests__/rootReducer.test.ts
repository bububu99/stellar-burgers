import store from '../src/services/store';
import { userSlice } from '../src/services/slices/user-slice';
import { ingredientsSlice } from '../src/services/slices/ingredients-slice';
import { constructorSlice } from '../src/services/slices/constructor-slice';
import { feedSlice } from '../src/services/slices/feed-slice';
import { newOrderSlice } from '../src/services/slices/new-order-slice';
import { userOrdersSlice } from '../src/services/slices/user-order-slice';
import { orderInfoSlice } from '../src/services/slices/order-info-slice';
import { describe, test, expect } from '@jest/globals';

describe('Тестирование инициализации rootReducer', () => {
  test('Корректность инициализации', () => {
    const testAction = { type: '@@INIT' };
    const state = store.getState();

    expect(state).toEqual({
      user: userSlice.reducer(undefined, testAction),
      ingredients: ingredientsSlice.reducer(undefined, testAction),
      burgerConstructor: constructorSlice.reducer(undefined, testAction),
      feed: feedSlice.reducer(undefined, testAction),
      newOrder: newOrderSlice.reducer(undefined, testAction),
      userOrders: userOrdersSlice.reducer(undefined, testAction),
      orderInfo: orderInfoSlice.reducer(undefined, testAction)
    });
  });
});