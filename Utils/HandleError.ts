const handleFirebaseError = (error: any) => {
  console.log(error);

  switch (error.code) {
    case "auth/invalid-email":
      return "Invalid email address format.";
    case "auth/invalid-credential":
      return "Invalid credential.";
    case "auth/user-not-found":
      return "User not found.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/email-already-in-use":
      return "Email address already in use.";
    case "auth/weak-password":
      return "Password is too weak.";
    case "auth/configuration-not-found":
      return "Email not found.";
    default:
      return "An error occurred.";
  }
}

export { handleFirebaseError };