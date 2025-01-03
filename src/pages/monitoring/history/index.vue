<template>
  <section class="w-full flex flex-col bg-white min-h-screen overflow-hidden">
    <div class="relative bg-[#001F3F] flex min-h-screen overflow-hidden">
      <div class="flex flex-grow flex-col md:flex-row">
        <!-- Sidebar (Desktop) -->
        <aside
          class="hidden md:flex w-16 h-screen fixed left-4 top-4 z-50 bg-[#001F3F] flex-col items-center justify-center space-y-4 shadow-lg rounded-xl"
        >
          <!-- Logo -->
          <div class="mt-8 transition-transform hover:scale-110 duration-300">
            <div class="w-16 h-16 bg-[#E5E1DA] rounded-3xl flex items-center justify-center shadow-lg">
              <a href="/" title="Home">
                <img class="w-12 h-12 p-2" src="@/assets/tank.png" alt="Logo" />
              </a>
            </div>
          </div>
          <!-- Navigation -->
          <nav class="flex flex-col gap-6">
            <a
              href="/data"
              class="w-16 h-16 bg-[#E5E1DA] flex items-center justify-center hover:shadow-lg rounded-3xl"
            >
              <img class="w-12 h-12" src="@/assets/angkadata.png" alt="Data" />
            </a>
            <a
              href="/charts"
              class="w-16 h-16 bg-[#E5E1DA] flex items-center justify-center hover:shadow-lg rounded-3xl"
            >
              <img class="w-12 h-12" src="@/assets/charts.png" alt="Charts" />
            </a>
            <a
              href="/history"
              class="w-16 h-16 bg-[#47B5FF] flex items-center justify-center hover:shadow-lg rounded-3xl"
            >
              <img class="w-12 h-12" src="@/assets/history.png" alt="History" />
            </a>
          </nav>
        </aside>

        <!-- Navbar (Mobile) -->
        <nav
          class="md:hidden fixed top-0 left-0 w-full bg-[#001F3F] flex items-center justify-around p-4 z-50 shadow-md"
        >
          <a href="/" class="w-12 h-12 flex items-center justify-center">
            <img class="w-8 h-8" src="@/assets/tank.png" alt="home" />
          </a>
          <a href="/charts" class="w-12 h-12 flex items-center justify-center">
            <img class="w-8 h-8" src="@/assets/charts.png" alt="Charts" />
          </a>
          <a href="/data" class="w-12 h-12 flex items-center justify-center">
            <img class="w-8 h-8" src="@/assets/angkadata.png" alt="History" />
          </a>
        </nav>

        <!-- Main Content -->
        <div class="flex-grow flex flex-col p-4 md:ml-[100px] md:mr-[65px] mt-[56px]"> <!-- Added mt-[56px] for mobile navbar spacing -->
          <div class="text-left mt-8">
            <h1 class="text-[#E5E1DA] font-bold text-3xl md:text-7xl underline">History</h1>
          </div>

          <div data-aos="fade-up" data-aos-duration="2000" class="flex flex-col items-start flex-grow mt-4">
            <!-- Piezo Data Table -->
            <div class="history-container mt-4 w-full px-0">
              <h2 class="text-2xl font-semibold text-[#47B5FF] mb-4">Piezo Data</h2>
              <div class="table-responsive">
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
                      <td class="p-2 border border-black">{{ entry.vibrationLevel }}</td>
                      <td class="p-2 border border-black">{{ entry.timestamp }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="flex justify-center mt-4">
                <button @click="prevPage('piezo')" :disabled="piezoPage === 1" class="bg-white text-[#001F3F] px-4 py-2 rounded disabled:opacity-50">Previous</button>
                <button @click="nextPage('piezo')" :disabled="piezoPage === piezoTotalPages" class="bg-[#47B5FF] text-[#001F3F] px-4 py-2 ml-2 rounded disabled:opacity-50">Next</button>
              </div>
              <div class="text-center mt-2 text-[#47B5FF]">
                Page {{ piezoPage }} of {{ piezoTotalPages }}
              </div>
            </div>

            <!-- DHT22 Data Table -->
            <div class="history-container mt-8 w-full px-0">
              <h2 class="text-2xl font-semibold text-[#47B5FF] mb-4">DHT22 Data</h2>
              <div class="table-responsive overflow-x-auto">
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
                      <td class="p-2 border border-black">{{ entry.temperature }}</td>
                      <td class="p-2 border border-black">{{ entry.humidity }}</td>
                      <td class="p-2 border border-black">{{ entry.timestamp }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="flex justify-center mt-4">
                <button @click="prevPage('dht')" :disabled="dhtPage === 1" class="bg-white text-[#001F3F] px-4 py-2 rounded disabled:opacity-50">Previous</button>
                <button @click="nextPage('dht')" :disabled="dhtPage === dhtTotalPages" class="bg-[#47B5FF] text-[#001F3F] px-4 py-2 ml-2 rounded disabled:opacity-50">Next</button>
              </div>
              <div class="text-center mt-2 text-[#47B5FF]">
                Page {{ dhtPage }} of {{ dhtTotalPages }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchSensorData, 
  piezoPage, dhtPage, 
  paginatedPiezoData, paginatedDhtData, 
  piezoTotalPages, dhtTotalPages } from '@/utils/sensorData';

const nextPage = (type) => {
  if (type === 'piezo' && piezoPage.value < piezoTotalPages.value) {
    piezoPage.value++;
  } else if (type === 'dht' && dhtPage.value < dhtTotalPages.value) {
    dhtPage.value++;
  }
};

const prevPage = (type) => {
  if (type === 'piezo' && piezoPage.value > 1) {
    piezoPage.value--;
  } else if (type === 'dht' && dhtPage.value > 1) {
    dhtPage.value--;
  }
};

onMounted(() => {
  fetchSensorData();
});
</script>

<style scoped>
.history-container {
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0 auto;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
}

.history-table th {
  border: 1px solid #000;
  padding: 0.5rem;
  text-align: center;
  min-width: 150px;
}

.history-table td {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 0.5rem;
  text-align: left;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

@media (max-width: 767px) {
  .history-table {
    display: block;
    width: 100%;
    overflow-x: auto;
  }
  .history-container {
    padding-left: 0;
    padding-right: 0;
  }
  .history-table th, .history-table td {
    min-width: 100px;
  }
  .flex.items-center.justify-center > img {
    filter: brightness(0) invert(1);
  }
}
</style>
