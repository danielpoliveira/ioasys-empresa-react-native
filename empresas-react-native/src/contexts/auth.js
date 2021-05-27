import React, { createContext, useContext, useEffect, useState } from 'react';
import { addInterceptor, removeInterceptor } from '../services/api';
import { isLogged, onSignOut, onSignIn, } from '../services/authStore';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    async function loadStorageData() {
      await isLogged().then((res) => {
        if (res && res.length) {
          const aux = {
            ['access-token']: res[0][1],
            ['client']: res[1][1],
            ['uid']: res[2][1],
          }

          if (aux['access-token'] && aux.client && aux.uid) {
            setUser(JSON.parse(res[3][1]));
            addInterceptor(aux);
            setLogged(true);
          }
        }
      });
    }

    loadStorageData();
  }, []);

  async function login(res) {
    await onSignIn(res).then(() => {
      setUser(res.user);
      addInterceptor(res);
      setLogged(true);
    })
  }

  async function logout() {
    await onSignOut().then(() => {
      removeInterceptor();
      setLogged(false);
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: logged,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}