<template>
  <div class="programs" id="programs">
    <div class="container">
      <div class="programs__body">
        <h2 class="programs__title">Програми харчування</h2>
        <div class="programs__about">
          Оптимізовані плани харчування від Energy Balance. Відкрийте для себе
          вишуканість смаку, збалансованість і ефективність для вашого здоров'я!
        </div>
        <div class="programs__row">
          <div class="programs__card">
            <div class="programs__card-img">
              <img src="@/assets/img/avocado.jpeg" />
            </div>
            <div class="programs__card-title">Slim</div>
            <div class="programs__card-energy">1200, 1400, 1600 ккал</div>
            <div class="programs__card-about">
              Збалансована програма харчування, яка спрямована на тих, хто хоче
              схуднути, а також підтримувати досягнутий результат.
            </div>
            <div class="programs__card-price">від 650 грн на день</div>
            <button>Замовити харчування</button>
          </div>

          <div class="programs__card">
            <div class="programs__card-img">
              <img src="@/assets/img/pancake.jpeg" />
            </div>
            <div class="programs__card-title">Balance</div>
            <div class="programs__card-energy">1800, 2000, 2200 ккал</div>
            <div class="programs__card-about">
              Повноцінне 5-ти разове харчування, яке ідеально підійде тим, хто
              хоче харчуватися смачно і корисно щодня.
            </div>
            <div class="programs__card-price">від 700 грн на день</div>
            <button>Замовити харчування</button>
          </div>

          <div class="programs__card">
            <div class="programs__card-img">
              <img src="@/assets/img/oatmeal.jpeg" />
            </div>
            <div class="programs__card-title">Muscle</div>
            <div class="programs__card-energy">2400, 2600 ккал</div>
            <div class="programs__card-about">
              Раціон підходить людям з високою фізичною активністю або великою
              кількістю тренувань на тиждень
            </div>
            <div class="programs__card-price">від 750 грн на день</div>
            <button>Замовити харчування</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgramsBlock",
};
</script>

<style lang="scss" scoped>
.programs {
  &__body {
    padding: 0 104px;
  }

  &__title {
    text-align: center;
  }

  &__about {
    margin: 0 auto;
    margin-top: 16px;
    text-align: center;
    max-width: 590px;
  }

  &__row {
    padding: 4px;
    margin: 32px 0 0 0;
    display: flex;
    gap: 14px;
    justify-content: space-between;
  }

  &__card {
    background-color: white;
    border: 4px solid transparent;
    border-radius: 4px;
    box-shadow: 8px 8px 16px 0px rgba(0, 0, 0, 0.22),
      4px 4px 8px 0px rgba(0, 0, 0, 0.12);

    width: 384px;
    padding: 16px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    &:hover {
      border: 4px solid #ef772a;
    }

    &-img {
    }
    &-title {
      font-size: 24px;
      font-weight: bold;
      color: rgb(16, 16, 16);
    }
    &-energy {
    }
    &-about {
    }
    &-price {
    }
    button {
      width: 221px;
    }
  }
}

@media only screen and (max-width: 1400px) {
  .programs__row {
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
@media only screen and (max-width: 900px) {
  .programs {
    &__body {
      padding-left: 0px;
      padding-right: 0px;
    }
    &__about {
      padding: 0 20px;
    }
  }
}
@media only screen and (max-width: 420px) {
  .programs {
    &__card {
      width: 100%;
      &-img {
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
