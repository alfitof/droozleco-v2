<template>
  <NuxtLink
    :to="`/product/${product.slug}`"
    class="product-card group block cursor-pointer"
  >
    <div class="relative overflow-hidden bg-drz-gray">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full object-cover transition-transform duration-700 group-hover:scale-105"
        :class="tall ? 'aspect-[3/4]' : 'aspect-square'"
      />

      <!-- Overlay -->
      <div
        class="product-overlay absolute inset-0 bg-drz-black/70 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <button
          @click.prevent="$emit('quickAdd', product)"
          class="bg-drz-lime text-drz-black font-mono text-xs uppercase tracking-widest px-6 py-3 font-bold hover:bg-drz-white transition-colors"
        >
          Quick Add
        </button>
        <span
          class="font-mono text-drz-white text-xs uppercase tracking-widest border border-drz-white/30 px-6 py-3 hover:border-drz-lime hover:text-drz-lime transition-colors"
        >
          View Item →
        </span>
      </div>

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <span
          v-if="product.badge"
          class="tag-pill font-bold text-[10px]"
          :class="{
            'text-drz-red border-drz-red bg-drz-black/90':
              product.badge === 'SOLD OUT',
            'text-drz-lime border-drz-lime bg-drz-black/90':
              product.badge === 'NEW',
            'text-drz-white border-drz-white bg-drz-black/90':
              product.badge === 'LAST FEW',
          }"
        >
          {{ product.badge }}
        </span>
      </div>

      <!-- Wishlist -->
      <button
        @click.prevent
        class="absolute top-3 right-3 w-8 h-8 bg-drz-black/60 border border-drz-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:border-drz-lime"
        aria-label="Wishlist"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          class="text-drz-white"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
          />
        </svg>
      </button>
    </div>

    <!-- Info -->
    <div class="mt-3 flex items-start justify-between gap-2">
      <div class="min-w-0">
        <p
          class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mb-0.5 truncate"
        >
          {{ product.category }}
        </p>
        <h3 class="font-body text-drz-white text-sm font-medium truncate">
          {{ product.name }}
        </h3>
        <div class="flex gap-1 mt-1.5">
          <span
            v-for="s in product.sizes?.slice(0, 4)"
            :key="s"
            class="font-mono text-[9px] text-drz-muted uppercase px-1.5 py-0.5 border border-drz-white/10"
            >{{ s }}</span
          >
        </div>
      </div>
      <span class="font-mono text-drz-lime text-sm shrink-0">{{
        formatPrice(product.price)
      }}</span>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  product: { type: Object, required: true },
  tall: { type: Boolean, default: false },
});

defineEmits(["quickAdd"]);

function formatPrice(val) {
  return "Rp " + Number(val).toLocaleString("id-ID");
}
</script>
