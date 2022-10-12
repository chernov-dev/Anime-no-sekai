import { ref, update } from "firebase/database";
import { useState } from "react";
import { getUserDataById, updateUserPreferences } from "../api/getUserDataById";
import { auth, db } from "../firebase/firebase";

const useFirestoreDBLocal = (key, initialValue) => {
  const user = auth.currentUser;
  const userid = !user ? "" : user.uid;
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // If logged in pull data from db
      if (userid) {
        return getDataFromDB(userid, key, initialValue);
      }
    } catch (error) {
      // If error also return initialValue
      console.log(`useLocalStorage_key=${key}_error=`, error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage and Firebase DB.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      if (userid) {
        console.log(
          `%c updating data at users/${userid}/preferences/${key} for ${value}`,
          "background: #222; color: #bada55"
        );
        update(ref(db, `users/${userid}/preferences`), {
          [`${key}`]: value,
        });
      }
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export default useFirestoreDBLocal;

async function getDataFromDB(userid, key, initialValue) {
  return await getUserDataById(userid).then((data) => {
    if (data && Object.keys(data).length !== 0) {
      //If data exists pull data from firabase DB
      window.localStorage.setItem(key, JSON.stringify(data[key]));
      return data[key];
      //These states needs to be set up because using localstorage to render data from DB
    } else {
      //If no data use data from local storage and Update DB
      // Parse stored json or if none return initialValue
      updateUserPreferences(userid, JSON.parse(item));
      return item
        ? JSON.parse(item)
        : window.localStorage.setItem(key, JSON.stringify(initialValue));
    }
  });
}
