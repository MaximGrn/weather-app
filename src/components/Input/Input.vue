<template>
  <div class="input-component">
    <input
      v-model.trim="text"
      class="input-component__input"
      type="text"
      :placeholder="placeholder"
      @keydown.up.prevent
      @keydown.down.prevent
      @input="inputHandler"
    />
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'WInput',
    props: {
      placeholder: {
        type: String,
        default: 'Search...',
      },
      inputText: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        text: this.inputText,
      };
    },
    methods: {
      inputHandler() {
        if (this.text === '' || this.text.length < 3) {
          return;
        }
        this.$emit('onInputChange', this.text);
      },
    },
    watch: {
      inputText: {
        handler(text) {
          this.text = text;
        },
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
