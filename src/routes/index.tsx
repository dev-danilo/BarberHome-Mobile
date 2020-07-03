import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { useAuth } from '../hooks/auth';

const Routes:React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) { // enquanto verifica se o usario esta logado, executa o if
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#999" />

      </View>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />; // Tem usuario logado ?
};

export default Routes;
