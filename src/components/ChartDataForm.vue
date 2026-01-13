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
        <table>
          <colgroup>
            <col style="width: 25%">
            <col style="width: 25%">
            <col style="width: 25%">
            <col style="width: 25%">
          </colgroup>
          <thead>
            <tr>
              <th colspan="1">Values in X axis</th>
              <th colspan="1">Values in Y axis</th>
              <th colspan="2">Additional options</th>
            </tr>
          </thead>
          <tbody>
            <!-- cheat table row to ensure the table is full sized even without values -->
            <tr v-for="item in chartData" :key="item.x">
              <td>{{ item.x }}</td>
              <td>{{ item.y }}</td>
              <td>
                <button type="button" class="btn btn-delete-entry">Delete item</button>
              </td>
              <td>
                <button type="button" class="btn btn-delete-Edit">Edit values</button>
              </td>
            </tr>
          </tbody>
        </table>
      </ul>
    </form>

  </section>
</template>

<style scoped>
section {
  display: grid;
  place-items: center;
  gap: 20px;
  width: 100%;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  min-width: 100%;
}

label {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* table */
thead tr {
  background: #f5f5f5;
  color: #333;
  text-align: center;
}

td, tr, th {
  padding: 5px 10px;
  border: 1px solid #f5f5f5;
  text-align: center;
}
th {
  border: 1px solid #333;
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
  width: 100%;
}
</style>
