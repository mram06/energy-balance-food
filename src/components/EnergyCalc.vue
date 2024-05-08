<template>
  <div class="calc">
    <div class="container">
      <div class="calc__body">
        <div class="calc__row">
          <div>
            <h2>Розрахуйте вашу норму калорій на день</h2>
            <div class="calc__display">
              <div class="calc__display-title">Ваш денний раціон складає:</div>
              <div class="calc__display-energy">{{ result }} ккал</div>
              <button @click="onPreviewMenu" class="calc__display-button">
                Переглянути меню
              </button>
            </div>
          </div>
          <div>
            <div class="calc__params">
              <div>
                <div class="calc__params-title">Оберіть стать</div>
                <div class="calc__params-row">
                  <div class="calc__params-column">
                    <div
                      @click="gender = 'male'"
                      :class="[
                        'calc__params-icon',
                        {
                          selected: gender === 'male',
                        },
                      ]"
                    >
                      <img src="@/assets/icons/male.svg" />
                    </div>
                    <div class="calc__params-icontitle">Чоловіча</div>
                  </div>
                  <div class="calc__params-column">
                    <div
                      @click="gender = 'female'"
                      :class="[
                        'calc__params-icon',
                        {
                          selected: gender === 'female',
                        },
                      ]"
                    >
                      <img src="@/assets/icons/female.svg" />
                    </div>
                    <div class="calc__params-icontitle">Жіноча</div>
                  </div>
                </div>
              </div>

              <div>
                <div class="calc__params-title">Рівень активності</div>
                <div class="calc__params-row">
                  <div class="calc__params-column">
                    <div
                      @click="activity = 1"
                      :class="[
                        'calc__params-icon',
                        {
                          selected: activity === 1,
                        },
                      ]"
                    >
                      1
                    </div>
                    <div class="calc__params-icontitle">Мінімальна</div>
                  </div>
                  <div class="calc__params-column">
                    <div
                      @click="activity = 2"
                      :class="[
                        'calc__params-icon',
                        {
                          selected: activity === 2,
                        },
                      ]"
                    >
                      2
                    </div>
                    <div class="calc__params-icontitle">Слабка</div>
                  </div>
                  <div class="calc__params-column">
                    <div
                      @click="activity = 3"
                      :class="[
                        'calc__params-icon',
                        {
                          selected: activity === 3,
                        },
                      ]"
                    >
                      3
                    </div>
                    <div class="calc__params-icontitle">Середня</div>
                  </div>
                  <div class="calc__params-column">
                    <div
                      @click="activity = 4"
                      :class="[
                        'calc__params-icon',
                        {
                          selected: activity === 4,
                        },
                      ]"
                    >
                      4
                    </div>
                    <div class="calc__params-icontitle">Висока</div>
                  </div>
                  <div class="calc__params-column">
                    <div
                      @click="activity = 5"
                      :class="[
                        'calc__params-icon',
                        {
                          selected: activity === 5,
                        },
                      ]"
                    >
                      5
                    </div>
                    <div class="calc__params-icontitle">Дуже висока</div>
                  </div>
                </div>
              </div>

              <div>
                <div class="calc__params-title">Мета</div>
                <div class="calc__params-row">
                  <div class="calc__params-column">
                    <div
                      @click="target = 'weightLoss'"
                      :class="[
                        'calc__params-icon',
                        {
                          selected: target === 'weightLoss',
                        },
                      ]"
                    >
                      <img src="@/assets/icons/weight_loss.svg" />
                    </div>
                    <div class="calc__params-icontitle">Зниження ваги</div>
                  </div>
                  <div class="calc__params-column">
                    <div
                      @click="target = 'save'"
                      :class="[
                        'calc__params-icon',
                        {
                          selected: target === 'save',
                        },
                      ]"
                    >
                      <img src="@/assets/icons/save_weight.svg" />
                    </div>
                    <div class="calc__params-icontitle">Збереження ваги</div>
                  </div>
                  <div class="calc__params-column">
                    <div
                      @click="target = 'gaining'"
                      :class="[
                        'calc__params-icon',
                        {
                          selected: target === 'gaining',
                        },
                      ]"
                    >
                      <img src="@/assets/icons/gaining_weight.svg" />
                    </div>
                    <div class="calc__params-icontitle">Набір ваги</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="calc__inputs-row">
            <div class="calc__input">
              <div class="calc__input-title">Ваша вага</div>
              <div class="calc__input-body">
                <input v-model="weight" type="number" />
                <div class="calc__input-label">кг</div>
              </div>
            </div>

            <div class="calc__input">
              <div class="calc__input-title">Ваш зріст</div>
              <div class="calc__input-body">
                <input v-model="height" type="number" />
                <div class="calc__input-label">см</div>
              </div>
            </div>

            <div class="calc__input">
              <div class="calc__input-title">Ваш вік</div>
              <div class="calc__input-body">
                <input v-model="age" type="number" />
                <div class="calc__input-label">роки</div>
              </div>
            </div>
            <button @click="onCalculate">Розрахувати калорії</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EnergyCalc",
  data() {
    return {
      weight: 68,
      height: 170,
      age: 32,
      gender: "female",
      activity: 3,
      target: "save",
      result: 2203,
    };
  },
  methods: {
    onCalculate() {
      let res;
      let activityCoeff;
      let targetEnergy = 0;
      switch (this.target) {
        case "weightLoss":
          targetEnergy = -300;
          break;
        case "save":
          targetEnergy = 0;
          break;
        case "gaining":
          targetEnergy = 300;
          break;
        default:
          break;
      }
      switch (this.activity) {
        case 1:
          activityCoeff = 1.2;
          break;
        case 2:
          activityCoeff = 1.375;
          break;
        case 3:
          activityCoeff = 1.55;
          break;
        case 4:
          activityCoeff = 1.725;
          break;
        case 5:
          activityCoeff = 1.9;
          break;
        default:
          break;
      }
      if (this.gender === "male")
        res =
          (this.weight * 10 + this.height * 6.25 - this.age * 5 + 5) *
            activityCoeff +
          targetEnergy;
      else
        res =
          (this.weight * 10 + this.height * 6.25 - this.age * 5 - 161) *
            activityCoeff +
          targetEnergy;
      this.result = parseInt(res);
    },
    onPreviewMenu() {
      this.$router.push({ name: "menu" });
    },
  },
};
</script>

<style lang="scss" scoped>
.calc {
  &__body {
    background: rgb(242, 240, 238);
    padding: 48px 112px;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    :first-child {
      max-width: 490px;
    }
  }

  &__display {
    padding: 34px;
    margin: 32px 0 0 0;
    border-radius: 8px;

    background: rgb(239, 119, 42);
    text-align: center;
    color: rgb(255, 255, 255);
    font-weight: 700;
    &-title {
    }

    &-energy {
      font-size: 32px;
      margin: 8px 0 0 0;
    }

    &-button {
      margin: 32px 0 0 0;
      background: rgb(255, 255, 255);
      color: rgb(239, 119, 42);
    }
  }

  &__params {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &-title {
      font-weight: 700;
    }
    &-row {
      margin: 8px 0 0 0;
      display: flex;
      gap: 16px;
    }
    &-column {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    &-icon {
      cursor: pointer;
      border-radius: 24px;
      border: 1px solid transparent;
      box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.22),
        2px 2px 4px 0px rgba(0, 0, 0, 0.12);
      background: rgb(255, 255, 255);

      display: flex;
      justify-content: center;
      align-items: center;

      font-weight: 700;
      font-size: 16px;
      color: rgb(16, 16, 16);

      width: 48px;
      height: 48px;
      padding: 8px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    &-icontitle {
      max-width: 100%;
      text-align: center;
      font-weight: 400;
      font-size: 10px;
      line-height: 14px;
    }
  }
  &__inputs-row {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__input {
    &-title {
      font-weight: 700;
    }

    &-body {
      margin: 8px 0 0 0;
      padding: 0 16px 0 0;
      max-width: 228px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      border-radius: 20px;
      box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.22),
        2px 2px 4px 0px rgba(0, 0, 0, 0.12);
      background: rgb(255, 255, 255);

      input {
        width: 100%;
        padding: 8px 0 8px 16px;
        background: none;
        font-size: 16px;
        font-weight: 700;

        box-shadow: none;
      }
    }

    &-label {
      color: rgb(136, 136, 136);
      font-weight: 400;
    }
  }
}
.selected {
  border: 1px solid rgb(239, 119, 42);
}
</style>
