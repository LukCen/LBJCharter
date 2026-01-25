<script setup lang="ts">
import { ref } from 'vue';
import Papa from 'papaparse'
import { getChartData } from '@/composables/handleChartData';

// results of running PapaParse
const uploadedResults = ref<string[]>([])
const fileInputTextValue = ref<string>('File not selected')
const { chartData } = getChartData()

function handleFileSelect(event: Event) {
  // get the input element getting the file
  const target = event.target as HTMLInputElement;

  // grab the file itself
  const file = target.files?.[0] as File;
  fileInputTextValue.value = file.name

  Papa.parse(file, {
    header: true,
    complete: (results: any, file: File) => {
      uploadedResults.value.push(...results.data)
      // console.dir(results.data)
      uploadedResults.value.forEach((el) => {
        //@ts-ignore
        chartData.value.push({ "x": el.x as string, "y": el.y as string | number, "color": el.color as string || "#f5f5f5" })
        console.log(chartData.value)
      })
    }
  })
}

</script>

<template>
  <section class="flex flex-col items-center justify-center gap-2">
    <h2>Upload a CSV file below and use the data to generate a chart! Quick and easy!</h2>
    <div class="file-uploader w-full flex items-center border-secondary border-solid border-2 rounded-md cursor-pointer hover:shadow-[0px_0px_10px_1px_var(--color-secondary)] overflow-hidden">
      <label class="bg-secondary text-foreground font-semibold min-w-fit px-4 py-2 cursor-pointer" for="csv-file">Select file</Label>
      <input class="hidden" @change="handleFileSelect" type="file" id="csv-file" />
      <span class="w-full px-2 py-1 text-center">{{ fileInputTextValue }}</span>
    </div>
  </section>
</template>
