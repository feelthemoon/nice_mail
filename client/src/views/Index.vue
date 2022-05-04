<template>
  <div class="home">
    <MessagesBox></MessagesBox>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted, watch } from 'vue';
import { useStore } from '@/store';
import MessagesBox from '@/components/MessagesBox.vue';

export default defineComponent({
  components: { MessagesBox },
  setup() {
    const store = useStore();

    const email = computed(() => store.getters['mail/email']);

    onUnmounted(() => {
      store.dispatch('mail/disconnectWS');
    });
    if (email.value) {
      store.dispatch('mail/connectWS').then(() => store.dispatch('mail/getMessages'));
    }
    watch(email, (value) => {
      if (value) {
        store.dispatch('mail/connectWS').then(() => store.dispatch('mail/getMessages'));
      }
    });
  },
});
</script>
