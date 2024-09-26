<template>
    <div>
      <h1>Screenshot Test</h1>
      <input v-model="url" placeholder="Enter URL to screenshot" />
      <button @click="takeScreenshot">Take Screenshot</button>
      <img v-if="screenshotUrl" :src="screenshotUrl" alt="Screenshot" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const url = ref('')
  const screenshotUrl = ref('')
  
  const takeScreenshot = async () => {
    if (!url.value) return
    try {
      const response = await fetch(`/api/screenshot?url=${encodeURIComponent(url.value)}`)
      if (response.ok) {
        const blob = await response.blob()
        screenshotUrl.value = URL.createObjectURL(blob)
      } else {
        console.error('Failed to take screenshot')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  </script>