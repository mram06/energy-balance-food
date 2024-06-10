<template>
  <main-master-page>
    <div class="forwho">
      <div class="container">
        <div class="forwho__body">
          <div class="forwho__row">
            <h2 class="forwho__row-title">
              Для кого <span>Energy</span> <span>Balance</span>
            </h2>
            <div class="forwho__row-text">
              Ласкаво просимо до Energy Balance - вашого ідеального партнера у
              світі здорового харчування та активного способу життя! Наш сервіс
              розроблено з урахуванням потреб кожного. Незалежно від ваших цілей
              та побажань, ми пропонуємо три основні програми та різноманітні
              варіанти, щоб кожен міг знайти щось відповідне саме для себе.
            </div>
          </div>
          <carousel-block />
        </div>
      </div>
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpages/MainMasterPage";
import CarouselBlock from "@/components/CarouselBlock";

export default {
  name: "ForWhomView",
  components: {
    MainMasterPage,
    CarouselBlock,
  },
};
</script>

<style lang="scss" scoped>
.forwho {
  &__body {
    padding: 48px 112px;
    background: #efc74a;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    gap: 32px;
    &-title {
      flex-grow: 1;
      span {
        color: white;
      }
      :last-child {
        font-style: italic;
      }
    }

    &-text {
      max-width: 592px;
    }
  }
}
@media only screen and (max-width: 1160px) {
  .forwho {
    &__body {
      padding: 48px 20px;
    }

    &__row {
      &-title {
      }

      &-text {
        max-width: 400px;
      }
    }
  }
}
@media only screen and (max-width: 900px) {
  .forwho {
    &__body {
    }
    &__row {
      flex-direction: column;
      align-items: center;
      &-title {
        text-align: center;
      }
      &-text {
        text-align: center;
        max-width: 592px;
      }
    }
  }
}
</style>
