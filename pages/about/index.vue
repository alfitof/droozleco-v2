<template>
  <main class="bg-drz-black min-h-screen">
    <AppNav />

    <!-- Custom hero for about -->
    <div
      class="relative min-h-[70vh] flex flex-col justify-end overflow-hidden"
    >
      <img
        src="https://placehold.co/1400x800/0a0a0a/1a1a1a?text=."
        alt=""
        class="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-drz-black to-transparent"
      ></div>
      <div class="relative z-10 px-6 md:px-12 pb-20">
        <p
          class="font-mono text-drz-lime text-[10px] uppercase tracking-widest mb-4 flex items-center gap-3"
        >
          <span class="w-6 h-px bg-drz-lime inline-block"></span>
          About Droozle
        </p>
        <h1
          class="font-display leading-none text-drz-white"
          style="font-size: clamp(4rem, 13vw, 12rem)"
        >
          WE ARE<br /><span class="text-drz-lime">DROOZLE.</span>
        </h1>
      </div>
    </div>

    <!-- Manifesto -->
    <div class="px-6 md:px-12 py-24 border-b border-drz-white/10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <p
            class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mb-6"
          >
            Our Manifesto
          </p>
          <blockquote
            class="font-display text-drz-white leading-tight mb-8"
            style="font-size: clamp(2rem, 4vw, 3.5rem)"
          >
            "KAMI TIDAK BUAT BAJU.<br />
            KAMI BUAT IDENTITAS."
          </blockquote>
          <p class="font-body text-drz-muted text-sm leading-relaxed max-w-md">
            Droozle lahir di Jakarta pada 2022 dari satu kamar kos dan satu
            keyakinan: streetwear lokal bisa sama brutalnya dengan brand luar.
            Kami tidak punya investor. Kami tidak punya kantor fancy. Yang kami
            punya adalah visi, printer DTG satu unit, dan komunitas yang percaya
            bahwa tampil beda adalah hak semua orang.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <img
            src="https://placehold.co/300x380/111111/C8FF00?text=DRZ+01"
            alt=""
            class="w-full aspect-[4/5] object-cover"
          />
          <img
            src="https://placehold.co/300x380/0d0d0d/ffffff?text=DRZ+02"
            alt=""
            class="w-full aspect-[4/5] object-cover mt-10"
          />
        </div>
      </div>
    </div>

    <!-- Numbers -->
    <div class="px-6 md:px-12 py-20 border-b border-drz-white/10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div v-for="stat in stats" :key="stat.label" class="group">
          <div
            class="font-display text-drz-lime leading-none mb-2"
            style="font-size: clamp(3rem, 6vw, 5rem)"
          >
            {{ stat.value }}
          </div>
          <div
            class="font-mono text-drz-muted text-[10px] uppercase tracking-widest"
          >
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- Values -->
    <div class="px-6 md:px-12 py-24 border-b border-drz-white/10">
      <p
        class="font-mono text-drz-lime text-[10px] uppercase tracking-widest mb-12 flex items-center gap-3"
      >
        <span class="w-6 h-px bg-drz-lime"></span>
        What We Stand For
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="val in values" :key="val.title" class="group">
          <div
            class="w-10 h-10 border border-drz-lime flex items-center justify-center mb-6 group-hover:bg-drz-lime transition-colors duration-300"
          >
            <component
              :is="val.icon"
              class="w-4 h-4 text-drz-lime group-hover:text-drz-black transition-colors duration-300"
            />
          </div>
          <h3 class="font-display text-2xl text-drz-white mb-3">
            {{ val.title }}
          </h3>
          <p class="font-body text-drz-muted text-sm leading-relaxed">
            {{ val.desc }}
          </p>
        </div>
      </div>
    </div>

    <!-- Team -->
    <div class="px-6 md:px-12 py-24 border-b border-drz-white/10">
      <p
        class="font-mono text-drz-lime text-[10px] uppercase tracking-widest mb-12 flex items-center gap-3"
      >
        <span class="w-6 h-px bg-drz-lime"></span>
        The Crew
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="member in team"
          :key="member.name"
          class="group cursor-pointer"
        >
          <div class="relative overflow-hidden mb-4">
            <img
              :src="member.image"
              :alt="member.name"
              class="w-full aspect-square object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            />
          </div>
          <p class="font-display text-drz-white text-xl">{{ member.name }}</p>
          <p
            class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mt-1"
          >
            {{ member.role }}
          </p>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="px-6 md:px-12 py-24 text-center">
      <p
        class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mb-6"
      >
        Ready?
      </p>
      <h2
        class="font-display text-drz-white leading-none mb-10"
        style="font-size: clamp(3rem, 9vw, 8rem)"
      >
        JOIN THE<br /><span class="text-drz-lime">RITUAL.</span>
      </h2>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <NuxtLink
          to="/shop"
          class="bg-drz-lime text-drz-black font-mono text-xs uppercase tracking-widest px-10 py-4 font-bold hover:bg-drz-white transition-colors"
        >
          Shop Now →
        </NuxtLink>
        <NuxtLink
          to="/lookbook"
          class="border border-drz-white/20 text-drz-white font-mono text-xs uppercase tracking-widest px-10 py-4 hover:border-drz-lime hover:text-drz-lime transition-colors"
        >
          See Lookbook
        </NuxtLink>
      </div>
    </div>

    <AppFooter />
  </main>
</template>

<script setup>
import AppNav from "~/components/AppNav.vue";
import AppFooter from "~/components/AppFooter.vue";

const stats = [
  { value: "2022", label: "Founded in Jakarta" },
  { value: "40+", label: "Drops Released" },
  { value: "12K+", label: "Units Sold" },
  { value: "100%", label: "Local Made" },
];

const values = [
  {
    title: "NO RESTOCK.",
    desc: "Setiap drop adalah limited. Begitu habis, habis. Ini bukan kelangkaan buatan — ini komitmen bahwa yang kamu punya benar-benar spesial.",
    icon: {
      template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18.36 6.64a9 9 0 11-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>`,
    },
  },
  {
    title: "LOCAL FIRST.",
    desc: "Semua produksi di Indonesia. Semua vendor lokal. Semua talent lokal. Bukan karena lebih murah, tapi karena kami percaya kualitas ada di sini.",
    icon: {
      template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>`,
    },
  },
  {
    title: "NO RULES.",
    desc: 'Tidak ada dress code di sini. Tidak ada "cara yang benar" untuk memakai produk kami. Pakai sesuai cara kamu. Itu selalu benar.',
    icon: {
      template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    },
  },
];

const team = [
  {
    name: "Reza",
    role: "Founder & Creative Director",
    image: "https://placehold.co/300x300/111111/C8FF00?text=RZ",
  },
  {
    name: "Nadia",
    role: "Head of Design",
    image: "https://placehold.co/300x300/0d0d0d/ffffff?text=ND",
  },
  {
    name: "Farel",
    role: "Production Lead",
    image: "https://placehold.co/300x300/141414/C8FF00?text=FR",
  },
  {
    name: "Kiki",
    role: "Community & Marketing",
    image: "https://placehold.co/300x300/111111/ffffff?text=KK",
  },
];
</script>
