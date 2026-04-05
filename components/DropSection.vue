<template>
  <section
    ref="sectionRef"
    class="relative py-32 px-6 md:px-12 overflow-hidden bg-drz-lime"
    style="margin: 60px 0; clip-path: polygon(0 4%, 100% 0%, 100% 96%, 0% 100%)"
  >
    <!-- Background text -->
    <div
      class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
    >
      <span
        class="font-display text-[25vw] text-drz-black/10 leading-none select-none whitespace-nowrap"
        >SS25</span
      >
    </div>

    <div
      ref="contentRef"
      class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12"
    >
      <!-- Left -->
      <div>
        <p
          class="font-mono text-drz-black/60 text-xs uppercase tracking-widest mb-4"
        >
          Limited Release
        </p>
        <h2
          class="font-display text-[clamp(3rem,9vw,8rem)] text-drz-black leading-none mb-6"
        >
          NEXT DROP<br />THURSDAY.
        </h2>
        <p
          class="font-body text-drz-black/70 max-w-xs text-sm leading-relaxed mb-8"
        >
          Only 50 units. No restocks. No excuses. Sign up and be the first to
          cop.
        </p>

        <!-- Countdown -->
        <div class="flex items-center gap-6 mb-10">
          <div v-for="unit in countdown" :key="unit.label" class="text-center">
            <div class="font-display text-5xl text-drz-black leading-none">
              {{ unit.value }}
            </div>
            <div
              class="font-mono text-[10px] text-drz-black/60 uppercase tracking-widest mt-1"
            >
              {{ unit.label }}
            </div>
          </div>
        </div>

        <!-- Email input -->
        <div class="flex gap-0 max-w-sm">
          <input
            type="email"
            placeholder="your@email.com"
            class="flex-1 bg-drz-black text-drz-white font-mono text-xs px-4 py-4 outline-none placeholder:text-drz-muted border-2 border-drz-black"
          />
          <button
            class="bg-drz-black text-drz-lime font-mono text-xs uppercase tracking-widest px-6 py-4 hover:bg-drz-white hover:text-drz-black transition-colors border-2 border-drz-black font-bold shrink-0"
          >
            Notify Me
          </button>
        </div>
      </div>

      <!-- Right image -->
      <div class="relative shrink-0">
        <img
          src="https://placehold.co/400x520/111111/C8FF00?text=NEXT+DROP"
          alt="Next Drop Preview"
          class="w-64 md:w-80 object-cover"
          style="filter: grayscale(30%) contrast(1.1)"
        />
        <div
          class="absolute -bottom-4 -right-4 w-full h-full border-2 border-drz-black pointer-events-none"
        ></div>
        <div
          class="absolute top-4 left-4 bg-drz-red text-drz-white font-mono text-xs px-3 py-1 uppercase tracking-widest"
        >
          ⚡ Limited
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const sectionRef = ref(null);
const contentRef = ref(null);

function getNextThursday() {
  const now = new Date();
  const day = now.getDay();
  const daysUntilThursday = (4 - day + 7) % 7 || 7;
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntilThursday);
  next.setHours(10, 0, 0, 0);
  return next;
}

const countdown = ref([
  { label: "Days", value: "00" },
  { label: "Hrs", value: "00" },
  { label: "Min", value: "00" },
  { label: "Sec", value: "00" },
]);

let timer = null;

function updateCountdown() {
  const diff = getNextThursday() - new Date();
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);
  countdown.value = [
    { label: "Days", value: String(d).padStart(2, "0") },
    { label: "Hrs", value: String(h).padStart(2, "0") },
    { label: "Min", value: String(m).padStart(2, "0") },
    { label: "Sec", value: String(s).padStart(2, "0") },
  ];
}

onMounted(() => {
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);

  const initGSAP = () => {
    if (typeof gsap === "undefined") {
      setTimeout(initGSAP, 100);
      return;
    }
    gsap.from(contentRef.value, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 75%" },
    });
  };
  initGSAP();
});

onUnmounted(() => clearInterval(timer));
</script>
