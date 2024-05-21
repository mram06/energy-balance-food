<template>
  <div class="wrapper">
    <header class="header">
      <div class="container">
        <div class="header__body">
          <router-link to="/"
            ><div class="header__logo">
              Energy <span>Balance</span>
            </div></router-link
          >
          <nav class="header__menu">
            <router-link :to="{ name: 'menu' }">Меню</router-link>
            <router-link :to="{ name: 'programs' }">Програми</router-link>
            <router-link :to="{ name: 'forWhom' }">Для кого</router-link>
          </nav>
          <div class="header__tools">
            <template v-if="user">
              <div class="header__tools-profile">
                <img :src="user.photoURL" />
              </div>
              <div @click="logout">Вихід</div>
            </template>
            <template v-else>
              <div @click="onLogin" class="header__tools-profile">
                <img src="@/assets/icons/profile.svg" />
              </div>
            </template>
            <div
              @click="$router.push({ name: 'cart' })"
              class="header__tools-cart"
            >
              <img src="@/assets/icons/cart.svg" />
            </div>
          </div>
        </div>
      </div>
    </header>
    <main class="content">
      <loading-page v-if="loading" />
      <error-page v-else-if="error" />
      <template v-if="!error"><slot></slot></template>
    </main>
    <footer class="footer">
      <div class="container">
        <div class="footer__body">
          <div class="footer__row">
            <div class="footer__about">
              <div class="footer__title">Energy <span>Balance</span></div>
              <div class="footer__socials"></div>
            </div>
            <div class="footer__menu">
              <div class="footer__menu-pages">
                <a href="#">Головна</a>
                <a href="#">Меню</a>
                <a href="#">Для кого</a>
                <a href="#">Як працює</a>
                <a href="#">FAQ</a>
              </div>
              <div class="footer__menu-programs">
                <div>Програми</div>
                <a href="#">Slim</a>
                <a href="#">Balance</a>
                <a href="#">Muscle</a>
              </div>
              <div class="footer__menu-contacts">
                <div>Контакти</div>
                <div>+ 38 (000) 000-00-00</div>
                <div>Київ, просп. Проспект 00, офіс 0</div>
                <div>email@email.com</div>
              </div>
            </div>
          </div>
          <div class="footer__bottom">
            <div class="footer__policy">
              <a>Terms & Conditions</a>
              <a>Privacy Policy</a>
              <a>Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/modules/auth";
import { useGeneralStore } from "@/store/general";
import { mapActions, mapState } from "pinia";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";

export default {
  name: "MainMasterPage",
  components: {
    LoadingPage,
    ErrorPage,
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
    ...mapState(useGeneralStore, ["loading", "error"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["loginWithCredential", "logout"]),
    onLogin() {
      this.$router.push({ name: "login" });
    },
  },
  mounted() {
    this.loginWithCredential();
  },
};
</script>

<style lang="scss" scoped>
.header {
  background: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 20;
  &__body {
    font-family: "Raleway", sans-serif;
    display: flex;
    justify-content: space-between;
    padding: 20px 112px;
  }

  &__logo {
    span {
      font-style: italic;
      font-weight: 300;
    }
  }

  &__menu {
    display: flex;
    gap: 32px;
  }

  &__tools {
    display: flex;
    gap: 16px;
    &-language {
    }

    &-profile {
      cursor: pointer;
      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
    }

    &-cart {
      cursor: pointer;
    }
  }
}
.footer {
  &__body {
    background: rgb(242, 240, 238);
    padding: 48px 112px;
  }

  &__row {
    display: flex;
    justify-content: space-between;
  }

  &__about {
  }

  &__title {
    font-family: "Raleway", sans-serif;
    span {
      font-weight: 300;
      font-style: italic;
    }
  }

  &__socials {
  }

  &__menu {
    display: flex;
    gap: 125px;
  }

  &__menu-pages {
    font-family: "Raleway", sans-serif;
    :not(:first-child, :last-child) {
      margin: 0 0 8px 0;
    }

    :first-child {
      margin: 0 0 16px 0;
    }
  }

  &__menu-programs {
    div {
      font-family: "Raleway", sans-serif;
    }
    a {
      margin: 8px 0 0 0;
      color: rgb(64, 64, 64);
    }
    :nth-child(2) {
      margin: 16px 0 0 0;
    }
  }

  &__menu-contacts {
    color: rgb(64, 64, 64);
    :first-child {
      font-family: "Raleway", sans-serif;
      margin: 0 0 16px 0;
    }
    :not(:first-child, :nth-child(2)) {
      margin: 8px 0 0 0;
    }
  }

  &__policy {
    a {
      color: rgb(64, 64, 64);
    }

    display: flex;
    gap: 43.5px;
  }
  &__bottom {
    display: flex;
    justify-content: flex-end;
    margin: 32px 0 0 0;
  }
}
</style>
