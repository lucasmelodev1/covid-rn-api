const csv = require("csvtojson")
const https = require("https");

const getData = (city) => {
  return new Promise((resolve, reject) => {
    https.get("https://covid.lais.ufrn.br/dados/boletim/evolucao_municipios.csv", (res) => {
      let data = ''
      res.on('data', (chunk) => {data+=chunk})
      res.on('end', () => {
        data = data.replace(/;/g, ',')
        data = data.replace(/-/g, '/')
        csv().fromString(data).then((jsonData) => {
          var selectedData = jsonData.filter(element => element.mun_residencia === city)
          const today = new Date(Date.now())
          selectedData = selectedData.filter(element => new Date(element.data) > new Date(today.getFullYear(), today.getMonth(), today.getDate()-31))
          resolve(selectedData)
        })
      })

    }).on('error', (error) => {
      reject(new Error())
    })
  })
}

module.exports = getData