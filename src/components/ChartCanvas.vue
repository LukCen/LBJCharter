<script setup lang="ts">
import { getChartData } from '@/composables/handleChartData';
import { Chart, registerables, Colors, Chart as ChartType, plugins, elements } from 'chart.js';
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
    if (ctx) {
      ctx.save()
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = '#f5f5f5'
      ctx.fillRect(0, 0, chart.width, chart.height)
      ctx.restore()
    }
  }
}
// CHART DEFAULTS - settings apply to every chart
Chart.defaults.font.size = 24


// CHART DEFAULTS END


// returns values to be used in the 'label' or 'data' parameter inside the Chart instance, in a format expected by different chart types
// bar - returns an array of objects
// rest (currently line and pie) - returns an array with two arrays inside - index 0 is X axis, index 1 is Y axis
const valuesForChart = () => {
  const refValues = ref(Object.values(chartData.value))

  const xValues = computed(() => { return refValues.value.map((p) => p.x) }).value
  const yValues = computed(() => { return refValues.value.map((p) => p.y) }).value
  const colorValues = computed(() => { return refValues.value.map((p) => p.color) }).value
  return [xValues, yValues, colorValues]
}

// returns an array of colors in hex format, based on how many entries the user input
function getColorsForPieChart() {
  const bgColors: string[] = []
  for (let i = 0; i < ref(Object.values(chartData.value)).value.length; i++) {
    let newColor = generateRandomColor()
    bgColors.push(newColor)
  }
  return bgColors
}

class ChartConfig {
  // returns a config object for a bar chart - data and options props
  barChart() {
    return {
      data: {
        labels: valuesForChart()[0],
        datasets: [{
          label: 'Bar Chart',
          data: valuesForChart()[1],
          borderWidth: 1,
          backgroundColor: valuesForChart()[2] as string[] || "#f5f5f5"
        }]
      },
      options: {
        scales: {
          y: {
            ticks: {
              color: valuesForChart()[1] as string[],
              textStrokeColor: "#333",
              textStrokeWidth: 2
            }
          },
          x: {
            ticks: {
              color: valuesForChart()[2] as string[],
              textStrokeColor: "#333",
              textStrokeWidth: 2
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
        // taken from the 'X axis' content - individual elements should always be a string
        labels: valuesForChart()[0] as string[],
        datasets: [{
          label: 'Value',
          // taken from the 'Y axis' content - individual elements should always be a string or a number
          data: valuesForChart()[1] as string[],
          backgroundColor: valuesForChart()[2] as string[],
          hoverOffset: 2
        }],
      },
      options: {
        color: valuesForChart()[2] as string[],
      }
    }
  }
  // returns a config object for a line chart - data and options props
  lineChart() {
    return {
      data: {
        labels: valuesForChart()[0] as string[],
        datasets: [{
          label: 'Line chart',
          data: valuesForChart()[1] as string[] | number[],
          fill: false,
          borderColor: "#000",
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            ticks: {
              color: valuesForChart()[2] as string[]
            }
          },
          x: {
            ticks: {
              color: valuesForChart()[2] as string[]
            }
          }
        },
        elements: {
          point: {
            radius: 8,
            pointStyle: "circle",
            backgroundColor: valuesForChart()[2] as string[],
            borderColor: "#000"
          }
        },
        color: "#000",
      }
    }
  }

}

Chart.register(...registerables, Colors, chartBg)

function showKeys() {
  const values = Object.values(chartData.value)
  const refValues = ref(values)
  const chartType = localStorage.getItem('chart') || 'bar'


  const existingChart = document.querySelector('canvas')?.getContext('2d')
  if (existingChart) {
    const isCanvas = Chart.getChart(existingChart)
    if (isCanvas) isCanvas.destroy()
  }

  // NEW

  const barChartInstance = new ChartConfig()

  if (!chartModel.value) return
  const ctx = chartModel.value?.getContext('2d')
  if (ctx) {


    // pie chart
    if (chartType === 'pie') {
      const newChart = new Chart(ctx, {
        type: 'pie',
        data: barChartInstance.pieChart().data,
        // yes ill clear this up soon - this works just confuses TS due to type macarena above
        //@ts-ignore 
        options: barChartInstance.pieChart().options
      })
      chartInstance.value = newChart
    } else if (chartType === "bar") {
      // bar chart
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: barChartInstance.barChart().data,
        options: barChartInstance.barChart().options,
      });
      chartInstance.value = newChart
    } else if (chartType === "line") {
      const newChart = new Chart(ctx, {
        type: 'line',
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
  <section class="canvas-container flex flex-col gap-4 items-center">
    <Button @click="showKeys" class="btn">Generate Chart</Button>
    <Button variant="destructive" @click="() => { chartInstance?.clear(), chartInstance?.destroy(), chartInstance = null }" class="btn">Reset chart</Button>
    <Button class="bg-cyan-600 hover:bg-cyan-500 hover:text-gray-800" @click="downloadFile">Download chart</Button>
    <canvas ref="chartModel" id="chart" width="800" height="600" aria-label="Chart canvas"></canvas>

  </section>
</template>
