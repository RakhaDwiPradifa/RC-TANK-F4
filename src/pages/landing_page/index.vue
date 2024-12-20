<template>
  <section class="w-full flex flex-col bg-white min-h-screen overflow-hidden">
  <div class="relative bg-[#001F3F] flex min-h-screen overflow-hidden">
    <div class="flex flex-grow flex-col md:flex-row">
      <!-- Sidebar -->
      <aside class="w-14 sm:w-14 md:w-14 lg:w-14 h-screen fixed left-6 px-4 bg-[#001F3F] flex flex-col items-center py-2 space-y-4 shadow-lg flex-shrink-0">
        <!-- Logo -->
        <div class="mt-72 mb-2 mt-4 transition-transform hover:scale-110 duration-300">
          <div class="w-16 sm:w-16 md:w-16 lg:w-16 sm:h-14 md:h-14 lg:h-14 bg-[#47B5FF] rounded-3xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
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
          <a href="/history" title="History" class="flex items-center justify-center rounded-3xl bg-[#E5E1DA] shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
            <img class="w-16 sm:w-16 md:w-16 lg:w-16 sm:h-14 md:h-14 lg:h-14 p-2 group-hover:scale-110 transition-transform duration-300" src="@/assets/history.png" alt="History" />
          </a>
        </nav>
      </aside>

      <!-- Main Section -->
      <div class="flex-grow flex flex-col overflow-y-auto ml-[55px]">
        <!-- Main Section with Background Image and Text -->
          <!-- Text Overlay -->
          <div class="mt-72 relative inset-0 flex flex-col justify-center items-center text-center p-4">
            <h1 data-aos="zoom-in" data-aos-duration="2000" class="font-bold text-[#47B5FF] tracking-wider mb-2 text-2xl sm:text-4xl md:text-5xl lg:text-9xl">
              With Great Intelligence
            </h1>
            <h2 data-aos="zoom-in" data-aos-duration="2000" class=" font-semibold text-[#E5E1DA] lg:mt-4 sm:mb-4 tracking-wider text-sm sm:text-xl md:text-2xl lg:text-6xl">
              Comes a Great Many Tasks
            </h2>
        </div>
      </div>
    </div>

    <!-- Cards Section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8 px-4 md:px-8 lg:px-12 ml-24 mr-6"> <!-- Added ml-24 here to make sure the cards don't overlap the sidebar -->
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
        <div class="w-full h-96 bg-[#91091E] text-gray-800">
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
  </div>
  </section>
</template>

<script setup>
// Script setup remains ready for future logic if needed
</script>
