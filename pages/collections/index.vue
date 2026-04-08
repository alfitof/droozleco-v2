<template>
  <main class="bg-drz-black min-h-screen">
    <AppNav />

    <PageHero
      title="COLLECTIONS."
      label="Droozle — All Seasons"
      sub="Every collection is a chapter. Here are all of them."
      bgText="COL"
    />

    <div class="px-6 md:px-12 py-16">
      <div class="relative overflow-hidden group cursor-pointer mb-4">
        <img
          src="https://placehold.co/1400x600/0d0d0d/C8FF00?text=SS25+—+RITUAL"
          alt="SS25 Ritual"
          class="w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style="aspect-ratio: 16/9; min-height: 280px"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-drz-black/95 via-drz-black/50 to-transparent md:bg-gradient-to-r md:from-drz-black/80 md:via-drz-black/30 md:to-transparent flex items-end md:items-center px-6 md:px-12 pb-8 md:pb-0"
        >
          <div class="w-full md:w-auto">
            <div class="flex items-center gap-3 mb-3">
              <span class="w-5 h-px bg-drz-lime"></span>
              <span
                class="font-mono text-drz-lime text-[10px] tracking-widest uppercase"
                >Current Season</span
              >
            </div>
            <h2
              class="font-display text-drz-white leading-none mb-3"
              style="font-size: clamp(2.5rem, 7vw, 6rem)"
            >
              SS25<br />RITUAL
            </h2>
            <p
              class="font-body text-drz-muted text-sm max-w-xs mb-6 hidden md:block"
            >
              12 pieces. 7 looks. One vision.<br />Our darkest collection yet.
            </p>
            <NuxtLink
              to="/shop"
              class="inline-flex items-center gap-2 bg-drz-lime text-drz-black font-mono text-xs uppercase tracking-widest px-6 md:px-8 py-3 md:py-4 font-bold hover:bg-drz-white transition-colors"
            >
              Shop Collection →
            </NuxtLink>
          </div>
        </div>
        <div
          class="absolute top-4 right-4 bg-drz-black/70 border border-drz-lime px-3 py-1.5"
        >
          <span class="font-mono text-drz-lime text-xs">12 Pieces</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div
          v-for="col in collections"
          :key="col.name"
          class="relative overflow-hidden group cursor-pointer"
        >
          <img
            :src="col.image"
            :alt="col.name"
            class="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-drz-black/90 via-drz-black/20 to-transparent flex flex-col justify-end p-6"
          >
            <div
              class="translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
            >
              <p
                class="font-mono text-[10px] uppercase tracking-widest mb-1"
                :style="{ color: col.accent }"
              >
                {{ col.season }}
              </p>
              <h3 class="font-display text-3xl text-drz-white mb-2">
                {{ col.name }}
              </h3>
              <p
                class="font-body text-drz-muted text-xs mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {{ col.desc }}
              </p>
              <div class="flex items-center justify-between">
                <span
                  class="font-mono text-drz-muted text-[10px] uppercase tracking-widest"
                  >{{ col.pieces }} pieces</span
                >
                <span
                  class="font-mono text-[10px] uppercase tracking-widest px-3 py-1 border"
                  :class="
                    col.available
                      ? 'border-drz-lime text-drz-lime'
                      : 'border-drz-muted text-drz-muted'
                  "
                >
                  {{ col.available ? "Available" : "Archived" }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="col in archiveCollections"
          :key="col.name"
          class="relative overflow-hidden group cursor-pointer"
        >
          <img
            :src="col.image"
            :alt="col.name"
            class="w-full aspect-[16/9] object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-drz-black/80 to-transparent flex items-end p-6"
          >
            <div class="flex items-end justify-between w-full">
              <div>
                <p
                  class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mb-1"
                >
                  {{ col.season }}
                </p>
                <h3 class="font-display text-3xl text-drz-white">
                  {{ col.name }}
                </h3>
              </div>
              <span
                class="font-mono text-drz-muted text-[10px] uppercase tracking-widest border border-drz-muted px-3 py-1"
                >Archived</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </main>
</template>

<script setup>
import AppNav from "~/components/AppNav.vue";
import AppFooter from "~/components/AppFooter.vue";
import PageHero from "~/components/PageHero.vue";

const collections = [
  {
    name: "VOID",
    season: "SS25 — Chapter 01",
    desc: "All black. All oversized. No compromise.",
    pieces: 4,
    available: true,
    accent: "#C8FF00",
    image: "https://placehold.co/600x750/0d0d0d/C8FF00?text=VOID",
  },
  {
    name: "SPECTER",
    season: "SS25 — Chapter 02",
    desc: "Ghost silhouettes that haunt every room.",
    pieces: 3,
    available: true,
    accent: "#ffffff",
    image: "https://placehold.co/600x750/111111/ffffff?text=SPECTER",
  },
  {
    name: "HAZARD",
    season: "SS25 — Chapter 03",
    desc: "Utility meets danger. Color that stays dark.",
    pieces: 5,
    available: true,
    accent: "#FF2A2A",
    image: "https://placehold.co/600x750/141414/FF2A2A?text=HAZARD",
  },
];

const archiveCollections = [
  {
    name: "SIGNAL",
    season: "FW24",
    image: "https://placehold.co/800x450/0a0a0a/C8FF00?text=SIGNAL+FW24",
  },
  {
    name: "NOISE",
    season: "SS24",
    image: "https://placehold.co/800x450/0d0d0d/ffffff?text=NOISE+SS24",
  },
];
</script>
