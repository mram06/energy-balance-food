<template>
  <main-master-page>
    <div class="container">
      <div class="profile">
        <div class="profile__body">
          <div class="profile__tabs">
            <router-link :to="{ name: 'settings' }"
              >Контактна інформація
            </router-link>
            <router-link :to="{ name: 'orders' }">Мої замовлення</router-link>
            <router-link :to="{ name: 'myFeatures' }"
              >Мої особливості</router-link
            >
          </div>
          <router-view />
        </div>
      </div>
      <banner-block />
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpages/MainMasterPage";
import BannerBlock from "@/components/BannerBlock.vue";
export default {
  name: "ProfileView",
  components: {
    MainMasterPage,
    BannerBlock,
  },
};
</script>

<style lang="scss" scoped>
.profile {
  &__body {
    min-height: 50vh;
    background-color: #f2f0ee;
    padding: 48px 112px;
  }

  &__tabs {
    display: flex;
    justify-content: center;
    a {
      padding: 8px 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      font-weight: 700;
      border-radius: 20px;
    }
    .router-link-exact-active {
      background: rgb(239, 119, 42);
      color: white;
      transition: 0.3s ease-out background, color;
    }
  }
}
</style>
