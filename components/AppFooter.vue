<template>
  <footer
    class="bg-drz-gray border-t border-drz-white/10 pt-20 pb-10 px-6 md:px-12"
  >
    <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
      <div class="md:col-span-2">
        <h3 class="font-display text-6xl text-drz-white mb-4 leading-none">
          DROOZLE<span class="text-drz-lime">.</span>CO
        </h3>
        <p
          class="font-body text-drz-muted text-sm leading-relaxed max-w-xs mb-8"
        >
          Underground streetwear born in Ciamis. Worn by those who refuse to be
          ordinary. New drop every Thursday at 10.00 WIB.
        </p>
        <div class="flex items-center gap-4">
          <a
            v-for="social in socials"
            :key="social"
            href="#"
            class="font-mono text-xs text-drz-muted uppercase tracking-widest hover:text-drz-lime transition-colors"
          >
            {{ social }}
          </a>
        </div>
      </div>

      <div v-for="col in linkCols" :key="col.title">
        <p
          class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mb-5"
        >
          {{ col.title }}
        </p>
        <ul class="flex flex-col gap-3">
          <li v-for="link in col.links" :key="link">
            <a
              href="#"
              class="font-body text-drz-white text-sm hover:text-drz-lime transition-colors"
              >{{ link }}</a
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="w-full h-px bg-drz-white/10 mb-8"></div>

    <div
      class="flex flex-col md:flex-row items-center justify-between gap-4 mb-0"
    >
      <p class="font-mono text-drz-muted text-[10px] uppercase tracking-widest">
        © 2022 DROOZLE.CO — All Rights Reserved
      </p>

      <p class="font-mono text-drz-muted text-[10px] uppercase tracking-widest">
        Privacy · Terms · Cookies
      </p>
    </div>

    <div class="w-full overflow-hidden mt-8 leading-none">
      <p
        class="font-display text-drz-white/[0.04] leading-none select-none pointer-events-none"
        style="
          font-size: clamp(3.5rem, 18vw, 18rem);
          letter-spacing: -0.02em;
          line-height: 0.85;
        "
      >
        DROOZLE
      </p>
    </div>
  </footer>
</template>

<script setup>
const socials = ["IG", "TT", "WA", "Tokopedia"];

const linkCols = [
  {
    title: "Shop",
    links: ["New Drops", "Collections", "Lookbook", "Headwear", "Accessories"],
  },
  {
    title: "Info",
    links: [
      "About Us",
      "Lookbook",
      "Stockists",
      "Size Guide",
      "Shipping",
      "Returns",
    ],
  },
];
</script>
