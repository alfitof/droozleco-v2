<template>
  <section ref="sectionRef" class="py-24 px-6 md:px-12 bg-drz-black">
    <!-- Header -->
    <div class="mb-16 flex items-end justify-between">
      <div>
        <p
          class="font-mono text-drz-muted text-xs uppercase tracking-widest mb-3"
        >
          — Lookbook
        </p>
        <h2
          ref="titleRef"
          class="font-display text-[clamp(3rem,8vw,7rem)] text-drz-white leading-none"
        >
          <span class="text-outline-lime">LOOK</span><br />BOOK.
        </h2>
      </div>
      <div class="hidden md:flex gap-3">
        <button
          @click="prev"
          :disabled="currentSlide === 0"
          class="w-12 h-12 border text-drz-white flex items-center justify-center font-mono text-sm transition-all duration-200"
          :class="
            currentSlide === 0
              ? 'border-drz-white/10 text-drz-white/20 cursor-not-allowed'
              : 'border-drz-white/30 hover:border-drz-lime hover:text-drz-lime'
          "
        >
          ←
        </button>
        <button
          @click="next"
          :disabled="currentSlide >= maxSlide"
          class="w-12 h-12 border text-drz-white flex items-center justify-center font-mono text-sm transition-all duration-200"
          :class="
            currentSlide >= maxSlide
              ? 'border-drz-white/10 text-drz-white/20 cursor-not-allowed'
              : 'border-drz-white/30 hover:border-drz-lime hover:text-drz-lime'
          "
        >
          →
        </button>
      </div>
    </div>

    <!-- Slider wrapper -->
    <div class="overflow-hidden" ref="sliderWrapper">
      <div
        ref="sliderTrack"
        class="flex gap-4 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform"
        :style="{
          transform: `translateX(-${currentSlide * computedSlideWidth}px)`,
        }"
      >
        <div
          v-for="(look, i) in looks"
          :key="i"
          class="shrink-0 relative group cursor-pointer"
          :style="{ width: cardWidth + 'px' }"
        >
          <div class="relative overflow-hidden">
            <img
              :src="look.image"
              :alt="look.title"
              class="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-drz-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
            >
              <div>
                <p
                  class="font-mono text-drz-lime text-[10px] uppercase tracking-widest mb-1"
                >
                  {{ look.tag }}
                </p>
                <p class="font-display text-drz-white text-2xl">
                  {{ look.title }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="absolute top-3 right-3 font-mono text-[10px] text-drz-muted bg-drz-black/70 px-2 py-1"
          >
            {{ String(i + 1).padStart(2, "0") }}
          </div>
        </div>
      </div>
    </div>

    <!-- Dots — jumlah = maxSlide + 1 (posisi navigasi yang valid) -->
    <div class="flex items-center gap-2 mt-8 justify-center md:justify-start">
      <button
        v-for="i in dotCount"
        :key="i - 1"
        @click="goTo(i - 1)"
        class="transition-all duration-300 rounded-sm"
        :class="
          currentSlide === i - 1
            ? 'w-8 h-1.5 bg-drz-lime'
            : 'w-1.5 h-1.5 rounded-full bg-drz-muted hover:bg-drz-white'
        "
        :aria-label="`Go to position ${i}`"
      ></button>
    </div>

    <p
      class="text-center font-mono text-[10px] text-drz-muted/50 uppercase tracking-widest mt-4 md:hidden"
    >
      ← Swipe →
    </p>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const sectionRef = ref(null);
const titleRef = ref(null);
const sliderWrapper = ref(null);
const currentSlide = ref(0);
const cardWidth = ref(320);
const GAP = 16;

const visibleCards = ref(1);

const computedSlideWidth = computed(() => cardWidth.value + GAP);

// Slide terjauh yang bisa dicapai
const maxSlide = computed(() => Math.max(0, looks.length - visibleCards.value));

// Jumlah dots = jumlah posisi navigasi yang valid (0 s/d maxSlide)
const dotCount = computed(() => maxSlide.value + 1);

const looks = [
  {
    title: "VOID SET",
    tag: "Look 01 — All Black",
    image: "https://placehold.co/380x507/0d0d0d/C8FF00?text=LOOK+01",
  },
  {
    title: "SPECTER",
    tag: "Look 02 — Monochrome",
    image: "https://placehold.co/380x507/111111/ffffff?text=LOOK+02",
  },
  {
    title: "HAZARD",
    tag: "Look 03 — Utility",
    image: "https://placehold.co/380x507/141414/FF2A2A?text=LOOK+03",
  },
  {
    title: "RITUAL",
    tag: "Look 04 — Layered",
    image: "https://placehold.co/380x507/0a0a0a/C8FF00?text=LOOK+04",
  },
  {
    title: "GHOST",
    tag: "Look 05 — Oversized",
    image: "https://placehold.co/380x507/0f0f0f/ffffff?text=LOOK+05",
  },
  {
    title: "STATIC",
    tag: "Look 06 — Raw",
    image: "https://placehold.co/380x507/121212/C8FF00?text=LOOK+06",
  },
];

function calculateDimensions() {
  if (!sliderWrapper.value) return;
  const wrapperW = sliderWrapper.value.offsetWidth;
  if (wrapperW < 640) {
    cardWidth.value = Math.min(wrapperW - 40, 300);
    visibleCards.value = 1;
  } else if (wrapperW < 1024) {
    cardWidth.value = Math.floor((wrapperW - GAP * 2) / 2.2);
    visibleCards.value = 2;
  } else {
    cardWidth.value = Math.floor((wrapperW - GAP * 3) / 3.2);
    visibleCards.value = 3;
  }
  // Clamp agar tidak melebihi maxSlide setelah resize
  currentSlide.value = Math.min(currentSlide.value, maxSlide.value);
}

function next() {
  if (currentSlide.value < maxSlide.value) currentSlide.value++;
}
function prev() {
  if (currentSlide.value > 0) currentSlide.value--;
}
function goTo(index) {
  currentSlide.value = Math.max(0, Math.min(index, maxSlide.value));
}

let touchStartX = 0;
function onTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}
function onTouchEnd(e) {
  const delta = touchStartX - e.changedTouches[0].clientX;
  if (delta > 40) next();
  else if (delta < -40) prev();
}

onMounted(() => {
  calculateDimensions();
  window.addEventListener("resize", calculateDimensions);
  const wrapper = sliderWrapper.value;
  if (wrapper) {
    wrapper.addEventListener("touchstart", onTouchStart, { passive: true });
    wrapper.addEventListener("touchend", onTouchEnd, { passive: true });
  }

  const initGSAP = () => {
    if (typeof gsap === "undefined") {
      setTimeout(initGSAP, 100);
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(titleRef.value, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 80%" },
    });
  };
  initGSAP();
});

onUnmounted(() => {
  window.removeEventListener("resize", calculateDimensions);
  const wrapper = sliderWrapper.value;
  if (wrapper) {
    wrapper.removeEventListener("touchstart", onTouchStart);
    wrapper.removeEventListener("touchend", onTouchEnd);
  }
});
</script>

<style scoped>
.text-outline-lime {
  -webkit-text-stroke: 2px #c8ff00;
  color: transparent;
}
</style>
