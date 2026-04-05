<template>
  <main class="bg-drz-black min-h-screen">
    <AppNav />
    <HeroSection />
    <MarqueeStrip />
    <ProductGrid />
    <DropSection />
    <LookbookSection />
    <AppFooter />
  </main>
</template>

<script setup>
import AppNav from "~/components/AppNav.vue";
import HeroSection from "~/components/HeroSection.vue";
import MarqueeStrip from "~/components/MarqueeStrip.vue";
import ProductGrid from "~/components/ProductGrid.vue";
import DropSection from "~/components/DropSection.vue";
import AppFooter from "~/components/AppFooter.vue";
import LookbookSection from "~/components/LookbookSection.vue";
</script>
