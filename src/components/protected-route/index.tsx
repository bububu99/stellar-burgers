import React from 'react';
import { useSelector } from '../../services/store';
import {
  isAuthCheckedSelector,
  getUserSelector
} from '../../services/slices/user-slice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(getUserSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user.email) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user.email) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
