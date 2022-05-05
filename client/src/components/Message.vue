<template>
  <router-link :to="`/message/${message.id}`" class="message-link">
    <div
      class="message flex justify-content-between align-items-center px-5 py-2 cursor-pointer hover:text-black-alpha-60 hover:bg-blue-100 transition-all transition-duration-300"
    >
      <p class="message__from font-bold text-sm">{{ message.from }}</p>
      <p class="message__text overflow-hidden text-overflow-ellipsis text-sm font-italic">
        {{ message.subject || 'No subject' }}
      </p>
      <time class="message__date font-italic text-xs">{{ formattedDate }}</time>
    </div>
  </router-link>
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
    const formattedDate = computed(() => new Date(props.message.date).toLocaleDateString());

    return {
      formattedDate,
    };
  },
});
</script>

<style scoped lang="scss">
.message {
  &-link {
    text-decoration: none;
    color: #fff;
  }
  &__text,
  &__from {
    max-width: 250px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
