<script setup lang="ts">
import { ref } from 'vue';
import Input from './ui/input/Input.vue';
import Label from './ui/label/Label.vue';

const parsedResults = ref([])

</script>

<template>
  <section class="flex flex-col items-center">
    <h2>Upload a CSV file below and use the data to generate a chart! Quick and easy!</h2>
    <div class="file-uploader">
      <Label for="csv-file">CSV file</Label>
      <Input type="file" id="csv-file" />
    </div>
  </section>
</template>
