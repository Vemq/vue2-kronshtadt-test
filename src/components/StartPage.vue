<script setup lang="ts">
const emit = defineEmits(['loadingStart', 'loadingEnd'])

const loadData = () => {
    console.log('test loadData')

    emit('loadingStart');
    setTimeout(() => {
        emit('loadingEnd')
    }, 2000)
}
</script>

<template>
    <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6">

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>Тестовая страница визуализации данных БПЛА</span>
                </div>
                <div class="grid-content bg-purple-dark"> 
                    <el-button icon="el-icon-download" @click="loadData">Получить данные</el-button>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
 
 
