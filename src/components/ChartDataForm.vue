<!-- <script setup lang="ts">
import { computed, ref } from 'vue';


defineProps({
  xAxisValue: String || Number,
  yAxisValue: String || Number
})

const inputGroupData = [
  {
    label: {
      for: 'x-axis',
      content: 'X axis'
    },
    input: {
      type: 'text',
      id: 'x-axis',
      model: () => defineModel()
    }
  },
  {
    label: {
      for: 'y-axis',
      content: 'Y axis'
    },
    input: {
      type: 'text',
      id: 'y-axis',
      model: () => defineModel()
    }
  }
]

const chartValues = computed({

})
function addChartValue(value: string) {
  // if (!inputModel) return
  chartValues.value.push({ inputModel: value })
  console.log({ inputModel: value })
}

</script>

<template>
  <section>
    <form>
      <div class="input-group" v-for="item, i in inputGroupData" :key="item.label.for">
        <label :for="item.label.for" :key="i">{{ item.label.content }}</label>
        <input v-model="item.input.model" :type="item.input.type" :id="item.input.id" :key="item.input.id">
        <button type="button" @click="addChartValue(item.input.model as any)" class="btn">Add</button>
      </div>
    </form>
    <button class="btn">Generate Chart</button>
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
</style> -->
