import DbOperations from "../helpers/DbOperations";
const collectionDB = new DbOperations("orders");

import { defineStore } from "pinia";
import { useGeneralStore } from "../general";
import { useCartStore } from "@/store/modules/cart";
import { useAuthStore } from "./auth";
import { useItemsStore } from "./items";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    ordersList: [],
  }),
  getters: {
    getLoadedOrders: (state) => {
      const itemsStore = useItemsStore();
      const loadedList = state.ordersList?.map((order) => {
        return {
          date: order.date,
          summary: order.summary,
          items: order.items?.map((item) => {
            return {
              count: item.count,
              ...itemsStore.getItemById(item.itemId),
            };
          }),
        };
      });
      return loadedList;
    },
  },
  actions: {
    setItemsList(itemsList) {
      this.ordersList = itemsList;
    },
    loadUserCart() {
      const generalStore = useGeneralStore();
      const authStore = useAuthStore();
      generalStore.setError(null);
      collectionDB
        .getItemById(authStore.user.uid)
        .then((list) => {
          this.setItemsList(list.ordersList);
        })
        .catch((error) => {
          generalStore.setError(error);
        });
    },
    async makeOrder() {
      const generalStore = useGeneralStore();
      const cartStore = useCartStore();
      const authStore = useAuthStore();
      generalStore.setError(null);
      generalStore.setLoading(true);
      await collectionDB
        .addOrderToArray(authStore.user.uid, "ordersList", {
          date: new Date(),
          items: cartStore.cartItemsList,
          summary: cartStore.getSummary,
        })
        .then(() => {
          cartStore.emptyCart();
        })
        .catch((error) => generalStore.setError(error))
        .finally(() => generalStore.setLoading(false));
    },
  },
});
