<script setup lang="ts">
import { ref } from 'vue';
import ChartCanvas from './components/ChartCanvas.vue';
import ChartDataForm from './components/ChartDataForm.vue';
import ChartOptions from './components/ChartOptions.vue';
import InputGroup from './components/ui/input-group/InputGroup.vue';
import Input from './components/ui/input/Input.vue';
import Label from './components/ui/label/Label.vue';
import FileUpload from './components/FileUpload.vue';
import InputGroupText from './components/ui/input-group/InputGroupText.vue';

const activeView = ref('manual')



</script>

<template>
  <main>
    <h1 class="text-4xl font-bold text-gradient">VueCharter - charting made easy!</h1>
    <p>VueCharter is a simple chart making tool, using ChartJS to create beautiful and descriptive charts via the Canvas element. Choose between bar, line and pie charts, input your data manually or
      from a CSV file, and generate!</p>

    <div class="option-selector grid grid-cols-2 grid-rows-2 gap-2 min-w-1/3 place-items-center items-center justify-center">
      <InputGroupText class="text-secondary text-lg font-semibold px-2 py-1 w-full flex justify-center place-items-center flex-2 col-span-2">Select the way to input data into a chart
      </InputGroupText>
      <InputGroup :class="{ 'bg-primary': activeView === 'manual' }" class=" input-combo flex col-1 flex-1 justify-center border-primary font">
        <Label for="chart-manual" class="justify-center w-full cursor-pointer">Add rows manually</Label>
        <Input @change="activeView = 'manual'" name="radio-button" type="radio" id="chart-manual" />
      </InputGroup>
      <InputGroup :class="{ 'bg-primary': activeView === 'upload' }" class=" input-combo  flex col-2 flex-1 justify-center  border-primary font">
        <Label for="chart-upload" class="justify-center w-full cursor-pointer">Upload CSV file</Label>
        <Input @change="activeView = 'upload'" name="radio-button" type="radio" id="chart-upload" />
      </InputGroup>
    </div>
    <ChartOptions />
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
