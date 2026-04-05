// composables/useCart.js
import { ref, computed } from "vue";

const items = ref([
  {
    id: 1,
    name: "Void Oversized Tee",
    category: "Tops",
    price: 449000,
    size: "L",
    qty: 1,
    image: "https://placehold.co/300x400/111111/C8FF00?text=VOID+TEE",
  },
  {
    id: 2,
    name: "Hazard Cargo Pants",
    category: "Bottoms",
    price: 899000,
    size: "M",
    qty: 2,
    image: "https://placehold.co/300x400/141414/ffffff?text=CARGO",
  },
  {
    id: 3,
    name: "Ritual Beanie",
    category: "Headwear",
    price: 249000,
    size: "ONE SIZE",
    qty: 1,
    image: "https://placehold.co/300x400/111111/C8FF00?text=BEANIE",
  },
]);

export function useCart() {
  const total = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.qty, 0),
  );

  const totalQty = computed(() =>
    items.value.reduce((sum, i) => sum + i.qty, 0),
  );

  function increment(id: number) {
    const item = items.value.find((i) => i.id === id);
    if (item) item.qty++;
  }

  function decrement(id: number) {
    const item = items.value.find((i) => i.id === id);
    if (item && item.qty > 1) item.qty--;
  }

  function remove(id: number) {
    items.value = items.value.filter((i) => i.id !== id);
  }

  function formatRp(val: number) {
    return "Rp " + val.toLocaleString("id-ID");
  }

  return { items, total, totalQty, increment, decrement, remove, formatRp };
}
