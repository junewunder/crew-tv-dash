import * as d3 from 'd3'
import Chart from 'chart.js'

console.log('HTLLLLOOOO');

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

const DAYS_TO_GRAPH = 14
fetch('https://www.uvm.edu/~cscrew/api/signins/numdaysagorange/' + DAYS_TO_GRAPH)
  .then(response => response.json())
  .then(renderLineGraph)

function renderPieChart(dataset) {
  let labels = dataset.map((data) => data.label)
  let reasonAmounts = dataset.map((data) => data.count)

  let ctx = document.getElementById("pie-chart");
  let data = {
    labels,
    datasets: [{
      data: reasonAmounts,
      // taken from http://clrs.cc/
      backgroundColor: [ "#001f3f","#0074D9","#7FDBFF","#39CCCC","#3D9970","#2ECC40","#01FF70","#FFDC00","#FF851B","#FF4136" ]
    }]
  }
  let myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {}
  })
}

function renderLineGraph(dataset) {
  let ctx = document.getElementById("line-graph");
  let data = {
    labels: dataset.map( _ => ''),
    datasets: [{
      label: "Signings By Day",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointHitRadius: 10,
      data: dataset,
      spanGaps: false,
    }]
  }

  let myLineGraph = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {}
  })
}