<template>
  <div class="input-component">
    <input
      class="input-component__input"
      type="text"
      :placeholder="placeholder"
      :value="value"
      v-bind="$attrs"
      @keydown.up.prevent
      @keydown.down.prevent
      v-on="listeners"
    />
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'WInput',
    inheritAttrs: false,
    props: {
      placeholder: {
        type: String,
        default: 'Search...',
      },
      value: {
        type: String,
        default: '',
      },
    },
    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: this.inputHandler,
        };
      },
    },
    methods: {
      inputHandler(e) {
        this.$emit('input', e.target.value);
      },
    },
  };
</script>

<style lang="scss" scoped>
.input-component {
  position: relative;
  width: 300px;
  height: 40px;

  &__input {
    width: 100%;
    height: 100%;
    padding: 4px 12px;
    padding-right: 26px;
    font-size: 18px;
    border: none;
    outline: none;
    border-bottom: 2px solid rgb(124, 124, 124);
  }
}
</style>
