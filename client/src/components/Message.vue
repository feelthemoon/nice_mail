<template>
  <div
    class="message flex justify-content-between align-items-center px-5 py-2 cursor-pointer hover:bg-blue-100 transition-all transition-duration-300"
  >
    <p class="message__from font-bold text-sm">{{ message.from }}</p>
    <p class="message__text overflow-hidden text-overflow-ellipsis text-sm">{{ message.text }}</p>
    <time class="message__date font-italic text-xs">{{ formattedDate }}</time>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'Message',
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const formattedDate = computed(() => props.message.date.toLocaleDateString());

    return {
      formattedDate,
    };
  },
});
</script>

<style scoped lang="scss">
.message {
  &__text {
    max-width: 250px;
    width: 100%;
  }
}
</style>
