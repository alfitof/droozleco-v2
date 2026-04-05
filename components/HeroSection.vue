<template>
  <section
    ref="heroRef"
    class="relative min-h-screen flex flex-col overflow-hidden bg-drz-black"
  >
    <div class="absolute inset-0 z-0">
      <img
        src="https://placehold.co/1920x1080/0a0a0a/1a1a1a?text=."
        alt=""
        class="w-full h-full object-cover opacity-20"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-drz-black via-drz-black/60 to-drz-black/30"
      ></div>
    </div>

    <!-- MOBILE LAYOUT -->
    <div class="relative z-10 flex flex-col min-h-screen md:hidden">
      <div
        ref="floatImgMobile"
        class="relative w-full pt-24 px-6 flex justify-center"
      >
        <div class="relative w-full max-w-xs">
          <img
            src="https://placehold.co/600x800/111111/C8FF00?text=DROP+001"
            alt="Drop 001"
            class="w-full object-cover"
          />
          <div
            class="absolute -top-4 -right-4 w-16 h-16 bg-drz-lime rounded-full flex items-center justify-center rotate-12 z-10"
          >
            <span
              class="font-mono text-[8px] font-bold text-drz-black text-center leading-tight uppercase"
            >
              NEW<br />DROP<br />SS25
            </span>
          </div>
          <div
            class="absolute bottom-3 left-3 bg-drz-black border border-drz-lime px-3 py-1.5"
          >
            <span class="font-mono text-drz-lime text-xs">Rp 899.000</span>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col justify-end px-6 pb-12 pt-8">
        <div class="flex items-center gap-3 mb-4">
          <span class="w-6 h-px bg-drz-lime"></span>
          <span
            class="font-mono text-drz-lime text-[10px] tracking-widest uppercase"
            >Spring / Summer 2025</span
          >
        </div>
        <h1 class="font-display leading-none mb-6">
          <span
            class="glitch block text-[clamp(4rem,18vw,6rem)] text-drz-white"
            data-text="WEAR THE"
            >WEAR THE</span
          >
          <span
            class="block text-[clamp(4rem,18vw,6rem)] text-drz-lime"
            style="text-shadow: 3px 3px 0 #ff2a2a"
            >RITUAL.</span
          >
        </h1>
        <p class="font-body text-drz-muted text-sm leading-relaxed mb-8">
          Anti-mainstream threads for those<br />who refuse to blend in.
        </p>
        <div class="flex flex-col gap-3">
          <button
            class="w-full bg-drz-lime text-drz-black font-mono text-xs uppercase tracking-widest px-6 py-4 font-bold text-center"
          >
            Shop the Drop →
          </button>
          <button
            class="w-full border border-drz-white/20 text-drz-white font-mono text-xs uppercase tracking-widest px-6 py-4 text-center hover:border-drz-lime hover:text-drz-lime transition-colors"
          >
            Lookbook
          </button>
        </div>
      </div>
    </div>

    <!-- DESKTOP LAYOUT -->
    <div class="relative z-10 hidden md:flex min-h-screen">
      <div class="flex flex-col justify-end px-12 pb-24 w-1/2 xl:w-7/12">
        <div ref="labelRef" class="flex items-center gap-3 mb-6">
          <span class="w-8 h-px bg-drz-lime"></span>
          <span
            class="font-mono text-drz-lime text-xs tracking-widest uppercase"
            >Spring / Summer 2025</span
          >
        </div>
        <h1 ref="headlineRef" class="font-display leading-none mb-6">
          <span
            class="glitch block text-[clamp(4rem,10vw,11rem)] text-drz-white"
            data-text="WEAR THE"
            >WEAR THE</span
          >
          <span
            class="block text-[clamp(4rem,10vw,11rem)] text-drz-lime"
            style="
              text-shadow:
                4px 4px 0 #ff2a2a,
                -2px -2px 0 #050505;
            "
            >RITUAL.</span
          >
        </h1>
        <p
          ref="subRef"
          class="font-body text-drz-muted text-sm md:text-base max-w-xs leading-relaxed mb-10"
        >
          Anti-mainstream threads for those<br />who move in silence but dress
          loud.
        </p>
        <div ref="ctaRef" class="flex items-center gap-4">
          <button
            class="bg-drz-lime text-drz-black font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-drz-white transition-colors duration-300 font-bold whitespace-nowrap"
          >
            Shop the Drop →
          </button>
          <button
            class="border border-drz-white/20 text-drz-white font-mono text-xs uppercase tracking-widest px-6 py-4 hover:border-drz-lime hover:text-drz-lime transition-colors duration-300 whitespace-nowrap"
          >
            Lookbook
          </button>
        </div>
      </div>

      <div
        ref="floatImg"
        class="w-1/2 xl:w-5/12 flex items-center justify-center relative py-24 pr-12"
      >
        <div class="relative">
          <img
            src="https://placehold.co/520x700/111111/C8FF00?text=DROP+001"
            alt="Drop 001"
            class="w-full max-w-sm xl:max-w-md object-cover"
          />
          <div
            class="absolute -top-6 -left-6 w-20 h-20 bg-drz-lime rounded-full flex items-center justify-center rotate-12"
          >
            <span
              class="font-mono text-[9px] font-bold text-drz-black text-center leading-tight uppercase tracking-tight"
            >
              NEW<br />DROP<br />SS25
            </span>
          </div>
          <div
            class="absolute bottom-4 right-4 bg-drz-black border border-drz-lime px-4 py-2"
          >
            <span class="font-mono text-drz-lime text-sm">Rp 899.000</span>
          </div>
          <div
            class="absolute top-4 right-4 font-mono text-[10px] text-drz-muted uppercase tracking-widest bg-drz-black/80 px-2 py-1"
          >
            DROP 001
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-drz-lime/40 to-transparent z-20"
    ></div>
    <div
      class="absolute bottom-8 left-12 font-mono text-drz-muted text-[10px] tracking-wider z-20 hidden md:block"
    >
      7.3255° S, 108.3530° E — Ciamis, ID
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const heroRef = ref(null);
const floatImg = ref(null);
const labelRef = ref(null);
const headlineRef = ref(null);
const subRef = ref(null);
const ctaRef = ref(null);

onMounted(() => {
  const initGSAP = () => {
    if (typeof gsap === "undefined") {
      setTimeout(initGSAP, 100);
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(labelRef.value, { y: 20, opacity: 0, duration: 0.8 })
      .from(
        headlineRef.value?.children[0],
        { y: 100, opacity: 0, duration: 1.2 },
        "-=0.4",
      )
      .from(
        headlineRef.value?.children[1],
        { y: 100, opacity: 0, duration: 1.2 },
        "-=0.9",
      )
      .from(subRef.value, { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(ctaRef.value, { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
      .from(floatImg.value, { x: 60, opacity: 0, duration: 1.2 }, "-=1.6");

    gsap.to(floatImg.value, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.value,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  };
  initGSAP();
});
</script>
