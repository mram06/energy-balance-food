import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", {
  state: () => ({
    loading: false,
    error: null,
    message: null,
  }),
  getters: {},
  actions: {
    setError(error) {
      this.error = error;
    },
    setLoading(value) {
      this.loading = value;
    },
    setMessage(message) {
      this.message = message;
    },
  },
});
