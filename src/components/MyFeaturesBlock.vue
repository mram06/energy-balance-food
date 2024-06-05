<template>
  <div class="features">
    <div class="container">
      <div class="features__body">
        <div class="features__title">
          Чи маєте алергію на якийсь інгредієнт?
        </div>
        <textarea
          v-model="featuresObj.comment"
          cols="10"
          rows="3"
          placeholder="Залишити коментар"
          class="features__comment"
        />
        <button @click="updateUserInfo(featuresObj)" class="features__button">
          Зберегти
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useUsersStore } from "@/store/modules/users";
import { mapActions, mapState } from "pinia";

export default {
  name: "MyFeaturesBlock",
  data() {
    return {
      featuresObj: {
        comment: null,
      },
    };
  },
  computed: {
    ...mapState(useUsersStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(useUsersStore, ["getUser", "updateUserInfo"]),
  },
  async created() {
    await this.getUser();
    this.featuresObj = {
      comment: this.userInfo.comment || null,
    };
  },
};
</script>

<style lang="scss" scoped>
.features {
  &__body {
    padding: 48px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    color: rgb(16, 16, 16);
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    text-align: center;
  }

  &__comment {
    margin: 16px 0 0 0;
    max-width: 488px;
    height: 96px;
    padding: 8px 16px;

    background-color: white;
    border-radius: 20px;
    box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.22),
      2px 2px 4px 0px rgba(0, 0, 0, 0.12);
  }

  &__button {
    margin: 32px 0 0 0;
    text-align: center;
    width: 228px;
    background: none;
    color: rgb(239, 119, 42);
    border-radius: 20px;
    border: 1px solid rgb(239, 119, 42);
  }
}
.container {
}
</style>
