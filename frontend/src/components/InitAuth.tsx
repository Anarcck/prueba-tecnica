'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadToken, finishLoading } from '@/store/slices/authSlice';
import { RootState, AppDispatch } from '@/store';

const LoadAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      dispatch(loadToken(storedToken));
    } else {
      dispatch(finishLoading());
    }
  }, [dispatch]);

  return null;
};

export default LoadAuth;
