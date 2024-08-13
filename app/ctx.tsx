import { register, signIn } from "@/firebase/auth/auth";
import { handleFirebaseError } from "@/Utils";
import { FirebaseError } from "firebase/app";
import { UserCredential } from "firebase/auth";
import React from "react";
// import { useStorageState } from "./useStorageState";

interface SignInProps {
  email: string;
  password: string;
}

interface AuthContextProps {
  session: string | null;
  isLoading: boolean;
  signIn: (props: SignInProps) => Promise<UserCredential | null>;
  register: (props: SignInProps) => Promise<UserCredential | undefined>;
  signOut: () => void;
}

const AuthContext = React.createContext<AuthContextProps>({
  signIn: async () => null,
  register: async () => undefined,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function AuthProvider(props: React.PropsWithChildren) {
  const [session, setSession] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <AuthContext.Provider
      value={{
        signIn: async ({ email, password }: SignInProps) => {
          try {
            const user = await signIn({
              email,
              password,
            });
            setSession(user.user.email);
            return user;
          } catch (error: FirebaseError | any) {
            if (error && error.code) {
              const errorMessage = handleFirebaseError(error);
              alert(errorMessage);
            } else {
              alert("An error occurred. Please try again.");
            }
            return null;
          }
        },
        register: async ({
          email,
          password,
        }: {
          email: string;
          password: string;
        }) => {
          try {
            const response = await register({ email, password });
            return response;
          } catch (error: FirebaseError | any) {
            if (error && error.code) {
              const errorMessage = handleFirebaseError(error);
              alert(errorMessage);
            } else {
              alert("An error occurred. Please try again.");
            }
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
