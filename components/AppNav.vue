<template>
  <nav
    ref="navbar"
    class="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-300"
  >
    <div class="flex items-center gap-3">
      <span class="font-display text-2xl text-drz-white tracking-widest"
        >DROOZLE.CO</span
      >
      <span
        class="tag-pill text-drz-lime border-drz-lime hidden md:inline-block"
        >SS25</span
      >
    </div>

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

    <div class="flex items-center gap-5">
      <button
        class="hidden md:flex items-center text-drz-white hover:text-drz-lime transition-colors"
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

      <button
        class="md:hidden flex flex-col gap-1.5 ml-1"
        @click="menuOpen = !menuOpen"
        aria-label="Menu"
      >
        <span
          class="block w-6 h-px bg-drz-white transition-all duration-300 origin-center"
          :class="menuOpen ? 'rotate-45 translate-y-2' : ''"
        ></span>
        <span
          class="block w-4 h-px bg-drz-white transition-all duration-300"
          :class="menuOpen ? 'opacity-0 w-6' : ''"
        ></span>
        <span
          class="block w-6 h-px bg-drz-white transition-all duration-300 origin-center"
          :class="menuOpen ? '-rotate-45 -translate-y-2' : ''"
        ></span>
      </button>
    </div>

    <div
      class="fixed inset-0 bg-drz-black z-40 flex flex-col justify-center items-center gap-8 transition-all duration-500"
      :class="
        menuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      "
    >
      <ul class="flex flex-col items-center gap-8">
        <li v-for="link in links" :key="link">
          <a
            href="#"
            class="font-display text-5xl text-drz-white hover:text-drz-lime transition-colors"
            @click="menuOpen = false"
          >
            {{ link }}
          </a>
        </li>
      </ul>

      <div class="flex items-center gap-6 mt-4">
        <button
          class="flex items-center gap-2 text-drz-muted hover:text-drz-lime transition-colors font-mono text-xs uppercase tracking-widest"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
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
          Search
        </button>
        <button
          class="relative flex items-center gap-2 text-drz-muted hover:text-drz-lime transition-colors font-mono text-xs uppercase tracking-widest"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
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
          Cart (3)
        </button>
      </div>

      <div
        class="absolute bottom-10 font-mono text-xs text-drz-muted tracking-widest"
      >
        DROOZLE.CO — SS25
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCart } from "~/composables/useCart.ts";
const { totalQty } = useCart();

const links = [
  { label: "New Drops", to: "/shop" },
  { label: "Collections", to: "/collections" },
  { label: "Lookbook", to: "/lookbook" },
  { label: "About", to: "/about" },
  { label: "Stockists", to: "/stockists" },
];
const menuOpen = ref(false);
const navbar = ref(null);

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      navbar.value?.classList.add(
        "bg-drz-black/80",
        "backdrop-blur-sm",
        "border-b",
        "border-drz-white/5",
      );
    } else {
      navbar.value?.classList.remove(
        "bg-drz-black/80",
        "backdrop-blur-sm",
        "border-b",
        "border-drz-white/5",
      );
    }
  });
});
</script>
