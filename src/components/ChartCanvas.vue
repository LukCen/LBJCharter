<script setup lang="ts">
import { getChartData } from '@/composables/handleChartData';
import { Chart, registerables, Colors, Chart as ChartType } from 'chart.js';
import { ref, computed } from 'vue';
import Button from './ui/button/Button.vue';
import { generateRandomColor } from '@/composables/generateRandomColor';

let chartModel = ref<HTMLCanvasElement | null>(null)
let chartInstance = ref<InstanceType<typeof Chart> | null>(null)
const { chartData } = getChartData()

// custom plugin for changing the chart background
const chartBg = {
  id: 'chart-bg',
  beforeDraw: (chart: Chart) => {
    const { ctx } = chart;
    ctx.save()
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#333333'
    ctx.fillRect(0, 0, chart.width, chart.height)
    ctx.restore()
  }
}

// returns values to be used in the 'label' or 'data' parameter inside the Chart instance, in a format expected by different chart types
// bar - returns an array of objects
// rest (currently line and pie) - returns an array with two arrays inside - index 0 is X axis, index 1 is Y axis
const valuesForChart = (type: string) => {
  const refValues = ref(Object.values(chartData.value))
  switch (type) {
    case "bar":
      return refValues.value
    default:
      const xValues = computed(() => { return refValues.value.map((p) => p.x) }).value
      const yValues = computed(() => { return refValues.value.map((p) => p.y) }).value
      return [xValues, yValues]
  }
}

// returns an array of colors in hex format, based on how many entries the user input
function getColorsForPieChart() {
  const bgColors: string[] = []
  for (let i = 0; i < ref(Object.values(chartData.value)).value.length; i++) {
    let newColor = generateRandomColor()
    bgColors.push(newColor)
    newColor = ''
  }
  return bgColors
}

class ChartConfig {
  // returns a config object for a bar chart - data and options props
  barChart() {
    return {
      data: {
        datasets: [{
          label: 'Bar Chart',
          data: valuesForChart('bar'),
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          y: {
            ticks: {
              color: "#fff"
            }
          },
          x: {
            ticks: {
              color: "#fff"
            }
          }
        }
      }
    }
  }
  // returns a config object for a pie chart - data and options props
  pieChart() {
    return {
      data: {
        // taken from the 'X axis' content - should always be a string
        labels: valuesForChart('pie')[0],
        datasets: [{
          label: 'Value',
          // taken from the 'Y axis' content - string or number
          data: valuesForChart('pie')[1],
          backgroundColor: getColorsForPieChart(),
          hoverOffset: 5
        }],
      },
      options: {
        color: "#fff",
        plugins: {
          colors: {
            enabled: true
          }
        }
      }
    }
  }
  // returns a config object for a line chart - data and options props
  lineChart() {
    return {
      data: {
        labels: valuesForChart('line')[0],
        datasets: [{
          label: 'Line chart',
          data: valuesForChart('line')[1],
          fill: false,
          borderColor: '#f5f5f5',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            ticks: {
              color: "#fff"
            }
          },
          x: {
            ticks: {
              color: "#fff"
            }
          }
        },
        color: "#fff",
        plugins: {
          colors: {
            enabled: true
          }
        }
      }
    }
  }

}


Chart.register(...registerables, Colors, chartBg)

function showKeys() {

  const values = Object.values(chartData.value)
  const refValues = ref(values)
  const chartType = localStorage.getItem('chart') || 'bar'

  // NEW

  const barChartInstance = new ChartConfig()

  if (!chartModel.value) return
  const ctx = chartModel.value?.getContext('2d')
  if (ctx) {

    // randomly generated colors for the pie charts
    const bgColors: string[] = []
    for (let i = 0; i < refValues.value.length; i++) {
      let newColor = generateRandomColor()
      bgColors.push(newColor)
      newColor = ''
    }
    // pie chart
    if (chartType === 'pie') {
      const newChart = new Chart(ctx, {
        type: 'pie',
        // yes ill clear this up soon - this works just confuses TS due to type macarena above
        //@ts-ignore
        data: barChartInstance.pieChart().data,
        options: barChartInstance.pieChart().options
      })
      chartInstance.value = newChart
    } else if (chartType === "bar") {
      // bar chart
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: barChartInstance.barChart().data,
        options: barChartInstance.barChart().options
      });
      chartInstance.value = newChart
    } else if (chartType === "line") {
      const newChart = new Chart(ctx, {
        type: 'line',
        // yes ill clear this up soon - this works just confuses TS due to type macarena above
        //@ts-ignore
        data: barChartInstance.lineChart().data,
        options: barChartInstance.lineChart().options
      })
      chartInstance.value = newChart
    }

  }
}

function downloadFile() {
  // early return - prevents runtime errors if chart hasnt yet been generated
  if (!chartInstance.value) return

  // get canvas from instance and not the ref (??)
  const c = chartInstance.value.canvas
  const dataUrl = c.toDataURL('image/png')

  // create an anchor element, make sure its hidden and programmatically click it to trigger download
  const link = document.createElement('a')
  link.href = dataUrl
  link.classList.add('hidden')
  link.download = `chart-${Date.now()}.png`
  link.click()
}

</script>

<template>
  <Button @click="showKeys" class="btn">Generate Chart</Button>
  <Button variant="destructive" @click="() => { chartInstance?.destroy(), chartInstance = null }" class="btn">Reset chart</Button>
  <Button class="bg-cyan-600 hover:bg-cyan-500 hover:text-gray-800" @click="downloadFile">Download chart</Button>
  <canvas ref="chartModel" id="chart" width="600" height="600"></canvas>
</template>
