<script setup lang="ts">
import ChartCanvas from './components/ChartCanvas.vue';
import ChartDataForm from './components/ChartDataForm.vue';
import ChartOptions from './components/ChartOptions.vue';

</script>

<template>
  <main>
    <h1 class="text-gradient">VueCharter - charting made easy!</h1>
    <p>VueCharter is a simple chart making tool, using ChartJS to create beautiful and descriptive charts via the Canvas element. Currently supports bar charts!</p>
    <ChartOptions />
    <ChartDataForm />
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
</style>
