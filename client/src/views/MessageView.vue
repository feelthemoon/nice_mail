<template>
  <MessageViewBox></MessageViewBox>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MessageViewBox from '@/components/MessageViewBox.vue';

export default defineComponent({
  name: 'MessageView',
  components: { MessageViewBox },
});
</script>
