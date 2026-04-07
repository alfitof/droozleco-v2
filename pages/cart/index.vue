<template>
  <main class="bg-drz-black min-h-screen">
    <AppNav />

    <div class="pt-28 px-6 md:px-12 pb-24">
      <div class="flex items-center gap-3 mb-10 pt-4">
        <span class="w-6 h-px bg-drz-lime"></span>
        <span
          class="font-mono text-drz-lime text-[10px] tracking-widest uppercase"
          >Your Cart</span
        >
        <span class="font-mono text-drz-muted text-[10px]"
          >({{ totalQty }} items)</span
        >
      </div>

      <div v-if="items.length === 0" class="py-32 text-center">
        <p class="font-display text-7xl text-drz-white/10 mb-6">EMPTY.</p>
        <p
          class="font-mono text-drz-muted text-xs uppercase tracking-widest mb-10"
        >
          Your cart is empty. Go cop something.
        </p>
        <NuxtLink
          to="/shop"
          class="bg-drz-lime text-drz-black font-mono text-xs uppercase tracking-widest px-8 py-4 font-bold hover:bg-drz-white transition-colors"
        >
          Shop Now →
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Cart Items -->
        <div class="lg:col-span-2 flex flex-col divide-y divide-drz-white/10">
          <TransitionGroup name="cart-item" tag="div">
            <div v-for="item in items" :key="item.id" class="py-6 flex gap-5">
              <!-- Image -->
              <NuxtLink :to="`/product/${item.id}`" class="shrink-0">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-24 h-32 object-cover"
                />
              </NuxtLink>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p
                      class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mb-1"
                    >
                      {{ item.category }}
                    </p>
                    <h3 class="font-body text-drz-white text-base font-medium">
                      {{ item.name }}
                    </h3>
                    <p
                      class="font-mono text-drz-muted text-xs mt-1 uppercase tracking-widest"
                    >
                      Size: {{ item.size }}
                    </p>
                  </div>
                  <button
                    @click="remove(item.id)"
                    class="text-drz-muted hover:text-drz-red transition-colors shrink-0 mt-1"
                    aria-label="Remove"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <!-- Qty + Price row -->
                <div class="flex items-center justify-between mt-4">
                  <div class="flex items-center border border-drz-white/20">
                    <button
                      @click="decrement(item.id)"
                      class="w-9 h-9 text-drz-white hover:text-drz-lime transition-colors font-mono text-base flex items-center justify-center"
                    >
                      −
                    </button>
                    <span
                      class="w-9 h-9 flex items-center justify-center font-mono text-drz-white text-sm border-x border-drz-white/20"
                      >{{ item.qty }}</span
                    >
                    <button
                      @click="increment(item.id)"
                      class="w-9 h-9 text-drz-white hover:text-drz-lime transition-colors font-mono text-base flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <span class="font-mono text-drz-lime text-sm">{{
                    formatRp(item.price * item.qty)
                  }}</span>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="border border-drz-white/10 p-6 sticky top-28">
            <h3 class="font-display text-2xl text-drz-white mb-6">
              ORDER SUMMARY
            </h3>

            <div
              class="flex flex-col gap-3 mb-6 font-mono text-xs text-drz-muted uppercase tracking-widest"
            >
              <div class="flex justify-between">
                <span>Subtotal ({{ totalQty }} items)</span>
                <span class="text-drz-white">{{ formatRp(total) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span>
                <span
                  :class="total >= 500000 ? 'text-drz-lime' : 'text-drz-white'"
                >
                  {{ total >= 500000 ? "FREE" : formatRp(25000) }}
                </span>
              </div>
            </div>

            <!-- Free shipping bar -->
            <div v-if="total < 500000" class="mb-6">
              <div
                class="flex justify-between font-mono text-[10px] text-drz-muted uppercase tracking-widest mb-2"
              >
                <span>Free shipping progress</span>
                <span class="text-drz-lime"
                  >{{ formatRp(500000 - total) }} left</span
                >
              </div>
              <div class="h-1 bg-drz-gray rounded-full overflow-hidden">
                <div
                  class="h-full bg-drz-lime transition-all duration-500"
                  :style="{
                    width: Math.min(100, (total / 500000) * 100) + '%',
                  }"
                ></div>
              </div>
            </div>
            <div
              v-else
              class="flex items-center gap-2 mb-6 font-mono text-[10px] text-drz-lime uppercase tracking-widest"
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
              Free shipping unlocked!
            </div>

            <div
              class="flex justify-between font-mono text-sm uppercase tracking-widest border-t border-drz-white/10 pt-5 mb-6"
            >
              <span class="text-drz-white">Total</span>
              <span class="text-drz-lime font-bold">
                {{ formatRp(total + (total >= 500000 ? 0 : 25000)) }}
              </span>
            </div>

            <!-- Promo code -->
            <div class="flex gap-0 mb-6">
              <input
                type="text"
                placeholder="Promo code"
                v-model="promoCode"
                class="flex-1 bg-drz-gray border border-drz-white/15 text-drz-white font-mono text-xs px-4 py-3 outline-none placeholder:text-drz-muted focus:border-drz-lime transition-colors"
              />
              <button
                class="bg-drz-white/10 border border-drz-white/15 border-l-0 text-drz-muted font-mono text-xs uppercase tracking-widest px-4 py-3 hover:bg-drz-lime hover:text-drz-black hover:border-drz-lime transition-all"
              >
                Apply
              </button>
            </div>

            <NuxtLink
              to="/checkout"
              class="block w-full bg-drz-lime text-drz-black font-mono text-xs uppercase tracking-widest py-4 font-bold hover:bg-drz-white transition-colors mb-3 text-center"
            >
              Checkout →
            </NuxtLink>
            <NuxtLink
              to="/shop"
              class="block w-full border border-drz-white/20 text-drz-muted font-mono text-xs uppercase tracking-widest py-4 text-center hover:border-drz-white hover:text-drz-white transition-colors"
            >
              Continue Shopping
            </NuxtLink>

            <!-- Payment icons -->
            <div class="flex items-center justify-center gap-3 mt-6">
              <span
                v-for="pay in ['VISA', 'GoPay', 'OVO', 'QRIS']"
                :key="pay"
                class="font-mono text-[9px] text-drz-muted/60 border border-drz-white/10 px-2 py-1 uppercase tracking-widest"
              >
                {{ pay }}
              </span>
            </div>
          </div>
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
import { useCart } from "~/composables/useCart.js";

const { items, total, totalQty, increment, decrement, remove, formatRp } =
  useCart();
const promoCode = ref("");
</script>

<style scoped>
.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.4s ease;
}
.cart-item-enter-from,
.cart-item-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
