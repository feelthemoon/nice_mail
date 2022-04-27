<template>
  <div class="tempbox flex flex-column align-items-center p-8">
    <h1 class="tempbox__title text-center">Get Free Temporary Email Address</h1>
    <div class="tempbox__field flex align-items-center mt-3">
      <InputText class="w-25rem border-300 cursor-pointer" disabled></InputText>
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
import { defineComponent, reactive } from 'vue';
import InputText from 'primevue/inputtext';
import SpeedDial from 'primevue/speeddial';

export default defineComponent({
  name: 'TempBox',
  components: {
    InputText,
    SpeedDial,
  },
  setup() {
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
          return;
        },
      },
      {
        label: 'Copy',
        icon: 'pi pi-copy',
        command: () => {
          return;
        },
      },
    ]);

    return {
      actions,
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
