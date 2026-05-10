import { 
  userOrdersSlice, 
  getUserOrders, 
  initialState 
} from '../src/services/slices/user-order-slice';
import { describe, test, expect } from '@jest/globals';

const mockOrders = [
  {
    _id: '1',
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2026-05-10T15:00:00.000Z',
    updatedAt: '2026-05-10T15:05:00.000Z',
    number: 1,
    ingredients: ['bun-1', 'main-1']
  }
];

describe('Тестирование userOrdersSlice reducer', () => {

  test('Вызов pending', () => {
    const newState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.pending('')
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('Вызов fulfilled', () => {
    const newState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.fulfilled(mockOrders, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.orders).toEqual(mockOrders);
    expect(newState.error).toBeUndefined();
  });

  test('Вызов rejected', () => {
    const newState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.rejected(new Error('Ошибка'), '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Ошибка');
    expect(newState.orders).toEqual([]);
  });
});