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
            <a href="/data" title="Data" class="flex items-center justify-center rounded-3xl bg-[#47B5FF] shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
            <img class="w-16 sm:w-16 md:w-16 lg:w-16 sm:h-14 md:h-14 lg:h-14 p-2 group-hover:scale-110 transition-transform duration-300" src="@/assets/angkadata.png" alt="Data" />
          </a>
          </div>

          <a href="/charts" title="Charts" class="flex items-center justify-center rounded-3xl bg-[#E5E1DA] shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
            <img class="w-16 sm:w-16 md:w-16 lg:w-16 sm:h-14 md:h-14 lg:h-14 p-2 group-hover:scale-110 transition-transform duration-300" src="@/assets/charts.png" alt="Charts" />
          </a>
          <a href="/history" title="History" class="flex items-center justify-center rounded-3xl bg-[#E5E1DA] shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
            <img class="w-16 sm:w-16 md:w-16 lg:w-16 sm:h-14 md:h-14 lg:h-14 p-2 group-hover:scale-110 transition-transform duration-300" src="@/assets/history.png" alt="History" />
          </a>
        </nav>
      </aside>

      <!-- Main Content -->
      <div class="flex-grow flex flex-col gap-4 p-4 ml-14">
        <div class="text-center mt-8">
          <h1 class="text-[#47B5FF] font-bold text-4xl">Sensor Data</h1>
        </div>

        <div data-aos="fade-up" data-aos-duration="2000" class="flex flex-col gap-4 items-center flex-grow mt-4">
          <!-- Loading State -->
          <div v-if="isLoading" class="text-center">
            <p class="text-[#47B5FF] font-bold">Loading sensor data...</p>
          </div>

          <div v-else class="flex flex-col gap-4 items-center flex-grow mt-4 w-full">
            <!-- Piezo Sensor Data -->
            <div class="sensor-card mb-2">
              <h2 class="sensor-title">Piezo Sensor</h2>
              <p class="sensor-value">Vibration Level: {{ piezoValue }}</p>
            </div>

            <!-- DHT22 Sensor Data -->
            <div class="sensor-card mb-2">
              <h2 class="sensor-title">DHT22</h2>
              <p class="sensor-value">Temperature: {{ dht22Temperature }}°C</p>
              <p class="sensor-value">Humidity: {{ dht22Humidity }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// State variables
const piezoValue = ref(0);
const dht22Temperature = ref(0);
const dht22Humidity = ref(0);
const isLoading = ref(true);

let intervalId;

// Fetch Piezo Sensor Data
const fetchPiezoData = async () => {
  try {
    const response = await fetch('https://backend-tank.vercel.app/api/piezzo');
    if (!response.ok) throw new Error(`Piezo Sensor Error: ${response.status}`);
    const result = await response.json();
    if (result?.data?.length) {
      piezoValue.value = result.data[0]?.vibrationLevel || 0;
    }
  } catch (error) {
    console.error('Error fetching Piezo sensor data:', error);
  }
};

// Fetch DHT22 Sensor Data
const fetchDHT22Data = async () => {
  try {
    const response = await fetch('https://backend-tank.vercel.app/api/dht22');
    if (!response.ok) throw new Error(`DHT22 Sensor Error: ${response.status}`);
    const result = await response.json();
    if (result?.data?.length) {
      dht22Temperature.value = result.data[0]?.temperature || 0;
      dht22Humidity.value = result.data[0]?.humidity || 0;
    }
  } catch (error) {
    console.error('Error fetching DHT22 sensor data:', error);
  }
};

// Combined fetch function
const fetchSensorData = async () => {
  isLoading.value = true;
  await Promise.all([fetchPiezoData(), fetchDHT22Data()]);
  isLoading.value = false;
};

// Lifecycle hooks
onMounted(() => {
  fetchSensorData();
  intervalId = setInterval(fetchSensorData, 5000); // Fetch data every 5 seconds
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.sensor-card {
  background-color: #E5E1DA;
  border-radius: 1.5rem;
  padding: 1.5rem;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.sensor-title {
  color: #001F3F;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.sensor-value {
  color: #001F3F;
  font-weight: bold;
  font-size: 1rem;
  margin: 0.1rem 0;
}
</style>
