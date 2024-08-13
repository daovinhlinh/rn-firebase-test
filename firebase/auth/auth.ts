import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseApp, getAuth } from "../../firebaseConfig";

const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const auth = getAuth();
  const user = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return user;
}

const register = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const auth = getAuth();
  const response = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(response.user, { displayName: email });
  return response;
}


export { signIn, register };