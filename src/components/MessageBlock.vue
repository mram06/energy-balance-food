<template>
  <div class="container">
    <div class="text">{{ message }}</div>
    <div @click="setMessage(null)" class="close-icon" />
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useGeneralStore } from "@/store/general";
export default {
  name: "MessageBlock",
  computed: {
    ...mapState(useGeneralStore, ["message"]),
  },
  methods: {
    ...mapActions(useGeneralStore, ["setMessage"]),
  },
  created() {
    setTimeout(() => this.setMessage(null), 5000);
  },
};
</script>

<style lang="scss" scoped>
.container {
  left: calc(50vw - (350px / 2));
  position: fixed;
  z-index: 5;
  background-color: rgba(rgb(116, 116, 116), 0.6);

  display: flex;
  align-items: center;

  padding: 0 0 0 15px;
  width: 350px;
  height: 50px;
  border-radius: 25px;
  text-align: center;
}
.close-icon {
  cursor: pointer;
  position: absolute;
  top: 13px;
  right: 5px;
  width: 25px;
  height: 25px;
  background: url("@/assets/icons/close.svg") 0 0/100% 100% no-repeat;
}
</style>
