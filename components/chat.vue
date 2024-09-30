<template>
  <div>
    <div v-for="message in messages" :key="message.id">
      <p><strong>{{ message.role }}:</strong> {{ message.content }}</p>
    </div>
    <TwoInput
      v-model="userInput"
      fullWidth
      :disabled="disabled"
      placeholder="Type a message..."
      buttonIcon="fa-solid fa-paper-plane"
      :loading="isLoading"
      @submit="handleSendMessage"
    />
    <p v-if="error">{{ error }}</p>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { usePerplexity, type PlxMessage } from '@composables/usePerplexity';
import TwoInput from '@ui/TwoInput.vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const { response, error, sendMessage } = usePerplexity();
const messages = ref<PlxMessage[]>([]);
const userInput = ref('');
const isLoading = ref(false);

const handleSendMessage = async () => {
  if (!userInput.value.trim()) return;

  const newMessage = {
    role: 'user',
    content: userInput.value,
    id: crypto.randomUUID()
  };
  messages.value.push(newMessage);

  isLoading.value = true;
  userInput.value = '';

  try {
    await sendMessage([...messages.value]);
  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    isLoading.value = false;
  }

  if (response.value && response.value.choices && response.value.choices.length > 0) {
    messages.value.push(response.value.choices[0].message);
  }
};
</script>
