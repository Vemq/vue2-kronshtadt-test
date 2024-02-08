<script setup lang="ts">
import { ref } from "vue";
import Flights from './components/Flights.vue'
import StartPage from './components/StartPage.vue'

const loading = ref(false);
const contentLoaded = ref(false);

const loadingEndHandler = () => {
  loading.value = false;
  contentLoaded.value = true;
  console.log('test loadingEndHandler')
}
</script>

<template>
  <div v-loading="loading" class="content">
    <StartPage v-if="!contentLoaded" @loadingStart="loading = true" @loadingEnd="loadingEndHandler" />
    <Flights v-else />
  </div>
</template>

<style scoped>
.content {
  padding: 10px 50px;
}
</style>
