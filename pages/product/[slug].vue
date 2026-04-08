<template>
  <main class="bg-drz-black min-h-screen">
    <AppNav />

    <div class="pt-28 px-6 md:px-12 pb-24">
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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pb-24">
        <div class="flex gap-3">
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

            <button
              @click="
                activeImg =
                  (activeImg - 1 + product.images.length) %
                  product.images.length
              "
              class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-drz-black/70 border border-drz-white/10 text-drz-white hover:border-drz-lime hover:text-drz-lime transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center font-mono text-sm"
            >
              ←
            </button>
            <button
              @click="activeImg = (activeImg + 1) % product.images.length"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-drz-black/70 border border-drz-white/10 text-drz-white hover:border-drz-lime hover:text-drz-lime transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center font-mono text-sm"
            >
              →
            </button>
          </div>
        </div>

        <div class="flex flex-col">
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

          <div class="w-full h-px bg-drz-white/10 mb-8"></div>

          <div class="mb-6">
            <div class="flex items-center justify-between mb-3">
              <span
                class="font-mono text-drz-white text-xs uppercase tracking-widest"
                >Size</span
              >

              <button
                @click="sizeGuideOpen = true"
                class="font-mono text-drz-muted text-[10px] uppercase tracking-widest hover:text-drz-lime transition-colors flex items-center gap-1"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Size Guide
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

          <div class="flex gap-3 mb-4">
            <button
              @click="addToCart"
              class="flex-1 bg-drz-lime text-drz-black font-mono text-xs uppercase tracking-widest py-4 font-bold hover:bg-drz-white transition-colors duration-300"
            >
              {{ product.badge === "SOLD OUT" ? "Notify Me" : "Add to Cart" }}
            </button>

            <button
              @click="wished = !wished"
              class="w-14 border flex items-center justify-center transition-all duration-300"
              :class="
                wished
                  ? 'bg-drz-red border-drz-red'
                  : 'border-drz-white/20 text-drz-white hover:border-drz-red'
              "
              :aria-label="wished ? 'Remove from wishlist' : 'Add to wishlist'"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.8"
                :fill="wished ? 'white' : 'none'"
                class="text-drz-white transition-all duration-300"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                />
              </svg>
            </button>
          </div>

          <Transition name="slide-up">
            <p
              v-if="wished"
              class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="#FF2A2A"
                stroke="#FF2A2A"
                stroke-width="1.8"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                />
              </svg>
              Saved to wishlist
            </p>
          </Transition>

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

          <div class="w-full h-px bg-drz-white/10 mb-8"></div>

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
                  class="font-mono text-drz-muted text-lg transition-transform duration-300 leading-none"
                  :class="openAcc === acc.title ? 'rotate-45' : ''"
                  >+</span
                >
              </button>
              <Transition name="accordion">
                <div v-if="openAcc === acc.title" class="pt-4 overflow-hidden">
                  <p class="font-body text-drz-muted text-sm leading-relaxed">
                    {{ acc.content }}
                  </p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

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

    <Transition name="modal">
      <div
        v-if="sizeGuideOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        @click.self="sizeGuideOpen = false"
        style="background-color: rgba(5, 5, 5, 0.85)"
      >
        <div
          class="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto"
          style="
            background-color: #0d0d0d;
            border: 1px solid rgba(255, 255, 255, 0.12);
          "
        >
          <div
            class="flex items-center justify-between px-6 md:px-8 py-5 border-b border-drz-white/10 sticky top-0"
            style="background-color: #0d0d0d"
          >
            <div>
              <p
                class="font-mono text-drz-lime text-[10px] uppercase tracking-widest mb-1"
              >
                Droozle
              </p>
              <h3 class="font-display text-2xl text-drz-white">SIZE GUIDE</h3>
            </div>
            <button
              @click="sizeGuideOpen = false"
              class="w-9 h-9 border border-drz-white/20 flex items-center justify-center text-drz-muted hover:border-drz-lime hover:text-drz-lime transition-all"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div class="px-6 md:px-8 py-8">
            <div
              class="flex items-center gap-1 mb-8 border border-drz-white/15 w-fit"
            >
              <button
                @click="sizeUnit = 'cm'"
                class="font-mono text-[10px] uppercase tracking-widest px-4 py-2 transition-all"
                :class="
                  sizeUnit === 'cm'
                    ? 'bg-drz-lime text-drz-black font-bold'
                    : 'text-drz-muted hover:text-drz-white'
                "
              >
                CM
              </button>
              <button
                @click="sizeUnit = 'in'"
                class="font-mono text-[10px] uppercase tracking-widest px-4 py-2 transition-all"
                :class="
                  sizeUnit === 'in'
                    ? 'bg-drz-lime text-drz-black font-bold'
                    : 'text-drz-muted hover:text-drz-white'
                "
              >
                INCH
              </button>
            </div>

            <div
              class="mb-8 p-4 border border-drz-white/10 bg-drz-white/[0.02]"
            >
              <p
                class="font-mono text-drz-lime text-[10px] uppercase tracking-widest mb-3"
              >
                How to Measure
              </p>
              <ul class="flex flex-col gap-2">
                <li
                  v-for="tip in measureTips"
                  :key="tip"
                  class="flex items-start gap-2 font-body text-drz-muted text-sm"
                >
                  <span class="text-drz-lime mt-0.5 shrink-0">—</span>
                  <span>{{ tip }}</span>
                </li>
              </ul>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full min-w-[400px]">
                <thead>
                  <tr class="border-b border-drz-white/10">
                    <th
                      class="font-mono text-[10px] text-drz-muted uppercase tracking-widest text-left py-3 pr-4"
                    >
                      Size
                    </th>
                    <th
                      v-for="col in sizeColumns"
                      :key="col"
                      class="font-mono text-[10px] text-drz-muted uppercase tracking-widest text-center py-3 px-2"
                    >
                      {{ col }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-drz-white/5">
                  <tr
                    v-for="row in sizeTable"
                    :key="row.size"
                    class="transition-colors hover:bg-drz-white/[0.03]"
                    :class="selectedSize === row.size ? 'bg-drz-lime/5' : ''"
                  >
                    <td class="py-3 pr-4">
                      <span
                        class="font-mono text-xs uppercase tracking-widest"
                        :class="
                          selectedSize === row.size
                            ? 'text-drz-lime font-bold'
                            : 'text-drz-white'
                        "
                      >
                        {{ row.size }}
                        <span
                          v-if="selectedSize === row.size"
                          class="text-[9px] ml-1 text-drz-lime/70"
                          >← selected</span
                        >
                      </span>
                    </td>
                    <td
                      v-for="col in sizeColumns"
                      :key="col"
                      class="py-3 px-2 text-center font-mono text-drz-muted text-xs"
                    >
                      {{ sizeUnit === "cm" ? row.cm[col] : row.in[col] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="mt-8 pt-6 border-t border-drz-white/10">
              <p
                class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mb-2"
              >
                Fit Note
              </p>
              <p class="font-body text-drz-muted text-sm leading-relaxed">
                This style is cut oversized. If you prefer a relaxed fit, go
                true to size. For a more cropped silhouette, size down one. When
                in doubt, size up.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

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
const wished = ref(false);
const sizeGuideOpen = ref(false);
const sizeUnit = ref("cm");

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
      "The Void Tee is a statement — not just a shirt. Oversized fit with dropped shoulders, an asymmetric hem, and a manually stamped interior label. Made from 240gsm heavy cotton that sits heavy on the body but feels like nothing at all.",
  },
  {
    title: "Material & Care",
    content:
      "100% Cotton 240gsm. Machine wash cold, inside out. Do not tumble dry. Do not bleach. Iron on low heat. Treat it right, it'll last forever.",
  },
  {
    title: "Shipping & Returns",
    content:
      "Delivery in 2–5 business days via JNE / SiCepat. Free shipping on orders above Rp 500.000. Returns accepted within 7 days — items must be unworn with tags still attached.",
  },
];

const measureTips = [
  "Chest: measure around the fullest part of your chest, keeping the tape level.",
  "Shoulder: measure from shoulder seam to shoulder seam across the back.",
  "Length: measure from the highest point of the shoulder down to the hem.",
  "Sleeve: measure from the shoulder seam to the end of the cuff.",
];

const sizeColumns = ["Chest", "Shoulder", "Length", "Sleeve"];

const sizeTable = [
  {
    size: "S",
    cm: { Chest: "96", Shoulder: "44", Length: "68", Sleeve: "60" },
    in: { Chest: "37.8", Shoulder: "17.3", Length: "26.8", Sleeve: "23.6" },
  },
  {
    size: "M",
    cm: { Chest: "102", Shoulder: "47", Length: "71", Sleeve: "62" },
    in: { Chest: "40.2", Shoulder: "18.5", Length: "28.0", Sleeve: "24.4" },
  },
  {
    size: "L",
    cm: { Chest: "108", Shoulder: "50", Length: "74", Sleeve: "64" },
    in: { Chest: "42.5", Shoulder: "19.7", Length: "29.1", Sleeve: "25.2" },
  },
  {
    size: "XL",
    cm: { Chest: "116", Shoulder: "53", Length: "77", Sleeve: "66" },
    in: { Chest: "45.7", Shoulder: "20.9", Length: "30.3", Sleeve: "26.0" },
  },
  {
    size: "XXL",
    cm: { Chest: "124", Shoulder: "56", Length: "80", Sleeve: "68" },
    in: { Chest: "48.8", Shoulder: "22.0", Length: "31.5", Sleeve: "26.8" },
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
  transition: all 0.35s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.35s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 300px;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: translateY(20px);
}
</style>
