import DbOperations from "../helpers/DbOperations";
const collectionDB = new DbOperations("items");
import getItemsByCategory from "@/store/helpers/sortItemsList";
import isCorrespondToFilter from "@/store/helpers/filter";

import { defineStore } from "pinia";
import { useGeneralStore } from "../general";

export const useItemsStore = defineStore("items", {
  state: () => ({
    // Дані які можуть використати компоненти
    itemsList: [],
    isDataLoaded: null,
    searchByName: null,
  }),
  getters: {
    // Геттер отримання товару за ідентифікатором
    getItemById: (state) => (itemId) =>
      state.itemsList.find((item) => item.id == itemId),

    // Геттер отримання відфільтрованого списку товарів
    getFilteredItemsList: (state) =>
      state.itemsList.filter((item) =>
        isCorrespondToFilter(item, state.searchByName)
      ),

    // Геттер отримання відфільтрованого списку товарів по категоріям
    getItemsByCategory: (state) =>
      getItemsByCategory(state.getFilteredItemsList),
  },
  actions: {
    // Метод для зберігання списку товарів
    setItemsList(itemsList) {
      this.itemsList = itemsList;
      this.isDataLoaded = true;
    },
    // Метод завантаження списку товарів з бази даних
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
    // Метод для додавання товару
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
    // Метод отримання товару по ідентифікатору
    getItemByItemId(itemId) {
      const generalStore = useGeneralStore();
      generalStore.setError(null);
      generalStore.setLoading(true);
      collectionDB
        .getItemById(itemId)
        .catch((error) => generalStore.setError(error));
    },
    // Метод для встановлення фільтра за назвою
    setSearchByName(name) {
      this.searchByName = name;
    },
  },
});
