import { db } from '@/firebaseConfig';
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

const postsCollection = collection(db, 'posts');

export async function fetchPost() {
  const postsQuery = query(postsCollection, orderBy('createdAt', 'desc'), limit(1));
  const data = await getDocs(postsQuery);
  return data.docs;
}