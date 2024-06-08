<template>
  <div class="container">
    <h2>Сталася помилка</h2>
    <div @click="clearError" class="close-icon" />
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useGeneralStore } from "@/store/general";
export default {
  name: "ErrorPage",
  methods: {
    ...mapActions(useGeneralStore, ["setError"]),
    clearError() {
      localStorage.clear("authCredential");
      this.setError(null);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  left: calc(50vw - (400px / 2));
  position: fixed;
  z-index: 50;
  background-color: rgba(red, 0.5);

  width: 400px;
  height: 100px;
  border-radius: 25px;
  text-align: center;
}
.close-icon {
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 25px;
  height: 25px;
  background: url("@/assets/icons/close.svg") 0 0/100% 100% no-repeat;
}
</style>
