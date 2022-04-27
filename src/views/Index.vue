<template>
  <div class="home">
    <TempBox></TempBox>
    <MessagesBox></MessagesBox>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TempBox from '@/components/TempBox.vue';
import MessagesBox from '@/components/MessagesBox.vue';

export default defineComponent({
  components: { MessagesBox, TempBox },
});
</script>
