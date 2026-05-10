import { feedSlice, getFeeds, initialState } from '../src/services/slices/feed-slice';
import { describe, test, expect } from '@jest/globals';

const feedsResponse = {
  success: true,
  orders: [
    {
      _id: '1',
      status: 'done',
      name: 'Бургер 1',
      createdAt: '2026-05-10T14:03:39.049Z',
      updatedAt: '2026-05-10T14:03:39.159Z',
      number: 12345,
      ingredients: ['ing-1', 'ing-2']
    }
  ],
  total: 100,
  totalToday: 10
};

describe('Тестирование feedSlice reducer', () => {
  test('Вызов pending', () => {
    const newState = feedSlice.reducer(
      initialState,
      getFeeds.pending('')
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('Вызов fulfilled', () => {
    const newState = feedSlice.reducer(
      initialState,
      getFeeds.fulfilled(feedsResponse, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.orders).toEqual(feedsResponse.orders);
    expect(newState.total).toBe(100);
    expect(newState.totalToday).toBe(10);
    expect(newState.error).toBeUndefined();
  });

  test('Вызов rejected', () => {
    const newState = feedSlice.reducer(
      initialState,
      getFeeds.rejected(new Error('Ошибка'), '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Ошибка');
    expect(newState.orders).toEqual([]);
  });
});