<template>
  <main class="bg-drz-black min-h-screen">
    <AppNav />

    <PageHero
      title="SHOP ALL."
      label="Droozle — SS25 Collection"
      sub="Everything we make. One vision. Nothing ordinary."
      bgText="SHOP"
    />

    <!-- Filter Bar -->
    <div
      class="sticky top-[72px] z-30 bg-drz-black/95 backdrop-blur-sm border-b border-drz-white/10 px-6 md:px-12 py-4 flex items-center justify-between gap-4"
    >
      <div class="flex items-center gap-2 overflow-x-auto hide-scrollbar">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          class="shrink-0 font-mono text-[10px] uppercase tracking-widest px-4 py-2 border transition-all duration-200"
          :class="
            activeCategory === cat
              ? 'border-drz-lime text-drz-lime bg-drz-lime/10'
              : 'border-drz-white/15 text-drz-muted hover:border-drz-white/40 hover:text-drz-white'
          "
        >
          {{ cat }}
        </button>
      </div>

      <div class="flex items-center gap-3 shrink-0">
        <span
          class="font-mono text-[10px] text-drz-muted uppercase tracking-widest hidden md:block"
        >
          {{ filteredProducts.length }} items
        </span>
        <select
          v-model="sortBy"
          class="bg-transparent border border-drz-white/15 text-drz-muted font-mono text-[10px] uppercase tracking-widest px-3 py-2 outline-none cursor-pointer hover:border-drz-white/40"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>

        <!-- Grid toggle -->
        <div class="hidden md:flex border border-drz-white/15">
          <button
            @click="gridCols = 3"
            class="px-3 py-2 transition-colors"
            :class="
              gridCols === 3
                ? 'bg-drz-lime text-drz-black'
                : 'text-drz-muted hover:text-drz-white'
            "
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
              <rect x="5" y="0" width="4" height="4" fill="currentColor" />
              <rect x="10" y="0" width="4" height="4" fill="currentColor" />
              <rect x="0" y="5" width="4" height="4" fill="currentColor" />
              <rect x="5" y="5" width="4" height="4" fill="currentColor" />
              <rect x="10" y="5" width="4" height="4" fill="currentColor" />
              <rect x="0" y="10" width="4" height="4" fill="currentColor" />
              <rect x="5" y="10" width="4" height="4" fill="currentColor" />
              <rect x="10" y="10" width="4" height="4" fill="currentColor" />
            </svg>
          </button>
          <button
            @click="gridCols = 4"
            class="px-3 py-2 transition-colors border-l border-drz-white/15"
            :class="
              gridCols === 4
                ? 'bg-drz-lime text-drz-black'
                : 'text-drz-muted hover:text-drz-white'
            "
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="0" y="0" width="3" height="3" fill="currentColor" />
              <rect x="4" y="0" width="3" height="3" fill="currentColor" />
              <rect x="8" y="0" width="3" height="3" fill="currentColor" />
              <rect x="12" y="0" width="2" height="3" fill="currentColor" />
              <rect x="0" y="4" width="3" height="3" fill="currentColor" />
              <rect x="4" y="4" width="3" height="3" fill="currentColor" />
              <rect x="8" y="4" width="3" height="3" fill="currentColor" />
              <rect x="12" y="4" width="2" height="3" fill="currentColor" />
              <rect x="0" y="8" width="3" height="3" fill="currentColor" />
              <rect x="4" y="8" width="3" height="3" fill="currentColor" />
              <rect x="8" y="8" width="3" height="3" fill="currentColor" />
              <rect x="12" y="8" width="2" height="3" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Product Grid -->
    <div class="px-6 md:px-12 py-12">
      <div
        class="grid gap-4 md:gap-6 transition-all"
        :class="{
          'grid-cols-2 md:grid-cols-3': gridCols === 3,
          'grid-cols-2 md:grid-cols-4': gridCols === 4,
        }"
      >
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @quickAdd="handleQuickAdd"
        />
      </div>

      <!-- Empty state -->
      <div v-if="filteredProducts.length === 0" class="py-32 text-center">
        <p class="font-display text-6xl text-drz-white/10 mb-4">EMPTY.</p>
        <p class="font-mono text-drz-muted text-xs uppercase tracking-widest">
          No products in this category yet.
        </p>
      </div>
    </div>

    <!-- Quick Add Toast -->
    <Transition name="toast">
      <div
        v-if="toastVisible"
        class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-drz-lime text-drz-black font-mono text-xs uppercase tracking-widest px-6 py-4 flex items-center gap-3"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        {{ toastMsg }}
      </div>
    </Transition>

    <AppFooter />
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import AppNav from "~/components/AppNav.vue";
import AppFooter from "~/components/AppFooter.vue";
import PageHero from "~/components/PageHero.vue";
import ProductCard from "~/components/ProductCard.vue";

const activeCategory = ref("All");
const sortBy = ref("newest");
const gridCols = ref(3);
const toastVisible = ref(false);
const toastMsg = ref("");

const categories = [
  "All",
  "Tops",
  "Bottoms",
  "Outerwear",
  "Headwear",
  "Accessories",
];

const products = [
  {
    id: 1,
    slug: "void-oversized-tee",
    name: "Void Oversized Tee",
    category: "Tops",
    price: 449000,
    badge: "NEW",
    sizes: ["S", "M", "L", "XL"],
    image: "https://placehold.co/600x800/111111/C8FF00?text=VOID+TEE",
  },
  {
    id: 2,
    slug: "hazard-cargo-pants",
    name: "Hazard Cargo Pants",
    category: "Bottoms",
    price: 899000,
    badge: null,
    sizes: ["28", "30", "32", "34"],
    image: "https://placehold.co/600x800/141414/ffffff?text=CARGO",
  },
  {
    id: 3,
    slug: "specter-hoodie",
    name: "Specter Hoodie",
    category: "Tops",
    price: 699000,
    badge: "NEW",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://placehold.co/600x800/0d0d0d/C8FF00?text=HOODIE",
  },
  {
    id: 4,
    slug: "ghost-mesh-jacket",
    name: "Ghost Mesh Jacket",
    category: "Outerwear",
    price: 1299000,
    badge: "SOLD OUT",
    sizes: ["S", "M", "L"],
    image: "https://placehold.co/600x800/1a1a1a/FF2A2A?text=JACKET",
  },
  {
    id: 5,
    slug: "ritual-beanie",
    name: "Ritual Beanie",
    category: "Headwear",
    price: 249000,
    badge: null,
    sizes: ["ONE SIZE"],
    image: "https://placehold.co/600x800/111111/ffffff?text=BEANIE",
  },
  {
    id: 6,
    slug: "static-longsleeve",
    name: "Static Longsleeve",
    category: "Tops",
    price: 529000,
    badge: "LAST FEW",
    sizes: ["S", "M", "L"],
    image: "https://placehold.co/600x800/0f0f0f/C8FF00?text=LONGSLEEVE",
  },
  {
    id: 7,
    slug: "noise-shorts",
    name: "Noise Shorts",
    category: "Bottoms",
    price: 449000,
    badge: null,
    sizes: ["S", "M", "L", "XL"],
    image: "https://placehold.co/600x800/121212/ffffff?text=SHORTS",
  },
  {
    id: 8,
    slug: "signal-cap",
    name: "Signal Cap",
    category: "Headwear",
    price: 299000,
    badge: "NEW",
    sizes: ["ONE SIZE"],
    image: "https://placehold.co/600x800/0a0a0a/C8FF00?text=CAP",
  },
  {
    id: 9,
    slug: "phantom-vest",
    name: "Phantom Vest",
    category: "Outerwear",
    price: 799000,
    badge: null,
    sizes: ["S", "M", "L", "XL"],
    image: "https://placehold.co/600x800/141414/ffffff?text=VEST",
  },
  {
    id: 10,
    slug: "drz-tote",
    name: "DRZ Tote Bag",
    category: "Accessories",
    price: 199000,
    badge: null,
    sizes: ["ONE SIZE"],
    image: "https://placehold.co/600x800/111111/C8FF00?text=TOTE",
  },
  {
    id: 11,
    slug: "drz-socks-pack",
    name: "DRZ Socks 3-Pack",
    category: "Accessories",
    price: 149000,
    badge: "NEW",
    sizes: ["FREE SIZE"],
    image: "https://placehold.co/600x800/0d0d0d/ffffff?text=SOCKS",
  },
  {
    id: 12,
    slug: "void-crewneck",
    name: "Void Crewneck",
    category: "Tops",
    price: 649000,
    badge: null,
    sizes: ["S", "M", "L", "XL"],
    image: "https://placehold.co/600x800/131313/C8FF00?text=CREWNECK",
  },
];

const filteredProducts = computed(() => {
  let list =
    activeCategory.value === "All"
      ? [...products]
      : products.filter((p) => p.category === activeCategory.value);

  if (sortBy.value === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (sortBy.value === "price-desc")
    list.sort((a, b) => b.price - a.price);

  return list;
});

function handleQuickAdd(product) {
  toastMsg.value = `${product.name} added to cart`;
  toastVisible.value = true;
  setTimeout(() => {
    toastVisible.value = false;
  }, 2500);
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
</style>
