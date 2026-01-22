<script setup lang="ts">
import { ref } from 'vue';
import ChartCanvas from './components/ChartCanvas.vue';
import ChartDataForm from './components/ChartDataForm.vue';
import ChartOptions from './components/ChartOptions.vue';
import InputGroup from './components/ui/input-group/InputGroup.vue';
import Input from './components/ui/input/Input.vue';
import Label from './components/ui/label/Label.vue';
import FileUpload from './components/FileUpload.vue';

const activeView = ref('manual')



</script>

<template>
  <main>
    <h1 class="text-4xl font-bold text-gradient">VueCharter - charting made easy!</h1>
    <p>VueCharter is a simple chart making tool, using ChartJS to create beautiful and descriptive charts via the Canvas element. Currently supports bar charts!</p>
    <ChartOptions />
    <div class="option-selector flex gap-2 w-1/2">
      <InputGroup :class="{ 'bg-primary': activeView === 'manual' }" class=" input-combo min-w-1/2 flex justify-center flex-1 border-primary">
        <Label for="chart-manual" class="justify-center w-full cursor-pointer">Add rows manually</Label>
        <Input @change="activeView = 'manual'" name="radio-button" type="radio" id="chart-manual" />
      </InputGroup>
      <InputGroup :class="{ 'bg-primary': activeView === 'upload' }" class=" input-combo min-w-1/2 flex justify-center flex-1 border-primary">
        <Label for="chart-upload" class="justify-center w-full cursor-pointer">Upload CSV file</Label>
        <Input @change="activeView = 'upload'" name="radio-button" type="radio" id="chart-upload" />
      </InputGroup>
    </div>
    <ChartDataForm v-if="activeView === 'manual'" />
    <FileUpload v-if="activeView === 'upload'" />
    <ChartCanvas />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.option-selector input[type="radio"] {
  -webkit-appearance: none;
  appearance: none;
  display: none;
}

.option-selector .input-combo:hover {

  box-shadow: 0 0 15px 3px var(--color-primary);
}
</style>
