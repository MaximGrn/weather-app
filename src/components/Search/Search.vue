<template>
  <div class="search-component">
    <WInput
      class="search-component__input"
      :inputText="searchQuery"
      @onInputChange="inputHandler"
      @keydown.down.native="upDownHandler(1)"
      @keydown.up.native="upDownHandler(-1)"
      @keyup.enter.native="enterHandler"
      @keyup.esc.native="clearSuggestions"
    >
      <div class="search-component__search-btn">
        <svg
          style="width: 24px; height: 24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="inherit"
            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,
            14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,
            16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,
            3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,
            12 14,9.5C14,7 12,5 9.5,5Z"
          ></path>
        </svg>
      </div>
    </WInput>
    <div
      v-show="suggestions.length"
      class="search-component__suggestions"
    >
      <div
        v-for="(suggestion, index) in suggestions"
        :key="index"
        ref="sugg"
        class="search-component__suggestion"
        :class="[activeSuggestedIndex === index ? 'search-component__suggestion--active' : '']"
        @click="suggestionClickHandler(suggestion.formatted, suggestion)"
      >
        {{ suggestion.formatted }}
      </div>
    </div>
  </div>
</template>

<script>
  import WInput from 'Components/Input/Input.vue';
  import { mapActions, mapGetters } from 'vuex';
  import debounce from 'debounce';

  const debouncedSearch = debounce(function (query) {
    const { getCitiesSuggestions } = this;

    getCitiesSuggestions({ query });
  }, 1500);

  export default {
    name: 'Search',
    components: {
      WInput,
    },
    data() {
      return {
        searchQuery: '',
        activeSuggestedIndex: -1,
      };
    },
    computed: {
      ...mapGetters('Search', ['suggestions']),
    },
    methods: {
      ...mapActions('Search', ['getCitiesSuggestions', 'clearSuggestions']),

      inputHandler(query) {
        this.searchQuery = query;
        debouncedSearch.call(this, query);
      },

      upDownHandler(v) {
        if (!this.suggestions.length) {
          return;
        }
        const isMaxLength = v === 1 && this.activeSuggestedIndex === this.suggestions.length - 1;
        const isMinLength = v === -1 && (this.activeSuggestedIndex === 0 || this.activeSuggestedIndex === -1);

        if (isMaxLength) {
          this.activeSuggestedIndex = 0;
          this.fixScrolling(this.activeSuggestedIndex);

          return;
        }

        if (isMinLength) {
          this.activeSuggestedIndex = this.suggestions.length - 1;
          this.fixScrolling(this.activeSuggestedIndex);

          return;
        }

        this.activeSuggestedIndex += v;
        this.fixScrolling(this.activeSuggestedIndex);
      },

      fixScrolling(index) {
        this.$refs.sugg[index].scrollIntoView();
      },

      enterHandler() {
        const { lat, lon, city, country } = this.suggestions[this.activeSuggestedIndex];

        this.searchQuery = this.suggestions.find((e) => e === this.suggestions[this.activeSuggestedIndex]).formatted;
        this.$refs.sugg[0].scrollIntoView();

        this.clearSuggestions();

        this.$emit('onSelect', { lat, lon, city, country });
        this.activeSuggestedIndex = -1;
      },

      suggestionClickHandler(suggestedCity, suggestion) {
        const { lat, lon, city, country } = suggestion;

        this.searchQuery = suggestedCity;
        this.clearSuggestions();
        this.$emit('onSelect', { lat, lon, city, country });

        this.activeSuggestedIndex = -1;
      },
    },
  };
</script>

<style lang="scss">
.search-component {
  max-width: 320px;
  position: relative;

  &__input {
    margin-bottom: 12px;
  }

  &__suggestions {
    height: 216px;
    padding-top: 12px;
    position: absolute;
    overflow-x: hidden;
    overflow-y: scroll;
    top: 40px;
    z-index: 1;
    width: 100%;
    background-color: #fff;
    border: 1px solid rgb(124, 124, 124);
    border-top: none;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #555;
    }
  }

  &__suggestion {
    height: 34px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    font-size: 18px;
    padding: 4px 12px;

    &--active {
      background-color: #ccc;
    }

    &:hover {
      background-color: #ccc;
    }
  }

  &__search-btn {
    position: absolute;
    top: 10px;
    right: 0;
    display: flex;
    cursor: pointer;

    svg {
      fill: rgb(136, 136, 136);
    }
  }
}
</style>
