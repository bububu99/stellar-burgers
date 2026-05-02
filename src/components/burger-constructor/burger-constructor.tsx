import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

import {
  getConstructorSelector,
  clearConstructor
} from '../../services/slices/constructor-slice';
import {
  createOrder,
  getOrderData,
  getOrderLoad,
  clearOrder
} from '../../services/slices/new-order-slice';
import { getUserSelector } from '../../services/slices/user-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(getConstructorSelector);
  const user = useSelector(getUserSelector);

  const orderRequest = useSelector(getOrderLoad);

  const orderModalData = useSelector(getOrderData);

  const onOrderClick = () => {
    if (!user.email) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(orderData));
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
