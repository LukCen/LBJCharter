import { ref } from "vue";

export const chartData = ref<{ x: string | number, y: string | number }[]>([])

export const getChartData = () => {
  return { chartData }
}
