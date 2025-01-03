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
              class="w-16 h-16 bg-[#47B5FF] rounded-3x flex items-center justify-center hover:shadow-lg rounded-3xl"
            >
              <img class="w-12 h-12" src="@/assets/angkadata.png" alt="Data" />
            </a>
            <a
              href="/charts"
              class="w-16 h-16 bg-[#E5E1DA] rounded-3x flex items-center justify-center hover:shadow-lg rounded-3xl"
            >
              <img class="w-12 h-12" src="@/assets/charts.png" alt="Charts" />
            </a>
            <a
              href="/history"
              class="w-16 h-16 bg-[#E5E1DA] rounded-3x flex items-center justify-center hover:shadow-lg rounded-3xl"
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
            <img class="w-8 h-8 icon-mobile" src="@/assets/tank.png" alt="home" />
          </a>
          <a href="/charts" class="w-12 h-12 flex items-center justify-center">
            <img class="w-8 h-8 icon-mobile" src="@/assets/charts.png" alt="Charts" />
          </a>
          <a href="/history" class="w-12 h-12 flex items-center justify-center">
            <img class="w-8 h-8 icon-mobile" src="@/assets/history.png" alt="History" />
          </a>
        </nav>

        <!-- Main Content -->
        <div class="flex-grow flex flex-col gap-4 p-4 pt-16 md:ml-16">
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
              <div class="sensor-card mb-4">
                <h2 class="sensor-title">Piezo Sensor</h2>
                <p class="sensor-value">Vibration Level: {{ piezoValue }}</p>
              </div>

              <!-- DHT22 Sensor Data -->
              <div class="sensor-card mb-4">
                <h2 class="sensor-title">DHT22</h2>
                <p class="sensor-value">Temperature: {{ dht22Temperature }}°C</p>
                <p class="sensor-value">Humidity: {{ dht22Humidity }}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
  word-wrap: break-word; /* Prevent text overflow */
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

@media (max-width: 767px) {
  /* Adjust sensor card width and padding for mobile screens */
  .sensor-card {
    width: 100%; /* Full width on mobile */
    padding: 1rem; /* Reduce padding to make it more compact */
    margin: 0 1rem; /* Add some space on the sides */
  }

  .icon-mobile {
    filter: invert(1); /* Turn icons white on mobile */
  }

  /* Ensure content doesn't overlap the navbar on mobile */
  .pt-16 {
    padding-top: 4rem; /* Add padding-top to give space for the fixed navbar */
  }

  .flex-grow {
    flex-grow: 1; /* Ensure that the content grows to fill available space */
  }

  /* Prevent any other unwanted margin or padding */
  .md:ml-16 {
    margin-left: 0; /* Remove left margin on mobile */
  }
}
</style>
