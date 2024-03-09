<template>
  <main-master-page>
    <div class="container"><h1>#404 Not found</h1></div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpages/MainMasterPage.vue";
export default {
  name: "NotFound",
  components: {
    MainMasterPage,
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 112px;
}
h1 {
  color: rgb(16, 16, 16);
}
</style>
