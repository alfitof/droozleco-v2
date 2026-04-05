<template>
  <nav
    ref="navbar"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
  >
    <div class="px-6 md:px-12 py-5 flex items-center justify-between gap-4">
      <!-- Logo -->
      <div class="flex items-center gap-3 relative z-50 shrink-0">
        <NuxtLink
          to="/"
          class="font-display text-2xl text-drz-white tracking-widest hover:text-drz-lime transition-colors"
        >
          DROOZLE.CO
        </NuxtLink>
        <span
          class="tag-pill text-drz-lime border-drz-lime hidden md:inline-block"
          >SS25</span
        >
      </div>

      <!-- Desktop Nav Links -->
      <ul
        class="hidden md:flex items-center gap-10 font-mono text-xs tracking-widest uppercase text-drz-white"
      >
        <li v-for="link in links" :key="link.label">
          <NuxtLink
            :to="link.to"
            class="relative group"
            active-class="text-drz-lime"
          >
            <span>{{ link.label }}</span>
            <span
              class="absolute -bottom-1 left-0 w-0 h-px bg-drz-lime transition-all duration-300 group-hover:w-full"
            ></span>
          </NuxtLink>
        </li>
      </ul>

      <!-- Right side -->
      <div class="flex items-center gap-4 shrink-0 relative z-50">
        <!-- Search bar inline — desktop -->
        <div class="hidden md:flex items-center">
          <Transition name="search-expand">
            <div
              v-if="searchOpen"
              class="flex items-center gap-2 border-b border-drz-white/30 focus-within:border-drz-lime transition-colors"
            >
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="bg-transparent text-drz-white font-mono text-xs w-40 outline-none placeholder:text-drz-muted py-1"
                @keydown.escape="closeSearch"
                @keydown.enter="submitSearch"
              />
              <button
                @click="closeSearch"
                class="text-drz-muted hover:text-drz-white transition-colors flex items-center justify-center"
                aria-label="Close search"
              >
                <svg
                  width="12"
                  height="12"
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
          </Transition>

          <!-- Search icon button -->
          <button
            v-if="!searchOpen"
            @click="openSearch"
            class="flex items-center text-drz-white hover:text-drz-lime transition-colors"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        <!-- Cart -->
        <NuxtLink
          to="/cart"
          class="relative flex items-center text-drz-white hover:text-drz-lime transition-colors"
          aria-label="Cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <span
            class="absolute -top-2 -right-2.5 w-4 h-4 bg-drz-lime text-drz-black font-mono text-[9px] font-bold flex items-center justify-center rounded-full leading-none"
          >
            {{ totalQty }}
          </span>
        </NuxtLink>

        <!-- Hamburger — 3 garis SAMA LEBAR agar simetris saat rotate -->
        <button
          class="md:hidden flex flex-col justify-center gap-[5px] w-6 h-6"
          @click="menuOpen = !menuOpen"
          aria-label="Toggle menu"
        >
          <span
            class="block w-6 h-[1.5px] bg-drz-white origin-center transition-all duration-300"
            :class="menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''"
          ></span>
          <span
            class="block w-6 h-[1.5px] bg-drz-white transition-all duration-300"
            :class="menuOpen ? 'opacity-0 scale-x-0' : ''"
          ></span>
          <span
            class="block w-6 h-[1.5px] bg-drz-white origin-center transition-all duration-300"
            :class="menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''"
          ></span>
        </button>
      </div>
    </div>

    <!-- Search Results Dropdown -->
    <!-- Search Results Dropdown -->
    <Transition name="search-results">
      <div
        v-if="searchOpen && searchQuery.length > 1"
        class="hidden md:block absolute top-full left-0 right-0 bg-drz-black border-t border-b border-drz-white/10 px-6 md:px-12 py-4 max-h-72 overflow-y-auto"
        style="backdrop-filter: none; background-color: #050505"
      >
        <div
          v-if="searchResults.length > 0"
          class="flex flex-col divide-y divide-drz-white/10"
        >
          <NuxtLink
            v-for="result in searchResults"
            :key="result.id"
            :to="`/product/${result.slug}`"
            class="flex items-center gap-4 py-3 group"
            @click="closeSearch"
          >
            <img
              :src="result.image"
              :alt="result.name"
              class="w-9 h-11 object-cover shrink-0"
            />
            <div class="flex-1 min-w-0">
              <p
                class="font-mono text-[9px] text-drz-muted uppercase tracking-widest mb-0.5"
              >
                {{ result.category }}
              </p>
              <p
                class="font-body text-drz-white text-sm group-hover:text-drz-lime transition-colors truncate"
              >
                {{ result.name }}
              </p>
            </div>
            <span class="font-mono text-drz-lime text-xs shrink-0">{{
              formatRp(result.price)
            }}</span>
          </NuxtLink>
        </div>
        <div v-else class="py-4 text-center">
          <p class="font-mono text-drz-muted text-xs uppercase tracking-widest">
            No results for "<span class="text-drz-white">{{ searchQuery }}</span
            >"
          </p>
        </div>
      </div>
    </Transition>

    <!-- Mobile Full Screen Menu -->
    <Transition name="mobile-menu">
      <div
        v-if="menuOpen"
        class="fixed inset-0 bg-drz-black z-40 flex flex-col justify-center items-center md:hidden"
      >
        <!-- Mobile search -->
        <div class="absolute top-20 left-6 right-6">
          <div
            class="flex items-center gap-3 border-b border-drz-white/15 pb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              class="text-drz-muted shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="flex-1 bg-transparent text-drz-white font-mono text-sm outline-none placeholder:text-drz-muted"
              @keydown.enter="submitSearch"
            />
          </div>
          <!-- Mobile search results -->
          <div
            v-if="searchQuery.length > 1"
            class="mt-2 max-h-48 overflow-y-auto flex flex-col divide-y divide-drz-white/10"
          >
            <NuxtLink
              v-for="result in searchResults"
              :key="result.id"
              :to="`/product/${result.slug}`"
              class="flex items-center gap-3 py-3"
              @click="
                menuOpen = false;
                searchQuery = '';
              "
            >
              <img
                :src="result.image"
                :alt="result.name"
                class="w-8 h-10 object-cover shrink-0"
              />
              <div class="flex-1 min-w-0">
                <p class="font-body text-drz-white text-sm truncate">
                  {{ result.name }}
                </p>
                <p class="font-mono text-drz-lime text-[10px]">
                  {{ formatRp(result.price) }}
                </p>
              </div>
            </NuxtLink>
            <div v-if="searchResults.length === 0" class="py-3 text-center">
              <p
                class="font-mono text-drz-muted text-[10px] uppercase tracking-widest"
              >
                No results
              </p>
            </div>
          </div>
        </div>

        <!-- Nav links -->
        <ul class="flex flex-col items-center gap-7 mt-16">
          <li v-for="link in links" :key="link.label">
            <NuxtLink
              :to="link.to"
              class="font-display text-5xl text-drz-white hover:text-drz-lime transition-colors"
              active-class="text-drz-lime"
              @click="menuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>

        <div
          class="absolute bottom-10 font-mono text-xs text-drz-muted tracking-widest"
        >
          DROOZLE.CO — SS25
        </div>
      </div>
    </Transition>
  </nav>

  <!-- Backdrop to close search -->
  <div v-if="searchOpen" class="fixed inset-0 z-40" @click="closeSearch"></div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useCart } from "~/composables/useCart.js";

const { totalQty } = useCart();
const router = useRouter();

const navbar = ref(null);
const menuOpen = ref(false);
const searchOpen = ref(false);
const searchQuery = ref("");
const searchInput = ref(null);

const links = [
  { label: "New Drops", to: "/shop" },
  { label: "Collections", to: "/collections" },
  { label: "Lookbook", to: "/lookbook" },
  { label: "About", to: "/about" },
  { label: "Stockists", to: "/stockists" },
];

const allProducts = [
  {
    id: 1,
    slug: "void-oversized-tee",
    name: "Void Oversized Tee",
    category: "Tops",
    price: 449000,
    image: "https://placehold.co/300x400/111111/C8FF00?text=VOID+TEE",
  },
  {
    id: 2,
    slug: "hazard-cargo-pants",
    name: "Hazard Cargo Pants",
    category: "Bottoms",
    price: 899000,
    image: "https://placehold.co/300x400/141414/ffffff?text=CARGO",
  },
  {
    id: 3,
    slug: "specter-hoodie",
    name: "Specter Hoodie",
    category: "Tops",
    price: 699000,
    image: "https://placehold.co/300x400/0d0d0d/C8FF00?text=HOODIE",
  },
  {
    id: 4,
    slug: "ghost-mesh-jacket",
    name: "Ghost Mesh Jacket",
    category: "Outerwear",
    price: 1299000,
    image: "https://placehold.co/300x400/1a1a1a/FF2A2A?text=JACKET",
  },
  {
    id: 5,
    slug: "ritual-beanie",
    name: "Ritual Beanie",
    category: "Headwear",
    price: 249000,
    image: "https://placehold.co/300x400/111111/ffffff?text=BEANIE",
  },
  {
    id: 6,
    slug: "static-longsleeve",
    name: "Static Longsleeve",
    category: "Tops",
    price: 529000,
    image: "https://placehold.co/300x400/0f0f0f/C8FF00?text=LONGSLEEVE",
  },
  {
    id: 7,
    slug: "noise-shorts",
    name: "Noise Shorts",
    category: "Bottoms",
    price: 449000,
    image: "https://placehold.co/300x400/121212/ffffff?text=SHORTS",
  },
  {
    id: 8,
    slug: "signal-cap",
    name: "Signal Cap",
    category: "Headwear",
    price: 299000,
    image: "https://placehold.co/300x400/0a0a0a/C8FF00?text=CAP",
  },
  {
    id: 9,
    slug: "phantom-vest",
    name: "Phantom Vest",
    category: "Outerwear",
    price: 799000,
    image: "https://placehold.co/300x400/141414/ffffff?text=VEST",
  },
  {
    id: 10,
    slug: "drz-tote",
    name: "DRZ Tote Bag",
    category: "Accessories",
    price: 199000,
    image: "https://placehold.co/300x400/111111/C8FF00?text=TOTE",
  },
  {
    id: 11,
    slug: "drz-socks-pack",
    name: "DRZ Socks 3-Pack",
    category: "Accessories",
    price: 149000,
    image: "https://placehold.co/300x400/0d0d0d/ffffff?text=SOCKS",
  },
  {
    id: 12,
    slug: "void-crewneck",
    name: "Void Crewneck",
    category: "Tops",
    price: 649000,
    image: "https://placehold.co/300x400/131313/C8FF00?text=CREWNECK",
  },
];

const searchResults = computed(() => {
  if (searchQuery.value.length < 2) return [];
  const q = searchQuery.value.toLowerCase();
  return allProducts
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
    .slice(0, 5);
});

function formatRp(val) {
  return "Rp " + Number(val).toLocaleString("id-ID");
}

async function openSearch() {
  searchOpen.value = true;
  await nextTick();
  searchInput.value?.focus();
}

function closeSearch() {
  searchOpen.value = false;
  searchQuery.value = "";
}

async function submitSearch() {
  if (searchQuery.value.trim()) {
    await router.push(`/shop?q=${encodeURIComponent(searchQuery.value)}`);
    closeSearch();
    menuOpen.value = false;
  }
}

function handleResize() {
  if (window.innerWidth >= 768) menuOpen.value = false;
}

function handleScroll() {
  if (!navbar.value) return;
  if (window.scrollY > 80) {
    navbar.value.classList.add(
      "bg-drz-black/90",
      "backdrop-blur-sm",
      "border-b",
      "border-drz-white/5",
    );
  } else {
    navbar.value.classList.remove(
      "bg-drz-black/90",
      "backdrop-blur-sm",
      "border-b",
      "border-drz-white/5",
    );
  }
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.search-expand-enter-active,
.search-expand-leave-active {
  transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
}
.search-expand-enter-from,
.search-expand-leave-to {
  opacity: 0;
  width: 0;
}
.search-expand-enter-to,
.search-expand-leave-from {
  opacity: 1;
  width: 180px;
}

.search-results-enter-active,
.search-results-leave-active {
  transition: all 0.2s ease;
}
.search-results-enter-from,
.search-results-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
