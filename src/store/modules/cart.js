import DbOperations from "../helpers/DbOperations";
const collectionDB = new DbOperations("cart");

import { defineStore } from "pinia";
import { useGeneralStore } from "../general";
import { useAuthStore } from "./auth";
import { useItemsStore } from "./items";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItemsList: [],
  }),
  getters: {
    getLoadedCart: (state) => {
      const itemsStore = useItemsStore();
      return state.cartItemsList?.map((item) => {
        const loadedItem = {
          count: item.count,
          ...itemsStore.getItemById(item.itemId),
        };
        return loadedItem;
      });
    },
    getSummary: (state) =>
      state.getLoadedCart?.reduce(
        (prevVal, item) => prevVal + item.price * item.count,
        0
      ),
    getItemsCount: (state) =>
      state.cartItemsList?.reduce((prevVal, item) => prevVal + item.count, 0),
  },
  actions: {
    setItemsList(itemsList) {
      this.cartItemsList = itemsList;
      this.isDataLoaded = true;
    },
    loadUserCart() {
      const generalStore = useGeneralStore();
      const authStore = useAuthStore();
      generalStore.setError(null);

      collectionDB
        .getItemById(authStore.user.uid)
        .then((list) => {
          this.setItemsList(list.items);
        })
        .catch((error) => {
          generalStore.setError(error);
        });
    },
    addToCart(userId, itemId) {
      const generalStore = useGeneralStore();
      generalStore.setError(null);
      generalStore.setLoading(true);
      collectionDB
        .addItemToArray(userId, "items", itemId)
        .catch((error) => generalStore.setError(error))
        .finally(() => generalStore.setLoading(false));
      setTimeout(() => {
        this.loadUserCart();
      }, 400);
    },
    deleteFromCart(userId, itemId) {
      const generalStore = useGeneralStore();
      generalStore.setError(null);
      generalStore.setLoading(true);
      collectionDB
        .deleteItemFromArray(userId, "items", itemId)
        .catch((error) => generalStore.setError(error))
        .finally(() => generalStore.setLoading(false));
      setTimeout(() => {
        this.loadUserCart();
      }, 400);
    },
    emptyCart(userId) {
      const generalStore = useGeneralStore();
      generalStore.setError(null);
      generalStore.setLoading(true);
      collectionDB
        .deleteItem(userId)
        .catch((error) => generalStore.setError(error))
        .finally(() => generalStore.setLoading(false));
      setTimeout(() => {
        this.loadUserCart();
      }, 400);
    },
  },
});
