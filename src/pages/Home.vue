<template>
  <div class="home-page">
    <div class="home-page__wrapper">
      <Search @onSelect="selectHandler" />
      <div class="home-page__body">
        <div class="home-page__controls">
          <WButton
            class="home-page__control"
            text="current"
            :isActive="isDailyActive"
            @click.native="setActiveForecast('DailyForecast')"
          />
          <WButton
            class="home-page__control"
            text="7 day forecast"
            :isActive="!isDailyActive"
            @click.native="setActiveForecast('WeeklyForecast')"
          />
        </div>
        <div class="home-page__forecasts">
          <div class="home-page__forecasts-location">
            <p class="home-page__forecast-city">
              {{ city }}
            </p>
            <p class="home-page__forecast-country">
              {{ country }}
            </p>
          </div>
          <div
            v-show="isDailyActive"
            class="home-page__active-forecast"
          >
            <DailyForecast
              v-if="dailyForecast.icon"
              :icon="dailyForecast.icon"
              :weather="dailyForecast.weather"
              :temperature="dailyForecast.temperature"
            />
          </div>
          <div
            v-show="!isDailyActive"
            class="home-page__active-forecast"
          >
            <WeeklyForecast
              v-for="(item, index) in weeklyForecast"
              :key="index"
              :icon="item.icon"
              :weather="item.weather"
              :averageTemperature="item.avgTemp"
              :date="item.date"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Search from 'Components/Search/Search.vue';
  import WButton from 'Components/Button/Button.vue';
  import DailyForecast from 'Components/DailyForecast/DailyForecast.vue';
  import WeeklyForecast from 'Components/WeeklyForecast/WeeklyForecast.vue';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'Home',
    components: {
      Search,
      WButton,
      DailyForecast,
      WeeklyForecast,
    },
    data() {
      return {
        city: '',
        country: '',
        activeForecast: 'DailyForecast',
        lon: '',
        lat: '',
      };
    },
    computed: {
      ...mapGetters('Weather', ['dailyForecast', 'weeklyForecast']),
      isDailyActive() {
        return this.activeForecast === 'DailyForecast';
      },
    },
    methods: {
      ...mapActions('Weather', ['getDailyForecast', 'getWeeklyForecast']),
      setActiveForecast(name) {
        this.activeForecast = name;
        this.getForecasts();
      },
      selectHandler(e) {
        const { city, country, lon, lat } = e;

        this.city = city;
        this.country = country;
        this.lon = lon;
        this.lat = lat;
        this.getForecasts();
      },
      getForecasts() {
        if (!this.lon) {
          return;
        }
        if (this.isDailyActive) {
          this.getDailyForecast({ lon: this.lon, lat: this.lat });
        } else {
          this.getWeeklyForecast({ lon: this.lon, lat: this.lat });
        }
      },
    },
  };
</script>
<style lang="scss">
.home-page {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__wrapper {
    width: 820px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__controls {
    display: flex;
    justify-content: center;
  }

  &__control {
    &:not(:last-child) {
      margin-right: 8px;
    }
  }

  &__forecasts {
    min-height: 320px;
  }

  &__forecasts-location {
    padding: 20px;
    padding-bottom: 0;
    text-align: center;
  }

  &__forecast-city {
    font-size: 22px;
  }

  &__forecast-country {
    font-size: 20px;
  }

  &__active-forecast {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
}
</style>
