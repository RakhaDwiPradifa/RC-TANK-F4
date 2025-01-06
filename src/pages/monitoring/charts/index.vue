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
            <div class="w-16 h-16 bg-[#E5E1DA] rounded-3xl flex items-center justify-center shadow-lg hover:bg-[#47B5FF] duration-500 ">
              <a href="/" title="Home">
                <img class="w-12 h-12 p-2" src="@/assets/tank.png" alt="Logo" />
              </a>
            </div>
          </div>
          <!-- Navigation -->
          <nav class="flex flex-col gap-6">
            <a
              href="/data"
              class="w-16 h-16 bg-[#E5E1DA] rounded-3x flex items-center justify-center hover:shadow-lg rounded-3xl hover:bg-[#47B5FF] duration-500"
            >
              <img class="w-12 h-12 text-white" src="@/assets/angkadata.png" alt="Data" />
            </a>
            <a
              href="/charts"
              class="w-16 h-16 bg-[#47B5FF] rounded-3x flex items-center justify-center hover:shadow-lg rounded-3xl"
            >
              <img class="w-12 h-12 text-white" src="@/assets/charts.png" alt="Charts" />
            </a>
            <a
              href="/history"
              class="w-16 h-16 bg-[#E5E1DA] rounded-3x flex items-center justify-center hover:shadow-lg rounded-3xl hover:bg-[#47B5FF] duration-500"
            >
              <img class="w-12 h-12 text-white" src="@/assets/history.png" alt="History" />
            </a>
          </nav>
        </aside>

        <!-- Navbar (Mobile) -->
        <nav
          class="md:hidden fixed top-0 left-0 w-full bg-[#001F3F] flex items-center justify-around p-4 z-50 shadow-md"
        >
          <a href="/" class="w-12 h-12 flex items-center justify-center">
            <img class="w-8 h-8 icon-mobile text-white" src="@/assets/tank.png" alt="home" />
          </a>
          <a href="/data" class="w-12 h-12 flex items-center justify-center">
            <img class="w-8 h-8 icon-mobile text-white" src="@/assets/angkadata.png" alt="Charts" />
          </a>
          <a href="/history" class="w-12 h-12 flex items-center justify-center">
            <img class="w-8 h-8 icon-mobile text-white" src="@/assets/history.png" alt="History" />
          </a>
        </nav>

        <!-- Main Content -->
        <div class="flex-grow flex flex-col gap-4 p-4 pt-16 md:ml-16">
          <div class="text-center mt-8">
            <h1 class="text-[#47B5FF] font-bold text-4xl">Sensor Data Charts</h1>
          </div>

          <div data-aos="fade-up" data-aos-duration="2000" class="flex flex-col gap-4 items-center flex-grow mt-4">
            <!-- Loading State -->
            <div v-if="isLoading" class="text-center">
              <p class="text-[#47B5FF] font-bold">Loading sensor data...</p>
            </div>

            <div v-else class="flex flex-col gap-4 items-center flex-grow mt-4 w-full">
              <!-- Piezo Data Chart -->
              <div data-aos="fade-left" data-aos-duration="2000" class="sensor-card">
                <h2 class="sensor-title">Piezo Vibration Data</h2>
                <div class="chart-container">
                  <canvas id="piezoChart"></canvas>
                </div>
              </div>

              <!-- DHT22 Temperature Chart -->
              <div data-aos="fade-left" data-aos-duration="2000" class="sensor-card">
                <h2 class="sensor-title">DHT22 Temperature Data</h2>
                <div class="chart-container">
                  <canvas id="dht22TempChart"></canvas>
                </div>
              </div>

              <!-- DHT22 Humidity Chart -->
              <div data-aos="fade-right" data-aos-duration="2000" class="sensor-card">
                <h2 class="sensor-title">DHT22 Humidity Data</h2>
                <div class="chart-container">
                  <canvas id="dht22HumChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement, LineController } from 'chart.js';

// Registering all necessary components for Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LineController
);

// Data storage
const piezoData = ref([]);
const dhtData = ref([]);
const isLoading = ref(true);

// Function to fetch sensor data
const fetchSensorData = async () => {
  try {
    // Fetch Piezo data
    const piezoResponse = await fetch('https://backend-tank.vercel.app/api/piezzo');
    const piezoResponseData = await piezoResponse.json();
    piezoData.value = piezoResponseData.data.reverse();

    // Fetch DHT22 data
    const dhtResponse = await fetch('https://backend-tank.vercel.app/api/dht22');
    const dhtResponseData = await dhtResponse.json();
    dhtData.value = dhtResponseData.data.reverse(); // No slicing, raw data

    isLoading.value = false;
    console.log('Piezo Data:', piezoData.value);
    console.log('DHT22 Data:', dhtData.value);
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    isLoading.value = false;
  }
};

const piezoChartData = computed(() => {
  // Membatasi hanya 5 data terakhir
  const limitedPiezoData = piezoData.value.slice(-5); // Mengambil 5 data terakhir

  return {
    labels: limitedPiezoData.map(item => new Date(item.timestamp).toLocaleString()), // Convert timestamp to readable format
    datasets: [
      {
        label: 'Vibration Level',
        data: limitedPiezoData.map(item => item.vibrationLevel), // Use vibrationLevel data
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1
      }
    ]
  };
});

const dhtTempChartData = computed(() => {
  // Membatasi hanya 5 data terakhir
  const limitedDhtData = dhtData.value.slice(-5); // Mengambil 5 data terakhir

  return {
    labels: limitedDhtData.map(item => new Date(item.timestamp).toLocaleString()), // Convert timestamp to readable format
    datasets: [
      {
        label: 'Temperature (°C)',
        data: limitedDhtData.map(item => item.temperature), // Use temperature data
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1
      }
    ]
  };
});

const dhtHumChartData = computed(() => {
  // Membatasi hanya 5 data terakhir
  const limitedDhtData = dhtData.value.slice(-5); // Mengambil 5 data terakhir

  return {
    labels: limitedDhtData.map(item => new Date(item.timestamp).toLocaleString()), // Convert timestamp to readable format
    datasets: [
      {
        label: 'Humidity (%)',
        data: limitedDhtData.map(item => item.humidity), // Use humidity data
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1
      }
    ]
  };
});

// Chart rendering
onMounted(() => {
  fetchSensorData().then(() => {
    renderCharts();
  });
});

// Function to render all charts
const renderCharts = () => {
  // Render Piezo chart
  new Chart(document.getElementById('piezoChart'), {
    type: 'line',
    data: piezoChartData.value,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          tension: 0.4,
          fill: true,
        },
        point: {
          radius: 4,
          hoverRadius: 6,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Timestamp',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Vibration Level',
          },
          min: Math.min(...piezoData.value.map(item => item.vibrationLevel)) - 100, // Margin 100 di bawah min
          max: Math.max(...piezoData.value.map(item => item.vibrationLevel)) + 100, // Margin 100 di atas max
        },
      },
    },
  });

  // Render DHT22 Temperature chart
  new Chart(document.getElementById('dht22TempChart'), {
    type: 'line',
    data: dhtTempChartData.value,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          tension: 0.4,
          fill: true,
        },
        point: {
          radius: 4,
          hoverRadius: 6,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Timestamp',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Temperature (°C)',
          },
          min: Math.min(...dhtData.value.map(item => item.temperature)) - 2, // Margin di bawah min temperature
          max: Math.max(...dhtData.value.map(item => item.temperature)) + 2, // Margin di atas max temperature
        },
      },
    },
  });

  // Render DHT22 Humidity chart
  new Chart(document.getElementById('dht22HumChart'), {
    type: 'line',
    data: dhtHumChartData.value,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          tension: 0.4,
          fill: true,
        },
        point: {
          radius: 4,
          hoverRadius: 6,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Timestamp',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Humidity (%)',
          },
          min: Math.min(...dhtData.value.map(item => item.humidity)) - 5, // Margin di bawah min humidity
          max: Math.max(...dhtData.value.map(item => item.humidity)) + 5, // Margin di atas max humidity
        },
      },
    },
  });
};
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
  word-wrap: break-word;
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
  margin: 0.5rem 0;
}

.chart-container {
  height: 300px;
  width: 100%;
}

@media (max-width: 768px) {
  .sensor-card {
    width: 100%;
  }

  .chart-container {
    height: 250px;
  }
  .flex.items-center.justify-center > img {
    filter: brightness(0) invert(1); /* Membuat ikon menjadi putih */
  }
}
</style>
