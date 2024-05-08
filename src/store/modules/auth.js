import { defineStore } from "pinia";
import { useGeneralStore } from "@/store/general";

import { auth } from "@/firebase-config.js";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  getters: {},
  actions: {
    async saveLoginUserData(loginResult) {
      //--------- user data -------
      const user = loginResult?.user; // об'єкт користувача
      this.user = user;

      let credential = GoogleAuthProvider.credentialFromResult(loginResult);

      localStorage.setItem("authCredential", JSON.stringify(credential));
    },
    loginWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((loginResult) => {
          this.saveLoginUserData(loginResult);

          //   this.saveCredential(credential);
        })
        .catch((error) => {
          const generalStore = useGeneralStore();
          generalStore.setError(error);
        });
    },
    async loginWithCredential() {
      return new Promise((resolve, reject) => {
        let credential = localStorage.getItem("authCredential");

        if (credential) {
          credential = JSON.parse(credential);
          credential = GoogleAuthProvider.credential(credential.idToken);

          signInWithCredential(auth, credential)
            .then((loginResult) => {
              this.saveLoginUserData(loginResult);
              resolve(loginResult);
            })
            .catch((error) => {
              const generalStore = useGeneralStore();
              generalStore.setError(error);
              reject(false);
            });
        } else resolve(false);
      });
    },
    signUpWithEmailAndPassword(email, password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          this.user = userCredential.user;
        })
        .catch((error) => {
          const generalStore = useGeneralStore();
          generalStore.setError(error);
          console.log(error);
        });
    },
    signInEmailAndPassword(email, password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          this.user = userCredential.user;
        })
        .catch((error) => {
          const generalStore = useGeneralStore();
          generalStore.setError(error);
        });
    },
    logout() {
      signOut(auth)
        .then(() => {
          localStorage.removeItem("authCredential");
          this.user = null;
        })
        .catch((error) => {
          const generalStore = useGeneralStore();
          generalStore.setError(error);
        });
    },
  },
});
