<template>
  <main-master-page>
    <div class="container">
      <div class="page-body">
        <h1 class="title">Energy <span>Balance</span></h1>
        <div class="login">
          <div class="login__body">
            <div class="login__type">
              <router-link to="login">Увійти</router-link>
              <router-link to="signup">Зареєструватися</router-link>
            </div>
            <div class="login__inputs">
              <label>
                Електронна пошта
                <input
                  v-model="email"
                  type="email"
                  placeholder="Введіть ел. пошту"
                  class="login__inputs-email"
                />
              </label>
              <label>
                Пароль
                <input
                  v-model="password"
                  type="password"
                  placeholder="Введіть пароль"
                  class="login__inputs-password"
                />
              </label>
            </div>
            <a href="#" class="login__forgot_password">Забули пароль?</a>
            <button @click="onAction" class="login__action_button">
              {{ actionButtonTitle }}
            </button>
            <div class="login__or">
              <div></div>
              <div>або</div>
              <div></div>
            </div>
            <button @click="loginWithGoogle" class="login__with_google">
              <span><img src="@/assets/icons/google.svg" /></span>Продовжити з
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpages/MainMasterPage.vue";
import { mapActions } from "pinia";
import { useAuthStore } from "@/store/modules/auth";

export default {
  name: "LoginPage",
  components: {
    MainMasterPage,
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },
  computed: {
    actionButtonTitle() {
      return this.$route.name === "login" ? "Увійти" : "Зареєструватися";
    },
  },
  methods: {
    ...mapActions(useAuthStore, [
      "loginWithGoogle",
      "signUpWithEmailAndPassword",
      "signInEmailAndPassword",
    ]),
    onAction() {
      if (this.$route.name === "signup") {
        this.signUpWithEmailAndPassword(this.email, this.password);
      } else {
        this.signInEmailAndPassword(this.email, this.password);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-body {
  background: url("@/assets/backgrounds/login-background.svg");
  background-color: #efc74a;
  padding: 48px 0 200px 0;
}
.title {
  text-align: center;
  color: black;
  span {
    font-style: italic;
  }
}
.login {
  &__body {
    padding: 48px;
    margin: 0 auto;
    margin-top: 48px;
    width: 488px;
    border-radius: 8px;
    background: rgb(255, 255, 255);
  }
  &__type {
    padding: 4px;
    border: 1px solid rgb(136, 136, 136);
    border-radius: 81px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    a {
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
  &__inputs {
    margin: 32px 0 0 0;
    label {
      margin: 16px 0 0 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    input {
      border: 1px solid rgb(136, 136, 136);
      border-radius: 24px;
      padding: 8px 16px 8px 48px;
      font-size: 16px;
    }
    &-email {
      background: url("@/assets/icons/email.svg") 16px no-repeat;
    }
    &-password {
      background: url("@/assets/icons/password.svg") 16px no-repeat;
    }
  }
  &__forgot_password {
    margin: 16px 0 0 0;
    color: rgb(239, 119, 42);
    text-decoration-line: underline;
  }
  &__action_button {
    margin: 16px 0 0 0;
    width: 100%;
  }
  &__or {
    margin: 16px 0 0 0;
    display: flex;
    align-items: center;
    gap: 16px;
    & div:not(:nth-child(2)) {
      width: 100%;
      height: 1px;
      background-color: rgb(136, 136, 136);
    }
  }
  &__with_google {
    margin: 16px 0 0 0;
    border: 1px solid rgb(136, 136, 136);
    &:active {
      background-color: #e0e0e0;
    }
    background: white;
    width: 100%;
    color: black;
    span {
      padding-right: 16.48px;
    }
  }
}
</style>
