<template>
  <div class="button-component">
    <button :class="['button-component__button', isActive ? 'button-component__button--active' : '']">
      {{ text }}
    </button>
  </div>
</template>

<script>
  export default {
    name: 'WButton',
    props: {
      isActive: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
        default: 'Submit',
      },
    },
  };
</script>

<style lang="scss">
.button-component {
  font-size: 18px;
  @extend %roboto-500;

  &__button {
    padding: 8px 12px;
    padding-top: 12px;
    text-transform: uppercase;
    border: none;
    background-color: #fff;
    color: rgb(136, 136, 136);
    border-bottom: 4px solid #fff;

    &--active {
      color: rgb(39, 39, 39);
      border-bottom: 4px solid rgb(153, 243, 255);
      background-color: rgb(236, 236, 236);
    }
  }
}
</style>
