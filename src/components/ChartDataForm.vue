<script setup lang="ts">
import { getChartData } from '@/composables/handleChartData';
import { ref } from 'vue';

const { chartData } = getChartData()

defineProps({
  xAxisValue: String || Number,
  yAxisValue: String || Number
})

const inputGroupData = [
  {
    label: {
      for: 'x',
      content: 'X axis'
    },
    input: {
      type: 'text',
      id: 'x',
      value: ref('')
    }
  },
  {
    label: {
      for: 'y',
      content: 'Y axis'
    },
    input: {
      type: 'text',
      id: 'y',
      value: ref('')
    }
  }
]

function addChartValue() {
  const xValue = inputGroupData[0]?.input.value.value ?? ""
  const yValue = inputGroupData[1]?.input.value.value ?? ""
  chartData.value.push({ x: xValue, y: yValue })
  // console.log(chartData.value)
}

</script>

<template>
  <section>
    <form>
      <div class="input-group" v-for="item, i in inputGroupData" :key="item.label.for">
        <label :for="item.label.for" :key="i">{{ item.label.content }}</label>
        <input v-model="item.input.value.value" :type="item.input.type" :id="item.input.id" :key="item.input.id">
      </div>
      <button @click="addChartValue" type="button" class="btn">Add</button>
      <ul class="chart-entries">
        <li class="chart-entry" v-for="item in chartData">
          <span>{{ item.x }}</span>
          <span>{{ item.y }}</span>
          <button type="button" class="btn btn-delete-entry">Delete item</button>
        </li>
      </ul>
    </form>

  </section>
</template>

<style scoped>
section {
  display: grid;
  place-items: center;
  gap: 20px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
}

label {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-group {
  display: grid;
  gap: 10px;
  grid-template-columns: 2fr 8fr 2fr;
}
.chart-entries {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chart-entry {
  display: grid;
  grid-template-columns: 3fr 3fr 3fr 3fr;
}
</style>
