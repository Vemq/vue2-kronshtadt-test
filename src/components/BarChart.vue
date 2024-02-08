
<script setup lang="ts">
import { ref, computed } from "vue";
import { Flight, UAV } from "../types";
import { formatDuration } from "../utils";

const props = defineProps<{
  UAVsData: UAV[]
}>()

const units = {
  'Длительность': 'cек',
  'Расстояние': 'м',
  'Инциденты': '',
  'Груз': 'кг',
}

type Measurements = keyof typeof units;

const selectedChart = ref<Measurements>('Длительность');

const seriesData = computed(() => {
  if (selectedChart.value !== 'Инциденты') {
    const measuredProperty = {
      'Длительность': 'durationSec',
      'Расстояние': 'distanceMeters',
      'Груз': 'cargoWeightKg',
    }[selectedChart.value] as keyof Flight
    return [{ name: `${selectedChart.value} всего`, data: props.UAVsData.map(UAV => UAV.flights.reduce((acc, flight) => flight[measuredProperty] as number + acc, 0)) }]
  } else {
    return [{
      name: `Пожары`,
      data: props.UAVsData.map(UAV => UAV.flights.reduce((acc, flight) => flight.incidents?.filter(incident => incident.type === 'fire').length || 0 + acc, 0))
    }, {
      name: `Повреждения инфраструктуры`,
      data: props.UAVsData.map(UAV => UAV.flights.reduce((acc, flight) => flight.incidents?.filter(incident => incident.type === 'infrastructureDamage').length || 0 + acc, 0))
    }]
  }
})

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: props.UAVsData.map(UAV => UAV.title),
    },
    yaxis: {
      title: {
        text: `${selectedChart.value}${units[selectedChart.value] ? ` (${units[selectedChart.value]})` : ''}`
      }

    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val: string | number) {
          if (selectedChart.value === 'Длительность' && typeof val === 'number') {
            return formatDuration(val)
          }
          return `${val} ${units[selectedChart.value]}`
        }
      }
    },
  }
})

</script>

<template>
  <div id="chart">
    <el-radio-group v-model="selectedChart">
      <el-radio-button v-for="(_, measure) in units" :label="measure"></el-radio-button>
    </el-radio-group>
    <apexchart type="bar" height="350" :options="chartOptions" :series="seriesData"></apexchart>
  </div>
</template>


