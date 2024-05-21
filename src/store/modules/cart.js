import DbOperations from "../helpers/DbOperations";
const collectionDB = new DbOperations("cart");

import { defineStore } from "pinia";
import { useGeneralStore } from "../general";
import { useItemsStore } from "./items";

export const useCartStore = defineStore("cart", {
  state: () => ({
    itemsList: [],
  }),
  getters: {
    getLoadedCart: (state) => {
      const itemsStore = useItemsStore();
      const loadedCart = state.itemsList[0]?.items.map((item) => {
        item = itemsStore.getItemByItemId(item.itemId);
        return item;
      });
      console.log(loadedCart);
      return loadedCart;
    },
  },
  actions: {
    setItemsList(itemsList) {
      this.itemsList = itemsList;
      this.isDataLoaded = true;
    },
    loadList() {
      const generalStore = useGeneralStore();
      generalStore.setError(null);
      generalStore.setLoading(true);

      collectionDB
        .loadItemsList()
        .then((list) => {
          this.setItemsList(list);
        })
        .catch((error) => {
          generalStore.setError(error);
        })
        .finally(() => {
          generalStore.setLoading(false);
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
    },
  },
});
