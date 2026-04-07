<template>
  <div>
    <div class="cursor-dot" ref="cursorDot"></div>
    <div class="cursor-ring" ref="cursorRing"></div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const cursorDot = ref(null);
const cursorRing = ref(null);

onMounted(() => {
  const dot = cursorDot.value;
  const ring = cursorRing.value;

  // Deteksi touch device — jika touch, sembunyikan cursor & skip semua logic
  const isTouch = window.matchMedia(
    "(hover: none) and (pointer: coarse)",
  ).matches;
  if (isTouch) {
    dot.style.display = "none";
    ring.style.display = "none";
    return;
  }

  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  }

  animateRing();
});
</script>
