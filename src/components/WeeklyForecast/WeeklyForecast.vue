<template>
  <div class="weekly-forecast">
    <img :src="getWeatherIcon()" />
    Avg temp:
    <p>{{ averageTemperature }} </p>
    <p>{{ weather }}</p>
    <p>{{ date }}</p>
  </div>
</template>

<script>
  export default {
    name: 'WeeklyForecast',
    props: {
      averageTemperature: {
        type: String,
        default: '21 c',
      },
      date: {
        type: String,
        default: '2022-05-15',
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

<style lang="scss" scoped>
  .weekly-forecast {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 120px;
  }

</style>
