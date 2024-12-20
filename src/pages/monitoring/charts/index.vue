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

          <a href="/charts" title="Charts" class="flex items-center justify-center rounded-3xl bg-[#47B5FF] shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
            <img class="w-16 sm:w-16 md:w-16 lg:w-16 sm:h-14 md:h-14 lg:h-14 p-2 group-hover:scale-110 transition-transform duration-300" src="@/assets/charts.png" alt="Charts" />
          </a>
          <a href="/history" title="History" class="flex items-center justify-center rounded-3xl bg-[#E5E1DA] shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
            <img class="w-16 sm:w-16 md:w-16 lg:w-16 sm:h-14 md:h-14 lg:h-14 p-2 group-hover:scale-110 transition-transform duration-300" src="@/assets/history.png" alt="History" />
          </a>
        </nav>
      </aside>

      <!-- Main Content Area -->
      <div class="flex-grow p-6 ml-20 overflow-auto">
        <div class="text-center mt-8 mb-12">
          <h1 class="text-[#47B5FF] font-bold text-4xl">Data Charts</h1>
        </div>

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

// Function to fetch sensor data
const fetchSensorData = async () => {
  try {
    // Fetch Piezo data
    const piezoResponse = await fetch('https://backend-tank.vercel.app/api/piezzo');
    const piezoResponseData = await piezoResponse.json();
    piezoData.value = piezoResponseData.data.slice(-10).reverse(); // Membalik urutan data

    // Fetch DHT22 data
    const dhtResponse = await fetch('https://backend-tank.vercel.app/api/dht22');
    const dhtResponseData = await dhtResponse.json();
    dhtData.value = dhtResponseData.data.slice(-10).reverse(); // Membalik urutan data

    console.log('Piezo Data:', piezoData.value);
    console.log('DHT22 Data:', dhtData.value);
  } catch (error) {
    console.error('Error fetching sensor data:', error);
  }
};

// Function to prepare Piezo data for chart
const piezoChartData = computed(() => {
  return {
    labels: piezoData.value.map(item => item.timestamp), // Jangan dibalik
    datasets: [
      {
        label: 'Vibration Level',
        data: piezoData.value.map(item => item.vibrationLevel), // Jangan dibalik
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1
      }
    ]
  };
});

// Function to prepare DHT22 Temperature chart data
const dhtTempChartData = computed(() => {
  return {
    labels: dhtData.value.map(item => item.timestamp), // Jangan dibalik
    datasets: [
      {
        label: 'Temperature (°C)',
        data: dhtData.value.map(item => item.temperature), // Jangan dibalik
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1
      }
    ]
  };
});

// Function to prepare DHT22 Humidity chart data
const dhtHumChartData = computed(() => {
  return {
    labels: dhtData.value.map(item => item.timestamp), // Jangan dibalik
    datasets: [
      {
        label: 'Humidity (%)',
        data: dhtData.value.map(item => item.humidity), // Jangan dibalik
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
        },
      },
    },
  });
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.sensor-card {
  background-color: #E5E1DA;
  border-radius: 1.5rem;
  padding: 2rem;
  width: 100%;
  max-width: 1000px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 1rem auto;
  overflow: hidden;
}

.sensor-title {
  color: #001F3F;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.chart-container {
  display: flex;
  justify-content: center;
  height: 60vh;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  overflow: auto;
}

.grid-container {
  display: grid;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 3rem;
}

@media (min-width: 640px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>
