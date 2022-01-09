const getDataFromDailyWeather = (data) => {
  const result = { temperature: data.current.temp, weather: data.current.weather[0].main, icon: data.current.weather[0].icon };

  return result;
};

export {
  getDataFromDailyWeather,
};
