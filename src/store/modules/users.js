import DbOperations from "../helpers/DbOperations";
const collectionDB = new DbOperations("users");

import { defineStore } from "pinia";
import { useGeneralStore } from "../general";
import { useAuthStore } from "@/store/modules/auth";

export const useUsersStore = defineStore("users", {
  state: () => ({
    userInfo: {},
  }),
  getters: {},
  actions: {
    updateUserInfo() {
      const generalStore = useGeneralStore();
      generalStore.setError(null);
      generalStore.setLoading(true);
    },
    async getUser() {
      const authStore = useAuthStore();
      const generalStore = useGeneralStore();
      generalStore.setError(null);
      generalStore.setLoading(true);
      await collectionDB
        .getItemById(authStore.user.uid)
        .then((user) => {
          this.userInfo = user;
          generalStore.setLoading(false);
        })
        .catch((error) => generalStore.setError(error));
    },
  },
});
