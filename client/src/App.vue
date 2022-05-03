<template>
  <div class="app">
    <div class="alerts">
      <Message
        v-for="(alert, i) in alerts"
        :key="i"
        :life="alert.life"
        :sticky="false"
        :severity="alert.severity"
      >
        {{ alert.message }}
      </Message>
    </div>
    <Header></Header>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import Header from '@/components/Header.vue';
import Message from 'primevue/message';

export default defineComponent({
  components: {
    Header,
    Message,
  },
  setup() {
    const store = useStore();
    const alerts = computed(() => store.getters.alerts);

    return {
      alerts,
    };
  },
});
</script>

<style scoped lang="scss">
.alerts {
  position: fixed;
  right: 30px;
  z-index: 2000;
}
</style>
