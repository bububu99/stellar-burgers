import { 
  orderInfoSlice, 
  getOrderByNumber 
} from '../src/services/slices/order-info-slice';
import { describe, test, expect } from '@jest/globals';

const testInitialState = {
  order: null,
  loading: false
};

const mockOrder = {
  _id: '1',
  status: 'done',
  name: 'Краторный бургер',
  createdAt: '2026-05-10T15:00:00.000Z',
  updatedAt: '2026-05-10T15:05:00.000Z',
  number: 1,
  ingredients: ['bun-1', 'main-1']
};

describe('Тестирование orderInfoSlice reducer', () => {

  test('Вызов pending', () => {
    const newState = orderInfoSlice.reducer(
      testInitialState,
      getOrderByNumber.pending('', 1)
    );

    expect(newState.loading).toBe(true);
  });

  test('Вызов fulfilled', () => {
    const newState = orderInfoSlice.reducer(
      testInitialState,
      getOrderByNumber.fulfilled(mockOrder, '', 1)
    );

    expect(newState.loading).toBe(false);
    expect(newState.order).toEqual(mockOrder);
  });

  test('Вызов rejected', () => {
    const loadingState = {
      order: null,
      loading: true
    };

    const newState = orderInfoSlice.reducer(
      loadingState,
      getOrderByNumber.rejected(new Error('Ошибка'), '', 1)
    );

    expect(newState.loading).toBe(false);
    expect(newState.order).toBeNull();
  });
});
