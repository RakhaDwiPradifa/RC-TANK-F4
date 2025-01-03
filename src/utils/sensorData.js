import { ref, computed } from 'vue';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement, LineController } from 'chart.js';

// Register necessary components for Chart.js
Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement, LineController);

// State to hold the sensor data
const piezoData = ref([]);
const dhtData = ref([]);

// Pagination controls
const piezoPage = ref(1);
const dhtPage = ref(1);
const pageSize = 10;

// Pagination logic for Piezo data
const paginatedPiezoData = computed(() => {
  const start = (piezoPage.value - 1) * pageSize;
  return piezoData.value.slice(start, start + pageSize);
});

// Pagination logic for DHT22 data
const paginatedDhtData = computed(() => {
  const start = (dhtPage.value - 1) * pageSize;
  return dhtData.value.slice(start, start + pageSize);
});

// Total pages for Piezo and DHT22 data
const piezoTotalPages = computed(() => Math.ceil(piezoData.value.length / pageSize));
const dhtTotalPages = computed(() => Math.ceil(dhtData.value.length / pageSize));

// Handlers for pagination
const prevPage = (type) => {
  if (type === 'piezo' && piezoPage.value > 1) {
    piezoPage.value--;
  } else if (type === 'dht' && dhtPage.value > 1) {
    dhtPage.value--;
  }
};

const nextPage = (type) => {
  if (type === 'piezo' && piezoPage.value < piezoTotalPages.value) {
    piezoPage.value++;
  } else if (type === 'dht' && dhtPage.value < dhtTotalPages.value) {
    dhtPage.value++;
  }
};

// Fetch sensor data from the backend
const fetchSensorData = async () => {
  try {
    console.log('Fetching data...');
    // Fetch Piezo data
    const piezoResponse = await fetch('https://backend-tank.vercel.app/api/piezzo');
    const piezoResponseData = await piezoResponse.json();
    piezoData.value = piezoResponseData.data || [];

    // Fetch DHT22 data
    const dhtResponse = await fetch('https://backend-tank.vercel.app/api/dht22');
    const dhtResponseData = await dhtResponse.json();
    dhtData.value = dhtResponseData.data || [];

    console.log('Piezo Data:', piezoData.value);
    console.log('DHT22 Data:', dhtData.value);
  } catch (error) {
    console.error('Error fetching sensor data:', error);
  }
};

// Initialize charts on mounted
const renderCharts = () => {
  // Render Piezo chart
  new Chart(document.getElementById('piezoChart'), {
    type: 'line',
    data: piezoChartData.value,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Piezo Vibration Data',
        },
        tooltip: {
          callbacks: {
            title: (tooltipItem) => `Timestamp: ${tooltipItem[0].label}`,
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
      plugins: {
        title: {
          display: true,
          text: 'DHT22 Temperature Data',
        },
        tooltip: {
          callbacks: {
            title: (tooltipItem) => `Timestamp: ${tooltipItem[0].label}`,
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
      plugins: {
        title: {
          display: true,
          text: 'DHT22 Humidity Data',
        },
        tooltip: {
          callbacks: {
            title: (tooltipItem) => `Timestamp: ${tooltipItem[0].label}`,
          },
        },
      },
    },
  });
};

export {
  piezoData,
  dhtData,
  piezoPage,
  dhtPage,
  piezoTotalPages,
  dhtTotalPages,
  paginatedPiezoData,
  paginatedDhtData,
  fetchSensorData,
  renderCharts,
  prevPage,
  nextPage,
};
