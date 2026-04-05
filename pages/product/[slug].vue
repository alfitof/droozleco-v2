<template>
  <main class="bg-drz-black min-h-screen">
    <AppNav />

    <div class="pt-24 px-6 md:px-12">
      <!-- Breadcrumb -->
      <div
        class="flex items-center gap-2 font-mono text-[10px] text-drz-muted uppercase tracking-widest mb-12 pt-4"
      >
        <NuxtLink to="/" class="hover:text-drz-lime transition-colors"
          >Home</NuxtLink
        >
        <span>/</span>
        <NuxtLink to="/shop" class="hover:text-drz-lime transition-colors"
          >Shop</NuxtLink
        >
        <span>/</span>
        <span class="text-drz-white">{{ product.name }}</span>
      </div>

      <!-- Product Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pb-24">
        <!-- Left: Images -->
        <div class="flex gap-3">
          <!-- Thumbnails -->
          <div class="hidden md:flex flex-col gap-2 w-16 shrink-0">
            <button
              v-for="(img, i) in product.images"
              :key="i"
              @click="activeImg = i"
              class="border-2 transition-all"
              :class="
                activeImg === i
                  ? 'border-drz-lime'
                  : 'border-transparent opacity-50 hover:opacity-80'
              "
            >
              <img
                :src="img"
                :alt="`View ${i + 1}`"
                class="w-full aspect-square object-cover"
              />
            </button>
          </div>

          <!-- Main image -->
          <div class="flex-1 relative overflow-hidden group">
            <img
              :src="product.images[activeImg]"
              :alt="product.name"
              class="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              v-if="product.badge"
              class="absolute top-4 left-4 tag-pill font-bold text-[10px]"
              :class="{
                'text-drz-red border-drz-red bg-drz-black/90':
                  product.badge === 'SOLD OUT',
                'text-drz-lime border-drz-lime bg-drz-black/90':
                  product.badge !== 'SOLD OUT',
              }"
            >
              {{ product.badge }}
            </div>

            <!-- Nav arrows -->
            <button
              @click="
                activeImg =
                  (activeImg - 1 + product.images.length) %
                  product.images.length
              "
              class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-drz-black/70 border border-drz-white/10 text-drz-white hover:border-drz-lime hover:text-drz-lime transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center text-sm font-mono"
            >
              ←
            </button>
            <button
              @click="activeImg = (activeImg + 1) % product.images.length"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-drz-black/70 border border-drz-white/10 text-drz-white hover:border-drz-lime hover:text-drz-lime transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center text-sm font-mono"
            >
              →
            </button>
          </div>
        </div>

        <!-- Right: Product Info -->
        <div class="flex flex-col">
          <!-- Category + Name -->
          <p
            class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mb-2"
          >
            {{ product.category }}
          </p>
          <h1
            class="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-drz-white leading-none mb-1"
          >
            {{ product.name }}
          </h1>

          <!-- Price -->
          <div class="flex items-center gap-4 mt-4 mb-8">
            <span class="font-mono text-drz-lime text-2xl">{{
              formatRp(product.price)
            }}</span>
            <span
              v-if="product.originalPrice"
              class="font-mono text-drz-muted text-sm line-through"
              >{{ formatRp(product.originalPrice) }}</span
            >
          </div>

          <!-- Divider -->
          <div class="w-full h-px bg-drz-white/10 mb-8"></div>

          <!-- Size Selector -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-3">
              <span
                class="font-mono text-drz-white text-xs uppercase tracking-widest"
                >Size</span
              >
              <button
                class="font-mono text-drz-muted text-[10px] uppercase tracking-widest hover:text-drz-lime transition-colors"
              >
                Size Guide →
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="size in product.sizes"
                :key="size"
                @click="selectedSize = size"
                class="font-mono text-xs uppercase tracking-widest px-4 py-2.5 border transition-all duration-200"
                :class="
                  selectedSize === size
                    ? 'border-drz-lime text-drz-lime bg-drz-lime/10'
                    : 'border-drz-white/20 text-drz-muted hover:border-drz-white/50 hover:text-drz-white'
                "
              >
                {{ size }}
              </button>
            </div>
            <p
              v-if="!selectedSize && attempted"
              class="font-mono text-drz-red text-[10px] uppercase tracking-widest mt-2"
            >
              Please select a size
            </p>
          </div>

          <!-- Qty -->
          <div class="flex items-center gap-4 mb-8">
            <span
              class="font-mono text-drz-white text-xs uppercase tracking-widest"
              >Qty</span
            >
            <div class="flex items-center border border-drz-white/20">
              <button
                @click="qty > 1 && qty--"
                class="w-10 h-10 text-drz-white hover:text-drz-lime transition-colors font-mono text-lg flex items-center justify-center"
              >
                −
              </button>
              <span
                class="w-10 h-10 flex items-center justify-center font-mono text-drz-white text-sm border-x border-drz-white/20"
                >{{ qty }}</span
              >
              <button
                @click="qty++"
                class="w-10 h-10 text-drz-white hover:text-drz-lime transition-colors font-mono text-lg flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          <!-- Add to Cart -->
          <div class="flex gap-3 mb-8">
            <button
              @click="addToCart"
              class="flex-1 bg-drz-lime text-drz-black font-mono text-xs uppercase tracking-widest py-4 font-bold hover:bg-drz-white transition-colors duration-300"
            >
              {{ product.badge === "SOLD OUT" ? "Notify Me" : "Add to Cart" }}
            </button>
            <button
              class="w-14 border border-drz-white/20 text-drz-white hover:border-drz-lime hover:text-drz-lime transition-colors flex items-center justify-center"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                />
              </svg>
            </button>
          </div>

          <!-- Toast inline -->
          <Transition name="slide-up">
            <div
              v-if="added"
              class="bg-drz-lime/10 border border-drz-lime text-drz-lime font-mono text-xs uppercase tracking-widest px-4 py-3 flex items-center gap-3 mb-6"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Added to cart!
            </div>
          </Transition>

          <!-- Divider -->
          <div class="w-full h-px bg-drz-white/10 mb-8"></div>

          <!-- Description accordion -->
          <div class="flex flex-col divide-y divide-drz-white/10">
            <div v-for="acc in accordions" :key="acc.title" class="py-4">
              <button
                @click="openAcc = openAcc === acc.title ? null : acc.title"
                class="w-full flex items-center justify-between text-left group"
              >
                <span
                  class="font-mono text-xs uppercase tracking-widest text-drz-white group-hover:text-drz-lime transition-colors"
                  >{{ acc.title }}</span
                >
                <span
                  class="font-mono text-drz-muted text-lg transition-transform duration-300"
                  :class="openAcc === acc.title ? 'rotate-45' : ''"
                  >+</span
                >
              </button>
              <Transition name="accordion">
                <div v-if="openAcc === acc.title" class="pt-4">
                  <p class="font-body text-drz-muted text-sm leading-relaxed">
                    {{ acc.content }}
                  </p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

      <!-- You May Also Like -->
      <div class="pb-24 border-t border-drz-white/10 pt-16">
        <div class="flex items-center gap-3 mb-10">
          <span class="w-6 h-px bg-drz-lime"></span>
          <span
            class="font-mono text-drz-lime text-[10px] tracking-widest uppercase"
            >You May Also Like</span
          >
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <ProductCard v-for="p in relatedProducts" :key="p.id" :product="p" />
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
import ProductCard from "~/components/ProductCard.vue";

const activeImg = ref(0);
const selectedSize = ref(null);
const qty = ref(1);
const attempted = ref(false);
const added = ref(false);
const openAcc = ref("Description");

const product = {
  name: "Void Oversized Tee",
  category: "Tops",
  price: 449000,
  originalPrice: null,
  badge: "NEW",
  sizes: ["S", "M", "L", "XL", "XXL"],
  images: [
    "https://placehold.co/600x800/111111/C8FF00?text=VOID+TEE+01",
    "https://placehold.co/600x800/0d0d0d/ffffff?text=VOID+TEE+02",
    "https://placehold.co/600x800/131313/C8FF00?text=VOID+TEE+03",
  ],
};

const accordions = [
  {
    title: "Description",
    content:
      "Void Tee adalah pernyataan — bukan sekedar kaos. Oversized fit dengan bahu turun, hem panjang asimetris, dan label dalam yang di-stamp manual. Dibuat dari heavy cotton 240gsm yang terasa berat di badan tapi ringan di hati.",
  },
  {
    title: "Material & Care",
    content:
      "100% Cotton 240gsm. Machine wash cold, inside out. Do not tumble dry. Do not bleach. Iron on low heat. Treat it right, it'll last forever.",
  },
  {
    title: "Shipping & Returns",
    content:
      "Pengiriman 2-5 hari kerja via JNE/SiCepat. Free ongkir untuk order di atas Rp 500.000. Return dalam 7 hari, kondisi unworn & tag masih terpasang.",
  },
];

const relatedProducts = [
  {
    id: 3,
    slug: "specter-hoodie",
    name: "Specter Hoodie",
    category: "Tops",
    price: 699000,
    badge: "NEW",
    sizes: ["S", "M", "L", "XL"],
    image: "https://placehold.co/600x800/0d0d0d/C8FF00?text=HOODIE",
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
    id: 12,
    slug: "void-crewneck",
    name: "Void Crewneck",
    category: "Tops",
    price: 649000,
    badge: null,
    sizes: ["S", "M", "L", "XL"],
    image: "https://placehold.co/600x800/131313/C8FF00?text=CREWNECK",
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
];

function formatRp(val) {
  return "Rp " + Number(val).toLocaleString("id-ID");
}

function addToCart() {
  if (!selectedSize.value) {
    attempted.value = true;
    return;
  }
  added.value = true;
  setTimeout(() => {
    added.value = false;
  }, 3000);
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.35s ease;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
