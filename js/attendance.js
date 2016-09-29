import * as d3 from 'd3'
import Chart from 'chart.js'

fetch('https://www.uvm.edu/~cscrew/api/signins/today')
  .then(response => response.json())
  .then(json => {
    let reasons = []
    for (let person of json) {

      let reasonAdded = false

      for (let reasonObj of reasons) {
        if (person.reason.Id === reasonObj.id) {
          reasonAdded = true
          reasonObj.count++
        }
      }

      if (!reasonAdded) {
        reasons.push({
          id: person.reason.Id,
          label: person.reason.Text,
          count: 1
        })
      }
    }
    reasons.sort((a, b) => a.count > b.count)
    return reasons
  })
  .then(renderPieChart)

function renderPieChart(dataset) {
  let labels = dataset.map((data) => data.label)
  let reasonAmounts = dataset.map((data) => data.count)

  let ctx = document.getElementById("my-chart");
  let data = {
    labels,
    datasets: [{
      data: reasonAmounts,
      backgroundColor: [ "#FF6384", "#36A2EB", "#FFCE56" ],
    }]
  }
  let myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {}
  })
}
