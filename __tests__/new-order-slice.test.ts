import { 
  newOrderSlice, 
  createOrder, 
  clearOrder 
} from '../src/services/slices/new-order-slice'; 
import { describe, test, expect } from '@jest/globals';

const testInitialState = {
  loading: false,
  order: null,
  error: undefined
};

const mockOrderResponse = {
  success: true,
  name: "Бургер",
  order: {
    _id: '1',
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2026-05-10T15:00:00.000Z',
    updatedAt: '2026-05-10T15:05:00.000Z',
    number: 1,
    ingredients: ['bun-1', 'main-1']
  }
};

describe('Тестирование newOrderSlice reducer', () => {

  test('Вызов clearOrder', () => {
    const previousState = {
      loading: false,
      order: mockOrderResponse.order,
      error: 'Ошибка'
    };

    const newState = newOrderSlice.reducer(previousState, clearOrder());
    expect(newState).toEqual(testInitialState);
  });

  test('Вызов pending', () => {
    const newState = newOrderSlice.reducer(
      testInitialState,
      createOrder.pending('', [])
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('Вызов fulfilled', () => {
    const newState = newOrderSlice.reducer(
      testInitialState,
      createOrder.fulfilled(mockOrderResponse, '', [])
    );

    expect(newState.loading).toBe(false);
    expect(newState.order).toEqual({
      ...mockOrderResponse.order,
      ingredients: []
    });
    expect(newState.error).toBeUndefined();
  });

  test('Вызов rejected', () => {
    const newState = newOrderSlice.reducer(
      testInitialState,
      createOrder.rejected(new Error('Ошибка'), '', [])
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Ошибка');
    expect(newState.order).toBeNull();
  });
});