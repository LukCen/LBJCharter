<script setup lang="ts">
import { getChartData } from '@/composables/handleChartData';
import { Chart, registerables, Colors, Chart as ChartType } from 'chart.js';
import { ref } from 'vue';
let chartModel = ref<HTMLCanvasElement | null>(null)
let chartInstance = ref<InstanceType<typeof Chart> | null>(null)
const { chartData } = getChartData()


Chart.register(...registerables, Colors)

function showKeys() {
  const keys = Object.keys(chartData.value)
  const values = Object.values(chartData.value)
  const refKeys = ref(keys)
  const refValues = ref(values)


  if (!chartModel.value) return
  const ctx = chartModel.value?.getContext('2d')
  if (ctx) {
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [...refKeys.value],
        datasets: [{
          label: 'My chart',
          data: [...refValues.value],
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
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
  }
}
</script>

<template>
  <button @click="showKeys" class="btn">Generate Chart</button>
  <button @click="() => { chartInstance?.destroy(), chartInstance = null }" class="btn">Reset chart</button>
  <canvas ref="chartModel" id="chart" width="600" height="600"></canvas>
</template>
