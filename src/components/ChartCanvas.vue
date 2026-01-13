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


Chart.register(...registerables, Colors, chartBg)

function showKeys() {
  const values = Object.values(chartData.value)
  const refValues = ref(values)
  const chartType = localStorage.getItem('chart') || 'bar'

  const xValues = computed(() => { return refValues.value.map((p) => p.x) })
  const yValues = computed(() => { return refValues.value.map((p) => p.y) })

  //@ts-ignore
  console.log(xValues.value, yValues.value)

  if (!chartModel.value) return
  const ctx = chartModel.value?.getContext('2d')
  if (ctx) {

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
        data: {
          labels: [...xValues.value],
          datasets: [{
            label: 'Value',
            data: [...yValues.value],
            backgroundColor: [...bgColors],
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
      })
      chartInstance.value = newChart
    } else if (chartType === "bar") {
      // bar chart
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          datasets: [{
            label: 'My chart',
            data: [...refValues.value],
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
          },
          color: "#fff",
          plugins: {
            colors: {
              enabled: true
            }
          }

        }
      });
      chartInstance.value = newChart
    } else if (chartType === "line") {
      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [...xValues.value],
          datasets: [{
            label: 'Line chart',
            data: [...yValues.value],
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
  <button @click="showKeys" class="btn">Generate Chart</button>
  <button @click="() => { chartInstance?.destroy(), chartInstance = null }" class="btn">Reset chart</button>
  <Button class="bg-cyan-600 hover:bg-cyan-500 hover:text-gray-800" @click="downloadFile">Download chart</Button>
  <canvas ref="chartModel" id="chart" width="600" height="600"></canvas>
</template>
