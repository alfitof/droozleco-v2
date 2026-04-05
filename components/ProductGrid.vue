<!-- Ganti seluruh file ProductGrid.vue -->
<template>
  <section ref="sectionRef" class="py-24 px-6 md:px-12 bg-drz-black">
    <div class="flex items-end justify-between mb-16">
      <div>
        <p
          class="font-mono text-drz-muted text-xs tracking-widest uppercase mb-3"
        >
          — New Arrivals
        </p>
        <h2
          ref="titleRef"
          class="font-display text-[clamp(3rem,8vw,7rem)] text-drz-white leading-none"
        >
          FRESH<br /><span class="text-outline">DROPS.</span>
        </h2>
      </div>
      <NuxtLink
        to="/shop"
        class="hidden md:flex items-center gap-2 font-mono text-xs text-drz-muted uppercase tracking-widest hover:text-drz-lime transition-colors group"
      >
        <span>View All</span>
        <span class="transform group-hover:translate-x-1 transition-transform"
          >→</span
        >
      </NuxtLink>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <div
        v-for="(product, index) in products"
        :key="product.id"
        ref="productCards"
        class="product-card cursor-pointer"
        :class="index === 0 ? 'md:col-span-2 md:row-span-2' : ''"
      >
        <div class="relative overflow-hidden bg-drz-gray group">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            :class="index === 0 ? 'aspect-[3/4]' : 'aspect-square'"
          />

          <!-- Hover overlay -->
          <div
            class="product-overlay absolute inset-0 bg-drz-black/70 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <NuxtLink
              :to="`/product/${product.slug}`"
              class="bg-drz-lime text-drz-black font-mono text-[10px] md:text-xs uppercase tracking-widest px-4 md:px-6 py-2.5 md:py-3 font-bold hover:bg-drz-white transition-colors whitespace-nowrap"
            >
              Quick View
            </NuxtLink>
            <NuxtLink
              :to="`/product/${product.slug}`"
              class="border border-drz-white/40 text-drz-white font-mono text-[10px] md:text-xs uppercase tracking-widest px-4 md:px-6 py-2.5 md:py-3 hover:border-drz-lime hover:text-drz-lime transition-colors whitespace-nowrap"
            >
              View Item →
            </NuxtLink>
          </div>

          <!-- Badge -->
          <div class="absolute top-3 left-3">
            <span
              v-if="product.badge"
              class="tag-pill font-bold text-[10px]"
              :class="
                product.badge === 'SOLD OUT'
                  ? 'text-drz-red border-drz-red bg-drz-black/80'
                  : 'text-drz-lime border-drz-lime bg-drz-black/80'
              "
              >{{ product.badge }}</span
            >
          </div>

          <!-- Wishlist button -->
          <button
            @click.prevent="toggleWish(product.id)"
            class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center border transition-all duration-300"
            :class="
              wishlist.includes(product.id)
                ? 'bg-drz-red border-drz-red'
                : 'bg-drz-black/60 border-drz-white/10 opacity-0 group-hover:opacity-100 hover:border-drz-red'
            "
            aria-label="Wishlist"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
              :fill="wishlist.includes(product.id) ? 'white' : 'none'"
              class="text-drz-white"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              />
            </svg>
          </button>
        </div>

        <div class="mt-3 flex items-start justify-between gap-2">
          <div class="min-w-0">
            <p
              class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mb-0.5"
            >
              {{ product.category }}
            </p>
            <h3 class="font-body text-drz-white text-sm font-medium truncate">
              {{ product.name }}
            </h3>
          </div>
          <span class="font-mono text-drz-lime text-sm shrink-0">{{
            product.price
          }}</span>
        </div>
      </div>
    </div>

    <div class="mt-10 text-center md:hidden">
      <NuxtLink
        to="/shop"
        class="font-mono text-xs text-drz-muted uppercase tracking-widest hover:text-drz-lime transition-colors"
      >
        View All Products →
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const sectionRef = ref(null);
const titleRef = ref(null);
const productCards = ref([]);
const wishlist = ref([]);

function toggleWish(id) {
  const idx = wishlist.value.indexOf(id);
  if (idx === -1) wishlist.value.push(id);
  else wishlist.value.splice(idx, 1);
}

const products = [
  {
    id: 1,
    slug: "void-oversized-tee",
    name: "Void Oversized Tee",
    category: "Tops",
    price: "Rp 449K",
    badge: "NEW",
    image: "https://placehold.co/600x800/111111/C8FF00?text=VOID+TEE",
  },
  {
    id: 2,
    slug: "hazard-cargo-pants",
    name: "Hazard Cargo Pants",
    category: "Bottoms",
    price: "Rp 899K",
    badge: null,
    image: "https://placehold.co/600x600/141414/ffffff?text=CARGO",
  },
  {
    id: 3,
    slug: "specter-hoodie",
    name: "Specter Hoodie",
    category: "Tops",
    price: "Rp 699K",
    badge: "NEW",
    image: "https://placehold.co/600x600/0d0d0d/C8FF00?text=HOODIE",
  },
  {
    id: 4,
    slug: "ghost-mesh-jacket",
    name: "Ghost Mesh Jacket",
    category: "Outerwear",
    price: "Rp 1.299K",
    badge: "SOLD OUT",
    image: "https://placehold.co/600x600/1a1a1a/FF2A2A?text=JACKET",
  },
  {
    id: 5,
    slug: "ritual-beanie",
    name: "Ritual Beanie",
    category: "Headwear",
    price: "Rp 249K",
    badge: null,
    image: "https://placehold.co/600x600/111111/ffffff?text=BEANIE",
  },
];

onMounted(() => {
  const initGSAP = () => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
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
    productCards.value.forEach((card, i) => {
      gsap.from(card, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: card, start: "top 90%" },
      });
    });
  };
  initGSAP();
});
</script>

<style scoped>
.text-outline {
  -webkit-text-stroke: 2px #f5f0e8;
  color: transparent;
}
</style>
