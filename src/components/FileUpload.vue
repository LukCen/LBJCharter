<script setup lang="ts">
import { ref } from 'vue';
import Input from './ui/input/Input.vue';
import Label from './ui/label/Label.vue';
import Papa from 'papaparse'
import { getChartData } from '@/composables/handleChartData';

// results of running PapaParse
const uploadedResults = ref<string[]>([])

const { chartData } = getChartData()
// function parseResults(file: File) {
//   Papa.parse(file, {
//     header: true,
//     complete: (results: any, file: File) => {
//       uploadedResults.value.push(...results.data)
//       // console.dir(results.data)
//       uploadedResults.value.forEach((el) => {
//         //@ts-ignore
//         chartData.value.push({ "x": el.x as string, "y": el.y as string | number })
//       })
//     }
//   })

// }

function handleFileSelect(event: Event) {
  // get the input element getting the file
  const target = event.target as HTMLInputElement;

  // grab the file itself
  const file = target.files?.[0] as File;

  Papa.parse(file, {
    header: true,
    complete: (results: any, file: File) => {
      uploadedResults.value.push(...results.data)
      // console.dir(results.data)
      uploadedResults.value.forEach((el) => {
        //@ts-ignore
        chartData.value.push({ "x": el.x as string, "y": el.y as string | number })
      })
    }
  })
}

</script>

<template>
  <section class="flex flex-col items-center">
    <h2>Upload a CSV file below and use the data to generate a chart! Quick and easy!</h2>
    <div class="file-uploader">
      <Label for="csv-file">CSV file</Label>
      <Input @change="handleFileSelect" type="file" id="csv-file" />
    </div>
  </section>
</template>
