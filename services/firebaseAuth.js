import { auth, database } from "../firebaseConfig";

// Cadastro: cria no Auth e no Firestore (coleção users)
export const signUp = async (email, password) => {
  const userCredential = await auth.createUserWithEmailAndPassword(email, password);
  const user = userCredential.user;

  // Cria documento na coleção users
  await database.collection("users").doc(user.uid).set({
    favorites: [],
    participations: [],
    email: user.email,
  });

  return user;
};

// Login 
export const signIn = async (email, password) => {
  return await auth.signInWithEmailAndPassword(email, password);
};
 