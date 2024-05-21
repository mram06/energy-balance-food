import DbOperations from "../helpers/DbOperations";
const collectionDB = new DbOperations("items");
import getItemsByCategory from "@/store/helpers/sortItemsList";
import isCorrespondToFilter from "@/store/helpers/filter";

import { defineStore } from "pinia";
import { useGeneralStore } from "../general";

export const useItemsStore = defineStore("items", {
  state: () => ({
    itemsList: [],
    isDataLoaded: null,
    searchByName: null,
  }),
  getters: {
    getItemById: (state) => (itemId) =>
      state.itemsList.find((item) => item.id == itemId),
    getFilteredItemsList: (state) =>
      state.itemsList.filter((item) =>
        isCorrespondToFilter(item, state.searchByName)
      ),
    getItemsByCategory: (state) =>
      getItemsByCategory(state.getFilteredItemsList),
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
    addItem(item) {
      const generalStore = useGeneralStore();
      generalStore.setError(null);
      generalStore.setLoading(true);
      collectionDB
        .addItem(item)
        .then(() => {
          this.loadList();
        })
        .catch((error) => {
          generalStore.setError(error);
        })
        .finally(() => {
          generalStore.setLoading(false);
        });
    },
    getItemByItemId(itemId) {
      const generalStore = useGeneralStore();
      generalStore.setError(null);
      generalStore.setLoading(true);
      collectionDB
        .getItemById(itemId)
        .catch((error) => generalStore.setError(error));
    },
    setSearchByName(name) {
      this.searchByName = name;
    },
  },
});
