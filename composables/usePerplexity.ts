import { useFetch } from 'nuxt/app';
import { ref } from 'vue';

export const usePerplexity = () => {
  const response = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const sendMessage = async (messages) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await useFetch('/api/perplexity', {
        method: 'POST',
        body: { messages }
      });
      response.value = data.value;
    } catch (err) {
      error.value = err;
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
