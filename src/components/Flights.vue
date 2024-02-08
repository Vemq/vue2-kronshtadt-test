<script setup lang="ts">
import { ref, computed } from "vue";
import { UAVsData } from "../fakeApi";
import { Incident, Flight, TableData } from "../types";
import FlightsTable from "./FlightsTable.vue";
import BarChart from "./BarChart.vue";
import { formatDuration } from "../utils";

const selectedUAVs = ref<string[]>(UAVsData.map(UAV => UAV.id));

const selectedUAVsData = computed(() => UAVsData.filter(UAV => selectedUAVs.value.includes(UAV.id)))

const selectedUAVsFlight = computed(() => selectedUAVsData.value.reduce<Flight[]>((acc, uav) => {
    return [...acc, ...uav.flights];
}, []))

const toEmojiIncidents = (incidents: Incident[]) => {
    const firesAmount = incidents.filter(incident => incident.type === 'fire').length
    const infrastructureDamagesAmount = incidents.filter(incident => incident.type === 'infrastructureDamage').length
    return `${firesAmount ? `🔥(${firesAmount})` : ''} ${infrastructureDamagesAmount ? `🚧(${infrastructureDamagesAmount})` : ''}`.trim()
}

const tableData = computed<TableData[]>(() => selectedUAVsFlight.value.map(flight => {
    return {
        date: `${flight.date.toLocaleDateString('ru')}`,
        duration: formatDuration(flight.durationSec),
        distance: flight.distanceMeters,
        incidents: flight.incidents ? toEmojiIncidents(flight.incidents) : '',
        cargo: flight.cargoWeightKg ? `${flight.cargoWeightKg} кг` : '',
    }
}))

</script>

<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">Список БПЛА</div>
                    <div class="uav-list">
                        <el-checkbox v-for="uav in UAVsData" :key="uav.id" :label="uav.id" v-model="selectedUAVs">
                            {{ uav.title }}
                        </el-checkbox>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-tabs type="border-card">
                    <el-tab-pane label="Список полётов">
                        <FlightsTable :tableData="tableData" />
                    </el-tab-pane>
                    <el-tab-pane label="Статистика">
                        <BarChart v-if="selectedUAVsData.length > 0" :UAVsData="selectedUAVsData" />
                        <el-empty v-else description="Нет выбраных БПЛА"></el-empty>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<style>
.uav-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>