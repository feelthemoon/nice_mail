<template>
  <Dropdown
    @change="changeLang"
    v-model="selectedCountry"
    :options="langs"
    optionLabel="name"
    class="lang-change"
  >
    <template #value="slotProps">
      <div class="country-item country-item-value flex align-items-center" v-if="slotProps.value">
        <Icon :name="slotProps.value.code" width="15px" height="15px" />
        <div class="ml-2">{{ slotProps.value.name }}</div>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <div class="country-item flex align-items-center">
        <Icon :name="slotProps.option.code" width="15px" height="15px" />
        <div class="ml-2">{{ slotProps.option.name }}</div>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { loadLanguageAsync } from '@/plugins/i18n';
import Dropdown, { DropdownChangeEvent } from 'primevue/dropdown';
import Icon from '@/components/Icon.vue';

export default defineComponent({
  name: 'ChangeLang',
  components: {
    Dropdown,
    Icon,
  },
  setup() {
    const selectedCountry = ref({
      name: 'English',
      code: 'en',
    });
    const langs = ref([
      { name: 'English', code: 'en' },
      { name: 'Русский', code: 'ru' },
      { name: 'Español', code: 'es' },
      { name: '日本語', code: 'ja' },
    ]);
    const changeLang = (e: DropdownChangeEvent) => {
      loadLanguageAsync(e.value.code);
    };

    return {
      selectedCountry,
      langs,
      changeLang,
    };
  },
});
</script>
<style lang="scss">
.lang-change {
  min-width: 120px;
  max-width: 120px;
  border: none !important;
  background: transparent !important;
}
</style>
