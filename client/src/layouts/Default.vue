<template>
  <TempBox></TempBox>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TempBox from '@/components/TempBox.vue';

export default defineComponent({
  name: 'Default',
  components: {
    TempBox,
  },
});
</script>
