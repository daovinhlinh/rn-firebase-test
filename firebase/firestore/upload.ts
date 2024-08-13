import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const uploadImageToFirebase = async (uri: string, name: string) => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${name}`);

  const fetchResponse = await fetch(uri);
  const blob = await fetchResponse.blob();

  return new Promise<string>((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on('state_changed',
      (snapshot) => {
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}