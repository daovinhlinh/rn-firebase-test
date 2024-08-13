import { db, auth } from '@/firebaseConfig';
import {
  Timestamp,
  addDoc,
  collection,
} from 'firebase/firestore';

interface PostItemInterface {
  post: string;
  image?: string;
}

const postsCollection = collection(db, 'posts');

export async function createPost(data: PostItemInterface) {
  const dbData = {
    createdAt: Timestamp.now(),
    email: auth.currentUser?.email,
    ...data,
  };
  return await addDoc(postsCollection, dbData);
}