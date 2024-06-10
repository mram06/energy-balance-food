<template>
  <div class="carousel">
    <button
      @click="onSlide('prev')"
      class="carousel__button carousel__button-left"
    >
      <img src="@/assets/icons/arrow.svg" />
    </button>
    <swiper-container
      slides-per-view="1"
      :pagination="{
        clickable: true,
      }"
      loop
      ref="swiper"
      space-between="50"
      :style="[
        {
          '--swiper-pagination-color': '#EF772A',
        },
      ]"
    >
      <swiper-slide v-for="(carousel, index) in carousels" :key="index">
        <div class="slide">
          <div class="slide__row">
            <div class="slide__img"><img :src="carousel.imgSrc" /></div>
            <div class="slide__about">
              <div class="slide__about-title">{{ carousel.title }}</div>
              <div class="slide__about-text">{{ carousel.text }}</div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>

    <button
      @click="onSlide('next')"
      class="carousel__button carousel__button-right"
    >
      <img src="@/assets/icons/arrow.svg" />
    </button>
  </div>
</template>

<script>
import carousel from "@/constants/carousel";

export default {
  name: "CarouselBlock",
  data() {
    return {
      carousels: carousel,
    };
  },
  methods: {
    onSlide(direction) {
      direction === "prev"
        ? this.$refs.swiper.swiper.slidePrev()
        : this.$refs.swiper.swiper.slideNext();
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  margin: 0 auto;
  margin-top: 80px;
  display: grid;
  align-items: center;
  grid-template-columns: 64px minmax(100px, 1008px) 64px;
  gap: 40px;
  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;

    padding: 0;
    border-radius: 32px;
    width: 64px;
    height: 64px;
    img {
      width: 24px;
    }

    &-left {
      transform: rotate(90deg);
    }
    &-right {
      transform: rotate(-90deg);
    }
  }
}
.slide {
  border-radius: 8px;
  padding: 16px 16px 40px 16px;

  background-color: white;
  &__row {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  &__img {
    border-radius: 4px;
    height: 480px;
    img {
      height: 100%;
    }
  }

  &__about {
    &-title {
      color: rgb(16, 16, 16);
      font-size: 24px;
      font-weight: 700;
    }

    &-text {
      margin: 8px 0 0 0;
    }
  }
}

@media only screen and (max-width: 900px) {
  .slide {
    border-radius: 8px;
    padding: 16px 16px 40px 16px;

    background-color: white;
    &__row {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
    }
    &__about {
      height: 220px;
    }
    &__img {
      width: 100%;
      height: 500px;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
@media only screen and (max-width: 660px) {
  .carousel {
    display: block;

    &__button {
      display: none;
    }
  }
}
@media only screen and (max-width: 490px) {
  .slide {
    &__img {
      width: 100%;
      height: 400px;
    }
    &__about {
      height: 300px;
    }
  }
}
</style>
