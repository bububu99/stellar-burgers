import { constructorSlice, addIngredient, removeIngredient, moveIngredient,initialState } from '../src/services/slices/constructor-slice'
import { describe, test, expect } from '@jest/globals';
const testBun = {
  "_id": "1",
  "id": "1",
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
};

const testMain = {
  "_id": "2",
  "id": "2",
  "name": "Биокотлета из марсианской Магнолии",
  "type": "main",
  "proteins": 420,
  "fat": 142,
  "carbohydrates": 242,
  "calories": 4242,
  "price": 424,
  "image": "https://code.s3.yandex.net/react/code/meat-01.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
  "__v": 0
};

const testSauce = {
  "_id": "3",
  "id": "3",
  "name": "Соус Spicy-X",
  "type": "sauce",
  "proteins": 30,
  "fat": 20,
  "carbohydrates": 40,
  "calories": 30,
  "price": 90,
  "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
  "__v": 0  
}

describe('Тестирование constructorSlice reducer', () => {
  test('Добавление булки', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addIngredient(testBun)
    );
    expect(newState.bun?._id).toBe('1');
    expect(newState.ingredients).toHaveLength(0);
  });

  test('Добавление ингредиента', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addIngredient(testMain)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]._id).toBe('2');
  });

  test('Удаление ингредиента', () => {
    const state = {
      bun: null,
      ingredients: [testMain]
    };
    const newState = constructorSlice.reducer(
      state,
      removeIngredient(testMain.id)
    );
    expect(newState.ingredients).toHaveLength(0);
  });

  test('Изменение порядка ингредиентов', () => {
    
    const state = {
      bun: null,
      ingredients: [testMain, testSauce]
    };
    const newState = constructorSlice.reducer(
      state,
      moveIngredient({ from: 0, to: 1 })
    );
    expect(newState.ingredients[0]).toEqual(testSauce);
    expect(newState.ingredients[1]).toEqual(testMain);
  });
})