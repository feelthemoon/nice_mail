<template>
  <div class="tempbox flex flex-column align-items-center p-8">
    <h1 class="tempbox__title text-center">Get Free Temporary Email Address</h1>
    <div class="tempbox__field flex align-items-center mt-3">
      <span class="p-input-icon-right" @click="copyToClipboard">
        <i class="pi pi-spin pi-spinner" v-if="isLoading" />
        <InputText
          class="w-25rem border-300 cursor-pointer"
          disabled
          ref="tempmail"
          :model-value="randomMail"
        ></InputText>
      </span>
      <div class="tempbox__actions ml-2" :style="{ position: 'relative', height: '45px' }">
        <div class="tempbox__btn">
          <SpeedDial
            :tooltipOptions="{ position: 'top' }"
            :model="actions"
            direction="right"
            :transitionDelay="80"
            showIcon="pi pi-cog"
            buttonClass="p-button-outlined"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive } from 'vue';
import { useStore } from '@/store';
import InputText from 'primevue/inputtext';
import SpeedDial from 'primevue/speeddial';

export default defineComponent({
  name: 'TempBox',
  components: {
    InputText,
    SpeedDial,
  },
  setup() {
    const store = useStore();
    const tempmail = ref();
    const isLoading = computed(() => store.getters.loadingByNamespace('tempbox'));

    const copyToClipboard = () => {
      if (!isLoading.value) {
        navigator.clipboard.writeText(tempmail.value['modelValue']).then(() => {
          store.dispatch('updateAlerts', { message: 'Successfully copied', severity: 'success' });
        });
      }
    };

    const actions = reactive([
      {
        label: 'Save',
        icon: 'pi pi-bookmark',
        command: () => {
          return;
        },
      },
      {
        label: 'Refresh',
        icon: 'pi pi-refresh',
        command: () => {
          return store
            .dispatch('mail/getRandomMail', { force: true })
            .then(() => store.dispatch('mail/connectWS'))
            .then(() => store.dispatch('mail/getMessages'));
        },
      },
      {
        label: 'Copy',
        icon: 'pi pi-copy',
        command: () => {
          copyToClipboard();
          return;
        },
      },
    ]);
    const randomMail = computed(() => store.getters['mail/email']);

    store
      .dispatch('mail/getRandomMail')
      .then(() => store.dispatch('mail/connectWS'))
      .then(() => store.dispatch('mail/getMessages'));

    return {
      actions,
      randomMail,
      isLoading,
      tempmail,
      copyToClipboard,
    };
  },
});
</script>

<style scoped lang="scss">
.tempbox {
  box-shadow: 0 0 10px var(--primary-color);
  max-width: 650px;
  width: 100%;
  margin: 0 auto;
  border-radius: 10px;
}
</style>
