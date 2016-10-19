import * as d3 from 'd3'
import Chart from 'chart.js'

const DAYS_TO_GRAPH = 14
Chart.defaults.global.animation.duration = 0

updateAttendance()
setInterval(updateAttendance, 60000)

function updateAttendance() {
  fetch('https://www.uvm.edu/~cscrew/api/signins/numdaysagorange/' + (DAYS_TO_GRAPH - 1))
    .then(response => response.json())
    .then(renderLineGraph)

  fetch('https://www.uvm.edu/~cscrew/api/signins/today')
    .then(response => response.json())
    .then(filterSigninReasons)
    .then(renderPieChart)
}

function filterSigninReasons(json) {
  let reasons = []
  for (let person of json) {
    let reasonAdded = false
    for (let reasonObj of reasons) {
      if (person.reason.Id === reasonObj.id) {
        reasonAdded = true
        reasonObj.count++
      }
    }

    if (!reasonAdded) reasons.push({
      id: person.reason.Id,
      label: person.reason.Text,
      count: 1
    })
  }

  reasons.sort((a, b) => a.count > b.count)
  return reasons
}

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

// const MONTH_LENGTHS = { 0: 31, 1: 28, 2,3,4,5,6,7,8,9,10,11 }
const DAY_NAMES = ['S', 'M', 'T', 'W', 'R', 'F', 'S']
function getArrayOfDays(currentDay, length) {
  let days = []

  for (let i = 0; i < length; i++) {
    if (currentDay < 0) currentDay = 6
    days.push(DAY_NAMES[currentDay])
    currentDay--
  }

  return days.reverse()
}

function renderLineGraph(dataset) {
  console.log(dataset);
  let ctx = document.getElementById("line-graph")
  let date = new Date()
  let data = {
    labels: getArrayOfDays(date.getDay(), DAYS_TO_GRAPH),
    datasets: [{
      label: "Signins By Day",
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
