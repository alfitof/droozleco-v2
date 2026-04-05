<template>
  <main class="bg-drz-black min-h-screen">
    <AppNav />

    <PageHero
      title="LOOK BOOK."
      label="SS25 — Visual Stories"
      sub="Bukan sekedar foto. Ini cara kami cerita tentang siapa kamu."
      bgText="LOOK"
    />

    <!-- Season tabs -->
    <div
      class="px-6 md:px-12 pt-10 pb-6 flex items-center gap-4 border-b border-drz-white/10"
    >
      <button
        v-for="season in seasons"
        :key="season"
        @click="activeSeason = season"
        class="font-mono text-xs uppercase tracking-widest px-5 py-2.5 border transition-all"
        :class="
          activeSeason === season
            ? 'border-drz-lime text-drz-lime bg-drz-lime/10'
            : 'border-transparent text-drz-muted hover:text-drz-white'
        "
      >
        {{ season }}
      </button>
    </div>

    <!-- Editorial Grid — asymmetric layout -->
    <div class="px-6 md:px-12 py-12">
      <!-- Feature story -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div
          class="md:col-span-3 relative group cursor-pointer overflow-hidden"
        >
          <img
            src="https://placehold.co/900x600/0d0d0d/C8FF00?text=CHAPTER+01+—+VOID"
            alt="Chapter 01"
            class="w-full aspect-[4/3] md:aspect-auto md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style="min-height: 400px"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-drz-black/90 via-transparent to-transparent flex items-end p-8"
          >
            <div>
              <p
                class="font-mono text-drz-lime text-[10px] uppercase tracking-widest mb-2"
              >
                Chapter 01
              </p>
              <h2
                class="font-display text-5xl text-drz-white leading-none mb-3"
              >
                VOID
              </h2>
              <p class="font-body text-drz-muted text-sm max-w-xs">
                Ketika kekosongan menjadi pernyataan. All-black. Semua volume.
              </p>
            </div>
          </div>
        </div>
        <div class="md:col-span-2 flex flex-col gap-4">
          <div class="relative group cursor-pointer overflow-hidden flex-1">
            <img
              src="https://placehold.co/600x400/111111/ffffff?text=CHAPTER+02+—+SPECTER"
              alt="Chapter 02"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style="min-height: 190px"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-drz-black/80 to-transparent flex items-end p-6"
            >
              <div>
                <p
                  class="font-mono text-drz-lime text-[10px] uppercase tracking-widest mb-1"
                >
                  Chapter 02
                </p>
                <h3 class="font-display text-3xl text-drz-white">SPECTER</h3>
              </div>
            </div>
          </div>
          <div class="relative group cursor-pointer overflow-hidden flex-1">
            <img
              src="https://placehold.co/600x400/141414/FF2A2A?text=CHAPTER+03+—+HAZARD"
              alt="Chapter 03"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style="min-height: 190px"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-drz-black/80 to-transparent flex items-end p-6"
            >
              <div>
                <p
                  class="font-mono text-drz-red text-[10px] uppercase tracking-widest mb-1"
                >
                  Chapter 03
                </p>
                <h3 class="font-display text-3xl text-drz-white">HAZARD</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3-col strip -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div
          v-for="look in middleLooks"
          :key="look.title"
          class="relative group cursor-pointer overflow-hidden"
        >
          <img
            :src="look.image"
            :alt="look.title"
            class="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-drz-black/80 via-transparent to-transparent flex items-end p-5"
          >
            <div
              class="translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
            >
              <p
                class="font-mono text-drz-lime text-[10px] uppercase tracking-widest mb-1"
              >
                {{ look.tag }}
              </p>
              <h3 class="font-display text-2xl text-drz-white">
                {{ look.title }}
              </h3>
              <p
                class="font-body text-drz-muted text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {{ look.sub }}
              </p>
            </div>
          </div>
          <div
            class="absolute top-3 right-3 font-mono text-[10px] text-drz-muted/70 bg-drz-black/60 px-2 py-1"
          >
            {{ look.num }}
          </div>
        </div>
      </div>

      <!-- Full width film strip -->
      <div class="relative overflow-hidden group cursor-pointer">
        <img
          src="https://placehold.co/1400x500/0a0a0a/C8FF00?text=CHAPTER+07+—+THE+RITUAL"
          alt="The Ritual"
          class="w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style="aspect-ratio: 16/6"
        />
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <p
              class="font-mono text-drz-lime text-xs uppercase tracking-[0.3em] mb-4"
            >
              Final Chapter
            </p>
            <h2
              class="font-display text-drz-white"
              style="font-size: clamp(4rem, 12vw, 10rem); line-height: 0.9"
            >
              THE RITUAL.
            </h2>
          </div>
        </div>
      </div>

      <!-- BTS note -->
      <div
        class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-drz-white/10 pt-16"
      >
        <div>
          <p
            class="font-mono text-drz-lime text-[10px] uppercase tracking-widest mb-4"
          >
            Behind the Shoot
          </p>
          <h3
            class="font-display text-4xl md:text-5xl text-drz-white mb-6 leading-none"
          >
            JAKARTA<br />NEVER<br />SLEEPS.
          </h3>
          <p class="font-body text-drz-muted text-sm leading-relaxed max-w-sm">
            SS25 diambil dalam dua malam di sudut-sudut Jakarta yang jarang
            dilihat orang. Gang sempit, rooftop bocor, dan teman-teman yang mau
            bangun jam 3 pagi demi satu frame yang tepat.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <img
            src="https://placehold.co/300x400/111111/C8FF00?text=BTS+01"
            alt="BTS 1"
            class="w-full aspect-[3/4] object-cover"
          />
          <img
            src="https://placehold.co/300x400/0d0d0d/ffffff?text=BTS+02"
            alt="BTS 2"
            class="w-full aspect-[3/4] object-cover mt-8"
          />
        </div>
      </div>
    </div>

    <AppFooter />
  </main>
</template>

<script setup>
import { ref } from "vue";
import AppNav from "~/components/AppNav.vue";
import AppFooter from "~/components/AppFooter.vue";
import PageHero from "~/components/PageHero.vue";

const seasons = ["SS25", "FW24", "SS24"];
const activeSeason = ref("SS25");

const middleLooks = [
  {
    num: "04",
    title: "RITUAL",
    tag: "Chapter 04 — Layered",
    sub: "Layering bukan soal tebal, tapi soal kedalaman.",
    image: "https://placehold.co/600x800/0a0a0a/C8FF00?text=LOOK+04",
  },
  {
    num: "05",
    title: "GHOST",
    tag: "Chapter 05 — Oversized",
    sub: "Ruang yang berlebih bukan kemalasan — itu kebebasan.",
    image: "https://placehold.co/600x800/0f0f0f/ffffff?text=LOOK+05",
  },
  {
    num: "06",
    title: "STATIC",
    tag: "Chapter 06 — Raw",
    sub: "Belum selesai adalah aesthetic-nya.",
    image: "https://placehold.co/600x800/121212/C8FF00?text=LOOK+06",
  },
];
</script>
