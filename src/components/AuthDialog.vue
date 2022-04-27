<template>
  <div>
    <slot><Button label="Login" @click="updateShowDialog"></Button></slot>
    <Dialog
      :modal="true"
      header="Login to your account"
      v-model:visible="showDialog"
      dismissableMask
    >
      <TabMenu
        @tab-change="changeLoginType"
        :model="tabItems"
        class="flex justify-content-center mb-4 -mt-2 pt-2"
      />
      <form class="auth flex flex-column align-items-center" novalidate @submit.prevent="authUser">
        <span class="p-input-icon-left w-25rem mb-3">
          <i class="pi pi-envelope" />
          <InputText
            class="w-full pl-5"
            type="email"
            v-model="user.email"
            placeholder="Email"
            :class="{ 'p-invalid': v$.user.email.$dirty && v$.user.email.$invalid }"
          />
        </span>
        <span class="p-input-icon-left w-25rem mb-3">
          <i class="pi pi-lock z-1" />
          <InputText
            v-if="loginType === 0"
            class="w-full pl-5"
            type="password"
            v-model="user.password"
            placeholder="Password"
            :class="{ 'p-invalid': v$.user.password.$dirty && v$.user.password.$invalid }"
          />
          <Password
            v-else
            :class="{ 'p-invalid': v$.user.password.$dirty && v$.user.password.$invalid }"
            class="w-full"
            input-class="w-full pl-5 pr-5"
            v-model="user.password"
            placeholder="Password"
            toggleMask
          >
            <template #footer>
              <div>
                <Divider />
                <p class="mt-2">Suggestions</p>
                <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                  <li>At least one lowercase</li>
                  <li>At least one uppercase</li>
                  <li>At least one numeric</li>
                  <li>Minimum 8 characters</li>
                </ul>
              </div>
            </template>
          </Password>
        </span>
        <Button :label="buttonText" type="submit"></Button>
      </form>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { email as emailValidator, required } from '@vuelidate/validators';
import TabMenu, { TabMenuChangeEvent } from 'primevue/tabmenu';
import { useStore } from '@/store';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Divider from 'primevue/divider';
import useVuelidate from '@vuelidate/core';

export default defineComponent({
  name: 'AuthDialog',
  components: {
    Dialog,
    TabMenu,
    Button,
    InputText,
    Password,
    Divider,
  },
  setup() {
    const store = useStore();

    const showDialog = ref(false);
    const loginType = ref(0);
    const tabItems = reactive([
      {
        label: 'SignIn',
      },
      {
        label: 'SignUp',
      },
    ]);
    const user = reactive({
      email: '',
      password: '',
    });
    const passwordValidator = (value: string) => {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value);
    };

    const rules = {
      user: {
        email: { emailValidator, required },
        password: { required, passwordValidator },
      },
    };

    const v$ = useVuelidate(rules, { user });

    const buttonText = computed(() => (loginType.value ? 'Register' : 'Login'));

    const updateShowDialog = () => {
      showDialog.value = !showDialog.value;
    };

    const changeLoginType = (event: TabMenuChangeEvent) => {
      loginType.value = event.index;
      v$.value.$reset();
    };

    const authUser = async () => {
      await v$.value.$validate();
      if (!v$.value.$invalid) {
        if (loginType.value === 1) {
          return await store.dispatch('auth/register');
        }
        await store.dispatch('auth/login');
      }
    };

    return {
      tabItems,
      user,
      showDialog,
      loginType,
      buttonText,
      v$,
      updateShowDialog,
      authUser,
      changeLoginType,
    };
  },
});
</script>
