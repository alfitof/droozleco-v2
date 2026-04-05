<template>
  <main class="bg-drz-black min-h-screen">
    <AppNav />

    <PageHero
      title="STOCKISTS."
      label="Find Us IRL"
      sub="Toko fisik yang jual Droozle. Datang, coba, rasakan sendiri."
      bgText="STORE"
    />

    <div class="px-6 md:px-12 py-16">
      <!-- Region filter -->
      <div class="flex items-center gap-2 flex-wrap mb-12">
        <button
          v-for="region in regions"
          :key="region"
          @click="activeRegion = region"
          class="font-mono text-[10px] uppercase tracking-widest px-4 py-2 border transition-all"
          :class="
            activeRegion === region
              ? 'border-drz-lime text-drz-lime bg-drz-lime/10'
              : 'border-drz-white/15 text-drz-muted hover:border-drz-white/40 hover:text-drz-white'
          "
        >
          {{ region }}
        </button>
      </div>

      <!-- Stockist list -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="store in filteredStores"
          :key="store.name"
          class="border border-drz-white/10 p-6 hover:border-drz-lime transition-all duration-300 group"
        >
          <div class="flex items-start justify-between mb-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span
                  class="w-2 h-2 rounded-full"
                  :class="store.hasAll ? 'bg-drz-lime' : 'bg-drz-muted'"
                ></span>
                <span
                  class="font-mono text-[10px] text-drz-muted uppercase tracking-widest"
                >
                  {{ store.hasAll ? "Full Collection" : "Selected Items" }}
                </span>
              </div>
              <h3
                class="font-display text-2xl text-drz-white group-hover:text-drz-lime transition-colors"
              >
                {{ store.name }}
              </h3>
            </div>
            <span
              class="tag-pill text-drz-muted border-drz-muted/40 text-[9px]"
              >{{ store.region }}</span
            >
          </div>

          <p class="font-body text-drz-muted text-sm mb-1">
            {{ store.address }}
          </p>
          <p
            class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mb-5"
          >
            {{ store.hours }}
          </p>

          <div class="flex items-center gap-3">
            <a
              :href="store.maps"
              target="_blank"
              class="font-mono text-[10px] uppercase tracking-widest text-drz-muted hover:text-drz-lime transition-colors flex items-center gap-1"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"
                />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Maps
            </a>
            <span class="text-drz-white/10">·</span>
            <a
              :href="`https://ig.com/${store.ig}`"
              target="_blank"
              class="font-mono text-[10px] uppercase tracking-widest text-drz-muted hover:text-drz-lime transition-colors"
            >
              @{{ store.ig }}
            </a>
          </div>
        </div>
      </div>

      <!-- Own a store? CTA -->
      <div
        class="mt-20 border border-dashed border-drz-white/15 p-10 text-center hover:border-drz-lime transition-colors duration-300 group"
      >
        <p
          class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mb-4"
        >
          Stockist Application
        </p>
        <h3
          class="font-display text-4xl text-drz-white mb-4 group-hover:text-drz-lime transition-colors"
        >
          PUNYA TOKO?
        </h3>
        <p class="font-body text-drz-muted text-sm max-w-sm mx-auto mb-8">
          Kami selalu buka untuk kerjasama dengan toko lokal yang punya visi
          sama. Kirim proposal kamu, kami baca semua.
        </p>
        <a
          href="mailto:stockist@droozle.co"
          class="inline-block bg-drz-lime text-drz-black font-mono text-xs uppercase tracking-widest px-8 py-4 font-bold hover:bg-drz-white transition-colors"
        >
          Apply as Stockist →
        </a>
      </div>
    </div>

    <AppFooter />
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import AppNav from "~/components/AppNav.vue";
import AppFooter from "~/components/AppFooter.vue";
import PageHero from "~/components/PageHero.vue";

const regions = ["All", "Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Bali"];
const activeRegion = ref("All");

const stores = [
  {
    name: "Rogue Studio",
    address: "Jl. Kemang Raya No. 12, Jakarta Selatan",
    hours: "Mon–Sat 12.00–21.00",
    region: "Jakarta",
    hasAll: true,
    maps: "#",
    ig: "roguestudio.jkt",
  },
  {
    name: "District Supply",
    address: "Jl. Cipete Raya No. 45, Jakarta Selatan",
    hours: "Tue–Sun 11.00–20.00",
    region: "Jakarta",
    hasAll: false,
    maps: "#",
    ig: "districtsupply",
  },
  {
    name: "Analog Store",
    address: "Jl. Dago No. 67, Bandung",
    hours: "Mon–Sun 10.00–21.00",
    region: "Bandung",
    hasAll: true,
    maps: "#",
    ig: "analogstore.bdg",
  },
  {
    name: "Kreasi Distro",
    address: "Jl. Trunojoyo No. 23, Bandung",
    hours: "Mon–Sat 11.00–20.00",
    region: "Bandung",
    hasAll: false,
    maps: "#",
    ig: "kreasidistro",
  },
  {
    name: "Underground Surabaya",
    address: "Jl. Rungkut Industri No. 88, Surabaya",
    hours: "Mon–Sat 12.00–21.00",
    region: "Surabaya",
    hasAll: true,
    maps: "#",
    ig: "underground.sby",
  },
  {
    name: "Lawas Space",
    address: "Jl. Malioboro No. 100, Yogyakarta",
    hours: "Tue–Sun 10.00–22.00",
    region: "Yogyakarta",
    hasAll: false,
    maps: "#",
    ig: "lawasspace.yk",
  },
  {
    name: "Void Bali",
    address: "Jl. Seminyak No. 5, Bali",
    hours: "Mon–Sun 11.00–23.00",
    region: "Bali",
    hasAll: true,
    maps: "#",
    ig: "void.bali",
  },
];

const filteredStores = computed(() =>
  activeRegion.value === "All"
    ? stores
    : stores.filter((s) => s.region === activeRegion.value),
);
</script>
