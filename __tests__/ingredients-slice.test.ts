import { 
  ingredientsSlice, 
  getIngredients, 
  initialState 
} from '../src/services/slices/ingredients-slice';
import { describe, test, expect } from '@jest/globals';

const mockIngredients = [
  {
    "_id": "1",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
  }
];

describe('Тестирование ingredientsSlice reducer', () => {
  test('Вызов pending', () => {
    const newState = ingredientsSlice.reducer(
      initialState,
      getIngredients.pending('')
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('Вызов fulfilled', () => {
    const newState = ingredientsSlice.reducer(
      initialState,
      getIngredients.fulfilled(mockIngredients, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.ingredients).toEqual(mockIngredients);
    expect(newState.error).toBeUndefined();
  });

  test('Вызов rejected', () => {
    const newState = ingredientsSlice.reducer(
      initialState,
      getIngredients.rejected(new Error('Ошибка'), '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Ошибка');
    expect(newState.ingredients).toEqual([]);
  });
});