<template>
  <div class="relative py-4 bg-drz-lime overflow-hidden border-y-0">
    <!-- Skew strips -->
    <div class="flex overflow-hidden">
      <div class="marquee-track">
        <span
          v-for="i in 20"
          :key="i"
          class="font-display text-drz-black text-2xl tracking-widest px-8 flex items-center gap-8 shrink-0"
        >
          DROOZLE
          <svg class="w-4 h-4 inline-block" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z"
              fill="black"
            />
          </svg>
          FREE SHIPPING IDR 500K+
          <svg class="w-4 h-4 inline-block" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z"
              fill="black"
            />
          </svg>
          NEW DROP EVERY THURSDAY
          <svg class="w-4 h-4 inline-block" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z"
              fill="black"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>
