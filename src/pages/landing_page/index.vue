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
            <div class="w-16 h-16 bg-[#47B5FF] rounded-3xl flex items-center justify-center shadow-lg">
              <a href="/" title="Home">
                <img class="w-12 h-12 p-2" src="@/assets/tank.png" alt="Logo" />
              </a>
            </div>
          </div>
          <!-- Navigation -->
          <nav class="flex flex-col gap-6">
            <a
              href="/data"
              class="w-16 h-16 bg-[#E5E1DA] rounded-3x flex items-center justify-center hover:shadow-lg rounded-3xl"
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
          <a href="/data" class="w-12 h-12 flex items-center justify-center">
            <img class="w-8 h-8 icon-mobile" src="@/assets/angkadata.png" alt="Data" />
          </a>
          <a href="/charts" class="w-12 h-12 flex items-center justify-center">
            <img class="w-8 h-8 icon-mobile" src="@/assets/charts.png" alt="Charts" />
          </a>
          <a href="/history" class="w-12 h-12 flex items-center justify-center">
            <img class="w-8 h-8 icon-mobile" src="@/assets/history.png" alt="History" />
          </a>
        </nav>

        <!-- Main Section -->
        <div class="flex-grow flex flex-col overflow-y-auto md:ml-[100px]">
          <!-- Background with Text -->
          <div class="relative flex flex-col justify-center items-center min-h-screen text-center px-6 md:px-4">
            <div class="relative z-10 bg-black/50 p-8 md:p-6 rounded-xl">
              <h1 class="text-[#47B5FF] text-4xl md:text-6xl font-bold">
                With Great Intelligence
              </h1>
              <h2 class="text-[#E5E1DA] text-xl md:text-4xl mt-4">
                Comes a Great Many Tasks
              </h2>
            </div>
            <img
              class="absolute top-0 w-full h-full object-cover opacity-50 rounded-2xl"
              src="@/assets/img1.png"
              alt="Background"
            />
          </div>

          <!-- Cards Section -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-4 py-6"
          >
            <template v-for="(member, index) in members" :key="index">
              <div
                class="relative group w-full mx-auto bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 duration-300"
              >
                <img
                  class="w-full h-72 object-cover"
                  :src="member.image"
                  :alt="member.name"
                />
                <div
                  class="absolute bg-[#A4BAB7] -bottom-20 w-full p-4 group-hover:bottom-0 transition-all duration-300"
                >
                  <span class="text-[#91091E] text-sm font-semibold">
                    {{ member.skills }}
                  </span>
                  <span
                    class="block text-gray-800 text-xl font-bold mt-1"
                  >
                    {{ member.name }}
                  </span>
                  <p class="text-neutral-800 text-sm mt-2">
                    {{ member.description }}
                  </p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import davinImage from "@/assets/davin2.png";
import agungImage from "@/assets/agung.png";
import rakhaImage from "@/assets/rakha.png";
import zulfanImage from "@/assets/zulfan.png";

export default {
  data() {
    return {
      members: [
        {
          name: "Muhammad Davin PPA",
          skills: "Mechatronic, Web, Wiring",
          description: "Saya Mahasiswa Institut Teknologi Nasional Bandung.",
          image: davinImage,
        },
        {
          name: "Agung Suryana",
          skills: "Mechatronic, Mobile, Wiring, IoT",
          description: "Saya Mahasiswa Institut Teknologi Nasional Bandung.",
          image: agungImage,
        },
        {
          name: "Rakha Dwi Pradifa",
          skills: "Mechatronic, Web, Wiring",
          description: "Saya Mahasiswa Institut Teknologi Nasional Bandung.",
          image: rakhaImage,
        },
        {
          name: "M Zulfan Anggadhiputra",
          skills: "Mechatronic, Wiring",
          description: "Saya Mahasiswa Institut Teknologi Nasional Bandung.",
          image: zulfanImage,
        },
      ],
    };
  },
};
</script>

<style scoped>
@media (max-width: 767px) {
  .icon-mobile {
    filter: invert(1); /* Mengubah ikon menjadi putih */
  }
}
</style>
