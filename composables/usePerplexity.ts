import { useFetch } from 'nuxt/app';
import { ref } from 'vue';
import { isError } from '../utils/error';

export interface PlxMessage {
  role: string;
  content: string;
  id: string;
}

export interface PlxResponse {
  choices: {
    message: PlxMessage;
  }[];
}

export const usePerplexity = () => {
  const response = ref<PlxResponse | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const sendMessage = async (messages: PlxMessage[]) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await useFetch('/api/perplexity', {
        method: 'POST',
        body: { messages }
      });
      response.value = data.value;
    } catch (err) {
      if (isError(err)) {
        error.value = err;
      } else {
        error.value = new Error('Unknown error');
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    response,
    loading,
    error,
    sendMessage
  };
};
