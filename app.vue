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

  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;
  let rafId = null;

  // ── Mouse (desktop) ──────────────────────────────
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  // ── Touch (mobile) ───────────────────────────────
  function applyTouch(e) {
    const t = e.touches[0];
    mouseX = t.clientX;
    mouseY = t.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";

    // show cursor on first touch (hidden by default on mobile)
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  }

  function hideOnTouchEnd() {
    // fade out after finger lifts
    setTimeout(() => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    }, 600);
  }

  window.addEventListener("touchstart", applyTouch, { passive: true });
  window.addEventListener("touchmove", applyTouch, { passive: true });
  window.addEventListener("touchend", hideOnTouchEnd, { passive: true });

  // ── Lagging ring animation ────────────────────────
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();
});
</script>
