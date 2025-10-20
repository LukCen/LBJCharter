<script setup lang="ts">
import { getChartData } from '@/composables/handleChartData';
import { Chart, registerables, Colors, Chart as ChartType } from 'chart.js';
import { ref } from 'vue';
let chartModel = ref<HTMLCanvasElement | null>(null)
let chartInstance = ref<InstanceType<typeof Chart> | null>(null)
const { chartData } = getChartData()


Chart.register(...registerables, Colors)

function showKeys() {
  const values = Object.values(chartData.value)
  const refValues = ref(values)


  if (!chartModel.value) return
  const ctx = chartModel.value?.getContext('2d')
  if (ctx) {
    console.log(refValues.value)
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
  }
}
</script>

<template>
  <button @click="showKeys" class="btn">Generate Chart</button>
  <button @click="() => { chartInstance?.destroy(), chartInstance = null }" class="btn">Reset chart</button>
  <canvas ref="chartModel" id="chart" width="600" height="600"></canvas>
</template>
