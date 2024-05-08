<template>
  <div class="loading-container">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
      <path
        fill="#1b364b"
        d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "LoadingPage",
};
</script>

<style lang="scss" scoped>
.loading-container {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    width: 100px;
    height: 100px;
    animation: spin 2s linear infinite;
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg); /* Початковий оберт на 0 градусів */
  }
  to {
    transform: rotate(360deg); /* Оберт на 360 градусів (повний оберт) */
  }
}
</style>
