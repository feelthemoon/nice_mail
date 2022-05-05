<template>
  <div class="messagebox mt-3 mx-auto">
    <header class="messagebox__header bg-primary py-3 px-5">
      <div class="messagebox__header-titles flex align-items-center">
        <router-link to="/" class="text-white font-bold no-underline">
          <i class="pi pi-arrow-left text-white mr-3"></i>
          Back
        </router-link>
      </div>
    </header>
    <section class="messagebox__content py-3 px-4">
      <template v-if="!loading && !error">
        <div
          class="messagebox__subheader border-bottom-1 pb-3 flex justify-content-between align-items-center"
        >
          <div class="messagebox__subheader-left flex align-items-center">
            <div class="messagebox__avatar">
              {{ avatarLetter }}
            </div>
            <div class="messagebox__from">{{ message.from }}</div>
          </div>
          <div class="messagebox__subheader-right">
            <p>DateTime:</p>
            <time class="messagebox__date">
              {{ message.date }}
            </time>
          </div>
        </div>
        <div class="messagebox__subheader-subject flex mt-3 mb-4">
          <p class="mr-2">Subject:</p>
          <span>{{ message.subject }}</span>
        </div>
        <message-view :content="message.body"></message-view>
      </template>
      <template v-else>
        <div class="loading mt-8 flex flex-column align-items-center">
          <ProgressSpinner
            style="width: 80px; height: 80px"
            strokeWidth="8"
            animationDuration=".5s"
          />
          <p class="loading__text mt-3 text-bluegray-400 text-lg">Loading message...</p>
        </div>
      </template>
    </section>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';
import ProgressSpinner from 'primevue/progressspinner';

export default defineComponent({
  name: 'MessageViewBox',
  components: {
    ProgressSpinner,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const router = useRouter();

    const error = computed(() => store.getters.errorByNamespace('messageView'));

    store
      .dispatch('mail/readMessage', { id: parseInt(route.params.id.toString()) })
      .then(async () => {
        if (error.value?.statusCode === 404 || error.value?.statusCode === 401) {
          await router.push('/');
          store.commit('DELETE_ERROR', { ...error.value });
        }
      });

    const message = computed(() => store.getters['mail/currentMessage']);
    const avatarLetter = computed(() => message.value.from?.[0].toUpperCase());
    const loading = computed(() => store.getters.loadingByNamespace('messageView'));

    return { message, avatarLetter, loading, error };
  },
});
</script>

<style scoped lang="scss">
.messagebox {
  &__avatar {
    min-width: 50px;
    min-height: 50px;
    border: 1px solid gray;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-right: 20px;
  }
  &__from {
    max-width: 305px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
