import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/auth';

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

const Routes = () => {
  const { signed } = useAuth();
  return (
    <NavigationContainer>
      {signed ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}

export default Routes;
