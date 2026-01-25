import { ref } from "vue";

export const chartData = ref<{ x: string | number, y: string | number, color: string }[]>([])

export const getChartData = () => {
  return { chartData }
}
