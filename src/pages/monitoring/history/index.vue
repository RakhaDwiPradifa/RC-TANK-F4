<template>
  <div class="relative bg-[#001F3F] flex min-h-screen overflow-hidden">
    <div class="flex flex-grow flex-col md:flex-row">
      <!-- Sidebar -->
      <aside class="w-14 sm:w-14 md:w-14 lg:w-14 h-screen fixed left-6 px-4 bg-[#001F3F] flex flex-col items-center py-2 space-y-4 shadow-lg flex-shrink-0">
        <!-- Logo -->
        <div class="mt-72 mb-2 mt-4 transition-transform hover:scale-110 duration-300">
          <div class="w-16 sm:w-16 md:w-16 lg:w-16 sm:h-14 md:h-14 lg:h-14 bg-[#E5E1DA] rounded-3xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
            <a href="/" title="Home">
              <img class="w-fit h-fit p-2 group-hover:scale-110 transition-transform duration-300"
              src="@/assets/tank.png" alt="Logo" />
            </a>
          </div>
        </div>
        <!-- Navigation -->
        <nav class="flex flex-col gap-6">
          <div class="w-16 sm:w-16 md:w-16 lg:w-16 sm:h-14 md:h-14 lg:h-14">
            <a href="/data" title="Data" class="flex items-center justify-center rounded-3xl bg-[#E5E1DA] shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
            <img class="w-16 sm:w-16 md:w-16 lg:w-16 sm:h-14 md:h-14 lg:h-14 p-2 group-hover:scale-110 transition-transform duration-300" src="@/assets/angkadata.png" alt="Data" />
          </a>
          </div>

          <a href="/charts" title="Charts" class="flex items-center justify-center rounded-3xl bg-[#E5E1DA] shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
            <img class="w-16 sm:w-16 md:w-16 lg:w-16 sm:h-14 md:h-14 lg:h-14 p-2 group-hover:scale-110 transition-transform duration-300" src="@/assets/charts.png" alt="Charts" />
          </a>
          <a href="/history" title="History" class="flex items-center justify-center rounded-3xl bg-[#47B5FF] shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
            <img class="w-16 sm:w-16 md:w-16 lg:w-16 sm:h-14 md:h-14 lg:h-14 p-2 group-hover:scale-110 transition-transform duration-300" src="@/assets/history.png" alt="History" />
          </a>
        </nav>
      </aside>

      <!-- Main Content -->
      <div class="flex-grow flex flex-col p-4 ml-[100px] mr-[65px]">
        <div class="text-center mt-8">
          <h1 class="text-[#E5E1DA] font-bold text-7xl">History</h1>
        </div>

        <div data-aos="fade-up" data-aos-duration="2000" class="flex flex-col items-center flex-grow mt-4">
          <!-- Piezo Data Table -->
          <div class="history-container mt-4 w-full max-w-7xl overflow-y-auto overflow-x-auto">
            <h2 class="text-2xl font-semibold text-[#47B5FF] mb-4">Piezo Data</h2>
            <table class="history-table w-full text-center border-collapse">
              <thead>
                <tr class="bg-[#47B5FF] text-[#001F3F]">
                  <th class="p-2 border border-black">Piezo Value</th>
                  <th class="p-2 border border-black">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="paginatedPiezoData.length === 0">
                  <td colspan="2">No data available</td>
                </tr>
                <tr v-for="(entry, index) in paginatedPiezoData" :key="index" class="bg-white text-[#001F3F]">
                  <td class="p-2 border border-[#91091E]">{{ entry.vibrationLevel }}</td>
                  <td class="p-2 border border-[#91091E]">{{ entry.timestamp }}</td>
                </tr>
              </tbody>
            </table>
            <div class="flex justify-center mt-4">
              <button @click="prevPage('piezo')" :disabled="piezoPage === 1" class="bg-white text-[#001F3F] px-4 py-2 rounded disabled:opacity-50">Previous</button>
              <button @click="nextPage('piezo')" :disabled="piezoPage === piezoTotalPages" class="bg-[#47B5FF] text-[#001F3F] px-4 py-2 ml-2 rounded disabled:opacity-50">Next</button>
            </div>
          </div>

          <!-- DHT22 Data Table -->
          <div class="history-container mt-8 w-full max-w-7xl overflow-y-auto overflow-x-auto">
            <h2 class="text-2xl font-semibold text-[#47B5FF] mb-4">DHT22 Data</h2>
            <table class="history-table w-full text-center border-collapse">
              <thead>
                <tr class="bg-[#47B5FF] text-[#001F3F]">
                  <th class="p-2 border border-black">Temperature (°C)</th>
                  <th class="p-2 border border-black">Humidity (%)</th>
                  <th class="p-2 border border-black">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="paginatedDhtData.length === 0">
                  <td colspan="3">No data available</td>
                </tr>
                <tr v-for="(entry, index) in paginatedDhtData" :key="index" class="bg-white text-[#001F3F]">
                  <td class="p-2 border border-[#91091E]">{{ entry.temperature }}</td>
                  <td class="p-2 border border-[#91091E]">{{ entry.humidity }}</td>
                  <td class="p-2 border border-[#91091E]">{{ entry.timestamp }}</td>
                </tr>
              </tbody>
            </table>
            <div class="flex justify-center mt-4">
              <button @click="prevPage('dht')" :disabled="dhtPage === 1" class="bg-white text-[#001F3F] px-4 py-2 rounded disabled:opacity-50">Previous</button>
              <button @click="nextPage('dht')" :disabled="dhtPage === dhtTotalPages" class="bg-[#47B5FFF] text-[#001F3F] px-4 py-2 ml-2 rounded disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  piezoData,
  dhtData,
  piezoPage,
  dhtPage,
  paginatedPiezoData,
  paginatedDhtData,
  piezoTotalPages,
  dhtTotalPages,
  fetchSensorData,
} from '@/utils/sensorData.js';

onMounted(() => {
  fetchSensorData();
});
</script>

<style scoped>
.history-container {
  width: 100%;
  max-width: 100%;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
}

.history-table th {
  border: 1px solid #001F3F;
  padding: 0.5rem;
  text-align: center;
}

.history-table td {
  border-top: 1px solid #001F3F;
  border-bottom: 1px solid #001F3F;
  padding: 0.5rem;
  text-align: left;
}
</style>
