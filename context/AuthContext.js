import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../firebaseConfig";
import {doc, getDoc, setDoc} from "firebase/firestore";

//Criação do contexto (Área para partilha de funções e variáveis entre várias aplicações)
const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userRef = doc(database, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email: currentUser.email,
            favorites: [],
            participating: [],
          });
          console.log("Documento de usuário criado no Firestore.");
        }

        setUser(currentUser);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};