<template>
  <div>
    <h3 class="FirebaseVerification__header">
      <i class="fa-solid fa-wifi"></i>
      <span>Connection status</span>
    </h3>
    <p>{{ connectionStatus }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNuxtApp } from 'nuxt/app';

const connectionStatus = ref('Checking Firebase connection...')

onMounted(() => {
  const { $firebase } = useNuxtApp()
  
  if ($firebase && $firebase.app) {
    const auth = getAuth($firebase.app)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        connectionStatus.value = 'Websocket connected successfully!'
      } else {
        connectionStatus.value = 'Websocket connected, but no user is signed in.'
      }
    })
  } else {
    connectionStatus.value = 'Websocket not initialized properly.'
  }
})
</script>

<style scoped lang="scss">
.FirebaseVerification__header {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>