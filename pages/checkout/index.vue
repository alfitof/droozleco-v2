<template>
  <main class="bg-drz-black min-h-screen">
    <AppNav />

    <div class="pt-28 px-6 md:px-12 pb-24">
      <div class="flex items-center gap-3 mb-10 pt-4">
        <NuxtLink
          to="/cart"
          class="text-drz-muted hover:text-drz-lime transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </NuxtLink>
        <span class="w-px h-4 bg-drz-white/20"></span>
        <span
          class="font-mono text-drz-lime text-[10px] tracking-widest uppercase"
          >Checkout</span
        >
      </div>

      <div class="flex items-center gap-0 mb-14 max-w-md">
        <div
          v-for="(step, i) in steps"
          :key="step"
          class="flex items-center gap-0"
        >
          <div class="flex flex-col items-center gap-1.5">
            <div
              class="w-7 h-7 flex items-center justify-center font-mono text-[10px] border transition-all duration-300"
              :class="{
                'bg-drz-lime border-drz-lime text-drz-black font-bold':
                  currentStep > i,
                'border-drz-lime text-drz-lime': currentStep === i,
                'border-drz-white/20 text-drz-muted': currentStep < i,
              }"
            >
              <svg
                v-if="currentStep > i"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span v-else>{{ i + 1 }}</span>
            </div>
            <span
              class="font-mono text-[9px] uppercase tracking-widest whitespace-nowrap"
              :class="currentStep >= i ? 'text-drz-white' : 'text-drz-muted'"
              >{{ step }}</span
            >
          </div>
          <div
            v-if="i < steps.length - 1"
            class="h-px w-12 md:w-20 mb-4 mx-1 transition-all duration-300"
            :class="currentStep > i ? 'bg-drz-lime' : 'bg-drz-white/15'"
          ></div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div class="lg:col-span-2">
          <div v-if="currentStep === 0">
            <h2 class="font-display text-3xl text-drz-white mb-8">
              SHIPPING INFO
            </h2>

            <div class="flex flex-col gap-5">
              <div>
                <p
                  class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mb-4"
                >
                  Contact
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1.5">
                    <label
                      class="font-mono text-[10px] text-drz-muted uppercase tracking-widest"
                      >First Name *</label
                    >
                    <input
                      v-model="form.firstName"
                      type="text"
                      placeholder="Rizky"
                      class="checkout-input"
                      :class="errors.firstName ? 'border-drz-red' : ''"
                    />
                    <span
                      v-if="errors.firstName"
                      class="font-mono text-drz-red text-[9px] uppercase tracking-widest"
                      >{{ errors.firstName }}</span
                    >
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label
                      class="font-mono text-[10px] text-drz-muted uppercase tracking-widest"
                      >Last Name *</label
                    >
                    <input
                      v-model="form.lastName"
                      type="text"
                      placeholder="Pratama"
                      class="checkout-input"
                      :class="errors.lastName ? 'border-drz-red' : ''"
                    />
                    <span
                      v-if="errors.lastName"
                      class="font-mono text-drz-red text-[9px] uppercase tracking-widest"
                      >{{ errors.lastName }}</span
                    >
                  </div>
                </div>
              </div>

              <div class="flex flex-col gap-1.5">
                <label
                  class="font-mono text-[10px] text-drz-muted uppercase tracking-widest"
                  >Email *</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="rizky@email.com"
                  class="checkout-input"
                  :class="errors.email ? 'border-drz-red' : ''"
                />
                <span
                  v-if="errors.email"
                  class="font-mono text-drz-red text-[9px] uppercase tracking-widest"
                  >{{ errors.email }}</span
                >
              </div>

              <div class="flex flex-col gap-1.5">
                <label
                  class="font-mono text-[10px] text-drz-muted uppercase tracking-widest"
                  >Phone *</label
                >
                <div class="flex">
                  <span
                    class="border border-drz-white/15 border-r-0 px-3 flex items-center font-mono text-drz-muted text-xs"
                    >+62</span
                  >
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="812 3456 7890"
                    class="checkout-input flex-1"
                    style="border-left: 0"
                    :class="errors.phone ? 'border-drz-red' : ''"
                  />
                </div>
                <span
                  v-if="errors.phone"
                  class="font-mono text-drz-red text-[9px] uppercase tracking-widest"
                  >{{ errors.phone }}</span
                >
              </div>

              <div class="pt-4 border-t border-drz-white/10">
                <p
                  class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mb-4"
                >
                  Shipping Address
                </p>

                <div class="flex flex-col gap-4">
                  <div class="flex flex-col gap-1.5">
                    <label
                      class="font-mono text-[10px] text-drz-muted uppercase tracking-widest"
                      >Address *</label
                    >
                    <input
                      v-model="form.address"
                      type="text"
                      placeholder="Jl. Sudirman No. 1, Apt 2B"
                      class="checkout-input"
                      :class="errors.address ? 'border-drz-red' : ''"
                    />
                    <span
                      v-if="errors.address"
                      class="font-mono text-drz-red text-[9px] uppercase tracking-widest"
                      >{{ errors.address }}</span
                    >
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1.5">
                      <label
                        class="font-mono text-[10px] text-drz-muted uppercase tracking-widest"
                        >City *</label
                      >
                      <input
                        v-model="form.city"
                        type="text"
                        placeholder="Jakarta"
                        class="checkout-input"
                        :class="errors.city ? 'border-drz-red' : ''"
                      />
                      <span
                        v-if="errors.city"
                        class="font-mono text-drz-red text-[9px] uppercase tracking-widest"
                        >{{ errors.city }}</span
                      >
                    </div>
                    <div class="flex flex-col gap-1.5">
                      <label
                        class="font-mono text-[10px] text-drz-muted uppercase tracking-widest"
                        >Province *</label
                      >
                      <select
                        v-model="form.province"
                        class="checkout-input"
                        :class="errors.province ? 'border-drz-red' : ''"
                      >
                        <option value="" disabled>Select province</option>
                        <option v-for="p in provinces" :key="p" :value="p">
                          {{ p }}
                        </option>
                      </select>
                      <span
                        v-if="errors.province"
                        class="font-mono text-drz-red text-[9px] uppercase tracking-widest"
                        >{{ errors.province }}</span
                      >
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1.5">
                      <label
                        class="font-mono text-[10px] text-drz-muted uppercase tracking-widest"
                        >Postal Code *</label
                      >
                      <input
                        v-model="form.postal"
                        type="text"
                        placeholder="12345"
                        class="checkout-input"
                        maxlength="5"
                        :class="errors.postal ? 'border-drz-red' : ''"
                      />
                      <span
                        v-if="errors.postal"
                        class="font-mono text-drz-red text-[9px] uppercase tracking-widest"
                        >{{ errors.postal }}</span
                      >
                    </div>
                    <div class="flex flex-col gap-1.5">
                      <label
                        class="font-mono text-[10px] text-drz-muted uppercase tracking-widest"
                        >Notes (optional)</label
                      >
                      <input
                        v-model="form.notes"
                        type="text"
                        placeholder="Leave at door, etc."
                        class="checkout-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-4 border-t border-drz-white/10">
                <p
                  class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mb-4"
                >
                  Shipping Method
                </p>
                <div class="flex flex-col gap-3">
                  <label
                    v-for="method in shippingMethods"
                    :key="method.id"
                    class="flex items-center justify-between border p-4 cursor-pointer transition-all duration-200"
                    :class="
                      form.shipping === method.id
                        ? 'border-drz-lime bg-drz-lime/5'
                        : 'border-drz-white/15 hover:border-drz-white/30'
                    "
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="w-4 h-4 border-2 rounded-full flex items-center justify-center shrink-0 transition-all"
                        :class="
                          form.shipping === method.id
                            ? 'border-drz-lime'
                            : 'border-drz-muted'
                        "
                      >
                        <div
                          v-if="form.shipping === method.id"
                          class="w-2 h-2 rounded-full bg-drz-lime"
                        ></div>
                      </div>
                      <div>
                        <p
                          class="font-mono text-drz-white text-xs uppercase tracking-widest"
                        >
                          {{ method.name }}
                        </p>
                        <p class="font-body text-drz-muted text-xs mt-0.5">
                          {{ method.estimate }}
                        </p>
                      </div>
                    </div>
                    <span class="font-mono text-drz-lime text-sm">
                      {{ method.price === 0 ? "FREE" : formatRp(method.price) }}
                    </span>
                    <input
                      type="radio"
                      v-model="form.shipping"
                      :value="method.id"
                      class="sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>

            <button
              @click="goToStep1"
              class="mt-10 w-full bg-drz-lime text-drz-black font-mono text-xs uppercase tracking-widest py-4 font-bold hover:bg-drz-white transition-colors"
            >
              Continue to Payment →
            </button>
          </div>

          <div v-if="currentStep === 1">
            <h2 class="font-display text-3xl text-drz-white mb-8">PAYMENT</h2>

            <div
              class="border border-drz-white/10 p-4 mb-8 flex items-center justify-between"
            >
              <div>
                <p
                  class="font-mono text-drz-muted text-[9px] uppercase tracking-widest mb-1"
                >
                  Ships to
                </p>
                <p class="font-body text-drz-white text-sm">
                  {{ form.address }}, {{ form.city }}, {{ form.province }}
                  {{ form.postal }}
                </p>
              </div>
              <button
                @click="currentStep = 0"
                class="font-mono text-drz-lime text-[10px] uppercase tracking-widest hover:text-drz-white transition-colors shrink-0 ml-4"
              >
                Edit
              </button>
            </div>

            <div class="flex flex-col gap-3 mb-8">
              <label
                v-for="method in paymentMethods"
                :key="method.id"
                class="border cursor-pointer transition-all duration-200 overflow-hidden"
                :class="
                  form.payment === method.id
                    ? 'border-drz-lime'
                    : 'border-drz-white/15 hover:border-drz-white/30'
                "
              >
                <div
                  class="flex items-center gap-3 p-4"
                  @click="form.payment = method.id"
                >
                  <div
                    class="w-4 h-4 border-2 rounded-full flex items-center justify-center shrink-0 transition-all"
                    :class="
                      form.payment === method.id
                        ? 'border-drz-lime'
                        : 'border-drz-muted'
                    "
                  >
                    <div
                      v-if="form.payment === method.id"
                      class="w-2 h-2 rounded-full bg-drz-lime"
                    ></div>
                  </div>
                  <div class="flex-1">
                    <p
                      class="font-mono text-drz-white text-xs uppercase tracking-widest"
                    >
                      {{ method.name }}
                    </p>
                    <p class="font-body text-drz-muted text-xs mt-0.5">
                      {{ method.desc }}
                    </p>
                  </div>
                  <div class="flex gap-1.5">
                    <span
                      v-for="tag in method.tags"
                      :key="tag"
                      class="font-mono text-[8px] text-drz-muted border border-drz-white/15 px-1.5 py-0.5 uppercase tracking-widest"
                      >{{ tag }}</span
                    >
                  </div>
                </div>

                <Transition name="accordion">
                  <div
                    v-if="
                      form.payment === method.id &&
                      method.id === 'bank-transfer'
                    "
                    class="border-t border-drz-white/10 bg-drz-white/[0.02] px-4 pb-4 pt-4"
                  >
                    <p
                      class="font-mono text-drz-muted text-[9px] uppercase tracking-widest mb-3"
                    >
                      Transfer to one of these accounts:
                    </p>
                    <div class="flex flex-col gap-2">
                      <div
                        v-for="bank in bankAccounts"
                        :key="bank.bank"
                        class="flex items-center justify-between"
                      >
                        <div>
                          <span class="font-mono text-drz-white text-xs">{{
                            bank.bank
                          }}</span>
                          <span class="font-mono text-drz-muted text-xs ml-3">{{
                            bank.number
                          }}</span>
                        </div>
                        <span class="font-mono text-drz-muted text-[10px]">{{
                          bank.name
                        }}</span>
                      </div>
                    </div>
                    <p
                      class="font-body text-drz-muted text-xs mt-4 leading-relaxed"
                    >
                      After transferring, you'll receive a confirmation email.
                      Your order will be processed once payment is verified
                      (1×24 hours).
                    </p>
                  </div>
                </Transition>

                <Transition name="accordion">
                  <div
                    v-if="form.payment === method.id && method.id === 'ewallet'"
                    class="border-t border-drz-white/10 bg-drz-white/[0.02] px-4 pb-4 pt-4"
                  >
                    <p
                      class="font-mono text-drz-muted text-[9px] uppercase tracking-widest mb-3"
                    >
                      Pay with:
                    </p>
                    <div class="flex gap-2 flex-wrap">
                      <button
                        v-for="wallet in ewallets"
                        :key="wallet"
                        @click.prevent="selectedWallet = wallet"
                        class="font-mono text-xs px-4 py-2 border transition-all uppercase tracking-widest"
                        :class="
                          selectedWallet === wallet
                            ? 'border-drz-lime text-drz-lime bg-drz-lime/10'
                            : 'border-drz-white/15 text-drz-muted hover:border-drz-white/30 hover:text-drz-white'
                        "
                      >
                        {{ wallet }}
                      </button>
                    </div>
                    <p
                      v-if="selectedWallet"
                      class="font-body text-drz-muted text-xs mt-3 leading-relaxed"
                    >
                      You'll be redirected to {{ selectedWallet }} to complete
                      your payment after placing the order.
                    </p>
                  </div>
                </Transition>

                <Transition name="accordion">
                  <div
                    v-if="form.payment === method.id && method.id === 'cod'"
                    class="border-t border-drz-white/10 bg-drz-white/[0.02] px-4 pb-4 pt-4"
                  >
                    <p class="font-body text-drz-muted text-xs leading-relaxed">
                      Pay in cash when your order arrives. Please prepare the
                      exact amount. COD is only available for orders below Rp
                      1.000.000 and selected areas.
                    </p>
                  </div>
                </Transition>
              </label>
            </div>

            <div class="flex gap-3">
              <button
                @click="currentStep = 0"
                class="border border-drz-white/20 text-drz-muted font-mono text-xs uppercase tracking-widest px-6 py-4 hover:border-drz-white hover:text-drz-white transition-colors"
              >
                ← Back
              </button>
              <button
                @click="goToStep2"
                class="flex-1 bg-drz-lime text-drz-black font-mono text-xs uppercase tracking-widest py-4 font-bold hover:bg-drz-white transition-colors"
              >
                Review Order →
              </button>
            </div>
          </div>

          <div v-if="currentStep === 2">
            <h2 class="font-display text-3xl text-drz-white mb-8">
              REVIEW ORDER
            </h2>

            <div
              class="flex flex-col divide-y divide-drz-white/10 mb-8 border-t border-drz-white/10"
            >
              <div
                v-for="item in items"
                :key="item.id"
                class="flex items-center gap-4 py-4"
              >
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-14 h-18 object-cover shrink-0"
                  style="height: 72px"
                />
                <div class="flex-1 min-w-0">
                  <p
                    class="font-body text-drz-white text-sm font-medium truncate"
                  >
                    {{ item.name }}
                  </p>
                  <p
                    class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mt-0.5"
                  >
                    Size: {{ item.size }} · Qty: {{ item.qty }}
                  </p>
                </div>
                <span class="font-mono text-drz-lime text-sm shrink-0">{{
                  formatRp(item.price * item.qty)
                }}</span>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div class="border border-drz-white/10 p-4">
                <p
                  class="font-mono text-drz-muted text-[9px] uppercase tracking-widest mb-3"
                >
                  Ships To
                </p>
                <p class="font-body text-drz-white text-sm leading-relaxed">
                  {{ form.firstName }} {{ form.lastName }}<br />
                  {{ form.address }}<br />
                  {{ form.city }}, {{ form.province }} {{ form.postal }}<br />
                  +62 {{ form.phone }}
                </p>
                <button
                  @click="currentStep = 0"
                  class="font-mono text-drz-lime text-[9px] uppercase tracking-widest mt-3 hover:text-drz-white transition-colors"
                >
                  Edit
                </button>
              </div>
              <div class="border border-drz-white/10 p-4">
                <p
                  class="font-mono text-drz-muted text-[9px] uppercase tracking-widest mb-3"
                >
                  Payment Method
                </p>
                <p class="font-body text-drz-white text-sm">
                  {{ paymentMethods.find((m) => m.id === form.payment)?.name }}
                </p>
                <p
                  v-if="form.payment === 'ewallet' && selectedWallet"
                  class="font-mono text-drz-lime text-[10px] mt-1"
                >
                  via {{ selectedWallet }}
                </p>
                <button
                  @click="currentStep = 1"
                  class="font-mono text-drz-lime text-[9px] uppercase tracking-widest mt-3 hover:text-drz-white transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>

            <label class="flex items-start gap-3 mb-8 cursor-pointer group">
              <div
                class="w-5 h-5 border shrink-0 mt-0.5 flex items-center justify-center transition-all"
                :class="
                  agreedToTerms
                    ? 'bg-drz-lime border-drz-lime'
                    : 'border-drz-white/30 group-hover:border-drz-white/60'
                "
                @click="agreedToTerms = !agreedToTerms"
              >
                <svg
                  v-if="agreedToTerms"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#050505"
                  stroke-width="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p class="font-body text-drz-muted text-sm leading-relaxed">
                I agree to Droozle's
                <span
                  class="text-drz-white underline underline-offset-2 cursor-pointer hover:text-drz-lime transition-colors"
                  >Terms of Service</span
                >
                and
                <span
                  class="text-drz-white underline underline-offset-2 cursor-pointer hover:text-drz-lime transition-colors"
                  >Return Policy</span
                >.
              </p>
            </label>
            <p
              v-if="errors.terms"
              class="font-mono text-drz-red text-[9px] uppercase tracking-widest -mt-5 mb-6"
            >
              {{ errors.terms }}
            </p>

            <div class="flex gap-3">
              <button
                @click="currentStep = 1"
                class="border border-drz-white/20 text-drz-muted font-mono text-xs uppercase tracking-widest px-6 py-4 hover:border-drz-white hover:text-drz-white transition-colors"
              >
                ← Back
              </button>
              <button
                @click="placeOrder"
                class="flex-1 bg-drz-lime text-drz-black font-mono text-xs uppercase tracking-widest py-4 font-bold hover:bg-drz-white transition-colors"
              >
                Place Order →
              </button>
            </div>
          </div>

          <div v-if="currentStep === 3" class="py-4 md:py-8">
            <div class="flex items-center gap-4 mb-10">
              <div
                class="w-12 h-12 bg-drz-lime flex items-center justify-center shrink-0"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#050505"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <p
                  class="font-mono text-drz-lime text-[10px] uppercase tracking-widest"
                >
                  Order Placed
                </p>
                <p
                  class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mt-0.5"
                >
                  #DRZ-{{ orderNumber }}
                </p>
              </div>
            </div>

            <h2
              class="font-display text-drz-white leading-none mb-6"
              style="font-size: clamp(3.5rem, 10vw, 8rem)"
            >
              YOU'RE<br /><span class="text-drz-lime">LOCKED</span><br />IN.
            </h2>

            <p
              class="font-body text-drz-muted text-sm leading-relaxed mb-10 max-w-sm"
            >
              A confirmation email has been sent to
              <span class="font-mono text-drz-white">{{ form.email }}</span
              >. Keep it somewhere safe.
            </p>

            <div class="w-16 h-px bg-drz-lime mb-10"></div>

            <div class="mb-10">
              <p
                class="font-mono text-drz-muted text-[10px] uppercase tracking-widest mb-5 flex items-center gap-3"
              >
                <span class="w-5 h-px bg-drz-muted inline-block"></span>
                What's Next
              </p>
              <ul class="flex flex-col gap-4">
                <li
                  v-for="(step, i) in nextSteps"
                  :key="i"
                  class="flex items-start gap-4 group"
                >
                  <span
                    class="font-mono text-[10px] text-drz-black bg-drz-lime w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 font-bold"
                    >{{ i + 1 }}</span
                  >
                  <span
                    class="font-body text-drz-muted text-sm leading-relaxed group-hover:text-drz-white transition-colors duration-200"
                  >
                    {{ step }}
                  </span>
                </li>
              </ul>
            </div>

            <div class="border border-drz-white/10 mb-10">
              <div class="grid grid-cols-3 divide-x divide-drz-white/10">
                <div class="px-4 py-4">
                  <p
                    class="font-mono text-drz-muted text-[9px] uppercase tracking-widest mb-1"
                  >
                    Order
                  </p>
                  <p class="font-mono text-drz-white text-xs">
                    #DRZ-{{ orderNumber }}
                  </p>
                </div>
                <div class="px-4 py-4">
                  <p
                    class="font-mono text-drz-muted text-[9px] uppercase tracking-widest mb-1"
                  >
                    Payment
                  </p>
                  <p class="font-mono text-drz-white text-xs truncate">
                    {{
                      paymentMethods.find((m) => m.id === form.payment)?.name
                    }}
                  </p>
                </div>
                <div class="px-4 py-4">
                  <p
                    class="font-mono text-drz-muted text-[9px] uppercase tracking-widest mb-1"
                  >
                    Total
                  </p>
                  <p class="font-mono text-drz-lime text-xs font-bold">
                    {{ formatRp(total + shippingCost) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <NuxtLink
                to="/shop"
                class="bg-drz-lime text-drz-black font-mono text-xs uppercase tracking-widest px-8 py-4 font-bold hover:bg-drz-white transition-colors text-center"
              >
                Continue Shopping →
              </NuxtLink>
              <NuxtLink
                to="/"
                class="border border-drz-white/20 text-drz-muted font-mono text-xs uppercase tracking-widest px-8 py-4 hover:border-drz-white hover:text-drz-white transition-colors text-center"
              >
                Back to Home
              </NuxtLink>
            </div>
          </div>
        </div>

        <div v-if="currentStep < 3" class="lg:col-span-1">
          <div class="border border-drz-white/10 p-6 sticky top-28">
            <h3 class="font-display text-xl text-drz-white mb-5">
              ORDER SUMMARY
            </h3>

            <div
              class="flex flex-col gap-3 mb-5 max-h-[13rem] overflow-y-auto pt-[0.5rem]"
            >
              <div
                v-for="item in items"
                :key="item.id"
                class="flex items-center gap-3"
              >
                <div class="relative shrink-0">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="w-12 h-14 object-cover"
                  />
                  <span
                    class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-drz-lime text-drz-black font-mono text-[9px] font-bold flex items-center justify-center rounded-full"
                    >{{ item.qty }}</span
                  >
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-body text-drz-white text-xs truncate">
                    {{ item.name }}
                  </p>
                  <p
                    class="font-mono text-drz-muted text-[9px] uppercase tracking-widest"
                  >
                    {{ item.size }}
                  </p>
                </div>
                <span class="font-mono text-drz-lime text-xs shrink-0">{{
                  formatRp(item.price * item.qty)
                }}</span>
              </div>
            </div>

            <div
              class="flex flex-col gap-2.5 border-t border-drz-white/10 pt-5 font-mono text-xs uppercase tracking-widest"
            >
              <div class="flex justify-between text-drz-muted">
                <span>Subtotal</span>
                <span class="text-drz-white">{{ formatRp(total) }}</span>
              </div>
              <div class="flex justify-between text-drz-muted">
                <span>Shipping</span>
                <span
                  :class="
                    shippingCost === 0 ? 'text-drz-lime' : 'text-drz-white'
                  "
                >
                  {{ shippingCost === 0 ? "FREE" : formatRp(shippingCost) }}
                </span>
              </div>
              <div
                class="flex justify-between text-drz-white border-t border-drz-white/10 pt-3 mt-1 text-sm"
              >
                <span>Total</span>
                <span class="text-drz-lime font-bold">{{
                  formatRp(total + shippingCost)
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import AppNav from "~/components/AppNav.vue";
import AppFooter from "~/components/AppFooter.vue";
import { useCart } from "~/composables/useCart.js";

const { items, total, formatRp } = useCart();

const currentStep = ref(0);
const agreedToTerms = ref(false);
const selectedWallet = ref("");
const orderNumber = ref("");
const errors = ref({});

const steps = ["Shipping", "Payment", "Review"];

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  province: "",
  postal: "",
  notes: "",
  shipping: "regular",
  payment: "bank-transfer",
});

const shippingMethods = [
  { id: "regular", name: "JNE REG", estimate: "2–5 business days", price: 0 },
  {
    id: "express",
    name: "JNE YES",
    estimate: "1–2 business days",
    price: 35000,
  },
  {
    id: "same",
    name: "SiCepat BEST",
    estimate: "Same day (order before 12.00)",
    price: 55000,
  },
];

const shippingCost = computed(() => {
  const method = shippingMethods.find((m) => m.id === form.value.shipping);
  return method?.price ?? 0;
});

const paymentMethods = [
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    desc: "BCA, BRI, Mandiri, BNI",
    tags: ["Manual Confirm"],
  },
  {
    id: "ewallet",
    name: "E-Wallet",
    desc: "GoPay, OVO, DANA, ShopeePay",
    tags: ["Instant"],
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    desc: "Pay when your order arrives",
    tags: ["COD"],
  },
];

const bankAccounts = [
  { bank: "BCA", number: "1234 5678 90", name: "PT Droozle Indonesia" },
  { bank: "Mandiri", number: "0987 6543 21", name: "PT Droozle Indonesia" },
  { bank: "BRI", number: "1111 2222 33", name: "PT Droozle Indonesia" },
];

const ewallets = ["GoPay", "OVO", "DANA", "ShopeePay"];

const provinces = [
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "Jawa Timur",
  "DI Yogyakarta",
  "Banten",
  "Bali",
  "Sumatera Utara",
  "Sumatera Selatan",
  "Kalimantan Selatan",
  "Sulawesi Selatan",
  "Nusa Tenggara Barat",
  "Aceh",
  "Riau",
  "Kepulauan Riau",
];

const nextSteps = [
  "Check your email for the order confirmation.",
  "If using bank transfer, complete payment within 1×24 hours.",
  "We'll notify you once your package is shipped.",
  "Track your order via the courier's website.",
];

function validateStep0() {
  const e = {};
  const f = form.value;
  if (!f.firstName.trim()) e.firstName = "Required";
  if (!f.lastName.trim()) e.lastName = "Required";
  if (!f.email.trim() || !/\S+@\S+\.\S+/.test(f.email))
    e.email = "Valid email required";
  if (!f.phone.trim()) e.phone = "Required";
  if (!f.address.trim()) e.address = "Required";
  if (!f.city.trim()) e.city = "Required";
  if (!f.province) e.province = "Required";
  if (!f.postal.trim() || f.postal.length < 5)
    e.postal = "Valid postal code required";
  errors.value = e;
  return Object.keys(e).length === 0;
}

function validateStep1() {
  errors.value = {};
  return true;
}

function validateStep2() {
  const e = {};
  if (!agreedToTerms.value) e.terms = "Please agree to the terms to continue";
  errors.value = e;
  return Object.keys(e).length === 0;
}

function goToStep1() {
  if (validateStep0()) {
    currentStep.value = 1;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function goToStep2() {
  if (validateStep1()) {
    currentStep.value = 2;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function placeOrder() {
  if (!validateStep2()) return;
  orderNumber.value = Math.random().toString(36).substring(2, 8).toUpperCase();
  currentStep.value = 3;
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<style scoped>
.checkout-input {
  @apply w-full bg-transparent border border-drz-white/15 text-drz-white font-mono text-xs px-4 py-3 outline-none placeholder:text-drz-muted transition-colors;
}
.checkout-input:focus {
  @apply border-drz-lime;
}
.checkout-input option {
  background-color: #050505;
  color: #f5f0e8;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 400px;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
