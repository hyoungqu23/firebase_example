import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';

export interface AuthUserInfo {
  email: string;
  password: string;
}

export const AuthContext: React.Context<User | null> =
  createContext<User | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  console.log(auth);
  console.log(auth.user);

  return (
    <AuthContext.Provider value={auth.user}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const register = async ({ email, password }: AuthUserInfo) => {
    return createUserWithEmailAndPassword(authService, email, password).then(
      (response) => {
        setUser(response.user);
        return response.user;
      },
    );
  };

  const login = async ({ email, password }: AuthUserInfo) => {
    return signInWithEmailAndPassword(authService, email, password).then(
      (response) => {
        setUser(response.user);
        return response.user;
      },
    );
  };

  const logout = async () => {
    return authService.signOut().then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    const subscribe = authService.onAuthStateChanged((firebaseUser) => {
      console.log('');
      setUser(firebaseUser);
      setIsAuthenticating(false);
    });

    return () => subscribe();
  }, []);

  const values = {
    user,
    isAuthenticating,
    register,
    login,
    logout,
  };

  return values;
};
