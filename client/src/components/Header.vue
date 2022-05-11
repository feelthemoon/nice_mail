<template>
  <header class="header">
    <div class="header__inner flex justify-content-between align-items-center px-4">
      <div class="logo">
        <router-link to="/">
          <Icon name="logo" width="100px" height="100px" />
        </router-link>
      </div>
      <change-lang></change-lang>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from '@/components/Icon.vue';
import ChangeLang from '@/components/ChangeLang.vue';

export default defineComponent({
  components: {
    ChangeLang,
    Icon,
  },
});
</script>
