<template>
  <div class="messagebox__content-html">
    <div v-html="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  name: 'MessageViewContent',
});
</script>
