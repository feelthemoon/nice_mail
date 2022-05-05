<template>
  <div class="messagebox mt-3 mx-auto">
    <header class="messagebox__header bg-primary py-3 px-5">
      <ul class="messagebox__header-titles flex justify-content-between align-items-center">
        <li class="list-none">From</li>
        <li class="list-none">Subject</li>
        <li class="list-none">Date</li>
      </ul>
    </header>
    <section class="messagebox__content py-3">
      <template v-if="messages.length">
        <MailMessage
          v-for="(message, index) in messages"
          :key="index"
          :message="message"
        ></MailMessage>
      </template>
      <template v-else>
        <div class="loading mt-8 flex flex-column align-items-center">
          <ProgressSpinner
            style="width: 80px; height: 80px"
            strokeWidth="8"
            animationDuration=".5s"
          />
          <p class="loading__text mt-3 text-bluegray-400 text-lg">Waiting for new messages</p>
        </div>
      </template>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import MailMessage from '@/components/Message.vue';
import ProgressSpinner from 'primevue/progressspinner';

export default defineComponent({
  name: 'MessagesBox',
  components: {
    MailMessage,
    ProgressSpinner,
  },
  setup() {
    const store = useStore();
    const messages = computed(() => store.getters['mail/messages']);
    return {
      messages,
    };
  },
});
</script>
