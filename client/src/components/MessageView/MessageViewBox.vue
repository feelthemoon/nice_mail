<template>
  <div class="messagebox mt-3 mx-auto">
    <header class="messagebox__header bg-primary py-3 px-5">
      <div class="messagebox__header-titles flex align-items-center">
        <router-link to="/" class="text-white font-bold no-underline">
          <i class="pi pi-arrow-left text-white mr-3"></i>
          {{ $t('pages.messageView.messageViewBox.back') }}
        </router-link>
      </div>
    </header>
    <section class="messagebox__content py-3 px-4">
      <template v-if="!loading && !error">
        <div
          class="messagebox__subheader border-bottom-1 pb-3"
        >
          <div class="messagebox__subheader-left flex align-items-center">
            <div class="messagebox__avatar">
              {{ avatarLetter }}
            </div>
            <div class="messagebox__from">{{ message.from }}</div>
          </div>
          <div class="messagebox__subheader-right">
            <p>{{ $t('pages.messageView.messageViewBox.datetime') }}</p>
            <time class="messagebox__date">
              {{ message.date }}
            </time>
          </div>
        </div>
        <div class="messagebox__subheader-subject flex mt-3 mb-4">
          <p class="mr-2">{{ $t('pages.messageView.messageViewBox.subject') }}</p>
          <span class="font-italic">{{
            message.subject || $t('pages.messageView.messageViewBox.no-subject')
          }}</span>
        </div>
        <div class="messagebox__attachments flex mb-3">
          <a
            target="_blank"
            :href="`https://www.1secmail.com/api/v1/?action=download&login=${email[0]}&domain=${email[1]}&id=${message.id}&file=${attachment.filename}`"
            class="attachment mr-4 flex flex-column align-items-center no-underline hover:bg-black-alpha-20 p-2 transition-all transition-duration-300"
            v-for="(attachment, i) in message.attachments"
            :key="i"
          >
            <Icon :name="getIconAttachmentName(attachment)" width="65px" height="65px"></Icon>
            <p class="attachment__name text-white mt-2">{{ attachment.filename }}</p>
          </a>
        </div>
        <message-view v-if="message.body" :content="message.body"></message-view>
        <p v-else class="font-bold font-italic">
          {{ $t('pages.messageView.messageViewBox.no-text') }}
        </p>
      </template>
      <template v-else>
        <div class="loading mt-8 flex flex-column align-items-center">
          <ProgressSpinner
            style="width: 80px; height: 80px"
            strokeWidth="8"
            animationDuration=".5s"
          />
          <p class="loading__text mt-3 text-bluegray-400 text-lg">
            {{ $t('pages.messageView.messageViewBox.loading') }}
          </p>
        </div>
      </template>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';
import ProgressSpinner from 'primevue/progressspinner';
import Icon from '@/components/Icon.vue';
import { IAttachment } from '@/store/modules/mail/mail.types';

export default defineComponent({
  name: 'MessageViewBox',
  components: {
    Icon,
    ProgressSpinner,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const router = useRouter();
    const attachmentTypes = {
      'vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      pdf: 'pdf',
      zip: 'zip',
      unknown: 'unknown',
    };

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
    const email = computed(() => store.getters['mail/email'].split('@'));

    const getIconAttachmentName = (attachment: IAttachment): string => {
      return (
        attachmentTypes[attachment.contentType.split('/')[1] as keyof typeof attachmentTypes] ||
        attachmentTypes['unknown']
      );
    };

    return { message, avatarLetter, loading, error, email, getIconAttachmentName };
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
  .attachment {
    &__name {
      max-width: 140px;
      text-align: center;
      word-break: break-all;
    }
  }
  &__subheader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: start;
    }
    &-right {
      @media (max-width: 768px) {
        margin-top: 15px;
      }
    }
  }
}
</style>
