<template>
  <div class="tempbox flex flex-column align-items-center p-8">
    <h1 class="tempbox__title text-center">{{ t('pages.index.tempbox.title') }}</h1>
    <div class="tempbox__field mt-3">
      <span class="p-input-icon-right" @click="copyToClipboard">
        <i class="pi pi-spin pi-spinner" v-if="isLoading" />
        <InputText
          class="email-field border-300 cursor-pointer"
          disabled
          ref="tempmail"
          :model-value="randomMail"
        ></InputText>
      </span>
      <div class="tempbox__actions ml-2" :style="{ position: 'relative', height: '45px' }">
        <div class="tempbox__btns">
          <SpeedDial
            :tooltipOptions="{ position: 'top' }"
            :model="actions"
            direction="right"
            :transitionDelay="80"
            showIcon="pi pi-cog"
            buttonClass="p-button-outlined"
          />
        </div>
        <div class="tempbox__btns--mobile mt-3">
          <Button @click="copyToClipboard" icon="pi pi-copy" class="p-button-rounded p-button-info mr-2" />
          <Button @click="refreshMail" icon="pi pi-refresh" class="p-button-rounded p-button-info" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive } from 'vue';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';
import InputText from 'primevue/inputtext';
import SpeedDial from 'primevue/speeddial';
import Button from "primevue/button";

export default defineComponent({
  name: 'TempBox',
  components: {
    InputText,
    SpeedDial,
    Button,
  },
  setup() {
    const store = useStore();
    const tempmail = ref();
    const { t } = useI18n();

    const isLoading = computed(() => store.getters.loadingByNamespace('tempbox'));

    const copyToClipboard = () => {
      if (!isLoading.value) {
        navigator.clipboard.writeText(tempmail.value['modelValue']).then(() => {
          store.dispatch('updateAlerts', {
            message: computed(() => t('copyMail')),
            severity: 'success',
          });
        });
      }
    };
    const refreshMail = () => {
      return store
        .dispatch('mail/getRandomMail', { force: true })
        .then(() => store.dispatch('mail/connectWS'))
        .then(() => store.dispatch('mail/getMessages'));
    };

    const actions = reactive([
      {
        label: computed(() => t('pages.index.tempbox.tooltips.refresh')),
        icon: 'pi pi-refresh',
        command: refreshMail,
      },
      {
        label: computed(() => t('pages.index.tempbox.tooltips.copy')),
        icon: 'pi pi-copy',
        command: copyToClipboard,
      },
    ]);
    const randomMail = computed(() => store.getters['mail/email']);
    store.dispatch('mail/getRandomMail');

    return {
      actions,
      randomMail,
      isLoading,
      tempmail,
      t,
      copyToClipboard,
      refreshMail,
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
  &__field {
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
      flex-direction: column;
    }
    .email-field {
      width: 25rem;
      @media (max-width: 450px) {
        width: 17rem;
      }
    }
  }
  &__btns {
    @media (max-width: 768px) {
      display: none;
    }
    &--mobile {
      display: none;
      @media (max-width: 768px) {
        display: block;
      }
    }
  }
}
</style>
