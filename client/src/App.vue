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
      <component :is="layout"> </component>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Message from 'primevue/message';
import DefaultLayout from '@/layouts/Default.vue';

export default defineComponent({
  components: {
    Header,
    Message,
    DefaultLayout,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const alerts = computed(() => store.getters.alerts);
    const layout = computed(() => `${route.meta.layout || 'default'}-layout`);

    return {
      alerts,
      layout,
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
