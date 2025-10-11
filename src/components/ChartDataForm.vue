<script setup lang="ts">

defineProps({
  xAxisLabel: String || Number,
  xAxisValue: String || Number
})

const inputGroupData = [
  {
    label: {
      for: 'x-axis',
      content: 'X axis'
    },
    input: {
      type: 'text',
      id: 'x-axis'
    }
  },
  {
    label: {
      for: 'y-axis',
      content: 'Y axis'
    },
    input: {
      type: 'text',
      id: 'y-axis'
    }
  }
]

</script>

<template>
  <section>
    <form>
      <div class="input-group" v-for="item in inputGroupData">
        <label :for="item.label.for">{{ item.label.content }}</label>
        <input :type="item.input.type" :id="item.input.id">
        <button class="btn">Add</button>
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
</style>
