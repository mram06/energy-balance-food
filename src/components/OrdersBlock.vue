<template>
  <div class="orders">
    <div class="orders__body">
      <div class="orders__order">
        <o-collapse
          v-for="(order, index) in getLoadedOrders"
          :key="index"
          class="card"
          animation="slide"
          :open="position == index"
          @open="
            position = index;
            isOpen = true;
          "
          @close="isOpen = false"
        >
          <template #trigger>
            <div class="card-header" role="button">
              <div class="card-header-row">
                <div class="card-header-label"></div>
                <div class="card-header-title">
                  Замовлення № {{ order.date.seconds }},
                  {{ new Date(order.date.seconds * 1000).toLocaleString() }}
                </div>
                <div class="card-header-summary">{{ order.summary }} грн</div>
              </div>
              <a class="card-header-icon">
                <img
                  :class="{ open: position == index && isOpen === true }"
                  src="@/assets/icons/arrow.svg"
                />
              </a>
            </div>
          </template>
          <div class="card-content">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="orders__item"
            >
              <div class="orders__item-img">
                <img :src="item.imgSrc" />
              </div>
              <div class="orders__item-title">{{ item.title }}</div>
              <div class="orders__item-count">{{ item.count }} шт.</div>
              <div class="orders__item-price">{{ item.price }} грн</div>
            </div>
          </div>
        </o-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useOrdersStore } from "@/store/modules/orders";
import { useItemsStore } from "@/store/modules/items";
export default {
  name: "OrdersBlock",
  data() {
    return {
      position: null,
      isOpen: false,
    };
  },
  computed: {
    ...mapState(useOrdersStore, ["getLoadedOrders"]),
  },
  methods: {
    ...mapActions(useItemsStore, ["loadList"]),
    ...mapActions(useOrdersStore, ["loadUserCart"]),
  },
  mounted() {
    this.loadList();
    this.loadUserCart();
  },
};
</script>

<style lang="scss" scoped>
.orders {
  &__body {
    padding: 80px 0;
  }

  &__title {
    text-align: center;
  }

  &__order {
    display: flex;
    flex-direction: column-reverse;

    margin: 0 auto;
    margin-top: 32px;
    max-width: 800px;
  }
  .card {
    border-bottom: 1px solid rgb(136, 136, 136);
    max-width: 100%;
    position: relative;
  }

  .card-header {
    padding: 8px 16px;
    background-color: transparent;
    align-items: stretch;
    display: flex;
  }

  .card-header-row {
    font-size: 16px;
    font-weight: 700;
    color: rgb(16, 16, 16);

    align-items: center;
    display: grid;
    grid-template-columns: 8px 1fr 1fr;
    gap: 32px;
    flex-grow: 1;
    padding: 0.75rem;
    margin: 0;
    .card-header-label {
      height: 24px;
      border-radius: 5px;
      background: rgb(18, 161, 76);
    }
    .card-header-title {
    }
    .card-header-summary {
      width: 100px;
      justify-self: end;
    }
  }

  .card-header-icon {
    align-items: center;
    cursor: pointer;
    display: flex;
    padding: 0.75rem;
    justify-content: center;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px 56px;
    background-color: transparent;
  }
  .open {
    transform: rotate(180deg);
  }
  &_item-img {
  }

  &__item {
    font-weight: 700;

    display: grid;
    align-items: center;
    gap: 16px;
    grid-template-columns: 92px 1fr 50px 1fr;
    &-img {
      img {
        width: 100%;
      }
    }
    &-title {
    }

    &-count {
      justify-self: end;
    }

    &-price {
      width: 110px;
      justify-self: end;
    }
  }
}
</style>
