<template>
    <div>
      <div v-for="message in messages" :key="message.id">
        <p><strong>{{ message.role }}:</strong> {{ message.content }}</p>
      </div>
      <form @submit.prevent="handleSendMessage">
        <input v-model="userInput" placeholder="Type a message..." />
        <button type="submit" :disabled="loading">Send</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { usePerplexity } from '~/composables/usePerplexity';
  
  const { response, loading, error, sendMessage } = usePerplexity();
  const messages = ref([]);
  const userInput = ref('');
  
  const handleSendMessage = async () => {
    if (!userInput.value.trim()) return;
  
    const newMessage = { role: 'user', content: userInput.value };
    messages.value.push(newMessage);
  
    await sendMessage([...messages.value]);
  
    if (response.value && response.value.choices && response.value.choices.length > 0) {
      messages.value.push(response.value.choices[0].message);
    }
  
    userInput.value = '';
  };
  </script>
  