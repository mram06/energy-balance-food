<template>
  <main-master-page>
    <div class="container">
      <div class="cart__body">
        <h2>Ваше замовлення</h2>
        {{ getLoadedCart }}
        <div class="cart__reset">Очистити кошик</div>
        <div class="cart__container">
          <div class="cart__item">
            <div class="cart__item-img">
              <img src="@/assets/img/shakshukha.jpeg" />
            </div>
            <div class="cart__item-title">Шакшука</div>
            <div class="cart__item-price">219 грн</div>
            <div class="cart__item-count">
              <button>-</button>
              <div>2</div>
              <button>+</button>
            </div>
          </div>
          <div class="cart__item">
            <div class="cart__item-img">
              <img src="@/assets/img/shakshukha.jpeg" />
            </div>
            <div class="cart__item-title">Шакшука</div>
            <div class="cart__item-price">219 грн</div>
            <div class="cart__item-count">
              <button>-</button>
              <div>2</div>
              <button>+</button>
            </div>
          </div>
        </div>

        <div class="cart__summary">
          <div class="cart__summary-title">Разом замовлення:</div>
          <div class="cart__summary-price">576 грн</div>
        </div>
      </div>
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpages/MainMasterPage";
import { mapState, mapActions } from "pinia";
import { useCartStore } from "@/store/modules/cart";

export default {
  name: "CartView",
  components: {
    MainMasterPage,
  },
  computed: {
    ...mapState(useCartStore, ["getLoadedCart"]),
  },
  methods: {
    ...mapActions(useCartStore, ["loadList"]),
  },
  mounted() {
    this.loadList();
  },
};
</script>

<style lang="scss" scoped>
.container {
}
.cart {
  &__body {
    background: #f2f0ee;
    font-size: 24px;
    padding: 48px 112px;
  }

  &__reset {
    margin: 24px 0 0 0;
  }
  &__container {
    margin: 24px 0 0 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-radius: 4px;
    box-shadow: 8px 8px 16px 0px rgba(0, 0, 0, 0.22),
      4px 4px 8px 0px rgba(0, 0, 0, 0.12);
    background: rgb(255, 255, 255);

    padding: 16px;

    &-img {
      width: 100px;
      img {
        width: 100%;
      }
    }

    &-title {
    }

    &-price {
    }

    &-count {
      display: flex;
      align-items: center;
      gap: 10px;
      button {
        width: 40px;
        height: 40px;
        padding: 0;

        font-size: 32px;
      }
    }
  }

  &__summary {
    margin: 24px 0 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-title {
    }

    &-price {
    }
  }
}
</style>
