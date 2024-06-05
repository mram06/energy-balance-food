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
    async updateUserInfo(userObj) {
      const generalStore = useGeneralStore();
      const authStore = useAuthStore();

      generalStore.setError(null);
      generalStore.setLoading(true);

      const user = await collectionDB.getItemById(authStore.user.uid);

      if (Object.keys(user).length === 0) {
        collectionDB
          .addItemWithCustomId(authStore.user.uid, userObj)
          .then(() => generalStore.setLoading(false))
          .catch((error) => generalStore.setError(error));
      } else {
        collectionDB
          .updateItem(authStore.user.uid, userObj)
          .then(() => generalStore.setLoading(false))
          .catch((error) => generalStore.setError(error));
      }
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
