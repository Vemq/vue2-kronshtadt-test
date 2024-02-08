<script setup lang="ts">
import { TableData } from "../types";

defineProps<{
    tableData: TableData[]
}>()
</script>

<template>
    <el-table :data="tableData" style="width: 100%" empty-text="Нет выбраных БПЛА">
        <el-table-column prop="date" label="Дата" width="180">
        </el-table-column>
        <el-table-column prop="duration" label="Длительность" width="180">
        </el-table-column>
        <el-table-column prop="distance" label="Расстояние" width="180">
        </el-table-column>
        <el-table-column prop="incidents" label="Инциденты" width="180">
        </el-table-column>
        <el-table-column prop="cargo" label="Груз">
        </el-table-column>
        <el-empty description="description">8878878</el-empty>
    </el-table>
</template>