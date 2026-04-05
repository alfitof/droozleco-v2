<template>
  <main class="bg-drz-black min-h-screen">
    <AppNav />

    <PageHero
      title="STOCKISTS."
      label="Find Us IRL"
      sub="Physical stores carrying Droozle. Come in, try it on, feel the difference."
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
              class="font-mono text-[10px] uppercase tracking-widest text-drz-muted hover:text-drz-lime transition-colors flex items-center gap-1.5"
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
              :href="`https://instagram.com/${store.ig}`"
              target="_blank"
              class="font-mono text-[10px] uppercase tracking-widest text-drz-muted hover:text-drz-lime transition-colors"
            >
              @{{ store.ig }}
            </a>
          </div>
        </div>
      </div>

      <!-- Empty state if filter yields nothing -->
      <div v-if="filteredStores.length === 0" class="py-24 text-center">
        <p class="font-display text-5xl text-drz-white/10 mb-4">NONE YET.</p>
        <p class="font-mono text-drz-muted text-xs uppercase tracking-widest">
          No stockists in this region yet. Check back soon.
        </p>
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

const regions = ["All", "Ciamis"];
const activeRegion = ref("All");

const stores = [
  {
    name: "Droozle Flagship",
    address: "Jl. Sudirman No. 88, Ciamis, Jawa Barat 46211",
    hours: "Mon–Sat 10.00–20.00 WIB",
    region: "Ciamis",
    hasAll: true,
    maps: "#",
    ig: "droozle.co",
  },
];

const filteredStores = computed(() =>
  activeRegion.value === "All"
    ? stores
    : stores.filter((s) => s.region === activeRegion.value),
);
</script>
