<template>
  <main-master-page>
    <div class="hero">
      <div class="container">
        <div class="hero__body">
          <h1 class="hero__title">Energy <span>Balance</span></h1>
          <div class="hero__text">
            Ваш шлях до гармонії та енергії: наш секрет смачного та
            збалансованого життя через сервіс здорового харчування.
          </div>
          <div class="hero__buttons">
            <button @click="$router.push({ name: 'menu' })">Меню</button>
            <button><a href="#programs">Обрати програму</a></button>
          </div>
        </div>
      </div>
    </div>

    <div class="about">
      <div class="about__body">
        <h2 class="about__title">
          <span>Про</span> <span>Energy</span> <span>Balance</span>
        </h2>
        <div class="about__text">
          Ваш провідник у світі збалансованого харчування. Смачні страви,
          персоналізовані плани та здоровий спосіб життя – все в одному сервісі
          для вашого енергійного та здорового життя!
        </div>
      </div>
    </div>

    <div class="advantages">
      <div class="container">
        <div class="advantages__body">
          <div class="advantages__about">
            <h2 class="advantages__title">Наші переваги</h2>
            <div class="advantages__text">
              Збалансовані плани харчування, індивідуалізовані рішення та
              непередбачувані смакові враження – наші переваги для вашого
              благополуччя та насолоди!
            </div>
          </div>
          <div class="advantages__cards">
            <div class="advantages__card">
              <div class="advantages__card-img">
                <img src="@/assets/icons/plans.svg" />
              </div>
              <div class="advantages__card-title">
                Персоналізовані плани харчування
              </div>
              <div class="advantages__card-about">
                Індивідуально адаптовані плани харчування відповідно до ваc.
              </div>
            </div>

            <div class="advantages__card">
              <div class="advantages__card-img">
                <img src="@/assets/icons/food.svg" />
              </div>
              <div class="advantages__card-title">
                Широкий вибір смачних страв
              </div>
              <div class="advantages__card-about">
                Різноманіття смачних та збалансованих страв для всіх.
              </div>
            </div>

            <div class="advantages__card">
              <div class="advantages__card-img">
                <img src="@/assets/icons/time.svg" />
              </div>
              <div class="advantages__card-title">Збереження часу</div>
              <div class="advantages__card-about">
                Економія часу на приготуванні та плануванні їжі.
              </div>
            </div>

            <div class="advantages__card">
              <div class="advantages__card-img">
                <img src="@/assets/icons/delivery.svg" />
              </div>
              <div class="advantages__card-title">
                Доставка за зручний графік
              </div>
              <div class="advantages__card-about">
                Гнучкий графік доставки, щоб відповідати вашому розкладу.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <programs-block />
    <energy-calc />

    <div class="faq">
      <div class="container">
        <div class="faq__body">
          <h2 class="faq__title">Запитайте у нас що-небудь</h2>
          <div class="faq__questions">
            <o-collapse
              v-for="(collapse, index) of collapses"
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
                  <p class="card-header-title">
                    {{ collapse.title }}
                  </p>
                  <a class="card-header-icon"
                    ><img
                      :class="{ open: position == index && isOpen === true }"
                      src="@/assets/icons/arrow.svg"
                  /></a>
                </div>
              </template>
              <div class="card-content">
                <div class="content" v-html="collapse.text" />
              </div>
            </o-collapse>
          </div>
        </div>
      </div>
    </div>

    <div class="discount">
      <div class="container">
        <div class="discount__body">
          <div class="discount__label">
            <div class="discount__label-size">-20%</div>
            <div class="discount__label-title">Energy <span>Balance</span></div>
          </div>
          <div class="discount__info">
            <div class="discount__title">Даруємо знижку 20%</div>
            <div class="discount__about">
              На пробний триденний раціон з будь-якого меню
            </div>
            <div class="discount__inputs">
              <input type="text" placeholder="Ваше ім’я" class="main-input" />
              <input type="text" placeholder="+ 38 (" class="main-input" />
            </div>
            <button class="discount__button">Замовити зі знижкою</button>
          </div>
        </div>
      </div>
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpages/MainMasterPage.vue";
import EnergyCalc from "@/components/EnergyCalc.vue";
import ProgramsBlock from "@/components/ProgramsBlock";
import collapses from "@/constants/collapses";

export default {
  name: "HomeView",
  components: { MainMasterPage, EnergyCalc, ProgramsBlock },
  data() {
    return {
      position: null,
      isOpen: false,
      collapses: collapses,
    };
  },
};
</script>

<style lang="scss" scoped>
.hero {
  &__body {
    background: url("@/assets/backgrounds/avocado.jpeg") right/auto 100%
        no-repeat,
      rgb(239, 119, 42);
    padding: 239px 112px;
  }
  &__title {
    span {
      font-style: italic;
    }
  }
  &__text {
    color: rgba(255, 255, 255, 0.8);
    max-width: 435px;
    margin: 16px 0 0 0;
  }
  &__buttons {
    display: flex;
    gap: 16px;
    margin: 32px 0 0 0;
    :first-child {
      border: 1px solid white;
      color: rgba(255, 255, 255, 0.8);
    }
    :last-child {
      background-color: white;
      color: rgb(239, 119, 42);
    }
  }
}
.about {
  &__body {
    text-align: center;
    padding: 80px 0;
  }

  &__title {
    :nth-child(2) {
      color: rgb(239, 119, 42);
    }
    :nth-child(3) {
      color: rgb(239, 119, 42);
      font-style: italic;
    }
  }

  &__text {
    margin: 0 auto;
    margin-top: 16px;
    max-width: 600px;
  }
}
.advantages {
  &__body {
    background: url("@/assets/backgrounds/advantages.svg") no-repeat,
      rgb(242, 240, 238);
    padding: 48px 112px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  &__about {
    margin: 16px 0 0 0;
    max-width: 490px;
  }

  &__title {
  }

  &__text {
  }

  &__cards {
    max-width: 600px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  &__card {
    border-radius: 8px;
    box-shadow: 8px 8px 16px 0px rgba(0, 0, 0, 0.22),
      4px 4px 8px 0px rgba(0, 0, 0, 0.12);
    background-color: white;
    width: 280px;
    padding: 16px;
    &-img {
      border-bottom: 1px solid rgb(136, 136, 136);
      img {
        display: block;
        margin: 0 auto;
        padding: 8px 0;
      }
    }

    &-title {
      color: rgb(16, 16, 16);
      font-weight: bold;
      margin: 8px 0 0 0;
    }

    &-about {
      margin: 8px 0 0 0;
    }
  }
}
.programs {
  padding: 80px 0 72px 0;
}
.faq {
  &__body {
    padding: 80px 0;
  }

  &__title {
    text-align: center;
  }

  &__questions {
    margin: 0 auto;
    margin-top: 32px;
    max-width: 800px;
  }
  .card {
    background-color: #fff;
    border-bottom: 1px solid rgb(136, 136, 136);
    max-width: 100%;
    position: relative;
  }

  .card-header {
    background-color: transparent;
    align-items: stretch;
    display: flex;
  }

  .card-header-title {
    font-size: 20px;
    font-weight: 700;
    color: rgb(16, 16, 16);

    align-items: center;
    display: flex;
    flex-grow: 1;
    padding: 0.75rem;
    margin: 0;
  }

  .card-header-icon {
    align-items: center;
    cursor: pointer;
    display: flex;
    padding: 0.75rem;
    justify-content: center;
  }

  .card-content {
    padding: 1.5rem;
    background-color: transparent;
  }
  .open {
    transform: rotate(180deg);
  }
}
.discount {
  &__body {
    background: url("@/assets/img/qiwi.png") 330px no-repeat,
      linear-gradient(
        90deg,
        rgb(216, 180, 31),
        rgb(216, 179, 32) 22.727%,
        rgb(232, 203, 73) 56.79%,
        rgb(232, 203, 73) 100%
      );
    padding: 56px 320px 31px 192px;
    display: flex;
    justify-content: space-between;
  }

  &__info {
    padding: 0 0 25px 0;
  }
  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 280px;
    margin: 16px 0 0 0;
  }

  &__title {
    font-family: "Raleway", sans-serif;
    color: rgb(16, 16, 16);
  }

  &__about {
    margin: 8px 0 0 0;
    max-width: 280px;
  }
  &__button {
    width: 100%;
    margin: 40px 0 0 0;
  }
  &__label {
    align-self: flex-end;
    &-title {
      color: rgb(255, 255, 255);
      font-family: "Raleway", sans-serif;
      font-size: 41.89px;
      font-weight: 300;
      line-height: 50.27px;
      letter-spacing: 0%;
      text-align: left;
      span {
        font-style: italic;
        font-weight: 300;
      }
    }
    &-size {
      color: rgb(255, 255, 255);
      font-family: "Raleway", sans-serif;
      font-size: 78.18px;
      line-height: 87.96px;
      text-align: center;
    }
  }
}
</style>
