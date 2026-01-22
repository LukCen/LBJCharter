<script setup lang="ts">
import { getChartData } from '@/composables/handleChartData';
import { ref } from 'vue';
import Table from './ui/table/Table.vue';
import TableCaption from './ui/table/TableCaption.vue';
import TableHeader from './ui/table/TableHeader.vue';
import TableRow from './ui/table/TableRow.vue';
import TableHead from './ui/table/TableHead.vue';
import TableBody from './ui/table/TableBody.vue';
import TableCell from './ui/table/TableCell.vue';
import Button from './ui/button/Button.vue';
import InputGroup from './ui/input-group/InputGroup.vue';
import InputGroupInput from './ui/input-group/InputGroupInput.vue';
import Label from './ui/label/Label.vue';



const { chartData } = getChartData()

defineProps({
  xAxisValue: String || Number,
  yAxisValue: Number
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
      type: 'number',
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
      <InputGroup class="max-w-1/2" v-for="item, i in inputGroupData" :key="item.label.for">
        <Label class="px-3 py-1 font-bold bg-primary h-full" :for="item.label.for" :key="i">{{ item.label.content }}</Label>
        <InputGroupInput v-model="item.input.value.value" :type="item.input.type" :id="item.input.id" :key="item.input.id" />
      </InputGroup>
      <Button @click="addChartValue" type="button">Add to chart</Button>

      <Table>
        <TableCaption>Charter</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-1/4">Values in X axis</TableHead>
            <TableHead class="w-1/4">Values in Y axis</TableHead>
            <TableHead class="w-1/2">Additional options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item, i in chartData" :key="i">
            <TableCell>{{ item.x }}</TableCell>
            <TableCell>{{ item.y }}</TableCell>
            <TableCell class="flex justify-center gap-4">
              <Button class="btn-delete-entry bg-destructive">Delete item</Button>
              <Button>Edit values</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
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
</style>
