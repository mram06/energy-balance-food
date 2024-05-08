<template>
  <main-master-page>
    <div class="container">
      <programs-block />
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpages/MainMasterPage";
import ProgramsBlock from "@/components/ProgramsBlock";
export default {
  name: "ProgramsView",
  components: {
    MainMasterPage,
    ProgramsBlock,
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: rgb(239, 199, 74);
  padding: 48px 0;
}
</style>
