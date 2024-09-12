<template>
    <div>
      <h2>Firebase Connection Status</h2>
      <p>{{ connectionStatus }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  
  const connectionStatus = ref('Checking Firebase connection...')
  
  onMounted(() => {
    const { $firebase } = useNuxtApp()
    
    if ($firebase && $firebase.app) {
      const auth = getAuth($firebase.app)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          connectionStatus.value = 'Firebase connected successfully!'
        } else {
          connectionStatus.value = 'Firebase initialized, but no user is signed in.'
        }
      })
    } else {
      connectionStatus.value = 'Firebase not initialized properly.'
    }
  })
  </script>
  