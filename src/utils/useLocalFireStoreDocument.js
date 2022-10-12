import { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthProvider";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const useLocalFireStoreDocument = (collection, key, initialValue) => {
  const { user } = useUserAuth();
  const documentId = user ?? "";
  const isLoggedIn = documentId == "" ? false : true;

  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);

      // if (isLoggedIn) {
      //   getDocList(collection, user.id).then((list) => {
      //     if (list.exists) {
      //       setValue(JSON.stringify(list.data()));
      //     } else {
      //       console.log("Creating a new user preferences");
      //       const item = window.localStorage.getItem(key);
      //       createList(collection, user.id, {
      //         updatedAt: serverTimestamp(),
      //         ...JSON.parse(item),
      //       }).then(setValue(JSON.stringify(list.data())));
      //     }
      //   });
      // }
      // If logged in and no data in firestore then we save our data from localstorage to firestore
      return item
        ? JSON.parse(item)
        : window.localStorage.setItem(key, JSON.stringify(initialValue));
      // Parse stored json or if none return initialValue
    } catch (error) {
      // If error also return initialValue
      console.log(`useLocalStorage_key=${key}_error=`, error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to firestore
      if (isLoggedIn) {
        createList(collection, user.uid, {
          updatedAt: serverTimestamp(),
          ...valueToStore,
        });
      }
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     const unsubscribe = onSnapshot(
  //       doc(collection, user.uid),
  //       { includeMetadataChanges: true },
  //       (doc) => {
  //         if (doc.id == user.uid) {
  //           setValue(doc);
  //         } else {
  //           //TODO: fill data from local storage
  //           console.log("uploading data to firestore");
  //         }
  //       }
  //     );
  //     return () => {
  //       unsubscribe();
  //     };
  //   }
  // }, [isLoggedIn]);

  return [storedValue, setValue];
};

export const createList = (collection, userid, list) => {
  const listDocRef = doc(collection, userid);
  return setDoc(listDocRef, { ...list });
};

export const getDocList = (collection, userid) => {
  const documentRef = doc(collection, userid);
  return getDoc(documentRef);
};

export default useLocalFireStoreDocument;
