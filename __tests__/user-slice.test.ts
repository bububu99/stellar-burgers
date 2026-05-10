import {
  userSlice,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  setAuthChecked,
  setUser,
  clearError,
  initialState
} from '../src/services/slices/user-slice';
import { describe, test, expect } from '@jest/globals';

const mockUserResponse = {
  success: true,
  user: {
    email: 'test@test.com',
    name: 'Тест 1'
  },
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token'
};

const mockUpdateResponse = {
  success: true,
  user: {
    email: 'updated@test.com',
    name: 'Тест 2'
  }
};

describe('Тестирование userSlice reducer', () => {

  test('Вызов setAuthChecked', () => {
    const newState = userSlice.reducer(initialState, setAuthChecked(true));
    expect(newState.isAuthChecked).toBe(true);
  });

  test('Вызов setUser', () => {
    const newState = userSlice.reducer(initialState, setUser(mockUserResponse.user));
    expect(newState.user).toEqual(mockUserResponse.user);
  });

  test('Вызов clearError', () => {
    const previousState = {
      ...initialState,
      error: 'Ошибка'
    };
    const newState = userSlice.reducer(previousState, clearError());
    expect(newState.error).toBe('');
  });

  test('Вызов registerUser.fulfilled', () => {
    const newState = userSlice.reducer(
      initialState,
      registerUser.fulfilled(mockUserResponse, '', { email: '', name: '', password: '' })
    );
    expect(newState.user).toEqual(mockUserResponse.user);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('Вызов registerUser.rejected', () => {
    const newState = userSlice.reducer(
      initialState,
      registerUser.rejected(new Error('Ошибка'), '', { email: '', name: '', password: '' })
    );
    expect(newState.error).toBe('Ошибка');
  });

  test('Вызов loginUser.fulfilled', () => {
    const previousState = {
      ...initialState,
      error: 'Ошибка'
    };
    const newState = userSlice.reducer(
      previousState,
      loginUser.fulfilled(mockUserResponse, '', { email: '', password: '' })
    );
    expect(newState.user).toEqual(mockUserResponse.user);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.error).toBe('');
  });

  test('Вызов loginUser.rejected', () => {
    const newState = userSlice.reducer(
      initialState,
      loginUser.rejected(new Error('Неверный пароль'), '', { email: '', password: '' })
    );
    expect(newState.error).toBe('Неверный пароль');
  });

  test('Вызов logoutUser.fulfilled', () => {
    const loggedInState = {
      isAuthChecked: true,
      user: mockUserResponse.user,
      error: ''
    };
    const newState = userSlice.reducer(
      loggedInState,
      logoutUser.fulfilled(undefined, '')
    );
    expect(newState.user).toEqual({ email: '', name: '' });
  });

  test('Вызов updateUser.fulfilled', () => {
    const newState = userSlice.reducer(
      initialState,
      updateUser.fulfilled(mockUpdateResponse, '', {})
    );
    expect(newState.user).toEqual(mockUpdateResponse.user);
  });
});
