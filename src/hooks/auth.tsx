import AsyncStorage from '@react-native-community/async-storage';
import _replace from 'lodash/replace';
import React, {
  createContext,
  useCallback, useContext,
  useEffect, useState
} from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(data: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@BarberHome:token',
        '@BarberHome:user',
      ]);

      if (token[1] && user[1]) {
        const userData = JSON.parse(user[1]);
        if (__DEV__) {
          const image = _replace(userData.avatar_url, 'localhost', '10.0.2.2');
          userData.avatar_url = image;
        }
        api.defaults.headers.authorization = `Bearer ${token[1]}`; // SignIn

        setData({ token: token[1], user: userData });
      }

      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post<{ token: string; user: object }>(
      'sessions',
      {
        email,
        password,
      },
    );

    const { token, user } = response.data;
    await AsyncStorage.multiSet([
      ['@BarberHome:token', token],
      ['@BarberHome:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`; // SignIn
    const userData = JSON.parse(JSON.stringify(user));
    if (__DEV__) {
      const image = _replace(userData.avatar_url, 'localhost', '10.0.2.2');
      userData.avatar_url = image;
    }
    setData({ token, user: userData }); // apos login chama setData
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@BarberHome:token', '@BarberHome:user']);

    setData({} as AuthState); // deslogando usuario
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@BarberHome:user', JSON.stringify(user));
      const userData = JSON.parse(JSON.stringify(user));
      if (__DEV__) {
        const image = _replace(userData.avatar_url, 'localhost', '10.0.2.2');
        userData.avatar_url = image;
      }
      setData({
        token: data.token,
        user: userData,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        loading,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
