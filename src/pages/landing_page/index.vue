<template>
  <section class="w-full flex flex-col bg-[#17255A] min-h-screen overflow-hidden">
    <!-- Navbar -->
    <div class="bg-[#BEA57D] backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-sm w-full h-12 sm:h-12 md:h-12 lg:h-12 fixed top-0 z-50 flex items-center gap-4 px-4 sm:px-6 md:px-8 lg:px-10 shadow-lg">
      <div class="bg-red-500 sm:ml-4 md:ml-6 lg:ml-6 rounded-full w-10 h-10 sm:w-12 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10"></div>
      <div class="bg-yellow-500 rounded-full w-10 h-10 sm:w-12 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10"></div>
      <div class="bg-green-500 rounded-full w-10 h-10 sm:w-12 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10"></div>
    </div>

    <div class="flex flex-grow flex-col md:flex-row mt-20">
      <!-- Sidebar -->
      <aside class="w-14 sm:w-14 md:w-14 lg:w-14 h-screen fixed top-11 left-0 px-4 bg-[#F5E2C8] flex flex-col items-center py-2 space-y-6 shadow-lg flex-shrink-0">
        <!-- Logo -->
        <div class="mb-2 mt-4 transition-transform hover:scale-110 duration-300">
          <div class="w-12 sm:w-12 md:w-12 lg:w-12 sm:h-12 md:h-12 lg:h-12 bg-[#BD1E1E] rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
            <a href="/" title="Home">
              <img class="w-fit h-fit p-2 group-hover:scale-110 transition-transform duration-300"
              src="@/assets/tank.png" alt="Logo" />
            </a>
          </div>
        </div>
        <!-- Navigation -->
        <nav class="flex flex-col gap-6">
          <div class="w-12 sm:w-12 md:w-12 lg:w-12 sm:h-12 md:h-12 lg:h-12">
            <a href="/data" title="Data" class="flex items-center justify-center rounded-xl bg-[#18206F] shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
            <img class="w-12 h-12 md:w-14 md:h-12 p-2 group-hover:scale-110 transition-transform duration-300" src="@/assets/angkadata.png" alt="Data" />
          </a>
          </div>

          <a href="/charts" title="Charts" class="flex items-center justify-center rounded-xl bg-[#18206F] shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
            <img class="w-12 h-12 md:w-12 md:h-12 p-2 group-hover:scale-110 transition-transform duration-300" src="@/assets/charts.png" alt="Charts" />
          </a>
          <a href="/history" title="History" class="flex items-center justify-center rounded-xl bg-[#18206F] shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
            <img class="w-12 h-12 sm:w-12 sm:h-12 md:w-12 md:h-12 p-2 group-hover:scale-110 transition-transform duration-300" src="@/assets/history.png" alt="History" />
          </a>
        </nav>
      </aside>

      <!-- Main Section -->
      <div class="flex-grow flex flex-col overflow-y-auto ml-24 mr-6">
        <!-- Main Section with Background Image and Text -->
        <div class="relative flex-grow flex justify-center items-center">
          <div class="relative w-full max-w-[90%] mb-16 mt-8">
            <img class="w-full sm:w-full md:w-full h-auto opacity-60 rounded-3xl blur-sm" src="@/assets/img1.png" alt="Background" />
          </div>
          <!-- Text Overlay -->
          <div class="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
            <h1 data-aos="zoom-in" data-aos-duration="2000" class="underline decoration-[#BD1E1E] font-bold text-white tracking-wider mb-2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
              With Great Intelligence
            </h1>
            <h2 data-aos="zoom-in" data-aos-duration="2000" class="underline decoration-white font-semibold text-[#BD1E1E] lg:mt-4 sm:mb-4 tracking-wider text-sm sm:text-xl md:text-2xl lg:text-3xl">
              Comes a Great Many Tasks
            </h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Member Section -->
    <div class="ml-24 mr-6"> 
      <h1 class="text-white font-bold text-xl md:text-3xl text-center">Members</h1>
    </div>

    <!-- Cards Section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8 px-4 md:px-8 lg:px-12 ml-24 mr-6"> <!-- Added ml-24 here to make sure the cards don't overlap the sidebar -->
      <!-- Card 1 -->
      <div class="relative group duration-500 cursor-pointer mb-6 overflow-hidden text-gray-50 max-w-full rounded-2xl hover:duration-700">
        <div class="w-full h-96 bg-[#A52422] text-gray-800">
          <img class="w-full h-full object-cover" src="@/assets/davin2.png" alt="Anggota 1" />
        </div>
        <div class="absolute bg-[#A4BAB7] -bottom-20 w-full p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
          <span class="text-[#91091E] font-bold text-xs">Mechatronic, Web, Wiring</span>
          <span class="text-gray-800 font-bold text-xl">Muhammad Davin PPA</span>
          <p class="text-neutral-800 text-xs">Saya Mahasiswa Institut Teknologi Nasional Bandung.</p>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="relative group duration-500 cursor-pointer mb-6 overflow-hidden text-gray-50 max-w-full rounded-2xl hover:duration-700">
        <div class="w-full h-96 bg-[#A52422] text-gray-800">
          <img class="w-full h-full object-cover" src="@/assets/agung.png" alt="Anggota 2" />
        </div>
        <div class="absolute bg-[#A4BAB7] -bottom-20 w-full p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
          <span class="text-[#91091E] font-bold text-xs">Mechatronic, Mobile, Wiring, IoT</span>
          <span class="text-gray-800 font-bold text-xl">Agung Suryana</span>
          <p class="text-neutral-800 text-xs">Saya Mahasiswa Institut Teknologi Nasional Bandung.</p>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="relative group duration-500 cursor-pointer mb-6 overflow-hidden text-gray-50 max-w-full rounded-2xl hover:duration-700">
        <div class="w-full h-96 bg-[#A52422] text-gray-800">
          <img class="w-full h-full object-cover" src="@/assets/rakha.png" alt="Anggota 3" />
        </div>
        <div class="absolute bg-[#A4BAB7] -bottom-20 w-full p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
          <span class="text-[#91091E] font-bold text-xs">Mechatronic, Web, Wiring</span>
          <span class="text-gray-800 font-bold text-xl">Rakha Dwi Pradifa</span>
          <p class="text-neutral-800 text-xs">Saya Mahasiswa Institut Teknologi Nasional Bandung.</p>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="relative group duration-500 cursor-pointer mb-6 overflow-hidden text-gray-50 max-w-full rounded-2xl hover:duration-700">
        <div class="w-full h-96 bg-[#A52422] text-gray-800">
          <img class="w-full h-full object-cover" src="" alt="Anggota 4" />
        </div>
        <div class="absolute bg-[#A4BAB7] -bottom-20 w-full p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
          <span class="text-[#91091E] font-bold text-xs">Mechatronic</span>
          <span class="text-gray-800 font-bold text-xl">Member 4</span>
          <p class="text-neutral-800 text-xs">Saya Mahasiswa Institut Teknologi Nasional Bandung.</p>
        </div>
      </div>

      <!-- Card 5 -->
      <div class="relative group duration-500 cursor-pointer mb-6 overflow-hidden text-gray-50 max-w-full rounded-2xl hover:duration-700">
        <div class="w-full h-96 bg-[#A52422] text-gray-800">
          <img class="w-full h-full object-cover" src="" alt="Anggota 5" />
        </div>
        <div class="absolute bg-[#A4BAB7] -bottom-20 w-full p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
          <span class="text-[#91091E] font-bold text-xs">Mechatronic</span>
          <span class="text-gray-800 font-bold text-xl">Member 5</span>
          <p class="text-neutral-800 text-xs">Saya Mahasiswa Institut Teknologi Nasional Bandung.</p>
        </div>
      </div>

      <!-- Card 6 -->
      <div class="relative group duration-500 cursor-pointer mb-6 overflow-hidden text-gray-50 max-w-full rounded-2xl hover:duration-700">
        <div class="w-full h-96 bg-[#A52422] text-gray-800">
          <img class="w-full h-full object-cover" src="" alt="Anggota 6" />
        </div>
        <div class="absolute bg-[#A4BAB7] -bottom-20 w-full p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
          <span class="text-[#91091E] font-bold text-xs">Mechatronic</span>
          <span class="text-gray-800 font-bold text-xl">Member 6</span>
          <p class="text-neutral-800 text-xs">Saya Mahasiswa Institut Teknologi Nasional Bandung</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Script setup remains ready for future logic if needed
</script>
