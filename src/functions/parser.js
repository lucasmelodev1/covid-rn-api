const api = require("../api/uern-api");

const getImprovementRate = (lastMonthDeaths, lastWeekDeaths) => {
  const averageDeaths = lastMonthDeaths / 23
  return ((averageDeaths / lastWeekDeaths) * 100) - 100
}

const getLastMonthDeaths = (lastMonthData) => {
  var deaths = 0
  for (let i = 7; i < lastMonthData.length - 1; i++) {
    deaths += Number(lastMonthData[i]["obitos"])
  }
  return deaths
}

const getLastWeekDeaths = (lastWeekData) => {
  var deaths = 0
  for (let i = 0; i < lastWeekData.length - 24; i++) {
    deaths += Number(lastWeekData[i]["obitos"])
  }
  return deaths
}

const getLastWeekCases = (lastWeekData) => {
  var deaths = 0
  for (let i = 0; i < lastWeekData.length - 24; i++) {
    deaths += Number(lastWeekData[i]["confirmados"])
  }
  return deaths
}

const parseData = async (city) => {
  try {
    const apiData = await api(city)
    if (apiData.length < 1) {
      return undefined
    }
    const improvementRate = getImprovementRate(getLastMonthDeaths(apiData), getLastWeekDeaths(apiData))
    const parsedData = {
      "deaths": getLastWeekDeaths(apiData).toString(),
      "cases": getLastWeekCases(apiData).toString(),
      "improvementRate": Number(improvementRate.toFixed(2))
    }
    return parsedData
  }
  catch {
    return undefined
  }
}

module.exports = parseData