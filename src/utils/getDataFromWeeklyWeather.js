const getAvgTemp = (max, min) => (min + ((max - min) / 2)).toFixed(1);
const formatDate = (date) => `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
const getDataFromWeeklyWeather = (data) => {
  const result = [];

  data.forEach((element) => {
    const avgTemp = getAvgTemp(element.temp.max, element.temp.min);

    result.push({
      icon: element.weather[0].icon,
      avgTemp,
      weather: element.weather[0].main,
      date: formatDate(new Date(element.dt * 1000)) });
  });

  return result;
};

export {
  getDataFromWeeklyWeather,
};
