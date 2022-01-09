<template>
  <div class="daily-forecast">
    <img :src="getWeatherIcon()" />
    <p class="daily-forecast__temperature">
      {{ temperature }} ℃
    </p>
    <p class="daily-forecast__weather">
      {{ weather }}
    </p>
  </div>
</template>

<script>
  export default {
    name: 'DailyForecast',
    props: {
      temperature: {
        type: Number,
        default: 20,
      },
      weather: {
        type: String,
        default: 'Clear',
      },
      icon: {
        type: String,
        default: '04d',
      },
    },
    methods: {
      getWeatherIcon() {
        return `http://openweathermap.org/img/wn/${this.icon}@2x.png`;
      },
    },
  };
</script>

<style lang="scss">
  .daily-forecast {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__temperature {
      font-size: 24px;
    }

    &__weather {
      font-size: 24px;
    }

  }

</style>
