<template>
  <header class="header">
    <div class="header__inner flex justify-content-between align-items-center px-4">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/static/logo.svg" alt="Nice Mail" width="100" height="100" />
        </router-link>
      </div>
      <div class="header__auth">
        <auth-dialog></auth-dialog>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthDialog from '@/components/AuthDialog.vue';

export default defineComponent({
  components: {
    AuthDialog,
  },
});
</script>
