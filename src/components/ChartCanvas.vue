<script setup lang="ts">
import { Chart, registerables, Colors } from 'chart.js';
import { onMounted, ref } from 'vue';
let chartModel = ref<HTMLCanvasElement | null>(null)

Chart.register(...registerables, Colors)
onMounted(() => {
  if (!chartModel.value) return
  const ctx = chartModel.value?.getContext('2d')
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
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
  }
  console.log(ctx)
})
</script>

<template>
  <canvas ref="chartModel" id="chart" width="600" height="600"></canvas>
</template>
