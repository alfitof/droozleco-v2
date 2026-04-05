<template>
  <div
    class="relative pt-32 pb-16 px-6 md:px-12 overflow-hidden border-b border-drz-white/10"
  >
    <!-- bg label -->
    <div
      class="absolute inset-0 flex items-end pb-4 pointer-events-none overflow-hidden"
    >
      <span
        class="font-display leading-none text-drz-white/[0.03] select-none"
        style="font-size: clamp(5rem, 20vw, 16rem); letter-spacing: -0.02em"
        >{{ bgText || title }}</span
      >
    </div>

    <div class="relative z-10">
      <div class="flex items-center gap-3 mb-4">
        <span class="w-6 h-px bg-drz-lime"></span>
        <span
          class="font-mono text-drz-lime text-[10px] tracking-widest uppercase"
          >{{ label }}</span
        >
      </div>
      <h1
        class="font-display leading-none text-drz-white"
        style="font-size: clamp(3.5rem, 10vw, 9rem)"
      >
        <slot>{{ title }}</slot>
      </h1>
      <p
        v-if="sub"
        class="font-body text-drz-muted text-sm mt-4 max-w-sm leading-relaxed"
      >
        {{ sub }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  label: String,
  sub: String,
  bgText: String,
});
</script>
